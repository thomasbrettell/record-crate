import { useEffect, useContext } from 'react';
import Board from './components/Board';
import { database } from './firebaseClient';
import { ref, onValue } from 'firebase/database';
import { BoardDataCtx } from '.';

function App() {
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
      });
    };
    fetchData();
  }, [setBoardData]);

  if (!boardData) {
    return <pre>Loading...</pre>;
  }

  console.log(boardData);

  return <Board />;
}

export default App;
