import React from 'react';
import { Truck, ShieldAlert, PackageCheck } from 'lucide-react';

const ShippingPolicy = () => {
    return (
        <main className="min-h-screen bg-stone-50 py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-stone-200/50 border border-stone-200 rounded-full px-4 py-1 mb-6">
                        <Truck size={16} className="text-stone-500" />
                        <span className="text-sm font-medium text-stone-600 uppercase tracking-wide">Logistics</span>
                    </div>
                    <h1 className="text-4xl font-luxury font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                        Shipping & Fulfillment Policy
                    </h1>
                    <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
                        Transparent pricing, reliable delivery, and strict adherence to domestic distribution standards.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                    <div className="p-8 md:p-12 prose prose-slate max-w-none">

                        <div className="flex items-start mb-10">
                            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl mr-6">
                                <PackageCheck size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-2 mt-0">Free FedEx Ground Shipping Included</h3>
                                <p className="text-slate-600 font-light leading-relaxed mb-0">
                                    To simplify procurement for contractors and inspectors, <strong>all product prices listed on Quality Tester Solutions include standard FedEx Ground shipping.</strong> There are no hidden fees or unexpected freight charges added at checkout. The price you see is the final price delivered to your job site or office.
                                </p>
                            </div>
                        </div>

                        <hr className="border-stone-100 my-10" />

                        <div className="flex items-start mb-10">
                            <div className="bg-rose-50 text-rose-600 p-3 rounded-xl mr-6">
                                <ShieldAlert size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-2 mt-0">United States Domestic Shipping Only</h3>
                                <p className="text-slate-600 font-light leading-relaxed mb-0">
                                    At this time, Quality Tester Solutions <strong>only fulfills and ships orders to addresses within the 50 United States.</strong> We do not offer international shipping, nor do we ship to U.S. Territories, APO/FPO addresses, or international freight forwarders. Any orders placed with international billing or shipping addresses will be automatically canceled and refunded.
                                </p>
                            </div>
                        </div>

                        <hr className="border-stone-100 my-10" />

                        <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4 mt-0">Order Processing & Dispatch</h3>
                        <p className="text-slate-600 font-light leading-relaxed mb-6">
                            Most in-stock testing equipment, including our standard Air Barrier Adhesion Test Kits and SP1 Series Digital Testers, usually ship within <strong>two (2) business days</strong> of order confirmation. Custom fixtures or specialized grips will require additional engineering and fabrication time, which will be communicated directly during the quoting process.
                        </p>

                        <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4 mt-0">Tracking & Delivery</h3>
                        <p className="text-slate-600 font-light leading-relaxed">
                            Once your equipment is calibrated, securely packed in its protective case, and dispatched via FedEx, you will receive an automated shipping confirmation email containing your tracking number. Given the high value of precision calibration equipment, a signature may be required upon delivery.
                        </p>

                    </div>

                    <div className="bg-slate-900 p-8 text-center text-white">
                        <h4 className="text-xl font-luxury font-bold mb-2">Questions about a specific shipment?</h4>
                        <p className="text-stone-300 font-light mb-6">Our logistics team is available to assist you Monday through Friday.</p>
                        <a href="mailto:info@qualitytesters.shop" className="inline-flex items-center text-slate-900 bg-white px-6 py-3 rounded-md font-bold hover:bg-stone-200 transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShippingPolicy;
