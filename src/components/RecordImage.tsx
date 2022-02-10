import { FC } from 'react';
import { AspectRatio, Box } from '@chakra-ui/react';

const fallbackImage =
  'https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg';

interface RecordImageProps {
  image?: string;
  alt?: string;
  width?: string;
}
const RecordImage: FC<RecordImageProps> = ({
  image = fallbackImage,
  width = '200',
}) => {
  return (
    <AspectRatio
      ratio={1}
      maxW={`${width}px`}
      minW={`${width}px`}
      width='100%'
      h='fit-content'
      backgroundColor='gray.100'
    >
      <Box
        backgroundImage={`url(${image || fallbackImage})`}
        w='full'
        h='full'
        backgroundSize='cover'
      />
    </AspectRatio>
  );
};

export default RecordImage;
