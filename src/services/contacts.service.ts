import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { Contact } from 'src/models/contact';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditContactComponent } from '../app/dialog-edit-contact/dialog-edit-contact.component';
import { Subject, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as ContactsActions from '../store/actions/contact.actions';
import {
  getContacts,
  getContactDetails,
  createContact,
  updateContact,
  removeContact
 } from 'src/store/selectors/contacts.selectors';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url = 'http://localhost:8000/api';
  public ref!: DynamicDialogRef;
  public configDynamic!: DynamicDialogConfig;

  public getContacts$ = this.store.pipe(select(getContacts));
  public contactDetails$ = this.store.pipe(select(getContactDetails));
  public createContact$ = this.store.pipe(select(createContact));
  public updateContact$ = this.store.pipe(select(updateContact));
  public removeContact$ = this.store.pipe(select(removeContact));
  public contactsLoading$: Observable<boolean> = new Observable();

  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private store: Store,
    private toastService: ToastService
    ) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url)
  }

  getContactDetails(contactId: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/read-contact/${contactId}`)
  }

  createContacts(payload: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.url}/create-contact`, payload)
  }

  updateContact(contactId: string, payload: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.url}/update-contact/${contactId}`, payload)
  }

  removeConact(contactId: string): Observable<any> {
    return this.http.delete(`${this.url}/delete-contact/${contactId}`)
  }

  addContact() {
    this.configDynamic = {
      data: {
        title: `add contact`,
        acceptLabel: 'create',
        rejectLabel: 'cancel',
        contactData: null,
        accept: noop,
        reject: noop
      },
      showHeader: false
    }
    this.dialogService.open(DialogEditContactComponent, this.configDynamic)
  }

  editContact(contact: Contact) {
    this.configDynamic = {
      data: {
        title: `edit ${contact.firstName} ${contact.lastName}`,
        acceptLabel: 'update',
        rejectLabel: 'cancel',
        contactData: contact,
        accept: noop,
        reject: noop
      },
      showHeader: false
    }
    this.dialogService.open(DialogEditContactComponent, this.configDynamic)
  }

  handleUpdateContact(currentContact: Contact) {
    if(this.configDynamic.data.contactData) { //if contact exists update
      this.store.dispatch(ContactsActions.updateContact.init({id: currentContact!.id!, content: currentContact}))
      this.updateContact$
      .subscribe(val => {
        this.toastService.addSuccessMessage('Contact successfully updated');
        this.store.dispatch(ContactsActions.getContacts.init()
      );
    })
    } else { //else create new contact
      this.store.dispatch(ContactsActions.createContact.init(currentContact));
      this.createContact$.subscribe(val => {
      this.toastService.addSuccessMessage('Contact successfully created')
      this.store.dispatch(ContactsActions.getContacts.init());
      })
    }
  }
}
