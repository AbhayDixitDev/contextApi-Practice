import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Contact Us</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4}>
          <h3>Address</h3>
          <p>123 Web Dev Street<br />Bhopal, MP 462001<br />India</p>
        </Col>
        <Col md={4}>
          <h3>Phone</h3>
          <p>+91 7017709865</p>
        </Col>
        <Col md={4}>
          <h3>Email</h3>
          <p>Abhaydixit.dev@gmail.com</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
