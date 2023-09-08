import ContactBlock from 'src/models/ContactBlockModel';
import ContactPage from 'src/models/ContactPageModel';
import { createOne, deleteOne, getAll, getFirst, updateOne } from './handleFactory';

export const createContactBlock = createOne(ContactBlock);
export const deleteContactBlock = deleteOne(ContactBlock);
export const updateContactBlock = updateOne(ContactBlock);
export const getAllContactBlocks = getAll(ContactBlock);

export const createContactPage = createOne(ContactPage);
export const updateContactPage = updateOne(ContactPage);
export const getContactPage = getFirst(ContactPage);
