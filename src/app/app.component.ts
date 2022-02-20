import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact';
import { select, Store } from '@ngrx/store';
import * as ContactsActions from '../store/actions/contact.actions';
import {
  getContacts,
  removeContact
 } from 'src/store/selectors/contacts.selectors';
 import { catchError, map, Observable, of, filter } from 'rxjs';
import { ContactsService } from 'src/services/contacts.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public contactsLoading$: Observable<boolean> = new Observable();
  public contacts$ = this.store.pipe(
    select(getContacts),
    filter(val => !!val.value),
    filter(val => Array.isArray(val.value)),
    map(contacts => {
      this.contactsLoading$ = of(contacts.isLoading);
      return contacts.value as Contact[]
    })
    );
  
  constructor(
    private http: HttpClient,
    private store: Store,
    private contactsService: ContactsService,
    private toastService: ToastService
    ) {}

  ngOnInit(){
   this.store.dispatch(ContactsActions.getContacts.init());
  }

  addContact() {
    this.contactsService.addContact();
  }

  editContact(contact: Contact) {
    this.contactsService.editContact(contact)
  }

  deleteContact(id: string) {
    this.contactsLoading$ = of(true);
    this.contactsService.removeConact(id)
    .pipe(
      (msg)=>  msg,
      catchError(err => {
        this.toastService.addErrorMessage('something went wrong');
        return of(err)
      })
    )
    .subscribe((msg)=>{
      this.contactsLoading$ = of(false);
      this.store.dispatch(ContactsActions.getContacts.init());
          if(msg!.msg) {
            this.toastService.addSuccessMessage('contact successfully deleted')
          } 
    });
  }

  ngOnDsetroy() {
    this.toastService.clearMessage();
  }
}

