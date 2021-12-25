import React from 'react';
import { Container, Button } from 'shards-react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

export default function CompanyList(props) {
  let navigate = useNavigate();
  let params = useParams();
  const [data,setData] = React.useState([])
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
    getData()
  },[])

  return (
    <Container fluid className="main-content-container px-4 pb-4">
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
          {data.map((d,i)=>{
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

            
          })}
          
        </tbody>
      </Table>
    </Container>
  );
}
