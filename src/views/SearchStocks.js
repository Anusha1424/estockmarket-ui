import React from 'react';
import { Container, Button } from 'shards-react';
import { useParams, useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import { Col, Row, Form } from 'react-bootstrap';

import { Formik, Form as NewForm, Field } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import Select, { AriaOnFocus } from 'react-select';
import MySelect from '../components/MySelect';
import { DatePickerField } from '../components/DatePickerField';
import Table from 'react-bootstrap/Table';

export default function AddStock() {
  let params = useParams();
  const handleSubmit = (values) => {
    console.log(JSON.stringify(values));
  };
  const schema = yup.object().shape({
    companyCode: yup
      .array()
      .min(1, 'Select Company')
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .required(),
    fromDate: yup.date().required(),
    toDate: yup.date().required(),
  });

  const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Being Fabulous', label: 'Being Fabulous' },
    { value: 'Ken Wheeler', label: 'Ken Wheeler' },
    { value: 'ReasonML', label: 'ReasonML' },
    { value: 'Unicorns', label: 'Unicorns' },
    { value: 'Kittens', label: 'Kittens' },
  ];

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          companyCode: [],
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
          setFieldValue,
          setFieldTouched,
        }) => {
          console.log('errors : ' + JSON.stringify(errors));
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="companyCode">
                <MySelect
                  value={values.companyCode}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.companyCode}
                  touched={touched.companyCode}
                  options={options}
                  name="companyCode"
                  label="Company Code"
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>From Date</Form.Label>
                  <DatePickerField
                    name="fromDate"
                    error={errors.fromDate}
                    touched={touched.fromDate}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>To Date</Form.Label>
                  <DatePickerField
                    name="toDate"
                    error={errors.toDate}
                    touched={touched.toDate}
                  />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Compnay Name</th>
            <th>Compnay code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
