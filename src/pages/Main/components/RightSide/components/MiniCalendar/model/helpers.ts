import dayjs from 'dayjs';

import { SIZE_OF_CALENDAR, COUNTS_TO_SUBTRACT_BY_DAY_OF_WEEK } from './constants';

export const getMonthCalendar = (
  year: number = dayjs().year(),
  month: number = dayjs().month()
) => {
  const firstDayOfMonth = dayjs(`${year}.${month + 1}.1`);

  const countOfDayPredMonday = COUNTS_TO_SUBTRACT_BY_DAY_OF_WEEK[firstDayOfMonth.day()];

  return new Array<Date>(SIZE_OF_CALENDAR)
    .fill(firstDayOfMonth.subtract(countOfDayPredMonday, 'd').toDate())
    .map((firstMonday, index) => dayjs(firstMonday).add(index, 'd').toDate());
};
