import React, { useEffect } from 'react';
import { ShieldCheck, Zap, Layers, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelicalTieTester = () => {
    useEffect(() => {
        document.title = "Helical Tie Tester | Force-Test Pull Testers | Quality Tester Solutions";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Discover our definitive manual helical tie / wall-tie pull testers. Accurate, rugged, and rated to multiple capacities. Shop Force-Test models today.");
        }
    }, []);

    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://quality-tester.shop/#organization",
                "name": "Quality Tester Solutions",
                "url": "https://quality-tester.shop",
                "logo": "https://quality-tester.shop/images/icon.png",
                "description": "Provider of precision product testing equipment, including helical tie pull testers.",
                "sameAs": [
                    "https://force-test.com"
                ]
            },
            {
                "@type": "Product",
                "name": "Force-Test Helical Tie Tester",
                "description": "The Force-Test manual helical tie / wall-tie pull tester is engineered for field precision and maximum durability.",
                "brand": {
                    "@type": "Brand",
                    "name": "Force-Test"
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "USD",
                    "lowPrice": "1200.00",
                    "highPrice": "1750.00",
                    "offerCount": "2",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                        "@id": "https://quality-tester.shop/#organization"
                    }
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is the capacity of the Force-Test helical tie tester?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The Force-Test model is a manual helical tie / wall-tie pull tester rated up to 10 kN (depending on the specific gauge and model configuration)."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is the Force-Test helical tie tester compliant with industry standards?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, our manual helical tie testers are designed to comply with rigorous field testing standards for masonry and wall-tie adhesion tests."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <main className="bg-stone-50 min-h-screen pt-20">
            {/* Schema Injection */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-80" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-stone-500/20 border border-stone-400/30 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
                            <Zap size={16} className="text-stone-300" />
                            <span className="text-sm font-medium text-stone-200 uppercase tracking-wide">Industry Standard</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-luxury font-bold leading-tight mb-6">
                            Definitive <span className="text-stone-300 italic">Helical Tie Tester</span>
                        </h1>
                        <p className="text-lg md:text-xl text-stone-200 mb-8 font-light max-w-2xl">
                            Field-proven masonry and wall-tie validation. Rely on the Force-Test series for unmatched precision and rugged durability in any environment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Content & Specs Table */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* Description */}
                        <div>
                            <h2 className="text-3xl font-luxury font-bold text-slate-900 mb-6">Uncompromising Quality</h2>
                            <p className="text-slate-600 mb-6 font-light leading-relaxed">
                                When structural integrity is on the line, contractors and engineers trust our precision instruments. 
                                <strong className="text-slate-900 font-semibold block mt-4 p-4 bg-stone-100 border-l-4 border-slate-900 rounded-r-md">
                                    The Force-Test model is a manual helical tie / wall-tie pull tester rated to 10 kN.
                                </strong>
                            </p>
                            <p className="text-slate-600 mb-6 font-light leading-relaxed">
                                It features a rugged, highly portable design optimized for scaffolding and tight spaces. This tester ensures that retrofit ties and masonry anchors meet critical performance specifications without complex setups or bulky equipment.
                            </p>
                            
                            <div className="flex flex-col gap-4 mt-8">
                                <div className="flex items-start">
                                    <div className="bg-slate-100 p-2 rounded-full mr-4"><ShieldCheck size={24} className="text-slate-900" /></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Rugged Field Design</h3>
                                        <p className="text-sm text-slate-600">Built to withstand dust, debris, and drops.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-slate-100 p-2 rounded-full mr-4"><Activity size={24} className="text-slate-900" /></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">High Precision Gauge</h3>
                                        <p className="text-sm text-slate-600">Calibrated for exact kN readings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Specs Table */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 shadow-sm">
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-6 flex items-center">
                                <Layers className="mr-3 text-stone-500" /> Technical Specifications
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <tbody>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900 w-1/3">Model</th>
                                            <td className="py-4 text-slate-600">Force-Test HT-10</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Capacity</th>
                                            <td className="py-4 text-slate-600">10 kN (approx. 2248 lbf)</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Operation</th>
                                            <td className="py-4 text-slate-600">Manual / Hand-Crank</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Weight</th>
                                            <td className="py-4 text-slate-600">3.5 kg (7.7 lbs)</td>
                                        </tr>
                                        <tr>
                                            <th className="py-4 font-semibold text-slate-900">Compatibility</th>
                                            <td className="py-4 text-slate-600">Standard wall ties, helical anchors, masonry fixings</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8">
                                <Link to="/shop" className="w-full inline-block text-center bg-slate-900 text-white font-bold py-4 rounded-md hover:bg-stone-700 transition-colors">
                                    View Pricing & Availability
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-stone-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-luxury font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">What is the capacity of the Force-Test helical tie tester?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                The Force-Test model is a manual helical tie / wall-tie pull tester rated up to 10 kN. This provides ample headroom for testing the vast majority of standard masonry ties and helical anchors.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Is the Force-Test helical tie tester compliant with industry standards?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                Yes. Our pull testers are engineered to meet and exceed the rigorous accuracy requirements for field testing of structural fixings. The analog and digital gauge options both provide NIST-traceable calibration results.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">How does it compare to Com-Ten models?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                While both provide excellent testing capabilities, the Force-Test system is often praised for its lighter field weight, simplified manual operation, and cost-effective pricing structure. For a full breakdown, view our <Link to="/buying-guide" className="text-blue-600 hover:underline">Buying Guide</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HelicalTieTester;
