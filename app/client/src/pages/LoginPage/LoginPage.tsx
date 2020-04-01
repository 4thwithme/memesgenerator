import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as RFForm, Field as RFField } from "react-final-form";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/react-hooks";

import "../../styles/RegisterPage.scss";
import { isEmptyObject } from "../../client.utils";
import QUERIES from "../../queries/queries";

import { StringObect } from "../../client.types";

const LoginPage = () => {
  const [asyncErrors, setAsyncErrors] = useState("");
  const [inputValues, setInputValues] = useState({ isCanSubmit: false });

  const history = useHistory();

  const [loginUser, { loading }] = useMutation(QUERIES.LOGIN_USER, {
    update: (proxy, res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data.register));
      history.push("/");
    },
    onError: (err) => {
      console.dir(err);
      err.graphQLErrors && setAsyncErrors(err.graphQLErrors[0].message);
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
  }, [inputValues.isCanSubmit]);
  //helper functions---------------------------------------------

  const handleOnSubmit = (values: StringObect) => {
    setInputValues({ ...values, isCanSubmit: true });
  };

  const validate = (values: StringObect) => {
    const errors: StringObect = {};

    if (!values.username || values.username.trim().length === 0) {
      errors.username = "Fill username field";
    } else if (!values.username || values.username.trim().length < 3) {
      errors.username = "username must be 3+ char";
    }
    if (!values.password || values.password.trim() === "") {
      errors.password = "Fill password field";
    } else if (!values.password || values.password.trim().length < 4) {
      errors.password = "password must be 4+ char";
    }

    return errors;
  };

  return (
    <div className='login-wrap'>
      <RFForm
        onSubmit={handleOnSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values, errors }) => (
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

      {asyncErrors.length ? (
        <div className='ui error message'>
          <ul className='list'>
            <li>{asyncErrors}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default LoginPage;