import React from 'react';

import { TaskType } from 'types/bank';

import { OneVariant } from './components';

class Answer extends React.PureComponent {
  static [TaskType.OneVariant] = OneVariant;
}

export default Answer;
