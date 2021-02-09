import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string()
    .email('Invalid email address')
    .required('Required'),
  firstName: yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  lastName: yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  password: yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, 
    "Must Contain at least 6 Characters, One Uppercase, One Lowercase, One Number, can have special case Characters"
  ),  
});

function FormExample() {

  const [ visible, setVisible ] = useState("password");

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
        email: '',
        firstName: '',
        lastName: '',
        password: ''
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
        <div className="container">
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
                  isInvalid={!!errors.email}
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
                isInvalid={!!errors.firstName}
                //isValid={touched.firstName && !errors.firstName}
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
                isInvalid={!!errors.lastName}
                //isValid={touched.lastName && !errors.lastName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={visible}  //{this.state.hidden ? 'password' : 'text'}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    id="pass_icon"
                  />
                  <InputGroup.Append>
                    <Button 
                      variant="outline-secondary"
                      onClick={ () =>  visible ==="password" ? setVisible("text")  : setVisible("password") } 
                    > 
                      Show/Hide
                    </Button>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
              
          <Button type="submit">Submit form</Button>
          
          <div>
            <span> Allready registered user? </span>
            <span> You are welcome to </span>
            <Link to="/signin" >Sign In</Link>
          </div>
        
        </Form>
        </div>
      )}
             
    </Formik>
  );
}

export default FormExample;