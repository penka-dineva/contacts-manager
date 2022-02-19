import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact';
import { select, Store } from '@ngrx/store';
import * as ContactsActions from '../store/actions/contact.actions';
import {
  getContacts,
  removeContact
 } from 'src/store/selectors/contacts.selectors';
 import { map } from 'rxjs';
import { ContactsService } from 'src/services/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public contacts$ = this.store.pipe(
    select(getContacts),
    map(contacts => contacts.value as Contact[])
    );

  constructor(private http: HttpClient, private store: Store, private contactsService: ContactsService) {}

  ngOnInit(){
   this.store.dispatch(ContactsActions.getContacts.init());
  }

  addContact() {
    this.contactsService.addContact()
  }

  editContact(contact: Contact) {
    this.contactsService.editContact(contact)
  }

  deleteContact(id: string) {
    this.contactsService.removeConact(id);
    this.store.pipe(select(removeContact)).subscribe();
  }
}

