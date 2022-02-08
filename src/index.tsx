import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BoardType } from './types';
import createCtx from './util/createCtx';

const initialState: BoardType = {
  crateOrder: [],
  crates: {},
  records: {},
  id: '',
};
export const [BoardDataCtx, BoardDataProvider] =
  createCtx<BoardType>(initialState);

ReactDOM.render(
  <React.StrictMode>
    <BoardDataProvider>
      <App />
    </BoardDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
