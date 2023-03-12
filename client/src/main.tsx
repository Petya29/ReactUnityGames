import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import './lib/i18n';
import { LoadingScreen } from './components/utils/LoadingScreen';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<LoadingScreen />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
)
