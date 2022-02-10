import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BoardType } from './types';
import createCtx from './util/createCtx';
import { User } from 'firebase/auth';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const initialState: BoardType = {
  crateOrder: [],
  crates: {},
  records: {},
  id: '',
};
export const [BoardDataCtx, BoardDataProvider] =
  createCtx<BoardType>(initialState);

export const [AuthCtx, AuthProvider] = createCtx<User | null>(null);

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'blue.100',
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BoardDataProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BoardDataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
