import React from "react";
import validator from "validator";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { fetcher } from "../utils";
import {
    headers,
} from '../configs';
import { fetchUser } from '../actions';
import getReduxStore from '../reduxStore';

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required("Password is required"),
            username: Yup.string()
                .required("Email is required")
                .test("isEmail", "Invalid email", (value) => {
                let valid = false;
                if (value && validator.isEmail(value)) {
                    valid = true;
                }
                return valid;
            }),
          }),
        validateOnChange: false,
        onSubmit: async (values, { setErrors }) => {
            const response = await fetcher(
                `https://${window.location.hostname}/user/login/wisecode`,
                'POST',
                {
                    'username': values.username,
                    'password': values.password
                },
                headers
            )
            if (response.status == 200){
                const { cognitoJwt, fenceJwt } = await response.json()
                localStorage.setItem('fenceJwt', fenceJwt);
                localStorage.setItem('cognitoJwt', cognitoJwt);
                localStorage.setItem('pushAfterCreds', 'true');
                getReduxStore().then(
                    (store) => {
                        store.dispatch(fetchUser)
                    },
                );
            } else {
                setErrors({
                    username: "Invalid login credentials",
                });
            }
        },
    });
  return (
    <>
        <div 
            style={{
                marginTop: "150px"
            }}
        >
            <img
                className='nav-bar__logo-img'
                src='/src/img/logo.png'
                style={{
                    marginLeft: "65px"
                }}
            />
            <Form 
                onSubmit={formik.handleSubmit}
                style={{
                    margin: "auto",
                    marginTop: "45px",
                    width: "50%"
                }}
            >
                <Form.Group>
                <Form.Label
                        style={{
                            marginTop: "10px"
                        }}
                    >
                        Email
                    </Form.Label>
                    <br/>
                    <Form.Control
                        type="text"
                        name="username"
                        style={{
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderBottomWidth: "thin",
                            width: "250px",
                            marginTop: "10px",
                        }}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    style={{
                        marginTop: "10px"
                    }}
                >
                    <Form.Label>
                        Password
                    </Form.Label>
                    <br/>
                    <Form.Control
                        style={{
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderBottomWidth: "thin",
                            marginTop: "10px",
                            width: "250px"
                        }}
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    type="submit"
                    style={{
                        marginTop: "20px",
                        color: "white",
                        borderColor: "#29AAE2",
                        backgroundColor: "#29AAE2",
                        marginLeft:"50px"
                    }}
                >
                    Log In
                </Button>
            </Form>
        </div>
    </>
  );
}

export default LoginForm