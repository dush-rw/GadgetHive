import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Headphones,
  CreditCard,
  Star,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { getFeaturedProducts, getDiscountedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const deals = getDiscountedProducts();

  const features = [
    { icon: Truck, title: "Free Delivery", desc: "On orders over RFW 50,000" },
    { icon: Shield, title: "Secure Payment", desc: "Multiple payment options" },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Dedicated customer service",
    },
    { icon: CreditCard, title: "Easy Returns", desc: "7-day return policy" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900 text-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/[0.08] rounded-full blur-3xl translate-y-1/3"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.06),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-7 animate-fadeInUp">
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-lg">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white/95 tracking-wide">
                  Rwanda's #1 Tech Store
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight">
                Discover the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 mt-1">
                  Future of Tech
                </span>
              </h1>

              <p className="text-base sm:text-lg text-indigo-100/90 max-w-lg leading-relaxed">
                Premium gadgets at unbeatable prices. From audio excellence to
                smart wearables — everything you need, delivered fast.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-7 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5 group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/products?category=audio"
                  className="inline-flex items-center justify-center px-7 py-4 border-2 border-white/25 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
                >
                  Browse Audio
                </Link>
              </div>
              <div className="mt-8" />

              <div className="flex items-center gap-5 pt-3">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 border-2 border-white shadow-md flex items-center justify-center text-xs font-extrabold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-indigo-100/80 mt-0.5">
                    Trusted by 10,000+ customers
                  </p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fadeInUp stagger-2">
              <div className="relative z-10">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
                    alt="Featured Product"
                    className="rounded-[2rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700 border-4 border-white/10"
                  />
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-indigo-500/10 to-transparent"></div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white text-slate-900 rounded-2xl p-5 shadow-2xl z-20 border border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-extrabold text-sm">New Arrivals</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Smart Watch Series X
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-6 lg:p-8 rounded-3xl hover:bg-slate-50 transition-all duration-300 group animate-fadeInUp stagger-${index + 1}`}
              >
                <div className="w-16 h-16 bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5 text-[15px]">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 lg:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="w-3 h-3 fill-current" />
                Curated for you
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Products
              </h2>
              <p className="text-slate-500 mt-2 max-w-lg text-[15px]">
                Hand-picked gadgets that our customers love the most.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-bold text-sm group whitespace-nowrap"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-400/[0.06] rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-5 border border-white/10">
            🔥 Limited Time Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Hot Deals This Week
          </h2>
          <p className="text-indigo-100/80 mb-12 max-w-xl mx-auto text-[15px] leading-relaxed">
            Don't miss out on these amazing discounts. Free delivery on all
            deals!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {deals.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center bfrfooter">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Join 10,000+ Happy Customers
            </h2>
            <p className="text-slate-500 mb-10 text-[15px] leading-relaxed">
              Experience the best tech shopping in Rwanda with fast delivery,
              secure payments, and dedicated support.
            </p>
            <Link
              to="/products"
              className="start-shop inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 group"
            >
              Start Shopping Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
