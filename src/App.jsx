import React, { useState, useEffect } from 'react';
import './App.css';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Menu,
  X,
  Star,
  Lock,
  Award,
  Users
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate high-performance loading
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen font-sans bg-white antialiased text-slate-900 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Navigation */}
      <nav className="w-full bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="/images/icon.png" alt="Quality Tester Solutions Icon" className="h-10 w-auto" />
              <span className="font-luxury text-2xl font-bold tracking-tight text-slate-900">
                Quality Tester Solutions
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10 font-medium text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">Products</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Industries</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Resources</a>
              <a href="tel:727-754-0019" className="font-semibold text-slate-900 hover:text-slate-600 transition-colors">Call 727-754-0019</a>
            </div>

            <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-8 text-2xl font-luxury font-bold">
            <a href="#" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Industries</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Resources</a>
            <a href="tel:727-754-0019" className="text-xl" onClick={() => setIsMenuOpen(false)}>Call 727-754-0019</a>
          </div>
        </div>
      )}

      {/* Optimized Hero Section */}
      <main>
        <div className="relative isolate pt-14 bg-black bg-opacity-70 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src="/images/hero-background.jpg" alt="Force Measurement Systems Banner" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative z-10 text-center lg:text-left">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-stone-500/10 border border-stone-400/30 rounded-full px-4 py-1 mb-8 backdrop-blur-sm">
                <Zap size={16} className="text-stone-300" />
                <span className="text-sm font-medium text-stone-200 tracking-wide uppercase">New: 2026 Testing Standards Compliant</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-luxury font-extrabold leading-tight text-white mb-6 drop-shadow-lg">
                Precision Testing for <br /><span className="text-stone-300 italic">Air Barrier Installations</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl font-light drop-shadow-md lg:mx-0 mx-auto">
                Don't let failed adhesion tests delay your project. Equip your team with rugged, field-ready, ABAA-compliant pull and tensile testers designed specifically for air barrier contractors.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                <button className="bg-stone-100 hover:bg-white text-slate-900 px-8 py-4 rounded-md font-semibold text-lg flex items-center justify-center transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg">
                  Shop Inventory <ShoppingBag className="ml-2" size={20} />
                </button>
                <button className="bg-transparent hover:bg-white/10 border border-white/30 text-white px-8 py-4 rounded-md font-medium text-lg flex items-center justify-center transition-all">
                  Learn Our Process
                </button>
              </div>

              <div className="mt-14 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-stone-300 font-medium">
                <div className="flex items-center"><ShieldCheck size={18} className="mr-2 text-stone-400" /> SSL Secured Checkout</div>
                <div className="flex items-center"><Award size={18} className="mr-2 text-stone-400" /> ISO Certified Quality</div>
                <div className="flex items-center"><Users size={18} className="mr-2 text-stone-400" /> 2,000+ Facilities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <section className="bg-white py-12 border-b border-stone-100">
          <div className="container mx-auto px-6">
            <p className="text-center text-slate-400 font-semibold uppercase tracking-widest text-xs mb-8">Trusted by top air barrier installers and ABAA Auditors</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-opacity duration-500">
              <div className="font-luxury font-bold text-2xl text-slate-800">BUILD-TECH</div>
              <div className="font-luxury font-bold text-2xl text-slate-800">PRO-INSTALL</div>
              <div className="font-luxury font-bold text-2xl text-slate-800">ENVELOPE.CO</div>
              <div className="font-luxury font-bold text-2xl text-slate-800">AERO-SEAL</div>
            </div>
          </div>
        </section>

        {/* Products Integration */}
        <section className="py-24 bg-stone-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-stone-500 tracking-wider uppercase">Direct Ordering</h2>
              <p className="mt-2 text-4xl font-luxury font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                Precision-Engineered Equipment
              </p>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                Selected by experts, tested for durability. Order directly from the manufacturer to reduce costs while retaining laboratory-grade reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group flex flex-col">
                <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 relative overflow-hidden border border-stone-50">
                  <img src="/images/pull-tester.jpg" alt="Digital Pull Tester" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                  <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">In Stock</div>
                </div>
                <div className="px-4 pb-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-2">Air Barrier Adhesion Test Kit</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow font-light">Complete, field-ready kit for accurate air barrier adhesion testing. Includes everything needed for guaranteed precision and ABAA T0002 compliance.</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-slate-900">$1,495.00</span>
                    <div className="flex text-stone-400">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  <button className="w-full bg-slate-900 hover:bg-stone-700 text-white h-14 rounded-md font-bold flex items-center justify-center transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group flex flex-col">
                <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden border border-stone-50">
                  <img src="/images/tensile-tester.jpg" alt="Precision Tensile Tester" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out" />
                  <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">In Stock</div>
                </div>
                <div className="px-4 pb-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-2">Manual Tensile Tester</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow font-light">Engineered for absolute precision and highly cost-effective testing. Reliable manual operation for rugged field environments.</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-slate-900">$995.00</span>
                    <div className="flex text-stone-400">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  <button className="w-full bg-slate-900 hover:bg-stone-700 text-white h-14 rounded-md font-bold flex items-center justify-center transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group flex flex-col">
                <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 relative overflow-hidden border border-stone-50">
                  <img src="/images/fixtures.jpg" alt="Test Fixtures and Grips" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                  <div className="absolute top-4 right-4 bg-white text-slate-900 border border-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Custom</div>
                </div>
                <div className="px-4 pb-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-2">Specialty Fixtures & Grips</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow font-light">Durable fixtures to enable successful tests. High-impact design. Hundreds of configurations available.</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-bold text-slate-900">Configure</span>
                    <div className="flex text-stone-400">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  <button className="w-full bg-white border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 h-14 rounded-md font-bold flex items-center justify-center transition-colors">
                    Build Package
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-stone-400 py-16 mt-auto border-t border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/icon.png" alt="Icon" className="h-8 w-auto grayscale brightness-200" />
                <h4 className="font-luxury text-white font-bold text-2xl">Quality Tester Solutions</h4>
              </div>
              <p className="max-w-sm mb-6 font-light">Redefining precision in affordable product testing. We provide the tools you need to ensure compliance and excellence without breaking the bank.</p>
              <div className="space-y-4">
                <div className="flex items-center font-medium"><Lock size={16} className="mr-3 text-stone-300" /> 256-bit SSL Encrypted Checkout</div>
                <div className="flex items-center text-sm font-light">4313 Harbor House Dr., Tampa, FL</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm border-b border-slate-800 pb-4 inline-block">Quick Links</h4>
              <ul className="space-y-4 font-light text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight size={14} className="mr-2 opacity-50" /> Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight size={14} className="mr-2 opacity-50" /> Support & Warranty</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight size={14} className="mr-2 opacity-50" /> Bulk Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight size={14} className="mr-2 opacity-50" /> Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm border-b border-slate-800 pb-4 inline-block">Contact Support</h4>
              <ul className="space-y-4 font-light text-sm">
                <li><a href="mailto:info@qualitytesters.shop" className="hover:text-white transition-colors">info@qualitytesters.shop</a></li>
                <li><a href="tel:727-754-0019" className="hover:text-white transition-colors font-medium text-stone-300">(727) 754-0019</a></li>
                <li className="mt-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white shadow-inner">
                    <ShieldCheck size={20} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light">
            <span>&copy; {new Date().getFullYear()} Quality Tester Solutions LLC. All rights reserved.</span>
            <div className="flex gap-4">
              <span className="text-slate-600">ABAA T0002 Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
