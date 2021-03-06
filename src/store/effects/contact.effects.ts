import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, filter, tap } from 'rxjs';
import { ContactsService } from 'src/services/contacts.service';
import * as ContactActions from '../actions/contact.actions';
import { Contact } from 'src/models/contact';


@Injectable({providedIn: 'root'})
export class ContactsEffects {
  getContacts$ = createEffect(() => this.actions$
  .pipe(
    ofType(ContactActions.getContacts.init),
    switchMap(() => this.contactsService.getContacts()
    .pipe(
      map((resp: Contact[]) =>  ContactActions.getContacts.success(resp)
      ),
      catchError((err: any) => of(ContactActions.getContacts.failed(err)))))))

    getContactDetails$ = createEffect(() => this.actions$
    .pipe(
      ofType(ContactActions.getContactDetails.init),
      map(x => x.payload as string),
      switchMap((contactId) => this.contactsService.getContactDetails(contactId)
      .pipe(
        map((resp: any) => ContactActions.getContactDetails.success(resp)),
        catchError((err: any) => of(ContactActions.getContactDetails.failed(err)))))))

    createContact$ = createEffect(() => this.actions$
    .pipe(
      ofType(ContactActions.createContact.init),
      map(x => x.payload as Contact),
      switchMap((request) => this.contactsService.createContacts(request)
      .pipe(
        map((resp: any) => ContactActions.createContact.success(resp)),
        catchError((err: any) => of(ContactActions.createContact.failed(err)))))))


    updateContact$ = createEffect(() => this.actions$
    .pipe(
      ofType(ContactActions.updateContact.init),
      map(x => x.payload),
      filter(val => val!.id?.length > 0),
      switchMap((payload) => this.contactsService.updateContact(payload!.id , payload!.content)
      .pipe(
        map((resp: any) => ContactActions.updateContact.success(resp)),
        catchError((err: any) => of(ContactActions.updateContact.failed(err)))))))
 

        removeContacts$ = createEffect(() => this.actions$
        .pipe(
          ofType(ContactActions.removeContact.init),
          map(x => x.payload as string),
          switchMap((request) =>  this.contactsService.removeConact(request)
          .pipe(
            map((resp: any) => ContactActions.removeContact.success(resp)),
            catchError((err: any) => of(ContactActions.removeContact.failed(err)))))))
   

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService
  ) {}
}