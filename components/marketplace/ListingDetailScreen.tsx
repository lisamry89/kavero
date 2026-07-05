"use client";

import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { Listing, ListingCategory } from "@/lib/types";
import { ScreenHeader } from "../horse-dashboard/ScreenHeader";

const CATEGORY_LABEL: Record<ListingCategory, string> = {
  cheval: "Cheval",
  poney: "Poney",
  materiel: "Matériel",
  service: "Service",
};

export function ListingDetailScreen({
  listing,
  onBack,
  onContactSeller,
}: {
  listing: Listing;
  onBack: () => void;
  onContactSeller: () => void;
}) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <ScreenHeader onBack={onBack} />

      <div className="relative h-64 w-full">
        <Image src={listing.photos[0]} alt={listing.title} fill className="object-cover" />
        {listing.status === "sold" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full border border-white/40 px-4 py-1.5 text-xs uppercase tracking-widest2 text-white">
              Vendu
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 px-4 py-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest2 text-neutral-600">
            {CATEGORY_LABEL[listing.category]}
          </span>
          <h1 className="mt-1 font-serif text-2xl text-white">{listing.title}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {listing.location}
          </p>
        </div>

        <span className="font-serif text-2xl text-white">{listing.price}</span>

        <p className="text-sm leading-relaxed text-neutral-300">{listing.description}</p>

        <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest2 text-neutral-600">
              Vendeur
            </span>
            <span className="text-sm text-white">{listing.sellerName}</span>
          </div>
          <button
            onClick={onContactSeller}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-black active:scale-[0.98]"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
            Contacter
          </button>
        </div>
      </div>
    </div>
  );
}
