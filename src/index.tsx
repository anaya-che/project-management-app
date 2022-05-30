import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './utils/i18n';
import Preloader from './components/preloader';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Suspense fallback={<Preloader />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
