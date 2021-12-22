import React from 'react';
import { Container, Button } from 'shards-react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Formik, Form as NewForm } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';

export default function EditCompany() {
  let params = useParams();
  const handleSubmit = (values) => {
    console.log(JSON.stringify(values));
  };
  const schema = yup.object().shape({
    companyCode: yup.string().required(),
    name: yup.string().required(),
    ceo: yup.string().required(),
    stockExchange: yup.string().required(),
    turnover: yup.number().min(10, 'Must be greater then 10Cr').required(),
    website: yup.string().required(),
  });

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          companyCode: 'Mark',
          name: 'Otto',
          ceo: 'ceo',
          stockExchange: '',
          website: 'hello',
          turnover: 0,
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
          isSubmitting,
        }) => {
          console.log(touched);
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="companyCode">
                <Form.Label>Company Code</Form.Label>
                <Form.Control
                  type="text"
                  name="companyCode"
                  placeholder="Enter Company Code"
                  value={values.companyCode}
                  onChange={handleChange}
                  isInvalid={!!errors.companyCode}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Company Code {errors.companyCode}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Company Name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Website"
                  name="website"
                  value={values.website}
                  onChange={handleChange}
                  isInvalid={!!errors.website}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Website
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="ceo">
                <Form.Label>CEO</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CEO Name"
                  name="ceo"
                  value={values.ceo}
                  onChange={handleChange}
                  isInvalid={!!errors.ceo}
                />
                <Form.Control.Feedback type="invalid">
                  Enter CEO Name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="turnover">
                <Form.Label>turnover (value in Cr)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter turnover "
                  name="turnover"
                  value={values.turnover}
                  onChange={handleChange}
                  isInvalid={!!errors.turnover}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.turnover}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="stockExchange">
                <Form.Label>stockExchange</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Stock Exchange Name"
                  name="stockExchange"
                  value={values.stockExchange}
                  onChange={handleChange}
                  isInvalid={!!errors.stockExchange}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Stock Exchange Name
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
