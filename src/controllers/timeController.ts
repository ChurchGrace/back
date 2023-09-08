import Time from 'src/models/TimeModel';
import { createOne, deleteOne, getAll, updateOne } from './handleFactory';

export const createTime = createOne(Time);
export const updateTime = updateOne(Time);
export const deleteTime = deleteOne(Time);
export const getAllTime = getAll(Time);
