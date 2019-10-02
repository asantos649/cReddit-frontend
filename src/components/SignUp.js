import React from 'react';
// import Dialog from 'MySuperDialog';
import { Formik, Field, Form, ErrorMessage } from 'formik';


const SignUp = (props) => (
    <div>
      <h1>Sign Up Here!</h1>
      <Formik
        initialValues={{ username: '', name: '', password_digest: '' }}
        validate={values => {
          let errors = {};
          if (!values.username) {
            errors.username = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {

            props.handleSignUp(values)

        //replace with callback
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);

        //

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="name" name="name" placeholder='Name'/>
            <ErrorMessage name="name" component="div" />
            <Field type="username" name="username" placeholder='User Name'/>
            <ErrorMessage name="username" component="div" />
            <Field type="password" name="password_digest" placeholder='Password'/>
            <ErrorMessage name="password_digest" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

export default SignUp