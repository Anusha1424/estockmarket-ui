import React from 'react';
import { Container, Button } from 'shards-react';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from 'lodash';
import { api } from '../utils/api';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';


export default function ViewCompanyStocks() {
  let params = useParams();
  
  const [data,setData] = React.useState({})

  const getData = async () =>{
    try {
      const resp = await api.get(`stock/api/v1.0/market/stock/getAllByCompanyCode/${params.id}`);
      setData(resp.data)
    } catch (error) {
      console.log(error)
    }
    
}
  React.useEffect(()=>{
    getData()
  },[])
 

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      
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
