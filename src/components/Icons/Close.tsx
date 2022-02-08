import { FC } from 'react';
import { IconProps } from './IconProps';

const Close: FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export default Close;
