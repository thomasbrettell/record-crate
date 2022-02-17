import { useEffect, useContext, useState } from 'react';
import Board from '../components/Board';
import { database } from '../firebaseClient';
import { ref, onValue, get } from 'firebase/database';
import { BoardDataCtx, UserDataCtx } from '..';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { AuthCtx } from '..';
import { Spinner, Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BoardType } from '../types';

const BoardPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { state: boardData, update: setBoardData } = useContext(BoardDataCtx);
  const { update: setAuthState } = useContext(AuthCtx);
  const { update: setUserData } = useContext(UserDataCtx);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await (await get(ref(database, 'users'))).val(); //probs do this in a cf instead i guess?
      let targetBoardId = null;
      for (const userId in allUsers) {
        if (allUsers[userId].name === params.username) {
          targetBoardId = allUsers[userId].board_id;
          continue;
        }
      }
      if (!targetBoardId) {
        console.error('cant find board');
        navigate('/sign-up');
        return;
      }

      const boardRef = ref(database, `boards/${targetBoardId}`);

      onValue(boardRef, async (snapshot) => {
        const data: BoardType = snapshot.val();
        setBoardData(data);
        const userRef = ref(database, `users/${data.user_id}`);
        const userData = await (await get(userRef)).val();
        setUserData(userData);
        if (loading) setLoading(false);
      });
    };
    fetchData();
  }, [
    setBoardData,
    loading,
    setAuthState,
    params.username,
    navigate,
    setUserData,
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // const userRef = ref(database, `users/${user?.uid}`);
      // const userData = await (await get(userRef)).val();
      setAuthState(user);
    });
  }, [setAuthState]);

  console.log(boardData);

  if (loading) {
    return (
      <Box
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
      >
        <Spinner thickness='4px' speed='0.65s' color='blue.500' size='xl' />
      </Box>
    );
  }

  return <Board />;
};

export default BoardPage;
