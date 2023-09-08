import { createOne, getFirst, updateOne } from './handleFactory';
import Footer from 'src/models/FooterModel';

export const createFooter = createOne(Footer);
export const updateFooter = updateOne(Footer);
export const getFooter = getFirst(Footer);
