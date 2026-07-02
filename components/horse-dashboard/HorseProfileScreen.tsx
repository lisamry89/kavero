import Image from "next/image";
import { Horse, HorseGender, Pedigree } from "@/lib/types";
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

export function HorseProfileScreen({
  horse,
  pedigree,
  onBack,
}: {
  horse: Horse;
  pedigree: Pedigree;
  onBack: () => void;
}) {
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
    <div className="flex h-[calc(100vh-4.5rem)] flex-col overflow-y-auto">
      <ScreenHeader onBack={onBack} />

      <div className="flex flex-col items-center gap-1 px-4 pb-6 pt-6 text-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-neutral-800">
          <Image src={horse.photoUrl} alt={horse.name} fill className="object-cover" />
        </div>
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
          <div className="grid grid-cols-[minmax(90px,1fr)_minmax(110px,1fr)_minmax(120px,1fr)] gap-x-3 gap-y-2 overflow-x-auto pb-2">
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
      </div>
    </div>
  );
}
