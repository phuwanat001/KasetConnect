"use client";

import Link from "next/link";
import { Star, MapPin, Heart, Eye, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
}

interface FeaturedProductsSectionProps {
  title?: string;
  products: Product[];
}

export function FeaturedProductsSection({
  title = "เครื่องจักรยอดนิยม",
  products,
}: FeaturedProductsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="py-24 bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Featured
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              เครื่องจักรคุณภาพสูงที่ได้รับความนิยมจากเกษตรกรทั่วประเทศ
            </p>
          </div>

          <Link
            href="/marketplace"
            className="group inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:gap-4 transition-all duration-300"
          >
            ดูเครื่องจักรทั้งหมด
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/marketplace/${product.id}`}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-500/10"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              {index === 0 && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                  🔥 ยอดนิยม
                </div>
              )}
              {index === 1 && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg">
                  ⭐ แนะนำ
                </div>
              )}

              {/* Like Button */}
              <button
                onClick={(e) => toggleLike(e, product.id)}
                className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                  likedIds.has(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${likedIds.has(product.id) ? "fill-current" : ""}`}
                />
              </button>

              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === product.id ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Quick View Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-6 transition-all duration-500 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-slate-900 text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    ดูรายละเอียด
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>{product.location}</span>
                </div>

                {/* Name */}
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      เริ่มต้น
                    </p>
                    <p className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ฿{product.price.toLocaleString()}
                      <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                        /{product.unit}
                      </span>
                    </p>
                  </div>

                  <div
                    className={`p-2 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 ${
                      hoveredId === product.id
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Gradient Border Effect */}
              <div
                className={`absolute inset-0 rounded-3xl ring-2 transition-all duration-500 pointer-events-none ${
                  hoveredId === product.id
                    ? "ring-emerald-500/50"
                    : "ring-transparent"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
