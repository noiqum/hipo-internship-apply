import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,

} from "react-router-dom";
import { GlobalProvider } from './context/globalContext';


ReactDOM.render(
  <Router>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </Router>
  ,
  document.getElementById('root')
);


