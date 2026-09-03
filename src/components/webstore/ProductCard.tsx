import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import DynamicIcon from "@/components/ui/DynamicIcon";
import AddToQuoteButton from "@/components/webstore/AddToQuoteButton";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <GlassCard className="h-full flex flex-col overflow-hidden">
      <Link href={`/webstore/product/${product.id}`} className="block flex-1 flex flex-col">
        {/* Image */}
        <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] border-b border-white/5">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain bg-white p-4"
            />
          ) : (
            <DynamicIcon name={product.icon} className="h-14 w-14 text-brand-red/40" strokeWidth={1.25} />
          )}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[11px] text-gray-200">
            {product.category}
          </span>
        </div>

        <div className="p-6 pb-4 flex flex-col flex-1">
          {product.brand && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-red mb-1">
              {product.brand}
            </span>
          )}
          <h3 className="font-bold mb-1.5 leading-snug">{product.name}</h3>
          <p className="text-sm text-gray-400 leading-relaxed flex-1">{product.shortDescription}</p>
        </div>
      </Link>

      <div className="mx-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
        <span className="text-sm text-gray-400 font-medium">Pricing on request</span>
        <AddToQuoteButton
          product={{ id: product.id, name: product.name, brand: product.brand, category: product.category }}
          variant="card"
        />
      </div>
    </GlassCard>
  );
}
