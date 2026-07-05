import {
  Activity,
  Hammer,
  MoreHorizontal,
  Stethoscope,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { HealthEventType } from "./types";

export const APPOINTMENT_TYPE_ICON: Record<HealthEventType, LucideIcon> = {
  vet: Stethoscope,
  farrier: Hammer,
  dentist: Stethoscope,
  osteopath: Activity,
  competition: Trophy,
  other: MoreHorizontal,
};

export const APPOINTMENT_TYPE_LABEL: Record<HealthEventType, string> = {
  vet: "Vétérinaire",
  farrier: "Maréchal-ferrant",
  dentist: "Dentiste équin",
  osteopath: "Ostéopathe",
  competition: "Concours",
  other: "Autre",
};
