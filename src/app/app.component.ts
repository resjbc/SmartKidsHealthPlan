import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IModel } from './interfaces';
import * as html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { list, SatClinicday, SunClinicday, MonClinicday, TuesClinicday, WedClinicday, thursClinicday, FrisClinicday } from './shareds/list';
import { AlertService } from './shareds/alert.service';
import { PersonService } from './services/person.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  ages: any;

  plans: IModel[] = [];
  dayThai = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  dayClinic: number = 1;
  
  SatClinicday = SatClinicday;
  SunClinicday = SunClinicday;
  MonClinicday = MonClinicday;
  TuesClinicday = TuesClinicday;
  WedClinicday = WedClinicday;
  thursClinicday = thursClinicday;
  FrisClinicday = FrisClinicday;

  showPlan: boolean = false;

  dateModel: IMyDateModel;
  today:any;


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
    private spinnerService: Ng4LoadingSpinnerService,
    private alert: AlertService,
    private person: PersonService
  ) { }

  ngOnInit() {

    this.ages = list;
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.
      name: [''],
      address: [''],
      myDate: ['', Validators.required],
      clinicDay: ['1', Validators.required]
      // other controls are here...
    });

    this.today = new Date()
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
    this.dateModel = event;
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    //if()
    //console.log(this.dateModel);
    this.plans.splice(0, this.plans.length);
    //this.plans = [];
    //console.log(event == null);

    if (event == null || event.epoc == 0) {
      this.showPlan = false;
      return;
    }


    this.plans.push(
      {
        ageLength: 1,
        age: "แรกเกิด",
        dateThai: this.dayThai[new Date(event.jsdate).getDay()],
        visit_date: new Date(event.jsdate),
        activity: this.ages[61]
      });

    //let month = new Date(event.date.year + '-' + event.date.month + '-' + event.date.day);
    let month = new Date(event.date.year, event.date.month - 1, event.date.day);
    let length;
    //console.log(month);
    let nextmonth;
    let ageLength;

    //console.log(this.plans);

    //console.log(month.getDay());


    for (let i = 1; i <= 60; i++) {

      nextmonth = month;
      length = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      //console.log(length);

      nextmonth.setDate(nextmonth.getDate() + length);


      if (nextmonth.getDay() == 6) {
        nextmonth.setDate(nextmonth.getDate() + (this.SatClinicday[this.dayClinic]));
        //console.log(nextmonth);
      }
      else if (nextmonth.getDay() == 0) {
        nextmonth.setDate(nextmonth.getDate() + (this.SunClinicday[this.dayClinic]));
        //console.log(nextmonth);
      }
      else if (nextmonth.getDay() == 4) {
        nextmonth.setDate(nextmonth.getDate() + (this.thursClinicday[this.dayClinic]));
      }
      else if (nextmonth.getDay() == 5) {
        nextmonth.setDate(nextmonth.getDate() + (this.FrisClinicday[this.dayClinic]));
      }
      else if (nextmonth.getDay() == 1) {
        nextmonth.setDate(nextmonth.getDate() + (this.MonClinicday[this.dayClinic]));
      }
      else if (nextmonth.getDay() == 2) {
        nextmonth.setDate(nextmonth.getDate() + (this.TuesClinicday[this.dayClinic]));
      }
      else if (nextmonth.getDay() == 3) {
        nextmonth.setDate(nextmonth.getDate() + (this.WedClinicday[this.dayClinic]));
      }


      if (i >= 1 && i <= 12) ageLength = 1;
      else if (i >= 15 && i <= 24) ageLength = 2;
      else if (i >= 27 && i <= 36) ageLength = 3;
      else if (i >= 39 && i <= 48) ageLength = 4;
      else if (i >= 51 && i <= 60) ageLength = 5;


      if (this.ages[i]) {
        //console.log(nextmonth);
        this.plans.push(
          {
            ageLength: ageLength,
            age: i + " เดือน",
            dateThai: this.dayThai[nextmonth.getDay()],
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

  toDay(){
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
    let today = dd + '/' + mm + '/' + (yyyy + 543);
    return today;
  }

  public print() {
    let data = document.getElementById('convert');
    

    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('landscape', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 3, 6, 295, 205);
      pdf.setDisplayMode("99");
      pdf.autoPrint();
      pdf.save(`${this.myForm.controls.name.value ? this.toDay()+"_"+'SmartKid_' + this.myForm.controls.name.value : 'SmartKid_' +"ไม่ระบุชื่อ_"+ this.toDay()}.pdf`);
    });
  }

  SetClinicDay() {
    this.dayClinic = this.myForm.controls.clinicDay.value;
    this.onDateChanged(this.dateModel);
  }

  onSearchPid(pid: string) {
    if (!parseInt(pid) || !(pid.trim().length == 13)) {
      this.alert.notify('ตรวจสอบหมายเลขบัตรประชาชน');
      return;
    }
    this.person
        .getPerson(pid)
        .then(person => 
          {
            console.log(person);
          })
        .catch(err => this.alert.notify(err.error.Message));

  }


}
