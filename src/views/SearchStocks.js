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
import { api } from '../utils/api';
import moment from 'moment';

export default function SearchStock() {
  let params = useParams();
  const [companyData,setCompanyData] = React.useState([])
  const getData = async () =>{
    try {
      const resp = await api.get("market/api/v1.0/market/company/getall");
      if(resp.data) {
        let temp =[]
        resp.data.map((com) =>{
          temp.push({value:com.companyCode,label:com.name})
        })
        setCompanyData(temp);
      }
      
    } catch (error) {
      console.log(error)
    }
    
}

React.useEffect(()=>{
  getData()
},[])


const [data,setData] = React.useState([]);


  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values));
   var fromDate =  moment(Date.parse(values.fromDate)).format("yyyy-MM-DD");
   var toDate =  moment(Date.parse(values.toDate)).format("yyyy-MM-DD")

const resp = await api.get(`stock/api/v1.0/market/stock/get/${values.companyCode[0].value}/${fromDate}/${toDate}`);
    setData(resp.data);

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
                  options={companyData}
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





      <Row className="mb-3">
          <Col>Minimum : {data.min}</Col>
          <Col>Maximum : {data.max}</Col>
          <Col>Average : {data.average}</Col>

      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Stock Price</th>
            <th>Date time</th>
          </tr>
        </thead>
        <tbody>
          {data.stockList && data.stockList.map((d,i)=>{
            return(
              <tr>
            <td>{i+1}</td>
            <td>{d.price}</td>
            <td>{d.stockDate ? moment(Date.parse(d.stockDate)).format("DD/MM/YYYY hh:mm a") : ""}</td>
          </tr>
            );
          })}
          
        </tbody>
      </Table>
    </Container>
  );
}
