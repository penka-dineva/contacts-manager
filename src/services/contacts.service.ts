import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) { }

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
    return this.http.delete<boolean>(`${this.url}/delete-contact/${contactId}`)
  }
}
