import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "semantic-ui-react";
import { Form as RFForm, Field as RFField } from "react-final-form";
// import { useHistory } from "react-router";

import validate from "./validate";
import "../../styles/RegisterPage.scss";
import QUERIES from "../../queries/queries";
import { isEmptyObject } from "../../client.utils";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import { StringObject } from "../../client.types";

const RegisterPage = () => {
  const [inputValues, setInputValues] = useState({ isCanSubmit: false });
  const [asyncErrors, setAsyncErrors] = useState<StringObject[]>([]);

  // const history = useHistory();

  //create a context
  const authContext = useContext(AuthContext);

  const [registerUser, { loading }] = useMutation(QUERIES.REGISTER_USER, {
    update: (proxy, { data: { register } }) => {
      // localStorage.setItem("userInfo", JSON.stringify(register));
      authContext.login(register);
      // history.push("/");
    },
    onError: (err) => {
      err.graphQLErrors[0] &&
        err.graphQLErrors[0].extensions &&
        setAsyncErrors([...asyncErrors, err.graphQLErrors[0].extensions.exception.errors]);
      setInputValues({ ...inputValues, isCanSubmit: false });
    },
    variables: inputValues
  });

  //effects---------------------------------------------------
  useEffect(() => {
    if (inputValues.isCanSubmit) {
      registerUser();
    }
    // eslint-disable-next-line
  }, [inputValues.isCanSubmit]);

  //helper funtions-------------------------------------------
  const handleOnSubmit = (values: StringObject) => {
    setInputValues({ ...values, isCanSubmit: true });
  };

  return (
    <div className='register-wrap'>
      <RFForm
        onSubmit={handleOnSubmit}
        validate={validate}
        render={({ handleSubmit, pristine, errors }) => (
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

            <RFField name='confirmPassword'>
              {({ input, meta: { error } }) => (
                <Form.Field>
                  <Form.Input
                    {...input}
                    error={error ? { content: error } : null}
                    type='password'
                    fluid
                    placeholder='Confirm Password'
                    id='form-input-confirm'
                  />
                </Form.Field>
              )}
            </RFField>

            <RFField name='email'>
              {({ input, meta: { error } }) => (
                <Form.Field>
                  <Form.Input
                    {...input}
                    error={error ? { content: error } : null}
                    type='email'
                    fluid
                    placeholder='Email'
                    id='form-input-email'
                  />
                </Form.Field>
              )}
            </RFField>

            <Button disabled={!isEmptyObject(errors) || pristine} color='teal' type='submit'>
              Submit
            </Button>
          </Form>
        )}
      />

      {asyncErrors.length ? (
        <div className='ui error message'>
          <ul className='list'>
            {asyncErrors.map((err, i) => (
              <li key={i}>{Object.values(err)[0]}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterPage;
