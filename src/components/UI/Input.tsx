import { ChangeEvent, forwardRef, useState } from 'react';
import styled from 'styled-components';

// const Wrapper = styled.label`
//   border-radius: 4px;
//   display: inline-flex;
//   vertical-align: middle;
//   align-items: center;
//   height: 100%;
//   flex: 1 1 0%;
//   user-select: none;
//   transition: border 0.2s ease 0s, color 0.2s ease 0s;
//   position: relative;
//   border: 1px solid #d5d8df;
//   background-color: #f2f3f5;
// `;

const Box = styled.input`
  margin: 0;
  padding: 5px 16px;
  box-shadow: none;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 0px;
  width: 100%;
  min-width: 0px;
  appearance: none;
  font-family: inherit;
  font-size: 0.75rem;
  border: 1px solid #d5d8df;
  background-color: #f2f3f5;
  border-radius: 4px;
`;

export interface InputProps {
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  disabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', disabled, value = '', onChange, ...props }, ref) => {
    const [selfValue, setSelfValue] = useState('');

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSelfValue(e.target.value);
      onChange && onChange(e);
    };

    return (
      // <Wrapper>
      <Box
        type={type}
        disabled={disabled}
        onChange={changeHandler}
        ref={ref}
        {...props}
        value={!value ? selfValue : value}
      />
      // </Wrapper>
    );
  }
);

export default Input;
