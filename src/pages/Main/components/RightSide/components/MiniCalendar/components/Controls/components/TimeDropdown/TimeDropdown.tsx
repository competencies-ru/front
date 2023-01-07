import React from 'react';

import { YearDropdown, MonthDropdown } from './components';

class TimeDropdown extends React.PureComponent {
  static Year = YearDropdown;

  static Month = MonthDropdown;
}

export default TimeDropdown;
