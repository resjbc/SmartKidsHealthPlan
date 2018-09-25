import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IModel } from './interfaces';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app';

    plans: IModel[] = [];

    ages =
        {
            1: "- รับวัคซีนป้องกันวัณโรคตับอักเสบ B",
            2: `- รับวัคซีนรวมคอตีบ บาดทะยัก ไอกรน ตับอักเสบ B ครั้งที่1 และหยอดโปลีโอ ครั้งที่1 <br/>- <font color=red>โรงเรียนพ่อแม่ คลินิกเด็กดี</font>`,
            4: "- รับวัคซีนรวมคอตีบ บาดทะยัก ไอกรน ตับอักเสบ B ครั้งที่2 และหยอดโปลีโอ ครั้งที่2 ,ฉีดวัคซีนโปลีโอ(IPV) <br/>- <font color=red><font color=red>โรงเรียนพ่อแม่ คลินิกเด็กดี</font></font>",
            6: "- รับวัคซีนรวมคอตีบ บาดทะยัก ไอกรน ตับอักเสบ B ครั้งที่3 และหยอดโปลีโอ ครั้งที่3",
            9: "- รับวัคซีนหัด หัดเยอรมัน คางทูม ครั้งที่1 , คัดกรองพัฒนาการ , ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน , เข้ารับบริการตรวจประเมินสุขภาพครั้งที่1",
            12: "- รับวัคซีนป้องกันโรคไข้สมองอักเสบ ครั้งที่1 , ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน , ประเมินภาวะโภชนาการ และการเจริญเติบโต <br/>- <font color=red>โรงเรียนพ่อแม่ คลินิกเด็กดี</font>",
            15: "- ทาฟลูออไรด์วาร์นิซ",
            18: "- คัดกรองพัฒนาการ , รับวัคซีนรวมคอตีบ บาดทะยัก ไอกรน ตับอักเสบ B ครั้งที่4 และหยอดโปลีโอ ครั้งที่4 , ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน , เข้ารับบริการตรวจประเมินสุขภาพครั้งที่2",
            21: "- ทาฟลูออไรด์วาร์นิซ",
            24: "- ทาฟลูออไรด์วาร์นิซ , ประเมินภาวะโภชนาการ และการเจริญเติบโต<br/>- <font color=red>โรงเรียนพ่อแม่ คลินิกเด็กดี</font>",
            27: "- ทาฟลูออไรด์วาร์นิซ",
            30: "- รับวัคซีนหัด หัดเยอรมัน คางทูม ครั้งที่2 , รับวัคซีนป้องกันโรคไข้สมองอักเสบ ครั้งที่2 , ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน , คัดกรองพัฒนาการ , เข้ารับบริการตรวจประเมินสุขภาพครั้งที่3",
            33: "- ทาฟลูออไรด์วาร์นิซ",
            36: "- ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน , ประเมินภาวะโภชนาการ และการเจริญเติบโต",
            39: "- ทาฟลูออไรด์วาร์นิซ",
            42: "- คัดกรองพัฒนาการ , ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน<br/>- <font color=red>โรงเรียนพ่อแม่ คลินิกเด็กดี</font>",
            45: "- ทาฟลูออไรด์วาร์นิซ",
            48: "- ทาฟลูออไรด์วาร์นิซ , ประเมินภาวะโภชนาการ และการเจริญเติบโต , รับวัคซีนรวมคอตีบ บาดทะยัก ไอกรน และหยอดโปลีโอ ครั้งที่5 , เข้ารับบริการตรวจประเมินสุขภาพครั้งที่4",
            51: "- ทาฟลูออไรด์วาร์นิซ",
            54: "- ทาฟลูออไรด์วาร์นิซ",
            57: "- ทาฟลูออไรด์วาร์นิซ",
            60: "- ทาฟลูออไรด์วาร์นิซ ,ตรวจฟัน , ประเมินภาวะโภชนาการ และการเจริญเติบโต , เข้ารับบริการตรวจประเมินสุขภาพครั้งที่5"
        }

    showPlan: boolean = false;


    private myDatePickerOptions: IMyOptions = {
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
                activity: "- รับวัคซีนป้องกันวัณโรค"
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

    /*print(): void {
      var divToPrint = document.getElementById('print-section');
      var htmlToPrint = '' +
          '<style type="text/css">' +
          'table th, table td {' +
          'border:1px solid #000;' +
          'padding;0.5em;' +
          '}' +
          '</style>';
      htmlToPrint += divToPrint.outerHTML;
      let newWin = window.open("");
      newWin.document.write(htmlToPrint);
      newWin.print();
      newWin.close();
    }*/

    print(): void {
      const elementToPrint = document.getElementById('print-section'); //The html element to become a pdf
      const pdf = new jsPDF('p', 'pt', 'a4');
      pdf.addHTML(elementToPrint, () => {
        pdf.save('web.pdf');
      });
    }


}
