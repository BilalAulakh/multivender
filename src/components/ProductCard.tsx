import Link from 'next/link';

interface ProductProps {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  rating,
  reviews,
  badge,
  image
}: ProductProps) {

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition group">
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
            badge === 'Sale' ? 'bg-red-600' : badge === 'New' ? 'bg-green-600' : 'bg-orange-600'
          }`}>
            {badge}
          </span>
        </div>
      )}
      
      <Link href={`/products/${id}`} className="block relative aspect-square bg-gray-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
            />
          ) : (
            <span className="text-8xl">📦</span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
          ))}
          <span className="text-sm text-gray-600 ml-2">({reviews})</span>
        </div>
        
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">{name}</h3>
        </Link>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">${price}</span>
            {oldPrice && <span className="text-sm text-gray-500 line-through ml-2">${oldPrice}</span>}
          </div>
        </div>

        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
