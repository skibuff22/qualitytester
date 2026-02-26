import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="w-full bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                            <img src="/images/icon.png" alt="Quality Tester Solutions Icon" className="h-10 w-auto" />
                            <span className="font-luxury text-2xl font-bold tracking-tight text-slate-900">
                                Quality Tester Solutions
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-10 font-medium text-slate-600">
                            <Link to="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
                            <a href="#" className="hover:text-slate-900 transition-colors">Industries</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Resources</a>
                            <a href="tel:727-754-0019" className="font-semibold text-slate-900 hover:text-slate-600 transition-colors">Call 727-754-0019</a>
                        </div>

                        <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
                    <div className="flex flex-col space-y-8 text-2xl font-luxury font-bold">
                        <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <a href="#" onClick={() => setIsMenuOpen(false)}>Industries</a>
                        <a href="#" onClick={() => setIsMenuOpen(false)}>Resources</a>
                        <a href="tel:727-754-0019" className="text-xl" onClick={() => setIsMenuOpen(false)}>Call 727-754-0019</a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
