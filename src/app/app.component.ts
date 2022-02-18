import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact';
import { select, Store } from '@ngrx/store';
import * as ContactsActions from '../store/actions/contact.actions';
import {
  getContacts,
  getContactDetails,
  createContact,
  updateContact,
  removeContact
 } from 'src/store/selectors/contacts.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private testContact: Contact = {
    name: 'Mat Jane',
    phone: '0884891111',
    email: 'test@test.com',
    iban: 'BGRZ35YYY888GGG'
  }
  title = 'contacts-manager';
  public contacts$ = this.store.pipe(select(getContacts));
  public contactDetails$ = this.store.pipe(select(getContactDetails));
  public createContact$ = this.store.pipe(select(createContact));
  public updateContact$ = this.store.pipe(select(updateContact));
  public removeContact$ = this.store.pipe(select(removeContact));

  constructor(private http: HttpClient, private store: Store) {}


  getContacts = () => this.store.dispatch(ContactsActions.getContacts.init());
  getContactDetails = (contactId: string) => this.store.dispatch(ContactsActions.getContactDetails.init(contactId));
  createContact = (payload: Contact) => this.store.dispatch(ContactsActions.createContact.init(payload));
  updateContact = () => this.store.dispatch(ContactsActions.updateContact.init());
  removeContact = () => this.store.dispatch(ContactsActions.removeContact.init());

  ngOnInit(){
  this.createContact(this.testContact)
  this.getContacts()   
  }
}

