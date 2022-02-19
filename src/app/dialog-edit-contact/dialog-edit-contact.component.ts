import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Contact } from 'src/models/contact';
import { ContactsService } from 'src/services/contacts.service';
import { select, Store } from '@ngrx/store';
import * as ContactsActions from '../../store/actions/contact.actions';
import {
  getContacts,
  getContactDetails,
  createContact,
  updateContact,
  removeContact
 } from 'src/store/selectors/contacts.selectors';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.css']
})
export class DialogEditContactComponent {
public contactData: Contact;
public contact: FormGroup;
public getContacts$ = this.store.pipe(select(getContacts));
public contactDetails$ = this.store.pipe(select(getContactDetails));
public createContact$ = this.store.pipe(select(createContact));
public updateContact$ = this.store.pipe(select(updateContact));
public removeContact$ = this.store.pipe(select(removeContact));

// TODO emit delete and create with subject and move logic to service

  constructor(
    private contactsService: ContactsService,
    private ref: DynamicDialogRef,
    private store: Store
    ) {
     this.contactsService.configDynamic.data.accept = this.updateContact;
     this.contactData = this.contactsService.configDynamic.data.contactData;
     this.contact = new FormGroup(
       {
        id:  new FormControl(this.contactData?._id || ''),
        name: new FormControl(this.contactData?.name || ''),
        phone: new FormControl(this.contactData?.phone || ''),
        iban: new FormControl(this.contactData?.iban || ''),
        email: new FormControl(this.contactData?.email || ''),
       }
     )
  }

  getContact() {
    console.log(this.contact.getRawValue())
    return this.contact.getRawValue()
  }

  updateContact() {
    if(this.contactData) { //if contact exists update
      this.store.dispatch(ContactsActions.updateContact.init({id: this.getContact().id, content: this.getContact()}))
      this.updateContact$.subscribe(val => {
      this.ref.close();
      this.store.dispatch(ContactsActions.getContacts.init());
    })
    } else { //else create new contact
      this.store.dispatch(ContactsActions.createContact.init(this.getContact()));
      this.createContact$.subscribe(val => {
      this.ref.close();
      this.store.dispatch(ContactsActions.getContacts.init());
      })
    }
  }

  cancelUpdate() {
    this.ref.close();
  }

  deleteContact() {
    this.store.dispatch(ContactsActions.removeContact.init()); // TODO fix remove contact
  }
}
