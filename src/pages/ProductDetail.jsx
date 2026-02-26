import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Star, ShieldCheck, Truck, ArrowLeft, ArrowRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(product ? `${product.imageBase}.jpg` : '');
  const [activeWebp, setActiveWebp] = useState(product ? `${product.imageBase}.webp` : '');
  const [activeSmWebp, setActiveSmWebp] = useState(product ? `${product.imageBase}-sm.webp` : '');
  const [activeSmJpg, setActiveSmJpg] = useState(product ? `${product.imageBase}-sm.jpg` : '');

  // Reset active image when product changes
  React.useEffect(() => {
    if (product) {
      setActiveImage(`${product.imageBase}.jpg`);
      setActiveWebp(`${product.imageBase}.webp`);
      setActiveSmWebp(`${product.imageBase}-sm.webp`);
      setActiveSmJpg(`${product.imageBase}-sm.jpg`);
    }
  }, [product]);

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
                <source srcSet={activeSmWebp} media="(max-width: 768px)" type="image/webp" />
                <source srcSet={activeSmJpg} media="(max-width: 768px)" type="image/jpeg" />
                <source srcSet={activeWebp} type="image/webp" />
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[500px] transition-opacity duration-300"
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Thumbnails (for visual flair) */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              <div
                className={`w-20 h-20 bg-stone-50 rounded-lg border-2 ${activeImage.includes(product.imageBase) && !activeImage.includes('-sm') && !activeImage.includes('gallery') ? 'border-slate-900 border-2' : 'border-stone-200'} flex items-center justify-center p-2 cursor-pointer hover:border-slate-900 transition-colors`}
                onClick={() => {
                  setActiveImage(`${product.imageBase}.jpg`);
                  setActiveWebp(`${product.imageBase}.webp`);
                  setActiveSmWebp(`${product.imageBase}-sm.webp`);
                  setActiveSmJpg(`${product.imageBase}-sm.jpg`);
                }}
              >
                <img src={`${product.imageBase}-sm.jpg`} alt={`${product.name} Main View`} className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {product.imageGallery && product.imageGallery.map((imgSrc, idx) => {
                const isWebp = imgSrc.endsWith('.webp');
                const jpgSrc = isWebp ? imgSrc.replace('.webp', '.jpg') : imgSrc;
                const largeWebp = imgSrc.replace('-sm.', '.');
                const largeJpg = jpgSrc.replace('-sm.', '.');
                const isActive = activeImage === largeJpg;

                return (
                  <div
                    key={idx}
                    className={`w-20 h-20 bg-stone-50 rounded-lg border-2 ${isActive ? 'border-slate-900 border-2' : 'border-stone-200'} flex items-center justify-center p-2 cursor-pointer hover:border-slate-900 transition-colors bg-white`}
                    onClick={() => {
                      setActiveImage(largeJpg);
                      setActiveWebp(largeWebp);
                      setActiveSmWebp(imgSrc);
                      setActiveSmJpg(jpgSrc);
                    }}
                  >
                    <img src={jpgSrc} alt={`${product.name} Component ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                );
              })}
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
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-100">
                <div className="flex items-center font-medium"><ShieldCheck size={20} className="mr-3 text-emerald-600" /> 256-bit Secure Checkout</div>
                <div className="flex items-center font-medium"><Truck size={20} className="mr-3 text-slate-900" /> Free FedEx Ground Shipping Included (US Domestic Only)</div>
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
