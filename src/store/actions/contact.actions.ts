import { httpAction } from 'src/utils/store-utils';
import { Contact } from 'src/models/contact';

const nameSpace = ['Contacts'];

export const getContacts = httpAction<{}, Contact[]>(`${nameSpace} Get Contacts`);
export const getContactDetails = httpAction<any, Contact>(`${nameSpace} Get Contact Details`);
export const createContact = httpAction<Contact, Contact>(`${nameSpace} Create Contact`);
export const updateContact = httpAction<{id: string, content: Contact}, Contact>(`${nameSpace} Update Contact`);
export const removeContact = httpAction<string, boolean>(`${nameSpace} Delete Contact`);