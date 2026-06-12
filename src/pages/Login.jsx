import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, LogIn, Mail } from "lucide-react";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [user, navigate, location]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (authError) {
      setError(authError.message || "Unable to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <LogIn className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              GadgetHive
            </span>
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Welcome back to smarter shopping.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            Sign in to access your account, manage orders, and continue where you
            left off.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-900/10 border border-slate-200 p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Sign in</h2>
            <p className="text-slate-500 mt-2">
              Use your GadgetHive account to continue.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Email address
              </span>
              <div className="mt-2 relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Password
              </span>
              <div className="mt-2 relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-white font-bold hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            New to GadgetHive?{" "}
            <Link
              to="/signup"
              className="font-bold text-indigo-600 hover:text-indigo-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
