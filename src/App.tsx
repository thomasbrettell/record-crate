import { useEffect, useContext, useState } from 'react';
import Board from './components/Board';
import { database } from './firebaseClient';
import { ref, onValue, set } from 'firebase/database';
import { BoardDataCtx } from '.';

function App() {
  const [loading, setLoading] = useState(true);
  const { state: boardData, update: setBoardData } = useContext(BoardDataCtx);

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
    };
    fetchData();
  }, [setBoardData, loading]);

  if (loading) {
    return <pre>Loading...</pre>;
  }

  console.log(boardData);

  return <Board />;
}

export default App;
