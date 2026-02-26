import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="/images/icon.png" alt="Quality Tester Solutions Icon" className="h-10 w-auto" />
              <span className="font-luxury text-2xl font-bold tracking-tight text-slate-900">
                Quality Tester Solutions
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Home</a>
              <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Shop</a>
              <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Learn</a>
              <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Contact</a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center gap-6">
              <a href="tel:727-754-0019" className="text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors">Call 727-754-0019</a>
              <button type="button" className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800 hover:scale-[1.02] transition-transform duration-300 ease-out font-medium">
                Explore Options
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative isolate px-6 pt-14 lg:px-8 bg-black bg-opacity-70">
          {/* Background Image Setup */}
          <div className="absolute inset-0 -z-10">
            <img src="/images/hero-background.jpg" alt="Force Measurement Systems Banner" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
          </div>

          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40 text-center">
            <h1 className="text-4xl font-luxury tracking-tight text-white sm:text-6xl mb-8 drop-shadow-lg">
              Testers Built to Last
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-100 font-medium mb-10 max-w-xl mx-auto drop-shadow-md">
              Engineered Excellence. Affordable solutions for accurate product testing without breaking the bank.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-stone-800 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 hover:scale-[1.02] transition-all duration-300">
                Discover Solutions
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-slate-900 hover:text-slate-600 transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Benefits/Products Section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-stone-600 tracking-wider uppercase">Our Expertise</h2>
              <p className="mt-2 text-3xl font-luxury tracking-tight text-slate-900 sm:text-4xl">
                Affordable Quality Testing Solutions
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                At Quality Tester Solutions, we provide engineered adhesion testers and tensile testers, helping you enhance accuracy while reducing testing costs.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-6 shadow-sm border border-stone-100">
                    <img src="/images/pull-tester.jpg" alt="Digital Pull Tester" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                  </div>
                  <dt className="flex items-center gap-x-3 text-xl font-luxury leading-7 text-slate-900 group-hover:text-stone-600 transition-colors">
                    Pull Testers
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 font-light">
                    <p className="flex-auto">Affordable solutions for accurate pull force testing needs. Quality assured.</p>
                  </dd>
                </div>
                <div className="flex flex-col group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-6 shadow-sm border border-stone-100 bg-stone-50 flex items-center justify-center">
                    <img src="/images/tensile-tester.jpg" alt="Precision Tensile Tester" className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                  </div>
                  <dt className="flex items-center gap-x-3 text-xl font-luxury leading-7 text-slate-900 group-hover:text-stone-600 transition-colors">
                    Tensile Testers
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 font-light">
                    <p className="flex-auto">Engineered for precision and cost-effective testing solutions.</p>
                  </dd>
                </div>
                <div className="flex flex-col group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-6 shadow-sm border border-stone-100">
                    <img src="/images/fixtures.jpg" alt="Test Fixtures and Grips" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                  </div>
                  <dt className="flex items-center gap-x-3 text-xl font-luxury leading-7 text-slate-900 group-hover:text-stone-600 transition-colors">
                    Fixtures and Grips
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 font-light">
                    <p className="flex-auto">Durable fixtures and grips to enable successful tests. We have hundreds of grips and fixtures not listed here.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Why Choose Us & Testimonial */}
        <div className="bg-stone-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
              <div>
                <h2 className="text-3xl font-luxury tracking-tight text-slate-900 sm:text-4xl mb-6">Why Choose Us</h2>
                <p className="text-lg leading-8 text-slate-600 font-light mb-8">
                  As a small company, we prioritize customer satisfaction by offering reliable testing solutions, fixtures and grips that meet your needs. We have a package designed specifically for ABAA adhesion testing.
                </p>
                <p className="text-lg leading-8 text-slate-600 font-light">
                  Trust us to help you achieve accurate results without breaking the bank. Our specialty is engineering custom fixtures and grips to meet your testing needs.
                </p>
                <div className="mt-10">
                  <a href="tel:727-754-0019" className="inline-block border border-slate-900 px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300">
                    Call 727-754-0019
                  </a>
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center">
                <div className="text-amber-500 text-2xl mb-4">★★★★★</div>
                <blockquote className="text-lg leading-8 text-slate-900 mb-6 font-luxury italic">
                  "Quality Tester Solutions helped us reduce testing costs while improving accuracy. Highly recommend their products!"
                </blockquote>
                <p className="text-sm font-semibold text-stone-500 tracking-widest uppercase">— Subash</p>

                <div className="h-px w-full bg-stone-100 my-8"></div>

                <div className="text-amber-500 text-2xl mb-4">★★★★★</div>
                <blockquote className="text-lg leading-8 text-slate-900 mb-6 font-luxury italic">
                  "Their automated tensile testers are reliable and affordable, making our testing processes much more efficient. Thank you!"
                </blockquote>
                <p className="text-sm font-semibold text-stone-500 tracking-widest uppercase">— Mark Brooks</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-stone-300 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-luxury text-xl text-white mb-6">Quality Tester Solutions LLC</h3>
            <p className="text-sm text-stone-400 font-light mb-4">Affordable testing solutions for accurate results.</p>
            <p className="text-sm text-stone-400 font-light">(727) 754-0019</p>
            <p className="text-sm text-stone-400 font-light">info@qualitytesters.shop</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shop Adhesion Testers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-sm font-light text-stone-500">
          <p>© 2025 Quality Tester Solutions LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
