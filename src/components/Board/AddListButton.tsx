import { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../Crate';
import { database } from '../../firebaseClient';
import { ref, set, child } from 'firebase/database';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import getTimeEpoch from '../../util/getTimeEpoch';
import { BoardDataCtx } from '../../index';

interface ButtonWrapperProps {
  entered: boolean;
}
const ButtonWrapper = styled(Wrapper)<ButtonWrapperProps>`
  background-color: #ffffff3d;
  cursor: pointer;
  border-radius: 3px;
  height: auto;
  min-height: 32px;
  padding: 4px;
  display: inline-flex;

  ${(p) =>
    p.entered &&
    `
    background-color: #ebecf0;
  `}

  ${(p) =>
    !p.entered &&
    `
    &:hover {
    background-color: #00000029;
  }
  `}

  input {
    width: 100%;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  display: block;
  width: 100%;
  text-align: left;
`;

const AddListButton = () => {
  const { state: boardData } = useContext(BoardDataCtx);
  const [entered, setEntered] = useState(false);
  const [listName, setListName] = useState('');
  const buttonRef = useRef(null);

  const addListHandler = () => {
    // const listsRef = ref(
    //   database,
    //   `boards/${process.env.REACT_APP_ENV}-board/lists`
    // );
    // if (!boardData) return;
    // const nextListIndex = boardData.lists?.length || 0;
    // set(child(listsRef, nextListIndex.toString()), {
    //   title: listName,
    //   cards: [],
    //   id: `l-${getTimeEpoch()}`,
    // });
    // setListName('');
  };

  const clickOutsideHandler = () => {
    setEntered(false);
  };

  useOnClickOutside(buttonRef, clickOutsideHandler);

  return (
    <ButtonWrapper entered={entered} ref={buttonRef}>
      {!entered && (
        <Button onClick={() => setEntered(true)}>+ Add a crate</Button>
      )}
      {entered && (
        <div>
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button onClick={addListHandler}>Add</button>
        </div>
      )}
    </ButtonWrapper>
  );
};

export default AddListButton;
