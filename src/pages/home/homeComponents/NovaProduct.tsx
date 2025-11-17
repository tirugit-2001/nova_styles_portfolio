import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { axios as httpClient } from '../../../service/axios';

interface Product {
  id: number | string;
  title: string;
  image: string;
  originalPrice?: number;
  salePrice?: number;
  pricePerSqFt?: string;
}

const BACKEND_PRODUCTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`;

function normalizeProduct(raw: any): Product {
  // Defensive mapping in case API field names differ
  return {
    id: raw.id ?? raw._id ?? Math.random().toString(36).slice(2),
    title: raw.title ?? raw.name ?? 'Product',
    image: raw.image ?? raw.imageUrl ?? raw.thumbnail ?? '/whatsapp_logo.png',
    originalPrice: raw.originalPrice ?? raw.mrp ?? undefined,
    salePrice: raw.salePrice ?? raw.price ?? undefined,
    pricePerSqFt: raw.pricePerSqFt ?? raw.unit ?? undefined,
  };
}

const NovaProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  const priceLabel = useMemo(() => {
    const parts: string[] = [];
    if (product.salePrice != null) parts.push(`₹ ${product.salePrice}`);
    if (product.pricePerSqFt) parts.push(`${product.pricePerSqFt}`);
    return parts.join(' ');
  }, [product.salePrice, product.pricePerSqFt]);

  return (
    <div
      className="w-72 bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-gray-900 text-base font-normal mb-2">
            {product.title}
          </h3>
          {(product.originalPrice != null || product.salePrice != null || product.pricePerSqFt) && (
            <div className="flex items-center gap-2">
              {product.originalPrice != null && (
                <span className="text-gray-400 text-sm line-through">
                  ₹ {product.originalPrice}
                </span>
              )}
              {priceLabel && (
                <span className="text-gray-900 text-base font-medium">
                  {priceLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <span className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors text-sm font-normal">
          View
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

const NovaProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        // Prefer configured axios baseURL if available; fall back to full URL
        const url = httpClient.defaults.baseURL
          ? '/api/v1/product'
          : BACKEND_PRODUCTS_URL;
        const res = await httpClient.get(url);
        const rows = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
        const mapped = rows.map(normalizeProduct);
        if (isMounted) setProducts(mapped);
      } catch (err) {
        // Fallback to direct fetch if axios baseURL misconfigured
        try {
          const res = await fetch(BACKEND_PRODUCTS_URL);
          const json = await res.json();
          const rows = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
          const mapped = rows.map(normalizeProduct);
          if (isMounted) setProducts(mapped);
        } catch (e) {
          if (isMounted) setError('Failed to load products.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const redirectToBackend = () => {
    window.location.href = BACKEND_PRODUCTS_URL;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Trending Home Interior Wallpapers</h1>
            <p className="text-gray-600 text-xl">Loading products…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Trending Home Interior Wallpapers</h1>
            <p className="text-red-600 text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Trending Home Interior Wallpapers
          </h1>
          <p className="text-gray-600 text-xl">
            Latest design trends delivered the hassle-free way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 justify-items-center ">
          {products.map((product) => (
            <NovaProductCard key={product.id} product={product} onClick={redirectToBackend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovaProductList;