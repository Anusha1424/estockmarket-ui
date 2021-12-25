import React from 'react';
import { Container, Button } from 'shards-react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Formik, Form as NewForm, Field } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import Select, { AriaOnFocus } from 'react-select';
import MySelect from '../components/MySelect';
import { api } from '../utils/api';

export default function AddStock() {
  let params = useParams();


  const [data,setData] = React.useState([])
  const getData = async () =>{
    try {
      const resp = await api.get("market/api/v1.0/market/company/getall");
      if(resp.data) {
        let temp =[]
        resp.data.map((com) =>{
          temp.push({value:com.companyCode,label:com.name})
        })
        setData(temp);
      }
      
    } catch (error) {
      console.log(error)
    }
    
}



React.useEffect(()=>{
  getData()
},[])


  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values));
    var stock = {
      companyCode:values.companyCode[0].value,
      price:values.stockPrice
    }
    const resp = await api.post(`stock/api/v1.0/market/stock/add`,{
      ...stock,
      
    });
   
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
    stockPrice: yup.string().required(),
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
          stockPrice: '',
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
          console.log(touched);
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="companyCode">
                <MySelect
                  value={values.companyCode}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.companyCode}
                  touched={touched.companyCode}
                  options={data}
                  name="companyCode"
                  label="Company Code"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="stockPrice">
                <Form.Label>Stock Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Stock Price"
                  name="stockPrice"
                  value={values.stockPrice}
                  onChange={handleChange}
                  isInvalid={!!errors.stockPrice}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Stock Price
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
