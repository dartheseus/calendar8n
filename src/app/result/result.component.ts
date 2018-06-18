import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Moment from 'moment';
import { MonthCalendar } from '../objects/month.calendar';
import { DayCalendar } from '../objects/day.calendar';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {


  monthsToBeDisplayed: MonthCalendar[] = new Array();

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams
      .subscribe(params => {
        this.calendarsRender(params);
      });
  }

  calendarsRender(params) {
    const fromDate = Moment(params.date, 'MM-DD-YYYY');
        const months = [];
        const startMonth = fromDate.format('MMMM YYYY');
        months.push(startMonth);
        let monthCalendar: MonthCalendar = new MonthCalendar();
        let dayCalendar: DayCalendar = new DayCalendar();
        monthCalendar.name = startMonth;
        let _indexWeeks = 0;
        monthCalendar.days[_indexWeeks] = new Array();
        // Padding invalid days at the beggining of the month
        this.initPadding(fromDate, monthCalendar);
        for (let _i = 0; _i < params.n_days; _i++) {
          const day = fromDate.clone();
          day.add(_i, 'days');
          console.log(day.date());
          console.log(day.day());
          console.log(day.format('MMMM YYYY'));
          dayCalendar = new DayCalendar();
          dayCalendar.day = day.date();
          dayCalendar.day_of_the_week = day.day();
          if (day.day() === 0 && _i !== 0) {
            _indexWeeks++;
            monthCalendar.days[_indexWeeks] = new Array();
          }
          if (!months.includes(day.format('MMMM YYYY'))) {
            this.monthsToBeDisplayed.push(monthCalendar);
            _indexWeeks = 0;
            months.push(day.format('MMMM YYYY'));
            monthCalendar = new MonthCalendar();
            monthCalendar.days[_indexWeeks] = new Array();
            monthCalendar.name = day.format('MMMM YYYY');

          }
          console.log(monthCalendar);
          monthCalendar.days[_indexWeeks].push(dayCalendar);
        }
        // Padding invalid days at the end of the month
        this.endPadding(_indexWeeks, dayCalendar, monthCalendar);
  }

  initPadding(fromDate, monthCalendar) {
    for (let indexDay = 0; indexDay < fromDate.day(); indexDay++) {
      const dc: DayCalendar = new DayCalendar();
      dc.day_of_the_week = indexDay;
      // index of the week must be zero at the beggining
      monthCalendar.days[0].push(dc);
    }
  }

  endPadding(_indexWeeks, dayCalendar, monthCalendar) {
    for (let indexDay = dayCalendar.day_of_the_week; indexDay < 6; indexDay++) {
      const dc: DayCalendar = new DayCalendar();
      dc.day_of_the_week = indexDay;
      monthCalendar.days[_indexWeeks].push(dc);
    }
    this.monthsToBeDisplayed.push(monthCalendar);
  }

}