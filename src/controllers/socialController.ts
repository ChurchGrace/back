import Social from 'src/models/SocialModel';
import { createOne, deleteOne, getAll, updateOne } from './handleFactory';

export const getSocial = getAll(Social);
export const updateSocial = updateOne(Social);
export const deleteSocial = deleteOne(Social);
export const createSocial = createOne(Social);
