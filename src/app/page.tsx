import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Saleor Dash Shoes",
    price: "$54.00 - $90.00",
    image: "/next.svg",
    seller: "ACME",
    sellerRating: 4.5,
  },
  {
    id: 2,
    name: "Saleor Card 50",
    price: "$50.00",
    image: "/vercel.svg",
    seller: "ACME",
    sellerRating: 5,
  },
  {
    id: 3,
    name: "Saleor Grey Hoodie",
    price: "$18.00",
    image: "/file.svg",
    seller: "ACME",
    sellerRating: 4,
  },
  {
    id: 4,
    name: "Saleor Mug",
    price: "$12.00",
    image: "/globe.svg",
    seller: "ACME",
    sellerRating: 4.2,
  },
  {
    id: 5,
    name: "Saleor Sunglasses",
    price: "$22.00",
    image: "/window.svg",
    seller: "ACME",
    sellerRating: 4.8,
  },
  {
    id: 6,
    name: "Saleor Beanie",
    price: "$10.00",
    image: "/next.svg",
    seller: "ACME",
    sellerRating: 4.1,
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        ))}
      {halfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" fill="url(#half)"/></svg>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full border-b border-gray-100 py-6 px-4 flex items-center justify-between bg-white">
        <span className="font-bold text-xl tracking-tight text-gray-900">WYDM</span>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input type="text" placeholder="Search for products..." className="rounded-md border border-gray-200 px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900 placeholder-gray-400" />
            <svg className="absolute right-2 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <button className="text-gray-700 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
          </button>
          <button className="text-gray-700 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-13z"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg>
          </button>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col p-4 hover:shadow-md transition-shadow">
              <div className="w-full aspect-square flex items-center justify-center mb-4 bg-gray-50 rounded">
                <Image src={product.image} alt={product.name} width={220} height={220} className="object-contain max-h-40" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-semibold text-base text-gray-900 leading-tight">{product.name}</span>
                <span className="text-gray-700 text-sm font-medium">{product.price}</span>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={product.sellerRating} />
                  <span className="text-xs text-gray-500">{product.seller}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
