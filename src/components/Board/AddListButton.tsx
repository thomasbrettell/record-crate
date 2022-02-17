import { useRef, useState, useContext, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../Crate';
import { database } from '../../firebaseClient';
import { ref, set, push } from 'firebase/database';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { BoardDataCtx } from '../../index';
import { Input, Button, Flex, StyleProps, Box } from '@chakra-ui/react';
import useIsAuthed from '../../hooks/useIsAuthed';

interface ButtonWrapperProps {
  entered: boolean;
}

const ButtonStyles: StyleProps = {
  fontSize: 'xs',
  w: 'full',
  textAlign: 'left',
  paddingX: 2,
  background: 'transparent',
};

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

const AddListButton = () => {
  const { state: boardData } = useContext(BoardDataCtx);
  const [entered, setEntered] = useState(false);
  const [listName, setListName] = useState('');
  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthed = useIsAuthed()

  const addListHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!listName) return;
    console.log(boardData)
    const crateOrderRef = ref(database, `boards/${boardData.id}/crateOrder`);
    const cratesRef = ref(database, `boards/${boardData.id}/crates`);
    const newCrate = push(cratesRef, {
      title: listName,
    });
    set(crateOrderRef, [...(boardData.crateOrder || []), newCrate.key]);
    setListName('');
  };

  useEffect(() => {
    if (entered && inputRef?.current) inputRef?.current.focus();
  }, [entered]);

  const enterHandler = () => {
    setEntered(true);
  };

  const clickOutsideHandler = () => {
    setEntered(false);
  };

  useOnClickOutside(buttonRef, clickOutsideHandler);

  if (!isAuthed) return null;
  return (
    <ButtonWrapper entered={entered} ref={buttonRef}>
      {!entered && (
        <Box as='button' {...ButtonStyles} onClick={enterHandler}>
          + Add a crate
        </Box>
      )}
      {entered && (
        <Flex as='form' onSubmit={addListHandler} w='full'>
          <Input
            placeholder='Crate name'
            backgroundColor='white'
            size='xs'
            borderRadius='md'
            borderTopRightRadius='0'
            borderBottomRightRadius='0'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            ref={inputRef}
          />
          <Button
            type='submit'
            size='xs'
            borderTopLeftRadius='0'
            borderBottomLeftRadius='0'
            colorScheme='blue'
          >
            Add
          </Button>
        </Flex>
      )}
    </ButtonWrapper>
  );
};

export default AddListButton;
