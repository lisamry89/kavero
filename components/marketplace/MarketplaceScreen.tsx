"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Listing, ListingCategory } from "@/lib/types";
import { ScreenHeader } from "../horse-dashboard/ScreenHeader";

const CATEGORY_LABEL: Record<ListingCategory, string> = {
  cheval: "Cheval",
  poney: "Poney",
  materiel: "Matériel",
  service: "Service",
};

function ListingCard({ listing, onOpen }: { listing: Listing; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-left active:scale-[0.98]"
    >
      <div className="relative h-36 w-full">
        <Image src={listing.photos[0]} alt={listing.title} fill className="object-cover" />
        {listing.status === "sold" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full border border-white/40 px-3 py-1 text-[10px] uppercase tracking-widest2 text-white">
              Vendu
            </span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[9px] uppercase tracking-widest2 text-white">
          {CATEGORY_LABEL[listing.category]}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="font-serif text-sm leading-snug text-white">{listing.title}</h3>
        <span className="text-sm font-medium text-white">{listing.price}</span>
        <span className="flex items-center gap-1 text-[11px] text-neutral-500">
          <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          <span className="truncate">{listing.location}</span>
        </span>
      </div>
    </button>
  );
}

export function MarketplaceScreen({
  listings,
  onBack,
  onOpen,
}: {
  listings: Listing[];
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <ScreenHeader title="Marketplace" onBack={onBack} />
      {listings.length === 0 ? (
        <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
          Aucune annonce pour l&apos;instant
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} onOpen={() => onOpen(listing.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
