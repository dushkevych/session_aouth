import React from 'react';
import axios from 'axios';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string()
    .email('Invalid email address')
    .required('Required'),
  firstName: yup.string()
    .max(15, 'Must be 20 characters or less')
    .required(),
  lastName: yup.string()
    .max(15, 'Must be 20 characters or less')
    .required(),
  password: yup.string()
    .max(20, 'Must be 20 characters or less')
    .required().matches(
    "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, can have special case Characters"
  ),  
});

function FormExample() {
  return (
    <Formik
      validationSchema={schema}
      
      onSubmit={ async(values) => {
       
        try {
           const { email, firstName, lastName, password } = values;

           const response = await axios.post('http://localhost:3001/api/signup', {
                email,
                firstName,
                lastName,
                password
        })

        } catch (error){
            return error;
        }
    }}
      initialValues={{
        firstName: '',
        lastName: '',
        hidden: 'password'
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>

            <Form.Group as={Col} md="4" controlId="validationFormikEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={errors.email} // isInvalid
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={ values.hidden }  //{this.state.hidden ? 'password' : 'text'}
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                id="pass_icon"
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Button 
                onClick={ () => { values.hidden ==="password" ? values.hidden = "text" : values.hidden = "password" }}
                >
                Show/Hide                                                     
              </Button> 

            </Form.Group>
              
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;