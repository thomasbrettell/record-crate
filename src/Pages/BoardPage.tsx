import { useEffect, useContext, useState } from 'react';
import Board from '../components/Board';
import { database } from '../firebaseClient';
import { ref, onValue, set, get, query, Query } from 'firebase/database';
import { BoardDataCtx } from '..';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { AuthCtx } from '..';
import { Spinner, Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { state: boardData, update: setBoardData } = useContext(BoardDataCtx);
  const { update: setAuthState } = useContext(AuthCtx);

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
        return;
      }

      const boardRef = ref(database, `boards/${targetBoardId}`);

      onValue(boardRef, (snapshot) => {
        const data = snapshot.val();
        setBoardData(data);
        if (loading) setLoading(false);
      });
    };
    fetchData();
  }, [setBoardData, loading, setAuthState, params.username]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthState(user);
    });
  }, [setAuthState]);

  console.log(boardData)

  if (loading && !boardData) {
    return (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
      </Box>
    );
  }

  return <Board />;
};

export default BoardPage;
