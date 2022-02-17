import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BoardType } from './types';
import createCtx from './util/createCtx';
import { User } from 'firebase/auth';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { UserType } from './types';

const initialState: BoardType = {
  crateOrder: null,
  crates: {},
  records: {},
  id: '',
};
export const [BoardDataCtx, BoardDataProvider] =
  createCtx<BoardType>(initialState);

export const [AuthCtx, AuthProvider] = createCtx<User | null>(null);

export const [UserDataCtx, UsrDataProvider] = createCtx<UserType | null>(null);

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'blue.100',
        overflow: 'hidden',
        height: '100%',
      },
      '#root': {
        height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BoardDataProvider>
        <UsrDataProvider>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </UsrDataProvider>
      </BoardDataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
