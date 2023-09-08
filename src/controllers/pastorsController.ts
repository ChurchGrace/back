import Pastors from 'src/models/PastorsModel';
import { createOne, deleteOne, getAll, updateOne } from './handleFactory';

export const getPastors = getAll(Pastors);
export const createPastor = createOne(Pastors);
export const updatePastor = updateOne(Pastors);
export const deletePastor = deleteOne(Pastors);
