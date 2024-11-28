import React, { useState, useContext } from 'react';
import { ProfileContext } from './contextCount';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Resume = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e, section, index, field) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (section) {
        const updatedSection = [...prev[section]];
        if (index !== undefined) {
          updatedSection[index] = { ...updatedSection[index], [field]: value };
        } else {
          updatedSection[name] = value;
        }
        return { ...prev, [section]: updatedSection };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    alert('Resume saved successfully!');
  };

  return (
    <Container className="mt-5">

      <Form onSubmit={handleSubmit}>
      <Button 
        variant="primary" 
        type="submit" 
        style={{
          position: 'fixed',
          top: '5rem',
          right: '7rem',
          zIndex: 1000,
          float: 'right',
          animation: 'wave 2s infinite'
        }}
      >
        <style>
          {`
            @keyframes wave {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
          `}
        </style>
        Save Resume
      </Button>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>GitHub</Form.Label>
              <Form.Control type="text" name="github" value={formData.github} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Professional Summary</Form.Label>
          <Form.Control as="textarea" rows={3} name="summary" value={formData.summary} onChange={handleChange} />
        </Form.Group>

        <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <Row key={index} className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" value={project.name} onChange={(e) => handleChange(e, 'projects', index, 'name')} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={project.description} onChange={(e) => handleChange(e, 'projects', index, 'description')} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Technologies</Form.Label>
                <Form.Control type="text" value={project.technologies.join(', ')} onChange={(e) => handleChange(e, 'projects', index, 'technologies')} />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <h3>Technical Skills</h3>
        {Object.entries(formData.technicalSkills).map(([category, skills], index) => (
          <Row key={category} className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Skill Category</Form.Label>
                <Form.Control type="text" value={category} onChange={(e) => handleChange(e, 'technicalSkills', category)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Skills</Form.Label>
                <Form.Control type="text" value={skills.join(', ')} onChange={(e) => handleChange(e, 'technicalSkills', category)} />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <h3>Certifications</h3>
        {formData.certifications.map((cert, index) => (
          <Row key={index} className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Certification Name</Form.Label>
                <Form.Control type="text" value={cert.name} onChange={(e) => handleChange(e, 'certifications', index, 'name')} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Issuer</Form.Label>
                <Form.Control type="text" value={cert.issuer} onChange={(e) => handleChange(e, 'certifications', index, 'issuer')} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" value={cert.date} onChange={(e) => handleChange(e, 'certifications', index, 'date')} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Skills</Form.Label>
                <Form.Control type="text" value={cert.skills.join(', ')} onChange={(e) => handleChange(e, 'certifications', index, 'skills')} />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <Row key={index} className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Degree</Form.Label>
                <Form.Control type="text" value={edu.degree} onChange={(e) => handleChange(e, 'education', index, 'degree')} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Institution</Form.Label>
                <Form.Control type="text" value={edu.institution} onChange={(e) => handleChange(e, 'education', index, 'institution')} />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Languages</Form.Label>
          <Form.Control type="text" value={formData.languages.join(', ')} onChange={(e) => handleChange(e, 'languages')} />
        </Form.Group>

        <Button variant="primary" type="submit">Save Resume</Button>
      </Form>
    </Container>
  );
};

export default Resume;
