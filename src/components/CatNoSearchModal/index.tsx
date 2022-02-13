import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
} from '@chakra-ui/react';
import { FormEvent, useRef } from 'react';
import QueryList from './QueryList';
import useCatNo from '../../hooks/useCatNo';

interface CatNoSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
}
const CatNoSearchModal = ({
  isOpen,
  onClose,
  crateId,
}: CatNoSearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { response, isLoading, sendRequest, clear } = useCatNo();
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    inputRef.current && sendRequest(inputRef.current.value);
  };
  const closeHandler = () => {
    clear();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent maxW='900'>
        <ModalHeader
          as='form'
          display='flex'
          paddingRight='55px'
          onSubmit={submitHandler}
        >
          <Input
            variant='filled'
            placeholder='Enter category number'
            borderEndRadius='0'
            ref={inputRef}
          />
          <Button
            type='submit'
            colorScheme='blue'
            borderStartRadius='0'
            isLoading={isLoading}
          >
            Search
          </Button>
        </ModalHeader>
        <ModalBody>
          {response && (
            <QueryList
              releases={response}
              crateId={crateId}
              onClose={closeHandler}
            />
          )}
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default CatNoSearchModal;
