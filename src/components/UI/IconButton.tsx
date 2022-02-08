import { ReactElement, FC } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  display: flex;
`;

interface IconButtonProps {
  icon: ReactElement;
  onClick: () => void;
  className?: string;
}
const IconButton: FC<IconButtonProps> = ({ icon, onClick, className }) => {
  return (
    <Button onClick={onClick} className={className}>
      {icon}
    </Button>
  );
};

export default IconButton;
