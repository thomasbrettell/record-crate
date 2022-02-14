import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps, Field } from 'formik';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { database } from '../firebaseClient';
import { push, ref, update } from 'firebase/database';

interface FormValues {
  password: string;
  email: string;
  displayName: string;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(9, 'Password must be at least 9 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  displayName: Yup.string().required('Required'),
});

const submitHandler = async (values: FormValues) => {
  const newUserCreds = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );
  updateProfile(newUserCreds.user, {
    displayName: values.displayName,
  });
  const boardsRef = ref(database, 'boards');
  const newBoardRef = push(boardsRef, {
    user_id: newUserCreds.user.uid,
  });
  update(newBoardRef, {
    id: newBoardRef.key,
  });
  const newUserRef = ref(database, `users/${newUserCreds.user.uid}`);
  update(newUserRef, {
    board_id: newBoardRef.key,
  });
};

const SignUpForm = withFormik<{}, FormValues>({
  mapPropsToValues: () => {
    return {
      email: '',
      password: '',
      displayName: '',
    };
  },
  validationSchema: SignupSchema,
  handleSubmit: submitHandler,
})(({ touched, errors, isSubmitting }: FormikProps<FormValues>) => {
  return (
    <Form>
      <FormControl
        marginBottom='20px'
        isInvalid={!!(touched.displayName && errors.displayName)}
      >
        <FormLabel>Display Name</FormLabel>
        <Field name='displayName' as={Input} />
        <FormErrorMessage>{errors.displayName}</FormErrorMessage>
      </FormControl>
      <FormControl
        marginBottom='20px'
        isInvalid={!!(touched.email && errors.email)}
      >
        <FormLabel>Email</FormLabel>
        <Field name='email' as={Input} />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        marginBottom='25px'
        isInvalid={!!(touched.password && errors.password)}
      >
        <FormLabel>Password</FormLabel>
        <Field type='password' name='password' as={Input} />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <Button
          isFullWidth
          colorScheme='blue'
          type='submit'
          isLoading={isSubmitting}
        >
          Sign up
        </Button>
      </FormControl>
    </Form>
  );
});

export default SignUpForm;
