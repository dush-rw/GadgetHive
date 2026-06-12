import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, Phone, User, Zap } from "lucide-react";
import { useAuth } from "../context/useAuth";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate("/", { replace: true });
    } catch (authError) {
      setError(authError.message || "Unable to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              GadgetHive
            </span>
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Join GadgetHive today.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            Create an account for faster checkout, saved details, and a smoother
            tech shopping experience.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-900/10 border border-slate-200 p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Create account
            </h2>
            <p className="text-slate-500 mt-2">
              It only takes a minute to get started.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  First name
                </span>
                <div className="mt-2 relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    placeholder="John"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Last name
                </span>
                <div className="mt-2 relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    placeholder="Doe"
                  />
                </div>
              </label>
            </div>

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
                Phone number
              </span>
              <div className="mt-2 relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="+250 788 123 456"
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
                  minLength={6}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="At least 6 characters"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Confirm password
              </span>
              <div className="mt-2 relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="Repeat password"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-white font-bold hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Creating account..." : "Create account"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
