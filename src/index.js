import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD
import { App } from './App';


Array.prototype.findById = function (id) {
  var i = 0;
  while (i < this.length && this[i].id !== id) { i++ }
  return ((i === this.length) ? null : this[i]);
}

Array.prototype.removeById = function (id) {
  var i = 0;
  while (i < this.length && this[i].id !== id) { i++ }
  if (i < this.length) {
    this.splice(i, 1)
    return true;
  } else {
    return false;
  }
};

Array.prototype.indexOfId = function (id) {
  var i = 0;
  while (i < this.length && this[i].id !== id) { i++ }
  return i === this.length ? null : i;
};

var scale = "scale(1)";
=======
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> master

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<<<<<<< HEAD
=======
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> master
