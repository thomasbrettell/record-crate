import { useEffect, useState } from 'react';
import Board from './components/Board';
import { BoardProps } from './types';
import { database } from './firebaseClient';
import { ref, onValue } from 'firebase/database';

function App() {
  const [board, setBoard] = useState<BoardProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const boardRef = ref(
        database,
        `boards/${process.env.REACT_APP_ENV}-board`
      );
      onValue(boardRef, (snapshot) => {
        const data = snapshot.val();
        setBoard(data);
      });
    };
    fetchData();
  }, []);

  if (!board) {
    return <pre>Loading...</pre>;
  }

  return <Board lists={board.lists} />;
}

export default App;
