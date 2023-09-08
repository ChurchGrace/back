import Ministry from 'src/models/MinistryModel';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handleFactory';

export const updateMinistry = updateOne(Ministry);
export const createMinistry = createOne(Ministry);
export const getMinistry = getOne(Ministry);
export const getAllMinistry = getAll(Ministry);
export const deleteMinistry = deleteOne(Ministry);
