import React from "react";
import {Card,CardHeader,ListGroup,ListGroupItem, Container, Row, Col } from "shards-react";
import { UserContext } from "../authentication";

const UserProfileLite = () => {

  const { user } = React.useContext(UserContext);

return(
  <Container fluid className="main-content-container px-4">
    
    <Row>
        {/* <UserAccountDetails /> */}
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Profile</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row style={{padding:5}}>
                  <Col md="6">
                    First Name
                  </Col>
                  <Col md="6">
                  {user.name}
                  </Col>
              </Row>
                <Row style={{padding:5}}>
                <Col md="6">
                Last Name
                </Col>
                <Col md="6">
                {user.lastName}
                </Col>
                </Row>
                <Row style={{padding:5}}>
                <Col md="6">
               Email
                </Col>
                <Col md="6">
                {user.email}
                </Col>
                </Row>
          </ListGroupItem>
    </ListGroup>
  </Card>
    </Row>
  </Container>);
}

export default UserProfileLite;
