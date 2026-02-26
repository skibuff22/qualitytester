import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Star, ShieldCheck, Truck, ArrowLeft, ArrowRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 py-32 text-center">
        <h1 className="text-3xl font-luxury font-bold text-slate-900 mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-stone-500 hover:text-slate-900 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-stone-50 border-b border-stone-100 py-4">
        <div className="container mx-auto px-6 max-w-7xl text-sm font-light text-slate-500 flex items-center">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Image Gallery Column */}
          <div className="lg:w-1/2">
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100 relative overflow-hidden flex items-center justify-center">
              {product.ribbon && (
                <div className="absolute top-6 right-6 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  {product.ribbon}
                </div>
              )}
              <picture>
                <source srcSet={`${product.imageBase}-sm.webp`} media="(max-width: 768px)" type="image/webp" />
                <source srcSet={`${product.imageBase}-sm.jpg`} media="(max-width: 768px)" type="image/jpeg" />
                <source srcSet={`${product.imageBase}.webp`} type="image/webp" />
                <img 
                  src={`${product.imageBase}.jpg`} 
                  alt={product.name} 
                  className="w-full h-auto object-contain max-h-[500px]" 
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Thumbnails (for visual flair) */}
            <div className="flex gap-4 mt-4">
              <div className="w-20 h-20 bg-stone-50 rounded-lg border-2 border-slate-900 flex items-center justify-center p-2 cursor-pointer">
                <img src={`${product.imageBase}-sm.jpg`} alt={`${product.name} Thumbnail 1`} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-2 flex items-center space-x-4">
              <div className="flex text-stone-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <span className="text-sm font-light text-slate-500">SKU: {product.id}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-luxury font-bold text-slate-900 mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-stone-500 font-light mb-8">{product.subtitle}</p>

            <div className="text-4xl font-bold text-slate-900 mb-8">{product.price}</div>

            {/* CTA */}
            <div className="mb-10 pb-10 border-b border-stone-100">
              {product.stripeLink ? (
                <a 
                  href={product.stripeLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full md:w-auto bg-slate-900 hover:bg-stone-700 text-white px-12 py-5 rounded-md font-bold text-lg inline-flex items-center justify-center transition-colors shadow-lg"
                >
                  Buy Now via Stripe <ArrowRight size={20} className="ml-3" />
                </a>
              ) : (
                <a 
                  href="mailto:info@qualitytesters.shop" 
                  className="w-full md:w-auto bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 px-12 py-5 rounded-md font-bold text-lg inline-flex items-center justify-center transition-colors"
                >
                  Contact to Order
                </a>
              )}
              <div className="flex items-center space-x-6 mt-6 text-sm text-stone-500">
                <div className="flex items-center"><ShieldCheck size={16} className="mr-2" /> 256-bit Secure Checkout</div>
                <div className="flex items-center"><Truck size={16} className="mr-2" /> Fast Shipping via Tampa</div>
              </div>
            </div>

            {/* Full Description */}
            <div className="prose prose-slate max-w-none">
              <h3 className="text-xl font-bold font-luxury text-slate-900 mb-4">Product Overview</h3>
              <div className="font-light text-slate-700 leading-relaxed space-y-4">
                {product.description.split('\n').map((line, idx) => {
                  if (line.startsWith('-')) {
                    return <li key={idx} className="ml-4">{line.substring(2)}</li>;
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>

              <h3 className="text-xl font-bold font-luxury text-slate-900 mt-10 mb-4">Technical Specifications</h3>
              <ul className="space-y-2 font-light text-slate-700 bg-stone-50 p-6 rounded-xl border border-stone-100">
                {product.additionalInfo.split(', ').map((spec, idx) => (
                  <li key={idx} className="flex border-b border-stone-200 last:border-0 pb-2 mb-2 last:pb-0 last:mb-0">
                    <span className="font-medium mr-2">{spec.split(': ')[0]}:</span> 
                    {spec.split(': ')[1]}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
