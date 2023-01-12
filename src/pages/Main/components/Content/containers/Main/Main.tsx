import React from 'react';

const Level = React.lazy(() =>
  import('./containers/Level').then((component) => ({ default: component.Level }))
);

const UGSN = React.lazy(() =>
  import('./containers/UGSN').then((component) => ({ default: component.UGSN }))
);

const Speciality = React.lazy(() =>
  import('./containers/Speciality').then((component) => ({ default: component.Speciality }))
);

const Program = React.lazy(() =>
  import('./containers/Program').then((component) => ({ default: component.Program }))
);

const Competence = React.lazy(() =>
  import('./containers/Competence').then((component) => ({ default: component.Competence }))
);

class Main extends React.PureComponent {
  static Level = Level;

  static UGSN = UGSN;

  static Speciality = Speciality;

  static Program = Program;

  static Competence = Competence;

  render() {
    return null;
  }
}

export default Main;
