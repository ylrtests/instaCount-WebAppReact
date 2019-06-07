import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./main.css"
import App from './App';
import * as serviceWorker from './serviceWorker';
import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert/dist/sweetalert.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'sweetalert/dist/sweetalert.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
