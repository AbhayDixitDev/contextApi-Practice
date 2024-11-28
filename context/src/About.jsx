import React, { useContext } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { ProfileContext } from './contextCount';

const About = () => {
  const { profile } = useContext(ProfileContext);

  if (!profile) {
    return <div>Loading...</div>;
  }

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
              <Card.Title>{profile.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{profile.title}</Card.Subtitle>
              <Card.Text>
                Location: {profile.location}<br />
                Email: {profile.email}<br />
                Contact: {profile.contact}<br />
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text>{profile.summary}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Technical Skills</Card.Title>
              <ListGroup variant="flush">
                {Object.entries(profile.technicalSkills).map(([category, skills]) => (
                  <ListGroup.Item key={category}>
                    <strong>{category}:</strong> {skills.join(', ')}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Soft Skills</Card.Title>
              <ListGroup variant="flush">
                {profile.softSkills.map((skill, index) => (
                  <ListGroup.Item key={index}>{skill}</ListGroup.Item>
                ))}
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
              {profile.projects.map((project, index) => (
                <Card.Text key={index}>
                  <strong>{project.name}</strong><br />
                  Technologies: {project.technologies.join(', ')}<br />
                  Description: {project.description}<br />
                  Responsibilities:
                  <ul>
                    {project.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Education</Card.Title>
              <ListGroup variant="flush">
                {profile.education.map((edu, index) => (
                  <ListGroup.Item key={index}>{edu.degree}, {edu.institution}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Certifications</Card.Title>
              <ListGroup variant="flush">
                {profile.certifications.map((cert, index) => (
                  <ListGroup.Item key={index}>
                    {cert.name}, {cert.issuer}<br />
                    {cert.date && `Date: ${cert.date}`}<br />
                    Skills: {cert.skills.join(', ')}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Languages</Card.Title>
              <ListGroup variant="flush">
                {profile.languages.map((lang, index) => (
                  <ListGroup.Item key={index}>{lang}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
