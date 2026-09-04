import {
  BrainCircuit,
  Boxes,
  ChartColumn,
  Cloud,
  Database,
  Layers,
  Plug,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { Dictionary } from '../i18n/types';

export type TechnologyGroupId = keyof Dictionary['technology']['groups'];

export interface TechnologyGroup {
  id: TechnologyGroupId;
  icon: LucideIcon;
  accent: 'brand' | 'ai' | 'cyan';
  /** Nombres propios de producto: idénticos en ambos idiomas. */
  tags: string[];
}

export const technologyGroups: TechnologyGroup[] = [
  { id: 'erp', icon: Boxes, accent: 'cyan', tags: ['Odoo Enterprise', 'PostgreSQL', 'XML-RPC / REST'] },
  { id: 'ai', icon: BrainCircuit, accent: 'ai', tags: ['LLMs', 'RAG', 'QDrant', 'Hugging Face'] },
  { id: 'automation', icon: Zap, accent: 'brand', tags: ['Python', 'Webhooks', 'Schedulers', 'Workers'] },
  { id: 'cloud', icon: Cloud, accent: 'brand', tags: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes'] },
  { id: 'apis', icon: Plug, accent: 'cyan', tags: ['FastAPI', 'REST', 'OAuth 2.0'] },
  { id: 'data', icon: Database, accent: 'ai', tags: ['PostgreSQL', 'ETL', 'Data modeling'] },
  { id: 'dashboards', icon: ChartColumn, accent: 'cyan', tags: ['Power BI', 'Dashboards a medida'] },
  { id: 'integrations', icon: Layers, accent: 'ai', tags: ['React', 'TypeScript', 'Design systems'] },
];
