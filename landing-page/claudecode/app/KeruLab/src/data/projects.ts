import { ChartColumn, Boxes, FileSearch, Workflow, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '../i18n/types';

export type ProjectId = keyof Dictionary['projects']['items'];

/** Tipo de visual mockup que acompaña a cada caso de uso. */
export type ProjectVisual = 'pipeline' | 'documents' | 'erp' | 'metrics';

export interface Project {
  id: ProjectId;
  icon: LucideIcon;
  visual: ProjectVisual;
  accent: 'brand' | 'ai' | 'cyan';
}

export const projects: Project[] = [
  { id: 'sales', icon: Workflow, visual: 'pipeline', accent: 'brand' },
  { id: 'knowledge', icon: FileSearch, visual: 'documents', accent: 'ai' },
  { id: 'erpAi', icon: Boxes, visual: 'erp', accent: 'cyan' },
  { id: 'dashboard', icon: ChartColumn, visual: 'metrics', accent: 'brand' },
];
