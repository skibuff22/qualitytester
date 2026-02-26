import React from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
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
                            <li><Link to="/shop" className="hover:text-white transition-colors flex items-center"><ArrowRight size={14} className="mr-2 opacity-50" /> Shop</Link></li>
                            <li><Link to="/shipping" className="hover:text-white transition-colors flex items-center"><ArrowRight size={14} className="mr-2 opacity-50" /> Shipping Policy</Link></li>
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
    );
};

export default Footer;
