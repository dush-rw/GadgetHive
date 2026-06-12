import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Zap, Search, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/products?category=audio", label: "Audio" },
    { to: "/products?category=wearables", label: "Wearables" },
    { to: "/products?category=accessories", label: "Accessories" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-2xl shadow-xl shadow-slate-900/8 border-b border-slate-200/70"
          : "bg-white/85 backdrop-blur-lg shadow-sm shadow-slate-900/3 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
              GadgetHive
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, idx) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all duration-300 group"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-200"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
            </Link>

            <Link
              to="/cart"
              className="relative p-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-200"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-scaleIn shadow-lg shadow-indigo-500/40">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-200 border border-transparent hover:border-indigo-200"
                >
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.firstName || user.email}
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-200 border border-transparent hover:border-indigo-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-200 border border-transparent hover:border-indigo-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-200"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 pt-2 animate-fadeIn">
            <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/70 shadow-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3.5 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 font-semibold text-sm border border-transparent hover:border-indigo-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-200">
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3.5 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-3 border border-transparent hover:border-indigo-200"
                >
                  <Search className="w-4 h-4" />
                  Search Products
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="mt-1 px-5 py-3.5 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-3 border border-transparent hover:border-indigo-200"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user ? (
                  <div className="mt-1 px-5 py-3.5 text-sm font-semibold text-slate-600 flex items-center gap-3 border border-transparent rounded-xl">
                    <User className="w-4 h-4" />
                    Signed in as {user.firstName || user.email}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="ml-auto inline-flex items-center gap-1 text-rose-600 hover:text-rose-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-center text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
