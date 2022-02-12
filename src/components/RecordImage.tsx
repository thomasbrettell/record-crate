import { FC } from 'react';
import { AspectRatio, AspectRatioProps, Box } from '@chakra-ui/react';

const fallbackImage =
  'https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg';

interface RecordImageProps {
  image?: string;
  width?: string;
  adStyles?: AspectRatioProps;
}
const RecordImage: FC<RecordImageProps> = ({
  image,
  width = '200',
  adStyles,
}) => {
  return (
    <AspectRatio
      ratio={1}
      maxW={width}
      minW={width}
      width='100%'
      h='fit-content'
      backgroundColor='gray.100'
      display='inline-block'
      backgroundImage={`url(${fallbackImage})`}
      backgroundPosition='center'
      backgroundSize='cover'
      {...adStyles}
    >
      <Box
        backgroundImage={`url(${image})`}
        w='full'
        h='full'
        backgroundSize='cover'
      />
    </AspectRatio>
  );
};

export default RecordImage;
