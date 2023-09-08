import Navigation from 'src/models/NaviagtionModel';
import { createOne, getAll } from './handleFactory';

export const createNavigation = createOne(Navigation);
export const getNavigation = getAll(Navigation);
