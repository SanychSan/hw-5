import { Pipe, PipeTransform } from '@angular/core';

function _plural(k: number, name: string): string {
  return k > 1 ? `${name}s` : name;
}

interface IFullUnit {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

@Pipe({
  name: 'elapsed',
  pure: false
})
export class ElapsedPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const {
        years, months, days,
        hours, minutes, seconds
    } = this._getFullElapsedUnit(new Date(), new Date(value));

    let elapsed: string;

    if (years > 0) {
      elapsed = this._yearsAgo(years, months);

    } else if (months > 0) {
      elapsed = this._monthsAgo(months, days);

    } else if (days > 0) {
      elapsed = this._daysAgo(days);

    } else if (hours > 0) {
      elapsed = this._hoursAgo(hours);

    } else if (minutes > 0) {
      elapsed = this._minutesAgo(minutes);

    } else if (seconds > 0) {
      elapsed = this._secondsAgo(seconds);

    } else if (seconds === 0) {
      elapsed = 'a moment ago';

    } else {
      elapsed = 'in future';
    }

    return elapsed;
  }

  private _yearsAgo(years: number, months: number): string {
    let elapsed = `${years} ${_plural(years, 'year')}`;

    if (months > 0) {
      elapsed = `${elapsed} and ${months} ${_plural(months, 'month')}`
    }

    elapsed = `${elapsed} ago`;
    return elapsed;
  }

  private _monthsAgo(months: number, days: number): string {
    let elapsed = `${months} ${_plural(months, 'month')}`;

    if (days > 0) {
      elapsed = `${elapsed} and ${days} ${_plural(days, 'days')}`
    }

    elapsed = `${elapsed} ago`;

    return elapsed;
  }

  private _daysAgo(days: number): string {
    return `${days} ${_plural(days, 'day')} ago`;
  }

  private _hoursAgo(hours: number): string {
    return `${hours} ${_plural(hours, 'hour')} ago`;
  }

  private _minutesAgo(minutes: number): string {
    return `${minutes} ${_plural(minutes, 'minute')} ago`;
  }

  private _secondsAgo(seconds: number): string {
    return `${seconds} ${_plural(seconds, 'second')} ago`;
  }

  private _getFullElapsedUnit(now: Date, past: Date): IFullUnit {
    const deltaTime = now.getTime() - past.getTime(),

          seconds = Math.floor(deltaTime / 1000),
          minutes = Math.floor(deltaTime / (60 * 1000)),
          hours   = Math.floor(deltaTime / (60 * 60 * 1000));

    let days    = Math.floor(deltaTime / (24 * 60 * 60 * 1000)),
        months  = 0,
        years   = 0;

    if (days > 28) {
      const nowDate   = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let   pastDate  = new Date(past.getFullYear(), past.getMonth(), past.getDate());

      if (pastDate < nowDate) {
        while (pastDate < nowDate) {
          years++;
          pastDate = new Date(pastDate.getFullYear() + 1, pastDate.getMonth(), pastDate.getDate());
        }

        if (pastDate > nowDate) {
          years--;
          pastDate = new Date(pastDate.getFullYear() - 1, pastDate.getMonth(), pastDate.getDate());
        }
      }

      if (pastDate < nowDate) {
        while (pastDate < nowDate) {
          months++;
          pastDate = new Date(pastDate.getFullYear(), pastDate.getMonth() + 1, pastDate.getDate());
        }

        if (pastDate > nowDate) {
          months--;
          pastDate = new Date(pastDate.getFullYear(), pastDate.getMonth() - 1, pastDate.getDate());
        }
      }

      if (pastDate < nowDate) {
        while (pastDate < nowDate) {
          days++;
          pastDate = new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate() + 1);
        }

        if (pastDate > nowDate) {
          days--;
        }
      }
    }

    return { years, months, days, hours, minutes, seconds };
  }

}
