import React from 'react';

import { StudentMainButton, TeacherMainButton } from './components';

class StyledMainButton extends React.Component {
  static Student = StudentMainButton;

  static Teacher = TeacherMainButton;
}

export default StyledMainButton;
