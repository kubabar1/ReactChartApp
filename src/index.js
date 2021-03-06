import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./containers/App.js";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import "./styles/styles.css";

const store = createStore(reducer);

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);
