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

interface FormValues {
  password: string;
  email: string;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(9, 'Password must be at least 9 characters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const SignUpForm = withFormik<{}, FormValues>({
  mapPropsToValues: () => {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: SignupSchema,
  handleSubmit: async (values) => {
    const newUser = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(newUser);
  },
})(({ touched, errors, isSubmitting }: FormikProps<FormValues>) => {
  return (
    <Form>
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
