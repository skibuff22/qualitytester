import React from 'react';
import { Building2, Zap, Anchor, Plane, Factory, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Industries = () => {
    const industries = [
        {
            title: 'Construction & Infrastructure',
            icon: <Building2 size={32} className="text-stone-500" />,
            items: [
                { name: 'Bridge Maintenance', desc: 'Testing the adhesion of plasma spray and protective coatings on steel and concrete bridge decks.' },
                { name: 'Concrete Repair & Overlays', desc: 'Verifying the bond strength of new concrete overlays, screeds, or repair mortars to an existing substrate (ASTM C1583).' },
                { name: 'Air and Vapor Barriers', desc: 'Testing the "pull-off" strength of air barrier membranes on building sheathing to ensure long-term energy efficiency and moisture control.' },
                { name: 'Roofing Systems', desc: 'Checking the bonding strength of specialized roofing membranes and spray-applied polyurethane foam (SPF).' }
            ]
        },
        {
            title: 'Oil, Gas, & Energy',
            icon: <Zap size={32} className="text-stone-500" />,
            items: [
                { name: 'Pipeline Coatings', desc: 'Ensuring that anti-corrosion coatings (like fusion-bonded epoxy) can withstand the high-pressure and corrosive environments of buried or underwater pipelines.' },
                { name: 'Offshore Platforms', desc: 'Testing heavy-duty protective coatings on steel structures exposed to saltwater spray and extreme weather.' },
                { name: 'Nuclear Power', desc: 'Inspecting specialized coatings used in containment areas where bond integrity is critical for safety and decontamination protocols.' },
                { name: 'Wind Energy', desc: 'Testing the adhesion of protective layers on wind turbine blades to prevent delamination from high-speed debris and weather erosion.' }
            ]
        },
        {
            title: 'Marine & Shipbuilding',
            icon: <Anchor size={32} className="text-stone-500" />,
            items: [
                { name: 'Hull Coatings', desc: 'Verifying the bond of anti-fouling and protective paints on ship hulls, particularly below the waterline.' },
                { name: 'Yacht Manufacturing', desc: 'Testing structural adhesives used in deck-to-hull connections and other high-stress bonding areas in composite (GRP) or aluminum vessels.' },
                { name: 'Naval Applications', desc: 'Ensuring military-grade coatings can survive the vibration and impact loads of combat or high-speed operations.' }
            ]
        },
        {
            title: 'Aerospace & Defense',
            icon: <Plane size={32} className="text-stone-500" />,
            items: [
                { name: 'Specialized Thermal Coatings', desc: 'Testing plasma-sprayed ceramic or metallic coatings used on engine components and heat shields.' },
                { name: 'Military Aircraft', desc: 'Verifying the adhesion of radar-absorbent materials (RAM) and other high-performance stealth coatings.' },
                { name: 'Structural Composites', desc: 'Assessing the bond between layers of carbon fiber or other advanced materials in airframes.' }
            ]
        },
        {
            title: 'Industrial Manufacturing & Finishing',
            icon: <Factory size={32} className="text-stone-500" />,
            items: [
                { name: 'Industrial Flooring', desc: 'Testing epoxy resin coatings and heavy-duty floor screeds in warehouses and chemical plants where high forklift traffic occurs.' },
                { name: 'Automotive Production', desc: 'Checking the bond of structural adhesives and sealants used in vehicle frames and battery housings for EVs.' },
                { name: 'Heavy Equipment', desc: 'Ensuring the durability of powder coatings and industrial finishes on tractors, cranes, and mining machinery.' }
            ]
        },
        {
            title: 'Specialized Packaging & Materials',
            icon: <Package size={32} className="text-stone-500" />,
            items: [
                { name: 'High-Strength Laminates', desc: 'Testing the peel and bond strength of industrial-grade laminates, foils, and heavy-duty adhesive tapes.' },
                { name: 'Protective Linings', desc: 'Verifying the integrity of tank linings used to store hazardous chemicals or potable water.' }
            ]
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {industries.map((industry, idx) => (
                        <div key={idx} className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-md transition-shadow flex flex-col">
                            <div className="bg-white w-16 h-16 rounded-xl shadow-sm flex items-center justify-center mb-6 border border-stone-100 shrink-0">
                                {industry.icon}
                            </div>
                            <h3 className="text-2xl font-luxury font-bold text-slate-900 mb-6">{industry.title}</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {industry.items.map((item, i) => (
                                    <li key={i} className="text-sm font-light text-slate-600 leading-relaxed border-l-2 border-stone-200 pl-4">
                                        <strong className="font-semibold text-slate-800 tracking-wide block mb-1">{item.name}</strong>
                                        {item.desc}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto border-t border-stone-200 pt-6">
                                <Link to="/shop" className="inline-flex items-center text-slate-900 font-bold hover:text-stone-500 transition-colors">
                                    View Equipment <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
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
