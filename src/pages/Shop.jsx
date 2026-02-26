import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Shop = () => {
  return (
    <main className="min-h-screen bg-stone-50 py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="mt-2 text-4xl font-luxury font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            Direct Ordering
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Selected by experts, tested for durability. Order directly from the manufacturer to reduce costs while retaining laboratory-grade reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group flex flex-col relative">
              {product.ribbon && (
                <div className="absolute top-8 right-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider z-10">
                  {product.ribbon}
                </div>
              )}
              <div className="bg-stone-50 rounded-xl mb-6 p-8 flex items-center justify-center relative overflow-hidden group-hover:bg-stone-100 transition-colors h-64">
                <picture>
                  <source srcSet={`${product.imageBase}-sm.webp`} media="(max-width: 768px)" type="image/webp" />
                  <source srcSet={`${product.imageBase}-sm.jpg`} media="(max-width: 768px)" type="image/jpeg" />
                  <source srcSet={`${product.imageBase}.webp`} type="image/webp" />
                  <img 
                    src={`${product.imageBase}.jpg`} 
                    alt={`Photograph of ${product.name}, a precision testing instrument by Quality Tester Solutions`} 
                    className="object-contain w-full h-full max-h-48 group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </picture>
              </div>

              <div className="flex-grow flex flex-col">
                <h2 className="text-2xl font-luxury font-bold text-slate-900 mb-2 leading-tight pr-8">{product.name}</h2>
                <p className="text-stone-500 font-light text-sm mb-6 flex-grow">{product.description.substring(0, 110)}...</p>
                
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{product.price}</div>
                  </div>
                  <div className="flex text-stone-300">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>

                <Link to={`/product/${product.id}`} className="w-full bg-slate-900 hover:bg-stone-700 text-white h-14 rounded-md font-bold flex items-center justify-center transition-colors shadow-sm">
                  View Full Details <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-100 shadow-sm max-w-4xl mx-auto">
          <h2 className="text-2xl font-luxury font-bold text-slate-900 mb-4">Require a Custom Configuration?</h2>
          <p className="text-slate-600 mb-8 font-light">
            Our engineering team builds specialty fixtures, custom grip plates, and modified load cells for unique industrial applications.
          </p>
          <a href="mailto:info@qualitytesters.shop" className="inline-flex bg-white border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-md font-bold hover:bg-slate-900 hover:text-white transition-colors items-center justify-center">
            Contact Engineering Team
          </a>
        </div>
      </div>
    </main>
  );
};

export default Shop;
