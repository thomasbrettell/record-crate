import { useContext } from 'react';
import { UserDataCtx } from '..';
import { auth } from '../firebaseClient';

const useIsAuthed = () => {
  const { state: userData } = useContext(UserDataCtx);
  return auth.currentUser && auth.currentUser.uid === userData?.uid;
};

export default useIsAuthed;
