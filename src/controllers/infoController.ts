import InfoSections from 'src/models/InfoSectionsModel';
import { createOne, getAll, updateOne } from './handleFactory';

export const createInfo = createOne(InfoSections);
export const getInfo = getAll(InfoSections);
export const updateInfo = updateOne(InfoSections);
