import React from 'react';
import { Settings, CheckCircle, Truck, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Process = () => {
    return (
        <main className="min-h-screen bg-stone-50 pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-slate-200/50 border border-slate-200 rounded-full px-4 py-1 mb-6">
                        <Settings size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Methodology</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-luxury font-bold tracking-tight text-slate-900 mb-6">
                        Our Calibration &amp; Delivery Process
                    </h1>
                    <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                        Every instrument we ship undergoes a rigorous multi-stage validation process to ensure your field tests are fully compliant and accurate.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-9xl font-luxury font-bold text-stone-50 opacity-50 pointer-events-none select-none">
                            01
                        </div>
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg relative z-10">
                            <Settings size={32} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4">Initial Consultation & Configuration</h3>
                            <p className="text-slate-600 font-light leading-relaxed mb-4">
                                We work directly with inspectors and contractors to identify the specific ASTM, ABAA, or custom testing standard required for your project. Whether you need a 1,000 LBS or 2,000 LBS capacity unit, or specialized fabric clamps, we ensure the core instrument matches your spec.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-9xl font-luxury font-bold text-stone-50 opacity-50 pointer-events-none select-none">
                            02
                        </div>
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg relative z-10">
                            <CheckCircle size={32} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4">Precision Calibration</h3>
                            <p className="text-slate-600 font-light leading-relaxed mb-4">
                                Every digital and analog load cell is individually calibrated on our certified referencing benches. We dial in the accuracy to +/- 0.5% of full scale for digital units, ensuring your readings will stand up to the strictest engineering scrutinies.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-9xl font-luxury font-bold text-stone-50 opacity-50 pointer-events-none select-none">
                            03
                        </div>
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg relative z-10">
                            <FileCheck size={32} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4">Certification & Documentation</h3>
                            <p className="text-slate-600 font-light leading-relaxed mb-4">
                                We don't just send hardware; we provide proof of accuracy. A NIST traceable calibration certificate is generated and physically included with every applicable pull tester. This document is your shield against compliance disputes on the job site.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-9xl font-luxury font-bold text-stone-50 opacity-50 pointer-events-none select-none">
                            04
                        </div>
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg relative z-10">
                            <Truck size={32} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4">Secure Domestic Dispatch</h3>
                            <p className="text-slate-600 font-light leading-relaxed mb-4">
                                The certified equipment is packed into its protective air-tight transit case (for portable units) and shipped directly out of our Tampa, FL location. We utilize standard FedEx Ground directly to your office or job site anywhere in the 50 United States.
                            </p>
                            <Link to="/shipping" className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium transition-colors">
                                View Full Shipping Policy <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-slate-900 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-xl shadow-slate-900/20">
                        View Calibrated Equipment
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Process;
