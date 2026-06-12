import { createContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const userStorageKey = "gadgethive-user";
const tokenStorageKey = "gadgethive-token";

const readStoredUser = () => {
  try {
    const savedUser = localStorage.getItem(userStorageKey);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

const readStoredToken = () => {
  try {
    return localStorage.getItem(tokenStorageKey);
  } catch {
    return null;
  }
};

const getAuthError = async (response) => {
  const data = await response.json().catch(() => ({}));
  return data.error || "Authentication failed. Please try again.";
};

export { AuthContext };
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(readStoredToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Session expired");

        const data = await response.json();
        setUser(data.user);
      } catch {
        localStorage.removeItem(userStorageKey);
        localStorage.removeItem(tokenStorageKey);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [token]);

  const login = async (credentials) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error(await getAuthError(response));

    const data = await response.json();
    localStorage.setItem(userStorageKey, JSON.stringify(data.user));
    localStorage.setItem(tokenStorageKey, data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const signup = async (userData) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error(await getAuthError(response));

    const data = await response.json();
    localStorage.setItem(userStorageKey, JSON.stringify(data.user));
    localStorage.setItem(tokenStorageKey, data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(userStorageKey);
    localStorage.removeItem(tokenStorageKey);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
