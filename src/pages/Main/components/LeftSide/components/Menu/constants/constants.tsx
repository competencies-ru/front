import React from 'react';

import { Role } from 'types/user';

import Bank from '../assets/bank.svg';
import CalendarIcon from '../assets/calendar.svg';
import MenuIcon from '../assets/menu.svg';
import ProfileIcon from '../assets/profile.svg';
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
    name: 'Банк вопросов',
    path: '/bank',
    Icon: Bank,
    children: ['/new, /edit'],
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
