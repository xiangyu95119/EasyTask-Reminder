import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-print',
  templateUrl: './task-print.component.html',
  styleUrls: ['./task-print.component.scss']
})
export class TaskPrintComponent implements OnInit {

  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;

  constructor() {
    this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
    this.printStyle =
      `
      th, td {
        color: black !important;
     }
     `;
  }

  printComplete() {
    this.printBtnBoolean = true;
  }

  beforePrint() {
    this.printBtnBoolean = false;
  }


  ngOnInit() {
  }

}
