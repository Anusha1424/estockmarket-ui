import React from 'react';
import { Container, Button } from 'shards-react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';

export default function CompanyList(props) {
  let navigate = useNavigate();
  let params = useParams();

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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <Button
                onClick={() => {
                  navigate('/editCompany/1');
                }}
              >
                Edit
              </Button>
              {''}{' '}
              <Button
                onClick={() => {
                  navigate('/viewCompanyStocks');
                }}
              >
                View Stocks
              </Button>
              {''} <Button onClick={() => {}}>Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
