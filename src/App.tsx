import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CheckScreen, CustomRouter } from '@components';
import { Layout, Loader } from '@ui';

const Login = React.lazy(() => import('@pages/Login').then((page) => ({ default: page.Login })));
const Main = React.lazy(() => import('@pages/Main').then((page) => ({ default: page.Main })));

import { history } from './utils';

const App = () => {
  return (
    <CheckScreen>
      <Layout>
        <React.Suspense fallback={<Loader />}>
          <CustomRouter history={history}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Main />} />
            </Routes>
          </CustomRouter>
        </React.Suspense>
      </Layout>
      <ToastContainer theme="light" />
    </CheckScreen>
  );
};

export default App;
