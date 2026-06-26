import React, { useEffect } from 'react';
import { ShieldCheck, Zap, Layers, Activity, BatteryCharging, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManualTensileTester = () => {
    useEffect(() => {
        document.title = "Manual Tensile Tester | Hand-Operated SP1 | Quality Tester Solutions";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "The SP1 hand-operated mechanical tensile tester: accurate, portable, and a fraction of a $30,000 machine. No electricity, $100 same-day calibration, 100–2,000 lbf.");
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
                "description": "Provider of precision product testing equipment, including manual tensile testers and pull testers.",
                "sameAs": [
                    "https://force-test.com"
                ]
            },
            {
                "@type": "Product",
                "name": "SP1 Hand-Operated Manual Tensile Tester",
                "description": "A hand-operated mechanical tensile tester for field and lab tensile-strength, elongation, weld, seam, crimp, bond, wire-terminal, and fastener pull testing. Available in analog (±3%) and digital (±0.5%) gauges, with capacities from 100 to 2,000 lbf. Requires no electricity and includes a calibration certificate.",
                "brand": {
                    "@type": "Brand",
                    "name": "Force-Test"
                },
                "material": "Anodized aluminum, stainless steel",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "USD",
                    "price": "1200.00",
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
                        "name": "What is a manual tensile tester?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A manual tensile tester is a hand-operated device that applies a controlled pulling force to a sample using a crank and ACME lead screw instead of a motor. A gauge measures the peak force, giving accurate, repeatable tensile and pull-test results without electricity."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What can you test with the SP1 manual tensile tester?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The SP1 measures tensile strength and elongation, and verifies weld, seam, crimp, bond, wire-terminal, and fastener pull strength across plastics, textiles, rubber, metals, composites, and finished hardware — up to 2,000 lbf with the right grips and fixtures."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Does the SP1 tensile tester need electricity?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No. The SP1 is fully hand-operated, so it works on a job site, on a roof, or in a lab with no power or air supply required."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How accurate is it, and how much is calibration?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The digital gauge is accurate to ±0.5% of full scale and the analog gauge to ±3%. Every unit ships with a calibration certificate and a one-year warranty, and recalibration plus a full rebuild is a flat $100 with same-day turnaround."
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
                            <span className="text-sm font-medium text-stone-200 uppercase tracking-wide">Field & Lab Ready</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-luxury font-bold leading-tight mb-6">
                            The <span className="text-stone-300 italic">Manual Tensile Tester</span> that costs $1,200 — not $30,000
                        </h1>
                        <p className="text-lg md:text-xl text-stone-200 mb-8 font-light max-w-2xl">
                            The hand-operated SP1 delivers accurate, repeatable tensile results with no electricity and $100 same-day calibration. Real testing power without the five-figure machine.
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
                            <h2 className="text-3xl font-luxury font-bold text-slate-900 mb-6">Accuracy Without the Overhead</h2>
                            <p className="text-slate-600 mb-6 font-light leading-relaxed">
                                Not everyone can budget $30,000 for a motorized tensile machine — but you still need to know how your products and materials perform.
                                <strong className="text-slate-900 font-semibold block mt-4 p-4 bg-stone-100 border-l-4 border-slate-900 rounded-r-md">
                                    The SP1 is a hand-operated mechanical tensile tester accurate to ±0.5% (digital), from $1,200.
                                </strong>
                            </p>
                            <p className="text-slate-600 mb-6 font-light leading-relaxed">
                                Compact, lightweight, and built from anodized aluminum and stainless steel, it goes wherever the work is. Long-life ACME lead screws turn with less force and need little maintenance, and our $100 flat-rate rebuild and recalibration means the savings on annual calibration can pay for the tester in a few years.
                            </p>

                            <div className="flex flex-col gap-4 mt-8">
                                <div className="flex items-start">
                                    <div className="bg-slate-100 p-2 rounded-full mr-4"><BatteryCharging size={24} className="text-slate-900" /></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">No Electricity Required</h3>
                                        <p className="text-sm text-slate-600">Fully hand-operated for job site, roof, or bench.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-slate-100 p-2 rounded-full mr-4"><Activity size={24} className="text-slate-900" /></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">±0.5% Digital Accuracy</h3>
                                        <p className="text-sm text-slate-600">Repeatable results with a calibration certificate.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-slate-100 p-2 rounded-full mr-4"><DollarSign size={24} className="text-slate-900" /></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">$100 Same-Day Calibration</h3>
                                        <p className="text-sm text-slate-600">Ship the load cell; it goes back same or next business day.</p>
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
                                            <td className="py-4 text-slate-600">Force-Test SP1 Series</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Capacities</th>
                                            <td className="py-4 text-slate-600">100, 300, 600, 1,000, 1,500, 2,000 lbf</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Accuracy</th>
                                            <td className="py-4 text-slate-600">±0.5% (digital) / ±3% (analog)</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Operation</th>
                                            <td className="py-4 text-slate-600">Manual hand-crank, ACME lead screw — no electricity</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Travel</th>
                                            <td className="py-4 text-slate-600">5-1/2" to 5-3/4" (longer available)</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Construction</th>
                                            <td className="py-4 text-slate-600">Anodized aluminum, stainless hardware & gauge guard</td>
                                        </tr>
                                        <tr className="border-b border-stone-200">
                                            <th className="py-4 font-semibold text-slate-900">Grip Interface</th>
                                            <td className="py-4 text-slate-600">Male 5/16"-18 (grips & fixtures sold separately)</td>
                                        </tr>
                                        <tr>
                                            <th className="py-4 font-semibold text-slate-900">Warranty</th>
                                            <td className="py-4 text-slate-600">1 year, mechanical defects · calibration certificate included</td>
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

            {/* What It Tests */}
            <section className="py-20 bg-white border-t border-stone-100">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-3xl font-luxury font-bold text-slate-900 mb-10 text-center">What It's Used For</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                            <ShieldCheck size={24} className="text-slate-900 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">Tensile Strength & Elongation</h3>
                            <p className="text-sm text-slate-600 font-light">Pull-to-failure and pull-to-spec testing of materials and finished parts.</p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                            <ShieldCheck size={24} className="text-slate-900 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">Weld, Seam, Crimp & Bond Strength</h3>
                            <p className="text-sm text-slate-600 font-light">Verify that joints and bonds hold to specification.</p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                            <ShieldCheck size={24} className="text-slate-900 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">Wire-Terminal & Connector Pull</h3>
                            <p className="text-sm text-slate-600 font-light">Confirm crimp and termination integrity on assemblies.</p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                            <ShieldCheck size={24} className="text-slate-900 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">Fastener & Component Pull Strength</h3>
                            <p className="text-sm text-slate-600 font-light">Spot-check hardware and fasteners up to 2,000 lbf.</p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                            <ShieldCheck size={24} className="text-slate-900 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">QA & Incoming Inspection</h3>
                            <p className="text-sm text-slate-600 font-light">Repeatable acceptance testing on the line or at receiving.</p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                            <ShieldCheck size={24} className="text-slate-900 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">R&D Spot-Checks</h3>
                            <p className="text-sm text-slate-600 font-light">Plastics, textiles, rubber, metals, and composites.</p>
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
                            <h3 className="text-xl font-bold text-slate-900 mb-3">What is a manual tensile tester?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                A hand-operated device that applies a controlled pulling force through a crank and ACME lead screw instead of a motor. A gauge captures the peak force, giving accurate, repeatable tensile and pull-test results without electricity.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">What can you test with it?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                Tensile strength and elongation, plus weld, seam, crimp, bond, wire-terminal, and fastener pull strength across plastics, textiles, rubber, metals, composites, and finished hardware — up to 2,000 lbf with the right grips.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">How does it compare to a $30,000 motorized tester?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                For most pull-to-spec and QA work, the SP1 delivers the same ±0.5% digital accuracy at a fraction of the cost, weighs 12–14 lbs instead of 100+, needs no power, and recalibrates for a flat $100. For a full breakdown, view our <Link to="/buying-guide" className="text-blue-600 hover:underline">Buying Guide</Link>.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Does it need electricity, and is it calibrated?</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                No power required — it's fully hand-operated. Every unit ships with a calibration certificate and a one-year warranty, with $100 same-day recalibration available.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ManualTensileTester;
