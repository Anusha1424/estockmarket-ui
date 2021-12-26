import React from 'react';
import { Container, Button } from 'shards-react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import {Form,Col, Row} from 'react-bootstrap';

export default function CompanyList(props) {
  let navigate = useNavigate();
  let params = useParams();
  const [data,setData] = React.useState([])
  const [searchCompany,setSearchCompany] = React.useState("")
  const [dataTemp,setDataTemp] = React.useState([])

  const getData = async () =>{
    try {
      const resp = await api.get("market/api/v1.0/market/company/getall");
      setData(resp.data)
    } catch (error) {
      console.log(error)
    }
    
}
const getDeleteCompany = async (companyCode) =>{
  try {
    const resp = await api.delete(`market/api/v1.0/market/company/delete/${companyCode}`);
    getData()
  } catch (error) {
    console.log(error)
  }
  
}

React.useEffect(()=>{
  if(searchCompany) {
   const temp =  data.filter((d) => d.name.toLowerCase().includes(searchCompany.toLowerCase().trim()) || d.companyCode.toLowerCase().includes(searchCompany.toLowerCase().trim()) );
   setDataTemp(temp)
  }
},[searchCompany])



  React.useEffect(()=>{
    getData()
  },[])

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row>
        <Form.Group className="mb-3" as={Col} >
                <Form.Label>search Company</Form.Label>
                <Form.Control
                  type="text"
                  name="searchCompany"
                  placeholder="searh Company "
                  value={searchCompany}
                  onChange={(text) => setSearchCompany(text.target.value)}
                />
              </Form.Group>
              <Col />
              </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Compnay Name</th>
            <th>Compnay code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CompanyTable data={searchCompany != "" ? dataTemp : data} getDeleteCompany={getDeleteCompany} navigate={navigate} />
        
          
        </tbody>
      </Table>
    </Container>
  );
}

const CompanyTable = ({data,navigate,getDeleteCompany}) => {
  return(
    data.map((d,i)=>{
      return(
        <tr>
      <td>{i+1}</td>
      <td>{d.name}</td>
      <td>{d.companyCode}</td>
      <td>
        <Button
          onClick={() => {
            navigate(`/editCompany/${d.companyCode}`);
          }}
        >
          Edit
        </Button>
        {''}{' '}
        <Button
          onClick={() => {
            navigate(`/viewCompanyStocks/${d.companyCode}`);
          }}
        >
          View Stocks
        </Button>
        {''} <Button onClick={() => {getDeleteCompany(d.companyCode)}}>Delete</Button>
      </td>
    </tr>
      );

      
    })
  )
}