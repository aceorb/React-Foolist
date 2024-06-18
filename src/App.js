import { Provider } from 'react-redux';
import React from "react";
import "./styles.css";
import store from './store';

import FooListContainer from './containers/FooList';

export default function App() {
  return (
    <Provider store={store}>
      <FooListContainer />
    </Provider>
  );
}
