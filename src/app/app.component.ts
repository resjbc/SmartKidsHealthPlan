import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IModel } from './interfaces';
import * as html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { list } from './shareds/list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  ages: any;

  plans: IModel[] = [];



  showPlan: boolean = false;


  public myDatePickerOptions: IMyOptions = {
    todayBtnTxt: 'วันนี้',
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: true,
    //firstDayOfWeek: 'mo',
    showWeekNumbers: true,
    sunHighlight: true,
    inline: true,
    editableDateField: false,
    showSelectorArrow: true,
    showInputField: true,
    //disableUntil: {year: 2016, month: 8, day: 10},
    selectionTxtFontSize: '16px',

  };
  public myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {

    this.ages = list;
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.
      name: [''],
      address: [''],
      myDate: ['', Validators.required]
      // other controls are here...
    });
    /*
        let today = new Date().toLocaleDateString();
        console.log(today);
    
        let todays = new Date().toISOString().slice(0, 10)
    
        console.log(todays)*/


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

    this.myForm.get
  }

  clearDate(): void {
    // Clear the date using the setValue function
    this.myForm.setValue({ myDate: '' });
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    //if()
    //console.log(event);
    this.plans.splice(0, this.plans.length);

    if (event.epoc == 0) {
      this.showPlan = false;
      return;
    }


    this.plans.push(
      {
        ageLength: 1,
        age: "แรกเกิด",
        visit_date: new Date(event.jsdate),
        activity: this.ages[61]
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


      if (this.ages[i]) {
        this.plans.push(
          {
            ageLength: ageLength,
            age: i + " เดือน",
            visit_date: new Date(nextmonth),
            activity: this.ages[i]
          });
      }

      month = nextmonth;
    }

    this.showPlan = true;
    //console.log(this.plans);
  }

  YearThai(year: any) {
    return parseInt(year) + 543;
  }

  public print() {
    let data = document.getElementById('convert');
    let todayy = new Date();
    let dd: any = todayy.getDate();
    let mm: any = todayy.getMonth() + 1; //January is 0!
    let yyyy: any = todayy.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
     let today = dd + '-' + mm + '-' + (yyyy+543);

    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('landscape', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 3, 6, 295, 205);
      pdf.setDisplayMode("99");
      pdf.autoPrint();
      pdf.save(`${this.myForm.controls.name.value ? 'SmartKid_' + this.myForm.controls.name.value : 'SmartKid_' + today}.pdf`);
    });
  }


}
