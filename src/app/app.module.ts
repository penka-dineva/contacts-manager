import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/store/reducers/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from 'src/store/effects/contact.effects';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogEditContactComponent } from './dialog-edit-contact/dialog-edit-contact.component';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    DialogEditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({contacts: reducer}),
    EffectsModule.forRoot([ContactsEffects]),
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
