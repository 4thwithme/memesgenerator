import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as RFForm, Field as RFField } from "react-final-form";
import { useMutation } from "@apollo/react-hooks";

import validate from "./validate";
import "../../styles/RegisterPage.scss";
import QUERIES from "../../queries/queries";
import { isEmptyObject } from "../../client.utils";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import { StringObject } from "../../client.types";

const LoginPage = () => {
  const [asyncErrors, setAsyncErrors] = useState<StringObject[]>([]);
  const [inputValues, setInputValues] = useState({ isCanSubmit: false });

  //create a context
  const authContext = useContext(AuthContext);

  const [loginUser, { loading }] = useMutation(QUERIES.LOGIN_USER, {
    update: (proxy, { data: { login } }) => {
      authContext.login(login);
    },
    onError: (err) => {
      err.graphQLErrors[0] &&
        err.graphQLErrors[0].extensions &&
        setAsyncErrors([...asyncErrors, err.graphQLErrors[0].extensions.exception.errors]);
      setInputValues({ ...inputValues, isCanSubmit: false });
    },
    variables: inputValues
  });

  //effects------------------------------------------------------
  useEffect(() => {
    if (inputValues.isCanSubmit) {
      loginUser();
      setInputValues({ ...inputValues, isCanSubmit: false });
    }
    // eslint-disable-next-line
  }, [inputValues.isCanSubmit]);
  //helper functions---------------------------------------------

  const handleOnSubmit = (values: StringObject) => {
    setInputValues({ ...values, isCanSubmit: true });
  };

  return (
    <div className='login-wrap'>
      <RFForm
        onSubmit={handleOnSubmit}
        validate={validate}
        render={({ handleSubmit, errors }) => (
          <Form inverted size='large' onSubmit={handleSubmit} loading={loading}>
            <RFField name='username'>
              {({ input, meta: { error } }) => (
                <Form.Field>
                  <Form.Input
                    {...input}
                    error={error ? { content: error } : null}
                    fluid
                    placeholder='Username'
                    id='form-input-username'
                  />
                </Form.Field>
              )}
            </RFField>

            <RFField name='password'>
              {({ input, meta: { error } }) => (
                <Form.Field>
                  <Form.Input
                    {...input}
                    error={error ? { content: error } : null}
                    fluid
                    type='password'
                    placeholder='Password'
                    id='form-input-password'
                  />
                </Form.Field>
              )}
            </RFField>

            <Button disabled={!isEmptyObject(errors)} color='teal' type='submit'>
              Submit
            </Button>
          </Form>
        )}
      />

      {!!asyncErrors.length && (
        <div className='ui error message'>
          <ul className='list'>
            {asyncErrors.map((err, i) => (
              <li key={i}>{Object.values(err)[0]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
