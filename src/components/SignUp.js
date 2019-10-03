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

const SignUp = props => (
  <Card.Group style={cardGroupStyle}>
    <Card style={cardMarginStyle}>
      <Card.Content>
        <h1>Sign Up Here!</h1>

        <Formik
          initialValues={{ username: "", name: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            props.handleSignUp(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <h4>Please sign up with your Full Name, Username and Password</h4>
              <Field
                className="login-field"
                type="name"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage name="name" component="div" />
              <Field
                className="login-field"
                type="username"
                name="username"
                placeholder="User Name"
              />
              <ErrorMessage name="username" component="div" />
              <Field
                className="login-field"
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" />
              <div className="auth-button-row">
                <Link to="/login">Login</Link>

                <button
                  className="auth-button"
                  type="submit" /*disabled={isSubmitting}*/
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default SignUp;
