import { Link } from "react-router-dom";
import { Zap, Share2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];
  const categories = [
    { to: '/products?category=audio', label: 'Audio' },
    { to: '/products?category=wearables', label: 'Wearables' },
    { to: '/products?category=accessories', label: 'Accessories' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-violet-900/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                GadgetHive
              </span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed text-[15px]">
              Your one-stop shop for premium tech gadgets in Rwanda. Quality
              products, fast delivery, exceptional service.
            </p>
            <div className="flex gap-3">
              {[Share2, Share2, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Social link ${i + 1}`}
                  className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider text-xs">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-[15px] flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-indigo-400 group-hover:scale-150 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider text-xs">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-[15px] flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-indigo-400 group-hover:scale-150 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider text-xs">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-[15px]">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>KG 123 St, Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-[15px]">
                <Phone className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>+250 790 233 064</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-[15px]">
                <Mail className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>info@gadgethive.rw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} GadgetHive. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">Made in Rwanda</p>
        </div>
      </div>
    </footer>
  );
}
