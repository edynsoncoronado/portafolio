import { Factory, GraduationCap, Stethoscope, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '../i18n/types';

export type IndustryId = keyof Dictionary['industries']['items'];

export interface Industry {
  id: IndustryId;
  icon: LucideIcon;
  accent: 'brand' | 'ai' | 'cyan';
}

export const industries: Industry[] = [
  { id: 'manufacturing', icon: Factory, accent: 'brand' },
  { id: 'healthcare', icon: Stethoscope, accent: 'cyan' },
  { id: 'education', icon: GraduationCap, accent: 'ai' },
];
