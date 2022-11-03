import { combine, createDomain, sample, split } from 'effector';

import { getMonthCalendar } from './helpers';

const calendarDomain = createDomain('calendar domain');

const setMonth = calendarDomain.createEvent<number>();
const checkMonth = calendarDomain.createEvent<number>();

const setYear = calendarDomain.createEvent<number>();

const decMonth = calendarDomain.createEvent();
const incMonth = calendarDomain.createEvent();

const decYearWithMonth = calendarDomain.createEvent();
const incYearWithMonth = calendarDomain.createEvent();

const setDay = calendarDomain.createEvent<Date>();

const $currentYear = calendarDomain
  .createStore<number>(new Date().getFullYear())
  .on(setYear, (_, year) => year)
  .on(setDay, (_, date) => date.getFullYear())
  .on(decYearWithMonth, (currentYear) => currentYear - 1)
  .on(incYearWithMonth, (currentYear) => currentYear + 1);

const $currentMonth = calendarDomain
  .createStore<number>(new Date().getMonth())
  .on(decMonth, (currentMonth) => (currentMonth === 0 ? 11 : currentMonth - 1))
  .on(incMonth, (currentMonth) => (currentMonth === 11 ? 0 : currentMonth + 1))
  .on(setMonth, (_, month) => month)
  .on(decYearWithMonth, () => 11)
  .on(incYearWithMonth, () => 0)
  .on(setDay, (_, date) => date.getMonth());

const $currentDay = calendarDomain
  .createStore<number>(new Date().getDate())
  .on(setDay, (_, date) => date.getDate())
  .on([$currentMonth.updates, $currentYear.updates], () => 1)
  .on([incMonth, decMonth], () => 1);

const $monthCalendar = calendarDomain.createStore<Date[]>(getMonthCalendar());

const $monthWithYear = combine({
  currentMonth: $currentMonth,
  currentYear: $currentYear,
});

sample({
  clock: decMonth,
  source: $monthWithYear,
  fn: ({ currentMonth, currentYear }) => (currentMonth === 11 ? currentYear - 1 : currentYear),
  target: $currentYear,
});

sample({
  clock: incMonth,
  source: $monthWithYear,
  fn: ({ currentMonth, currentYear }) => (currentMonth === 0 ? currentYear + 1 : currentYear),
  target: $currentYear,
});

split({
  source: checkMonth,
  match: {
    decYear: (month) => month === -1,
    incYear: (month) => month === 12,
  },
  cases: {
    decYear: decYearWithMonth,
    incYear: incYearWithMonth,
    __: setMonth,
  },
});

sample({
  clock: [$currentDay.updates, $currentMonth.updates, $currentYear.updates],
  source: $monthWithYear,
  fn: ({ currentMonth, currentYear }) => getMonthCalendar(currentYear, currentMonth),
  target: $monthCalendar,
});

export const calendarModel = {
  $calendar: combine({
    currentDay: $currentDay,
    currentMonth: $currentMonth,
    currentYear: $currentYear,
    monthCalendar: $monthCalendar,
  }),
  input: {
    setMonth: checkMonth,
    setYear,
    decMonth,
    incMonth,
    setDay,
  },
};
