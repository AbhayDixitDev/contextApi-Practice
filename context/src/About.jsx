import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">About Me</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>ABHAY DIXIT</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">MERN Full Stack Developer</Card.Subtitle>
              <Card.Text>
                Location: BHOPAL (Willing to relocate)<br />
                Email: Abhaydixit.dev@gmail.com<br />
                Contact: +91 7017709865<br />
                <a href="https://linkedin.com/in/AbhayDixitDev" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/AbhayDixitDev" target="_blank" rel="noopener noreferrer">GitHub</a>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text>
                A highly driven web developer with a strong foundation in both frontend and backend development, committed to staying ahead of the curve in the IT sector, eager to collaborate on cutting-edge projects and drive success and innovation in a dynamic organization.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Technical Skills</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Programming Languages: C++, JavaScript</ListGroup.Item>
                <ListGroup.Item>Front-End: React.js, Tailwind CSS, Bootstrap-5, HTML5</ListGroup.Item>
                <ListGroup.Item>Back-End: Node.js, Express</ListGroup.Item>
                <ListGroup.Item>Database: MongoDB, Database Design</ListGroup.Item>
                <ListGroup.Item>Tools: Git, GitHub, VS Code, Net Beans IDE, JIRA</ListGroup.Item>
                <ListGroup.Item>API Development: Axios</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <Card.Text>
                <strong>Flight Booking System Website</strong><br />
                Technologies: HTML, CSS, JavaScript, JSON, Vercel, VS Code, GitHub<br />
                <strong>E-Voting Web Application</strong><br />
                Technologies: HTML, CSS, JavaScript, PHP, SQL, XAMPP Server
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Education</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>B. Tech. in Information Technology, University Institute of Technology RGPV, Bhopal</ListGroup.Item>
                <ListGroup.Item>Polytechnic Diploma in Computer Science, S.R. Govt. Polytechnic College, Sagar</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
