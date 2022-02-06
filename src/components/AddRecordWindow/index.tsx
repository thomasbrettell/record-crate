import { FormEvent, useRef, useState, FC } from 'react';
import styled from 'styled-components';
import QueryList from './QueryList';

const Window = styled.div`
  background-color: #f4f5f7;
  border-radius: 2px;
  margin: 48px 0 80px;
  overflow: hidden;
  position: relative;
  width: 768px;
  z-index: 25;
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

interface AddRecordWindowProps {
  listIndex: number;
}
const AddRecordWindow: FC<AddRecordWindowProps> = ({ listIndex }) => {
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
    <Window>
      <Form onSubmit={submitHandler}>
        <input ref={inputRef} />
        <button type='submit'>Search</button>
      </Form>
      {catno && <QueryList catno={catno} listIndex={listIndex} />}
    </Window>
  );
};

export default AddRecordWindow;
