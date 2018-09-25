import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MomentModule } from 'ngx-moment';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import 'moment/locale/th';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerTHModule,
    MomentModule,
    BsDatepickerModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
