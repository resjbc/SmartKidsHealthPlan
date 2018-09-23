import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IModel } from './interfaces';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  plans: IModel[] = [];

  ages = [1, 2, 4, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60];

  private myDatePickerOptions: IMyOptions = {
    todayBtnTxt: 'วันนี้',
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: true,
    //firstDayOfWeek: 'mo',
    showWeekNumbers: true,
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    editableDateField: false,
    showSelectorArrow: true,
    showInputField: true,
    //disableUntil: {year: 2016, month: 8, day: 10},
    selectionTxtFontSize: '16px',

  };
  private myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.

      myDate: ['', Validators.required]
      // other controls are here...
    });

    let today = new Date().toLocaleDateString();
    console.log(today);

    let todays = new Date().toISOString().slice(0, 10)

    console.log(todays)


  }


  setDate(): void {
    // Set today date using the setValue function
    let date = new Date();
    this.myForm.setValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the setValue function
    this.myForm.setValue({ myDate: '' });
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    console.log(event);

    this.plans.splice(0, this.plans.length);

    this.plans.push(
      {
        ageLength: 1,
        age: 0,
        visit_date: new Date(event.jsdate),
        activity: "0"
      });

    let month = new Date(event.date.year + '-' + event.date.month + '-' + event.date.day);
    let length;
    //console.log(length);
    let nextmonth;
    let ageLength;

    //console.log(this.plans);




    for (let i = 1; i <= 60; i++) {

      nextmonth = month;
      length = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      //console.log(length);
      nextmonth.setDate(month.getDate() + length);



      if (nextmonth.getDay() == 6) {
        nextmonth.setDate(nextmonth.getDate() + 2);
        //console.log(nextmonth);

      }
      else if (nextmonth.getDay() == 0) {
        nextmonth.setDate(nextmonth.getDate() + 1);
        //console.log(nextmonth);
      }

      if (i >= 1 && i <= 12) ageLength = 1;
      else if (i >= 15 && i <= 24) ageLength = 2;
      else if (i >= 27 && i <= 36) ageLength = 3;
      else if (i >= 39 && i <= 48) ageLength = 4;
      else if (i >= 51 && i <= 60) ageLength = 5;


      if (this.ages.indexOf(i) >= 0) {
        this.plans.push(
          {
            ageLength: ageLength,
            age: i,
            visit_date: new Date(nextmonth),
            activity: i + ""
          });
      }

      month = nextmonth;
    }

    console.log(this.plans);
  }



}
