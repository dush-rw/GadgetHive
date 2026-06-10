import { Target, Eye, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "To make premium technology accessible to everyone in Rwanda, providing quality gadgets at competitive prices with exceptional service.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      desc: "To become the leading e-commerce platform for tech products in East Africa, empowering customers through innovation and convenience.",
    },
    {
      icon: Award,
      title: "Quality First",
      desc: "We source only genuine products from authorized distributors, backed by full manufacturer warranties and reliable after-sales support.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About GadgetHive
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Rwanda's premier destination for premium tech gadgets. We're on a
            mission to make cutting-edge technology accessible to everyone.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2026, GadgetHive started with a simple idea: make
                premium tech gadgets accessible to everyone in Rwanda. What
                began as a small shop in Kigali has grown into Rwanda's most
                trusted online tech store.
              </p>
              <p className="text-gray-600 mb-4">
                We specialize in audio equipment, smart wearables, and premium
                tech accessories. Every product in our catalog is carefully
                selected to ensure quality, authenticity, and value for money.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of customers across Rwanda, offering
                fast delivery, secure payments, and dedicated customer support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">10K+</p>
                <p className="text-gray-600">Customers</p>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl text-center">
                <p className="text-4xl font-bold text-green-600 mb-2">500+</p>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-2xl text-center">
                <p className="text-4xl font-bold text-yellow-600 mb-2">50K+</p>
                <p className="text-gray-600">Orders</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl text-center">
                <p className="text-4xl font-bold text-purple-600 mb-2">4.8</p>
                <p className="text-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
