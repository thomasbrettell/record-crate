import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

interface CatNoSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CatNoSearchModal = ({ isOpen, onClose }: CatNoSearchModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="xl">
        <ModalHeader>
          <Input variant='filled' /> <ModalCloseButton />
        </ModalHeader>
        <ModalBody>Blah</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CatNoSearchModal;
