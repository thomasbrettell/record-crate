import { useRef, useState, useContext, FormEvent } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../Crate';
import { database } from '../../firebaseClient';
import { ref, set, push, update } from 'firebase/database';
import useOnClickOutside from '../../hooks/useOnClickOutside';
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

  const addListHandler = (e: FormEvent) => {
    e.preventDefault();
    const crateOrderRef = ref(database, `boards/${boardData.id}/crateOrder`);
    const cratesRef = ref(database, `boards/${boardData.id}/crates`);
    const newCrate = push(cratesRef, {
      title: listName,
    });
    set(crateOrderRef, [...(boardData.crateOrder || []), newCrate.key]);
    update(newCrate, {
      id: newCrate.key,
    });
    setListName('');
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
        <form onSubmit={addListHandler}>
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button type='submit'>Add</button>
        </form>
      )}
    </ButtonWrapper>
  );
};

export default AddListButton;
