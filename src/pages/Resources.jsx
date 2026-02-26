import React from 'react';
import { BookOpen, FileText, CheckCircle } from 'lucide-react';

const Resources = () => {
    return (
        <main className="min-h-screen bg-stone-50 py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-stone-200/50 border border-stone-200 rounded-full px-4 py-1 mb-6">
                        <BookOpen size={16} className="text-stone-500" />
                        <span className="text-sm font-medium text-stone-600 uppercase tracking-wide">Knowledge Base</span>
                    </div>
                    <h1 className="text-4xl font-luxury font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                        Technical Resources
                    </h1>
                    <p className="text-lg text-slate-600 font-light">
                        Comprehensive guides, standards documentation, and best practices for precision adhesion testing.
                    </p>
                </div>

                <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100 prose prose-slate max-w-none">
                    <h2 className="text-3xl font-luxury font-bold text-slate-900 mb-2">Adhesion Testing for Air Barriers: Ensuring Building Envelope Integrity</h2>
                    <div className="flex items-center text-sm text-stone-400 mb-8 pb-8 border-b border-stone-100">
                        <FileText size={16} className="mr-2" />
                        <span>Published Guide</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Introduction to Air Barriers and Adhesion Testing</h3>
                    <p className="mb-6 font-light leading-relaxed text-slate-700">
                        The performance of modern buildings is increasingly scrutinized for energy efficiency, durability, and the health and comfort of occupants. A critical component in achieving these goals is the effective management of airflow through the building envelope. Air barriers play a vital role in controlling this air leakage, which can lead to significant energy loss as conditioned air escapes and unconditioned air infiltrates. Beyond energy consumption, uncontrolled airflow can also drive moisture into wall and roof assemblies, potentially causing condensation, mold growth, and the deterioration of building materials.
                    </p>
                    <p className="mb-6 font-light leading-relaxed text-slate-700">
                        Adhesion testing is an essential procedure to verify that the air barrier material is properly bonded to the substrate. This ensures the intended continuity of the air barrier is maintained and its capacity to withstand air pressure differences is not compromised. Without adequate adhesion, even an air barrier material with excellent inherent properties can fail prematurely.
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Fundamentals of Adhesion Testing</h3>
                    <p className="mb-6 font-light leading-relaxed text-slate-700">
                        Adhesion, in the context of air barriers, specifically refers to the measure of pull-off strength, or the amount of perpendicular tensile force required to detach the air barrier material from its substrate. The Air Barrier Association of America (ABAA) has established a minimum pull-off value of 16 pounds per square inch (psi) for fluid-applied and other non-mechanically fastened air and water resistive barrier materials.
                    </p>

                    <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 my-8">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center"><CheckCircle size={20} className="mr-2 text-stone-500" /> Key Standards</h4>
                        <ul className="space-y-3 font-light text-slate-700">
                            <li><strong>ASTM D4541:</strong> Standard Test Method for Pull-Off Strength of Coatings Using Portable Adhesion Testers.</li>
                            <li><strong>ABAA T0002:</strong> Standard Test Method for Pull-Off Strength of Adhered Air and Water Resistive Barriers. Requires testing until failure, scoring around the test disc, and a load rate of one revolution per ten seconds.</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Step-by-Step Guide to Procedures</h3>
                    <p className="mb-6 font-light leading-relaxed text-slate-700">
                        Performing adhesion testing requires careful adherence to established procedures:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4 font-light text-slate-700 mb-8">
                        <li><strong>Surface Preparation:</strong> Ensure the surface is clean, dry, and free from contaminants.</li>
                        <li><strong>Dolly Attachment:</strong> Select a 2.25-inch diameter dolly (for ABAA T0002) and apply suitable epoxy. Remove excess adhesive.</li>
                        <li><strong>Curing:</strong> Allow the adhesive to fully cure per manufacturer specifications.</li>
                        <li><strong>Testing:</strong> Cut around the perimeter of the dolly to the substrate. Attach the tester, support its weight, and apply smooth, continuous pulling force until separation occurs.</li>
                        <li><strong>Failure Analysis:</strong> Determine whether the failure was adhesive, cohesive, or a substrate failure.</li>
                    </ol>

                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Advantages of Digital Adhesion Testers</h3>
                    <p className="mb-6 font-light leading-relaxed text-slate-700">
                        Digital gauges commonly provide a higher level of accuracy and precision compared to their analog counterparts (0.5% full-scale vs 2%). The numerical readings displayed are clear, concise, and eliminate parallax errors from the inspector's eyesight. Built-in logging allows users to store and recall test results directly on the device, streamlining ABAA audit reporting.
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Conclusion</h3>
                    <p className="mb-6 font-light leading-relaxed text-slate-700">
                        Adhesion testing is a fundamental aspect of quality assurance for air barrier systems, ensuring their continuous and effective performance in controlling air leakage and protecting the building envelope. By embracing standardized testing methods and leveraging the benefits of digital technology, construction professionals can effectively verify the adhesion of air barriers.
                    </p>
                </article>
            </div>
        </main>
    );
};

export default Resources;
