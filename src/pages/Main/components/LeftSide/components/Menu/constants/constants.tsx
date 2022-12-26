import React from 'react';

import { Role } from 'types/user';

import BankIcon from '../assets/bank.svg';
import CalendarIcon from '../assets/calendar.svg';
import DegreeIcon from '../assets/degree.svg';
import IndicatorIcon from '../assets/indicator.svg';
import MenuIcon from '../assets/menu.svg';
import ProfileIcon from '../assets/profile.svg';
import UGSNIcon from '../assets/ugsn.svg';
// import { ReactComponent as Bank } from '../assets/bank.svg';
// import { ReactComponent as CalendarIcon } from '../assets/calendar.svg';
// import { ReactComponent as MenuIcon } from '../assets/menu.svg';
// import { ReactComponent as ProfileIcon } from '../assets/profile.svg';

interface IMenuItem {
  name: string;
  path: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  children?: string[];
}

type MenuItemsByRole = {
  [key in Role]: IMenuItem[];
};

const TEACHER_MENU_ITEMS: IMenuItem[] = [
  {
    name: 'Главная',
    path: '/',
    Icon: MenuIcon,
  },
  {
    name: 'Календарь',
    path: '/calendar',
    Icon: CalendarIcon,
  },
  {
    name: 'Профиль',
    path: '/profile',
    Icon: ProfileIcon,
  },
  {
    name: 'Банки вопросов',
    path: '/bank',
    Icon: BankIcon,
    children: ['/new', '/edit'],
  },
  {
    name: 'Индикаторы',
    path: '/indicator',
    Icon: IndicatorIcon,
    children: ['/new', '/edit'],
  },
  {
    name: 'Уровни',
    path: '/level',
    Icon: DegreeIcon,
    children: ['/new', '/edit'],
  },
  {
    name: 'УГСН',
    path: '/ugsn',
    Icon: UGSNIcon,
    children: ['/new', '/edit'],
  },
];

const STUDENT_MENU_ITEMS: IMenuItem[] = [
  {
    name: 'Главная',
    path: '/',
    Icon: MenuIcon,
  },
  {
    name: 'Календарь',
    path: '/calendar',
    Icon: CalendarIcon,
  },
  {
    name: 'Профиль',
    path: '/profile',
    Icon: ProfileIcon,
  },
];

export const MENU_ITEMS: MenuItemsByRole = {
  [Role.Student]: STUDENT_MENU_ITEMS,
  [Role.Teacher]: TEACHER_MENU_ITEMS,
};
