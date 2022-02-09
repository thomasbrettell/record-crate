import { FormEvent, useRef, useState, FC } from 'react';
import styled from 'styled-components';
import QueryList from './QueryList';
import ModalWindow from '../UI/ModalWindow';

const Form = styled.form`
  margin-bottom: 20px;
`;

interface AddRecordWindowProps {
  crateId: string;
  onClose: () => void;
}
const AddRecordWindow: FC<AddRecordWindowProps> = ({ crateId, onClose }) => {
  const [catno, setCatno] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const el = inputRef?.current;
    if (!el || el.contains(e.target as Node)) {
      return;
    }
    setCatno(el.value);
  };

  return (
    <ModalWindow>
      <Form onSubmit={submitHandler}>
        <input ref={inputRef} placeholder="Enter cat number" type="text" />
        <button type="submit">Search</button>
      </Form>
      {catno && <QueryList catno={catno} crateId={crateId} onClose={onClose} />}
    </ModalWindow>
  );
};

export default AddRecordWindow;
