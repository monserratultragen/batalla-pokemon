import type { InteriorMap } from '../../types';
import { HOUSE1_INTERIOR } from './house1';
import { HOUSE2_INTERIOR } from './house2';
import { HOUSE3_INTERIOR } from './house3';
import { HOUSE4_INTERIOR } from './house4';
import { GYM_INTERIOR } from './gym';
import { SCHOOL_INTERIOR } from './school';
import { BAR_INTERIOR } from './bar';
import { LAB_INTERIOR } from './lab';

export const INTERIORS: Record<string, InteriorMap> = {
  house1: HOUSE1_INTERIOR,
  house2: HOUSE2_INTERIOR,
  house3: HOUSE3_INTERIOR,
  house4: HOUSE4_INTERIOR,
  house5: HOUSE4_INTERIOR,
  gym: GYM_INTERIOR,
  school: SCHOOL_INTERIOR,
  bar: BAR_INTERIOR,
  lab: LAB_INTERIOR,
};

export function getInterior(id: string): InteriorMap | undefined {
  return INTERIORS[id];
}

export { HOUSE1_INTERIOR, HOUSE2_INTERIOR, HOUSE3_INTERIOR, HOUSE4_INTERIOR };
export { GYM_INTERIOR, SCHOOL_INTERIOR, BAR_INTERIOR, LAB_INTERIOR };
