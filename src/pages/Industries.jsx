import React from 'react';
import { Building2, Factory, Plane, HardHat, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Industries = () => {
    const industries = [
        {
            title: 'Building Envelope & Air Barriers',
            icon: <Building2 size={32} className="text-stone-500" />,
            description: 'Ensure ABAA T0002 compliance with rugged adhesion testers designed specifically for verifying fluid-applied and self-adhered membranes on construction sites.',
            features: ['Moisture Resistance', 'Digital Logging for Audits', 'Portability']
        },
        {
            title: 'Manufacturing & Coatings',
            icon: <Factory size={32} className="text-stone-500" />,
            description: 'Verify the bond strength of industrial coatings, epoxies, and paints on metal, concrete, and composite substrates following ASTM D4541 protocols.',
            features: ['High-Precision Sensors', 'Rapid Turnaround', 'Automated Pulls']
        },
        {
            title: 'Aerospace & Automotive',
            icon: <Plane size={32} className="text-stone-500" />,
            description: 'Guarantee the structural integrity of specialized painted surfaces and bonded materials in environments where failure is not an option.',
            features: ['Calibration Certification', 'Micro-Dolly Capability', 'Secure Data Export']
        },
        {
            title: 'Infrastructure & Concrete',
            icon: <HardHat size={32} className="text-stone-500" />,
            description: 'Test the tensile strength of concrete overlays, asphalt bonds, and bridge deck coatings to verify long-term infrastructure durability.',
            features: ['High Capacity Ranges', 'Thick Substrate Compatible', 'Weatherproof Design']
        }
    ];

    return (
        <main className="min-h-screen bg-white py-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="mt-2 text-4xl font-luxury font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                        Industries We Serve
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                        Our precision force and adhesion testers are engineered to meet the stringent demands of diverse inspection and quality assurance environments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {industries.map((industry, idx) => (
                        <div key={idx} className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-md transition-shadow">
                            <div className="bg-white w-16 h-16 rounded-xl shadow-sm flex items-center justify-center mb-6 border border-stone-100">
                                {industry.icon}
                            </div>
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-4">{industry.title}</h3>
                            <p className="text-slate-600 font-light mb-6 leading-relaxed">
                                {industry.description}
                            </p>
                            <ul className="space-y-2 mb-8 border-t border-stone-200 pt-6">
                                {industry.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-center text-sm text-slate-500 font-medium tracking-wide">
                                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-3"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/shop" className="inline-flex items-center text-slate-900 font-bold hover:text-stone-500 transition-colors">
                                View Equipment <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-900 rounded-2xl p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/hero-background.jpg')] opacity-10 mix-blend-overlay object-cover w-full h-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-luxury font-bold mb-4">Need Custom Testing Architecture?</h2>
                        <p className="text-stone-300 mb-8 max-w-2xl mx-auto font-light">
                            We regularly engineer specialty fixtures, custom grip plates, and modified load cells for unique industrial applications.
                        </p>
                        <a href="mailto:info@qualitytesters.shop" className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-md font-bold hover:bg-stone-100 transition-colors">
                            Request a Consultation
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Industries;
