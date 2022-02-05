import { useEffect, useState } from 'react';
import Board from './components/Board';
import { BoardProps } from './types';
import { database } from './firebaseClient';
import { ref, get, child } from 'firebase/database';

function App() {
  const [board, setBoard] = useState<BoardProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database);
      get(child(dbRef, 'boards/0')).then((snapshot) => {
        if (snapshot.exists()) {
          setBoard(snapshot.val());
        } else {
          console.log('No data available');
        }
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
