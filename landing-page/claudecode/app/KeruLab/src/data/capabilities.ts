import { BrainCircuit, Boxes, ChartLine, CodeXml, Workflow, Zap, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '../i18n/types';

export type CapabilityId = keyof Dictionary['capabilities']['items'];

export interface Capability {
  id: CapabilityId;
  icon: LucideIcon;
  accent: 'brand' | 'ai' | 'cyan';
}

/** Sólo estructura: los textos viven en los diccionarios de i18n. */
export const capabilities: Capability[] = [
  { id: 'consulting', icon: Workflow, accent: 'brand' },
  { id: 'ai', icon: BrainCircuit, accent: 'ai' },
  { id: 'erp', icon: Boxes, accent: 'cyan' },
  { id: 'automation', icon: Zap, accent: 'brand' },
  { id: 'software', icon: CodeXml, accent: 'ai' },
  { id: 'data', icon: ChartLine, accent: 'cyan' },
];
