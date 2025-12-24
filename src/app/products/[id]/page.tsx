'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  console.log(id,'Params is uaidja8848');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - in a real app this would be fetched based on params.id
  const product = {
    id: id,
    name: 'Premium Wireless Noise-Cancelling Headphones',
    price: 299,
    oldPrice: 399,
    rating: 4.8,
    reviews: 324,
    description: 'Experience crystal clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for long listening sessions.',
    images: ['🎧', '🎵', '🔋', '🔌'],
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life',
      'Bluetooth 5.3',
      'Fast Charging via USB-C'
    ],
    sku: 'WH-1000XM5',
    category: 'Electronics'
  };

  const relatedProducts = [
    { id: 2, name: 'Smart Watch Series 9', price: 449, oldPrice: 599, rating: 4.9, reviews: 521, badge: 'New', image: '⌚' },
    { id: 3, name: 'Designer Leather Backpack', price: 129, oldPrice: 189, rating: 4.7, reviews: 189, badge: 'Hot', image: '🎒' },
    { id: 4, name: 'Ultra Running Shoes', price: 159, oldPrice: 229, rating: 4.6, reviews: 412, badge: 'Sale', image: '👟' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-blue-600">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-9xl overflow-hidden">
                {product.images[selectedImage]}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-50 rounded-lg flex items-center justify-center text-2xl border-2 transition ${
                      selectedImage === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-xl text-gray-500 line-through mb-1">${product.oldPrice}</span>
                  <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded mb-2">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="border-t border-b py-6 mb-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Quantity</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-50 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium border-x border-gray-300 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-50 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>🚚</span> Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span> 1 Year Warranty
                </div>
                <div className="flex items-center gap-2">
                  <span>↩️</span> 30 Days Return
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span> Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-12">
          <div className="border-b">
            <div className="flex gap-8 px-8">
              {['description', 'reviews', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-medium capitalize border-b-2 transition ${
                    activeTab === tab 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                <h4 className="font-bold mb-3">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <div className="text-gray-500 text-center py-8">No reviews yet.</div>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
