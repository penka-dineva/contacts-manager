import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { Contact } from 'src/models/contact';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditContactComponent } from '../app/dialog-edit-contact/dialog-edit-contact.component';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url = 'http://localhost:8000/api';
  public ref!: DynamicDialogRef;
  public configDynamic!: DynamicDialogConfig;

  constructor(private http: HttpClient, private dialogService: DialogService) { }

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

  removeConact(contactId: string) {
    console.log('calling delete contact')
    return this.http.delete<boolean>(`${this.url}/delete-contact/${contactId}`)
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
      showHeader: true
    }
    this.dialogService.open(DialogEditContactComponent, this.configDynamic)
  }

  editContact(contact: Contact) {
    this.configDynamic = {
      data: {
        title: `edit ${contact.name}`,
        acceptLabel: 'update',
        rejectLabel: 'cancel',
        contactData: contact,
        accept: noop,
        reject: noop
      },
      showHeader: true
    }
    this.dialogService.open(DialogEditContactComponent, this.configDynamic)
  }
}
