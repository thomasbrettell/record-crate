import { useEffect, useContext, useState } from 'react';
import Board from './components/Board';
import { database } from './firebaseClient';
import { ref, onValue, set } from 'firebase/database';
import { BoardDataCtx } from '.';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseClient';
import { AuthCtx } from '.';

function App() {
  const [loading, setLoading] = useState(true);
  const { state: boardData, update: setBoardData } = useContext(BoardDataCtx);
  const { state: authState, update: setAuthState } = useContext(AuthCtx);

  useEffect(() => {
    const fetchData = async () => {
      const boardRef = ref(
        database,
        `boards/${process.env.REACT_APP_ENV}-board`
      );

      onValue(boardRef, (snapshot) => {
        const data = snapshot.val();
        setBoardData(data);
        if (loading) setLoading(false);
        if (!data) {
          set(boardRef, {
            id: `${process.env.REACT_APP_ENV}-board`,
          });
        }
      });

      onAuthStateChanged(auth, (user) => {
        setAuthState(user);
      });
    };
    fetchData();
  }, [setBoardData, loading, setAuthState]);

  if (loading) {
    return <pre>Loading...</pre>;
  }

  console.log(`Signed in: ${!!authState}`);
  console.log(boardData);

  return <Board />;
}

export default App;
