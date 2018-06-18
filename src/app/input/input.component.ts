import { Component, OnInit } from '@angular/core';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


const now = new Date();

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  model: NgbDateStruct;
  date: { year: number, month: number };

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    const formattedDate = form.value.date.month + '/' + form.value.date.day + '/' + form.value.date.year;
    this.router.navigate(['/result'],
      { queryParams: { date: formattedDate, n_days: form.value.n_days, country_code: form.value.country_code } });
  }
}