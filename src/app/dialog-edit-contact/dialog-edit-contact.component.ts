import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Contact } from 'src/models/contact';
import { ContactsService } from 'src/services/contacts.service';
import { ToastService } from 'src/services/toast.service';
import { validateIban } from '../../utils/validators-utils';
@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.css'],
})
export class DialogEditContactComponent implements OnInit {
public contactData: Contact;
public contactForm!: FormGroup;

  constructor(
    private contactsService: ContactsService,
    private ref: DynamicDialogRef,
    private toastService: ToastService
    ) {
     this.contactsService.configDynamic.data.accept = this.updateContact;
     this.contactData = this.contactsService.configDynamic.data.contactData;
  
  }

  ngOnInit() {
    this.contactForm = new FormGroup(
      {
       id:  new FormControl(this.contactData?._id || ''),
       firstName: new FormControl(
         this.contactData?.firstName || '',
         [
           Validators.required,
           Validators.pattern("^[A-Z]'?[-a-zA-Z]+$"),
           Validators.minLength(2),
           Validators.maxLength(10)
         ]),
       lastName: new FormControl(
         this.contactData?.lastName || '',
         [
           Validators.required,
           Validators.pattern("^[A-Z]'?[-a-zA-Z]+$"),
           Validators.minLength(2),
           Validators.maxLength(10)
       ]),
       phone: new FormControl(
         this.contactData?.phone || '',
       [
         Validators.required,
         Validators.pattern("^[0-9]*$"),
         Validators.minLength(10),
         Validators.maxLength(20)
     ]),
       iban: new FormControl(this.contactData?.iban || '',
       [
         validateIban()
     ]),
       address: new FormControl(this.contactData?.address || ''),
       dob: new FormControl(this.contactData?.dob || ''),
      }
    )
  }

  getContact() {
    return this.contactForm.getRawValue()
  }

  updateContact() {
    if (this.contactForm.valid) {
      this.contactsService.handleUpdateContact(this.getContact());
      this.ref.close();
      return
    }
    this.toastService.addErrorMessage('Invalid input data');
  }

 
  cancelUpdate() {
    this.ref.close();
  }
}
