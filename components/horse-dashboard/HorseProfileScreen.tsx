"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, FileImage, FileText, Plus } from "lucide-react";
import { DocumentKind, Horse, HorseDocument, HorseGender, Pedigree } from "@/lib/types";
import { ScreenHeader } from "./ScreenHeader";

const GENDER_LABEL: Record<HorseGender, string> = {
  jument: "Jument",
  hongre: "Hongre",
  etalon: "Étalon",
};

function InfoRow({ label, value, isFirst }: { label: string; value: string; isFirst: boolean }) {
  return (
    <div className={`grid grid-cols-2 ${isFirst ? "" : "border-t border-neutral-800"}`}>
      <div className="border-r border-neutral-800 px-4 py-3 text-sm text-neutral-500">
        {label}
      </div>
      <div className="px-4 py-3 text-sm text-white">{value}</div>
    </div>
  );
}

function PedigreeNode({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 text-sm ${
        muted
          ? "border-neutral-900 bg-black text-neutral-400"
          : "border-neutral-800 bg-neutral-900 text-white"
      }`}
    >
      {label}
    </div>
  );
}

function DocumentRow({ doc }: { doc: HorseDocument }) {
  const Icon = doc.kind === "image" ? FileImage : FileText;
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
        <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm text-white">{doc.name}</span>
        <span className="text-xs text-neutral-500">Ajouté le {doc.addedAt}</span>
      </div>
    </>
  );

  if (doc.url) {
    return (
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 active:scale-[0.98]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3">
      {content}
    </div>
  );
}

export function HorseProfileScreen({
  horse,
  photoUrl,
  pedigree,
  documents,
  onBack,
  onPhotoChange,
  onAddDocument,
}: {
  horse: Horse;
  photoUrl: string;
  pedigree: Pedigree;
  documents: HorseDocument[];
  onBack: () => void;
  onPhotoChange: (url: string) => void;
  onAddDocument: (doc: HorseDocument) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const kind: DocumentKind = file.type.startsWith("image/") ? "image" : "pdf";
      onAddDocument({
        id: `d-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        kind,
        addedAt: new Date().toLocaleDateString("fr-FR"),
        url: URL.createObjectURL(file),
      });
    }
    e.target.value = "";
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(URL.createObjectURL(file));
    }
    e.target.value = "";
  }

  const infoRows = [
    { label: "Date de naissance", value: horse.dob },
    { label: "Race", value: horse.breed },
    { label: "Sexe", value: GENDER_LABEL[horse.gender] },
    { label: "Robe", value: horse.coatColor },
    { label: "Taille", value: horse.height },
    { label: "Puce électronique", value: horse.microchip },
    { label: "N° SIRE", value: horse.sireNumber },
  ];

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <ScreenHeader onBack={onBack} />

      <div className="flex flex-col items-center gap-1 px-4 pb-6 pt-6 text-center">
        <button
          onClick={() => photoInputRef.current?.click()}
          aria-label="Changer la photo"
          className="relative h-24 w-24 overflow-hidden rounded-full border border-neutral-800 active:opacity-80"
        >
          <Image src={photoUrl} alt={horse.name} fill className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/50 py-1.5">
            <Camera className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
          </div>
        </button>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <h1 className="mt-3 font-serif text-3xl font-medium text-white">{horse.name}</h1>
        <p className="text-sm text-neutral-400">
          {GENDER_LABEL[horse.gender]} · {horse.breed} · {horse.age} ans
        </p>
      </div>

      <div className="flex flex-col gap-8 px-4 pb-10">
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          {infoRows.map((row, i) => (
            <InfoRow key={row.label} label={row.label} value={row.value} isFirst={i === 0} />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-base text-white">Généalogie</h2>
          <div className="no-scrollbar grid grid-cols-[minmax(90px,1fr)_minmax(110px,1fr)_minmax(120px,1fr)] gap-x-3 gap-y-2 overflow-x-auto pb-2">
            <div className="row-span-4 flex items-center">
              <PedigreeNode label={horse.name} />
            </div>

            <div className="row-span-2 flex items-center border-l border-neutral-800 pl-3">
              <PedigreeNode label={pedigree.sire.name} />
            </div>
            <div className="flex items-center border-l border-neutral-800 pl-3">
              <PedigreeNode label={pedigree.sire.sire ?? "—"} muted />
            </div>
            <div className="flex items-center border-l border-neutral-800 pl-3">
              <PedigreeNode label={pedigree.sire.dam ?? "—"} muted />
            </div>

            <div className="row-span-2 flex items-center border-l border-neutral-800 pl-3">
              <PedigreeNode label={pedigree.dam.name} />
            </div>
            <div className="flex items-center border-l border-neutral-800 pl-3">
              <PedigreeNode label={pedigree.dam.sire ?? "—"} muted />
            </div>
            <div className="flex items-center border-l border-neutral-800 pl-3">
              <PedigreeNode label={pedigree.dam.dam ?? "—"} muted />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base text-white">Documents</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Ajouter un document"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 active:scale-90"
            >
              <Plus className="h-4 w-4 text-white" strokeWidth={1.5} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {documents.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-800 px-4 py-6 text-center text-xs text-neutral-600">
              Aucun document — ajoute le passeport de {horse.name} ou d&apos;autres fichiers utiles.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {documents.map((doc) => (
                <DocumentRow key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
