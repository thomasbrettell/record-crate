import { Routes, Route, Navigate } from 'react-router-dom';
import BoardPage from './Pages/BoardPage';
import SignUpPage from './Pages/SignUpPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/sign-up' />} />
      <Route path='/:slug' element={<BoardPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
