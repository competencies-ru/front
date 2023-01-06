import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Loader } from '@ui/Loader';

const Main = React.lazy(() =>
  import('./components/Main').then((component) => ({ default: component.Main }))
);
const Form = React.lazy(() =>
  import('./components/Form').then((component) => ({ default: component.Form }))
);

const Program = () => (
  <React.Suspense fallback={<Loader />}>
    <Routes>
      <Route path="">
        <Route index element={<Main />} />
        <Route path="new" element={<Form />} />
        {/* <Route path=":id" element={<Form />} /> */}
      </Route>
    </Routes>
  </React.Suspense>
);

export default React.memo(Program);
