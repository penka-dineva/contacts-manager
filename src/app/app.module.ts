import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/store/reducers/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from 'src/store/effects/contact.effects';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({contacts: reducer}),
    EffectsModule.forRoot([ContactsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
