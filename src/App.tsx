import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { CheckScreen, CustomRouter } from '@components';
const Login = React.lazy(() => import('@pages/Login').then((page) => ({ default: page.Login })));
const Main = React.lazy(() => import('@pages/Main').then((page) => ({ default: page.Main })));
import { Layout } from '@ui';

import { history } from './utils';

const App = () => {
  return (
    <CheckScreen>
      <Layout>
        <React.Suspense fallback={<div>Loading</div>}>
          <CustomRouter history={history}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Main />} />
            </Routes>
          </CustomRouter>
        </React.Suspense>
      </Layout>
    </CheckScreen>
  );
};

export default App;
