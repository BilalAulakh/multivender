'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import api from '../../helper/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Explore our wide range of premium products</p>
          </div>
          
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:border-blue-600 focus:outline-none">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              // Calculate pricing for display
              const currentPrice = product.discountPrice || product.price;
              const originalPrice = product.discountPrice ? product.price : undefined;
              
              // Simple logic for badge
              let badge;
              if (product.discountPrice) {
                badge = 'Sale';
              } else if (new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                // If created in last 7 days
                badge = 'New';
              }

              return (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  price={currentPrice}
                  oldPrice={originalPrice}
                  rating={4.5} // Dummy rating as it's not in Product model yet
                  reviews={0} // Dummy reviews
                  badge={badge}
                  image={product.images && product.images.length > 0 ? product.images[0] : undefined}
                />
              );
            })}
          </div>
        )}

        {/* Pagination - Placeholder for now */}
        {products.length > 12 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
