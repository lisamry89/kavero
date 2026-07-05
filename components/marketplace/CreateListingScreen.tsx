"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Listing, ListingCategory } from "@/lib/types";
import { readFileAsDataUrl } from "@/lib/file";
import { ScreenHeader } from "../horse-dashboard/ScreenHeader";

const CATEGORY_LABEL: Record<ListingCategory, string> = {
  cheval: "Cheval",
  poney: "Poney",
  materiel: "Matériel",
  service: "Service",
};

export function CreateListingScreen({
  sellerName,
  onBack,
  onCreate,
}: {
  sellerName: string;
  onBack: () => void;
  onCreate: (listing: Listing) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [category, setCategory] = useState<ListingCategory>("cheval");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhoto(await readFileAsDataUrl(file));
    e.target.value = "";
  }

  function handleSubmit() {
    if (!title.trim() || !price.trim() || !location.trim() || !photo) return;
    onCreate({
      id: `l-${Date.now()}`,
      title: title.trim(),
      category,
      price: price.trim(),
      location: location.trim(),
      description: description.trim(),
      photos: [photo],
      sellerName,
      createdAt: "Aujourd'hui",
      status: "active",
    });
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <ScreenHeader title="Nouvelle annonce" onBack={onBack} />

      <div className="flex flex-col gap-4 px-4 py-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-neutral-800 bg-neutral-950"
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Photo de l'annonce" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-500">
              <ImagePlus className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-widest2">Ajouter une photo</span>
            </div>
          )}
        </button>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ListingCategory)}
          className="rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white focus:outline-none"
        >
          {(Object.keys(CATEGORY_LABEL) as ListingCategory[]).map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'annonce"
          className="rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
        />
        <div className="flex gap-2">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix (ex. 12 000 €)"
            className="flex-1 rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Localisation"
            className="flex-1 rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="resize-none rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          className="rounded-full bg-white py-3 text-sm font-medium text-black active:scale-[0.98]"
        >
          Publier l&apos;annonce
        </button>
      </div>
    </div>
  );
}
