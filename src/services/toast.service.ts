import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  addSuccessMessage(msg: string) {
    this.messageService.add({severity:'success', summary: msg});
  }

  addErrorMessage(msg: string) {
    this.messageService.add({severity:'error', summary: msg});
  }

  clearMessage() {
    this.messageService.clear(); 
  }
}
