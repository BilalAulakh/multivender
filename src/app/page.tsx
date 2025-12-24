import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">      {/* Hero Carousel */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Limited Time Offer
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                New Arrivals Are Here
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Shop the latest products from top vendors. Up to 50% off on selected items!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Shop Now
                </Link>
                <Link href="/deals" className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-white">
                  View Deals
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-96 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-9xl animate-pulse">🎧</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'Orders over $50' },
              { icon: '💳', title: 'Secure Payment', desc: '100% Protected' },
              { icon: '↩️', title: '30-Day Returns', desc: 'Easy & Free' },
              { icon: '🎁', title: 'Daily Deals', desc: 'Up to 70% Off' },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Electronics', icon: '💻', color: 'bg-blue-100' },
              { name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
              { name: 'Home & Garden', icon: '🏡', color: 'bg-green-100' },
              { name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
              { name: 'Beauty', icon: '💄', color: 'bg-purple-100' },
              { name: 'Books', icon: '📚', color: 'bg-yellow-100' },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                className="group block"
              >
                <div className={`${category.color} rounded-xl p-6 text-center hover:shadow-lg transition`}>
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, name: 'Premium Wireless Headphones', price: 299, oldPrice: 399, rating: 4.8, reviews: 324, badge: 'Sale', image: '🎧' },
              { id: 2, name: 'Smart Watch Series 9', price: 449, oldPrice: 599, rating: 4.9, reviews: 521, badge: 'New', image: '⌚' },
              { id: 3, name: 'Designer Leather Backpack', price: 129, oldPrice: 189, rating: 4.7, reviews: 189, badge: 'Hot', image: '🎒' },
              { id: 4, name: 'Ultra Running Shoes', price: 159, oldPrice: 229, rating: 4.6, reviews: 412, badge: 'Sale', image: '👟' },
            ].map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Start Selling Today</h2>
              <p className="text-xl mb-6 text-blue-100">
                Join thousands of vendors and reach millions of customers. Low fees, powerful tools, and dedicated support.
              </p>
              <ul className="space-y-3 mb-8">
                {['Low commission rates', 'Easy product management', 'Dedicated seller support', 'Marketing tools included'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                Become a Vendor
              </Link>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {['📦', '💰', '📊', '🚀'].map((emoji, index) => (
                    <div key={index} className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center text-5xl">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest deals and new arrivals delivered to your inbox</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="font-bold text-xl text-white">MultiMarket</span>
              </div>
              <p className="text-sm mb-4">Your trusted multi-vendor marketplace for all your shopping needs.</p>
              <div className="flex space-x-4">
                {['f', 't', 'in', 'ig'].map((social, index) => (
                  <a key={index} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'Shop', links: ['All Products', 'Categories', 'Deals', 'New Arrivals'] },
              { title: 'Support', links: ['Help Center', 'Track Order', 'Returns', 'Shipping Info'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-sm hover:text-white transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 MultiMarket. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-sm hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
