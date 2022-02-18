import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from '../reducers/reducers';

export const selectContactState = createFeatureSelector<ContactState>('contacts');


export const getContacts = createSelector(
  selectContactState,
  (state: ContactState) => {
    return state.contacts
  }
);

export const getContactDetails = createSelector(
  selectContactState,
  (state: ContactState) => state.contactDetails
);

export const createContact = createSelector(
  selectContactState,
  (state: ContactState) => state.createContact
);

export const updateContact = createSelector(
  selectContactState,
  (state: ContactState) => state.updateContact
);

export const removeContact = createSelector(
  selectContactState,
  (state: ContactState) => state.removeContact
);