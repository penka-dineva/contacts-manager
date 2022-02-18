import { createReducer, on } from '@ngrx/store'
import { ServerItem } from 'src/models/server-item.model';
import { Contact } from 'src/models/contact';
import { getContacts, getContactDetails, createContact, updateContact, removeContact } from '../actions/contact.actions';
import { serverCallStart, serverCallSuccess} from 'src/utils/store-utils';

export interface ContactState {
  contacts: ServerItem<Contact[]>;
  contactDetails: ServerItem<Contact[]>;
  createContact: ServerItem<Contact[]> | null;
  updateContact: ServerItem<Contact[]> | null;
  removeContact: ServerItem<boolean> | null;
}
const initalState: ContactState = {
  contacts: {
    value: undefined!,
    isLoading: false
  },
  contactDetails: {
    value: undefined!,
    isLoading: false
  },
  createContact: {
    value: undefined!,
    isLoading: false
  },
  updateContact: {
    value: undefined!,
    isLoading: false
  },
  removeContact: {
    value: undefined!,
    isLoading: false
  }
}
export const reducer = createReducer(initalState,
  on(getContacts.init, (state, props) => serverCallStart(state, props, 'contacts')),
  on(getContacts.success, (state, props) => serverCallSuccess(state, props, 'contacts')),
  on(getContacts.failed, (state, props) => serverCallSuccess(state, props, 'contacts')),

  on(getContactDetails.init, (state, props) => serverCallStart(state, props, 'contacts')),
  on(getContactDetails.success, (state, props) => serverCallSuccess(state, props, 'contacts')),
  on(getContactDetails.failed, (state, props) => serverCallSuccess(state, props, 'contacts')),

  on(createContact.init, (state, props) => serverCallStart(state, props, 'contacts')),
  on(createContact.success, (state, props) => serverCallSuccess(state, props, 'contacts')),
  on(createContact.failed, (state, props) => serverCallSuccess(state, props, 'contacts')),

  on(updateContact.init, (state, props) => serverCallStart(state, props, 'contacts')),
  on(updateContact.success, (state, props) => serverCallSuccess(state, props, 'contacts')),
  on(updateContact.failed, (state, props) => serverCallSuccess(state, props, 'contacts')),

  on(removeContact.init, (state, props) => serverCallStart(state, props, 'contacts')),
  on(removeContact.success, (state, props) => serverCallSuccess(state, props, 'contacts')),
  on(removeContact.failed, (state, props) => serverCallSuccess(state, props, 'contacts'))
  )