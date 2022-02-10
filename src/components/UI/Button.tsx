import { FC } from 'react';
import styled from 'styled-components';

const Box = styled.button`
  line-height: 133.33333333333333%;
  letter-spacing: 0.4px;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  padding: 6px 12px;
  border: none;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f3f5;
  &:hover {
    cursor: pointer;
    background-color: #d5d8df;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:active {
    background-color: #b8bec9;
  }
`;

export interface ButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
}

const Button: FC<ButtonProps> = ({ children, onClick, ...props }) => {
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };

  return (
    <Box {...props} onClick={clickHandler}>
      {children}
    </Box>
  );
};

export default Button;
