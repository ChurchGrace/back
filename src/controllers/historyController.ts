import History from 'src/models/HistoryModel';
import { createOne, deleteOne, getAll, updateOne } from './handleFactory';

export const createHistory = createOne(History);
export const deleteHistory = deleteOne(History);
export const updateHistory = updateOne(History);
export const getAllHistory = getAll(History);
