import { ActivatedRoute } from '@angular/router';
import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class utillityService {

  constructor(
    public route: ActivatedRoute,
  ) { }

  // get presentage value
  getpreviousDayValue(newvalue: any, oldValue: any) {
    const a = Number(newvalue)
    const b = Number(oldValue)
    if (a == b || a == 0 || b == 0) return 0;
    const val = a < b ? ((b - a) / b) * 100 : ((a - b) / a) * 100;
    return Math.round(val * 100) / 100
  }

  // convert to time stemp
  getUnixTimeStamp(time:any) {
    return moment(time).unix() * 1000;
  }

  // Create our array of values we want to pass as a query parameter
  createArrayOfValues(arry:any) {
    let arrayOfValues = arry;
    return JSON.stringify(arrayOfValues);
  }

  getQueryParams() {
    let queryParams
    const type = this.route.snapshot?.queryParams?.['type']
    if (type == 'home') {
      return queryParams = {
        customerIds: JSON.parse(this.route.snapshot?.queryParams?.['customerIds']),
        prefectureIds: JSON.parse(this.route.snapshot?.queryParams?.['prefectureIds']),
        startTime: Number(this.route.snapshot?.queryParams?.['startTime']),
        endTime: Number(this.route.snapshot?.queryParams?.['endTime']),
      }
    }
    else {
      return queryParams = {
        customerIds: JSON.parse(this.route.snapshot?.queryParams?.['customerIds']),
        countryIds: JSON.parse(this.route.snapshot?.queryParams?.['countryIds']),
        prefectureIds: JSON.parse(this.route.snapshot?.queryParams?.['prefectureIds']),
        siteIds: JSON.parse(this.route.snapshot?.queryParams?.['siteIds']),
        startTime: Number(this.route.snapshot?.queryParams?.['startTime']),
        endTime: Number(this.route.snapshot?.queryParams?.['endTime']),
      }
    }

  }

  // Params for last 24 hours

  getLast24Hour() {
    const dates = {
      startTime: moment().subtract(24, 'hours').set({ minutes: 0, seconds: 0 }),
      endTime: moment().subtract(1, 'hours').set({ minutes: 59, seconds: 0 })
    }
    return dates
  }

  gethistoricalLast24Hour() {
    const dates = {
      historicalStartTime: moment().subtract(24, 'hours').subtract(24, 'hours').set({ minutes: 0, seconds: 0 }),
      historicalEndTime: moment().subtract(1, 'hours').set({ minutes: 0 }).subtract(24, 'hours').set({ minutes: 59, seconds: 0 })
    }
    return dates
  }

//Params for Today

  getTodayDates() {
    const dates = {
      startTime: moment().set({ hours: 0, minutes: 0, seconds: 0 }),
      endTime: moment().subtract(1, 'hours').set({ minutes: 59, seconds: 0 }),
      historicalStartTime: moment().subtract(1, 'days').startOf('day'),
      historicalEndTime: moment().subtract(1, 'days').endOf('day'),
    }
    return dates
  }

  //Params for Month

  getMonthlyDates() {
    const dates = {
      startDate: moment().startOf('month').set({ hours: 0, minutes: 0 }),
      endDate: moment().subtract(1, 'hours').set({ minutes: 59, seconds: 0 }),
      historicalStartTime: moment().subtract(1, 'month').startOf('month').set({ hours: 0, minutes: 0 }),
      historicalEndTime: moment().subtract(1, 'month').endOf('month').set({ hours: 23, minutes: 59, seconds: 0 })
    }
    return dates
  }

  //Params for Year

  getYearToDate() {
    const dates = {
      startDate: moment().startOf('year').set({ hours: 0, minutes: 0 }),
      endDate: moment().subtract(1, 'hours').set({ minutes: 59, seconds: 0 }),
      historicalStartTime: moment().subtract(1, 'year').startOf('year').set({ hours: 0, minutes: 0 }),
      historicalEndTime: moment().subtract(1, 'year').endOf('year').set({ hours: 23, minutes: 59 })
    }
    return dates
  }

  //Params for Week

  getWeekToDate() {
    const dates = {
      startDate: moment().startOf('isoWeek').set({ hours: 0, minutes: 0 }),
      endDate: moment().subtract(1, 'hours').set({ minutes: 59, seconds: 0 }),
      historicalStartTime: moment().subtract(1, 'weeks').startOf('isoWeek').set({ hours: 0, minutes: 0 }),
      historicalEndTime: moment().subtract(1, 'weeks').endOf('isoWeek').set({ hours: 23, minutes: 59 })
    }
    return dates
  }

  //Params for Last Year

  getLastYear() {
    const dates = {
      startDate: moment().subtract(1, 'year').startOf('year').set({ hours: 0, minutes: 0 }),
      endDate: moment().subtract(1, 'year').endOf('year').set({ hours: 23, minutes: 59 }),
      historicalStartTime: moment().subtract(2, 'year').startOf('year').set({ hours: 0, minutes: 0 }),
      historicalEndTime: moment().subtract(2, 'year').endOf('year').set({ hours: 23, minutes: 59 })
    }
    return dates
  }
}

