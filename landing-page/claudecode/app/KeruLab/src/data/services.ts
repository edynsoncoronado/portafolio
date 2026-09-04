import { Boxes, CodeXml, Compass, type LucideIcon } from 'lucide-react';
import { sectionIds } from '../config/site';
import type { Dictionary } from '../i18n/types';

export type ServiceId = keyof Dictionary['services']['items'];

export type ServiceAction = 'contact' | 'demo';

export interface Service {
  id: ServiceId;
  icon: LucideIcon;
  accent: 'brand' | 'ai' | 'cyan';
  /** Clave del diccionario que etiqueta la lista de cada servicio. */
  listLabel: 'areasLabel' | 'featuresLabel' | 'capabilitiesLabel';
  action: ServiceAction;
  /** Ancla a la sección que amplía el servicio, cuando existe. */
  detailHref?: string;
}

export const services: Service[] = [
  {
    id: 'consulting',
    icon: Compass,
    accent: 'brand',
    listLabel: 'areasLabel',
    action: 'contact',
    detailHref: `#${sectionIds.process}`,
  },
  {
    id: 'erp',
    icon: Boxes,
    accent: 'cyan',
    listLabel: 'featuresLabel',
    action: 'demo',
    detailHref: `#${sectionIds.erp}`,
  },
  {
    id: 'custom',
    icon: CodeXml,
    accent: 'ai',
    listLabel: 'capabilitiesLabel',
    action: 'contact',
    detailHref: `#${sectionIds.ai}`,
  },
];
