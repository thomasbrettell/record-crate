import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps, Field, FormikBag } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { NavigateFunction } from 'react-router-dom';

interface FormValues {
  password: string;
  email: string;
  userName: string;
}

interface SignUpFormProps {
  navigate: NavigateFunction;
  setupNewUser: Function;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(9, 'Password must be at least 9 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  userName: Yup.string().required('Required'),
});

const submitHandler = async (
  values: FormValues,
  formikBag: FormikBag<SignUpFormProps, FormValues>
) => {
  await createUserWithEmailAndPassword(auth, values.email, values.password);

  const result = await formikBag.props.setupNewUser({ name: values.userName });

  if (result) {
    formikBag.props.navigate(`/${result.data.slug}`);
  }
};

const SignUpForm = withFormik<SignUpFormProps, FormValues>({
  mapPropsToValues: () => {
    return {
      email: '',
      password: '',
      userName: '',
    };
  },
  validationSchema: SignupSchema,
  handleSubmit: submitHandler,
})(({ touched, errors, isSubmitting }: FormikProps<FormValues>) => {
  return (
    <Form>
      <FormControl
        marginBottom='20px'
        isInvalid={!!(touched.userName && errors.userName)}
      >
        <FormLabel>User Name</FormLabel>
        <Field name='userName' as={Input} />
        <FormErrorMessage>{errors.userName}</FormErrorMessage>
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
