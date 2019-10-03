import React from "react";
// import Dialog from 'MySuperDialog';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const cardMarginStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  padding: "1em",
  width: "750px"
};

const cardGroupStyle = {
  marginTop: "35px",
  marginBottom: "10px"
};

const Login = props => (
  <Card.Group style={cardGroupStyle}>
    <Card style={cardMarginStyle}>
      <Card.Content>
        <h1>Login Here!</h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            props.handleLogin(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="username" name="username" placeholder="User Name" />
              <ErrorMessage name="username" component="div" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/signup">Sign up</Link>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default Login;
