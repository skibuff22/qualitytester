import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const Shop = () => {
    return (
        <main className="min-h-screen bg-stone-50 py-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="mt-2 text-4xl font-luxury font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                        Quality Tester Shop
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                        Secure checkout powered by Stripe. All products ship directly from our Tampa facility.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Product 1 */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group flex flex-col">
                        <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 relative overflow-hidden border border-stone-50">
                            <img src="/images/pull-tester.jpg" alt="Air Barrier Adhesion Test Kit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                            <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">In Stock</div>
                        </div>
                        <div className="px-4 pb-6 flex-grow flex flex-col">
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-2">Air Barrier Adhesion Test Kit</h3>
                            <p className="text-slate-600 text-sm mb-6 flex-grow font-light">Complete, field-ready kit for accurate air barrier adhesion testing. Includes everything needed for guaranteed precision and ABAA T0002 compliance.</p>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-2xl font-bold text-slate-900">$1,800.00</span>
                                <div className="flex text-stone-400">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                            </div>
                            <a href="https://buy.stripe.com/test_6oU00c4wp8qrbkj9cW4ZG00" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 hover:bg-stone-700 text-white h-14 rounded-md font-bold flex items-center justify-center transition-colors">
                                Buy Now (Stripe) <ArrowRight size={18} className="ml-2" />
                            </a>
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group flex flex-col">
                        <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden border border-stone-50">
                            <img src="/images/tensile-tester.jpg" alt="Manual Tensile Tester" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out" />
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
                            <a href="#" className="w-full bg-slate-900 hover:bg-stone-700 text-white h-14 rounded-md font-bold flex items-center justify-center transition-colors">
                                Buy Now (Stripe) <ArrowRight size={18} className="ml-2" />
                            </a>
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
                            <p className="text-slate-600 text-sm mb-6 flex-grow font-light">Durable fixtures to enable successful tests. High-impact design. Hundreds of configurations available. Contact us for custom orders.</p>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xl font-bold text-slate-900">Custom Pricing</span>
                            </div>
                            <a href="mailto:info@qualitytesters.shop" className="w-full bg-white border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 h-14 rounded-md font-bold flex items-center justify-center transition-colors">
                                Contact to Purchase <ArrowRight size={18} className="ml-2" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Shop;
