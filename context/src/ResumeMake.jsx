import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from './contextCount';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Resume = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const validateForm = () => {
    let newErrors = {};
    const requiredFields = ['name', 'title', 'location', 'email', 'contact', 'linkedin', 'github', 'summary'];
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    ['projects', 'certifications', 'education'].forEach(section => {
      if (!formData[section]?.length) newErrors[section] = `At least one ${section.slice(0, -1)} is required`;
    });

    formData.projects?.forEach((project, index) => {
      ['name', 'description'].forEach(field => {
        if (!project[field]?.trim()) newErrors[`projects[${index}].${field}`] = `Project ${field} is required`;
      });
      if (!project.technologies?.length) newErrors[`projects[${index}].technologies`] = "At least one technology is required";
    });

    formData.education?.forEach((edu, index) => {
      ['degree', 'institution'].forEach(field => {
        if (!edu[field]?.trim()) newErrors[`education[${index}].${field}`] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      });
    });

    Object.entries(formData.technicalSkills || {}).forEach(([category, skills]) => {
      if (!skills?.length) {
        newErrors[`technicalSkills.${category}`] = `At least one ${category} skill is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, section, index, field) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (section) {
        const updatedSection = [...(prev[section] || [])];
        if (index !== undefined) {
          if (field === 'technologies' || field === 'skills') {
            updatedSection[index] = { ...updatedSection[index], [field]: value.split(',').map(item => item.trim()) };
          } else {
            updatedSection[index] = { ...updatedSection[index], [field]: value };
          }
        } else {
          updatedSection[name] = value;
        }
        return { ...prev, [section]: updatedSection };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://data-resume.vercel.app/users', formData);
        setProfile(response.data);
        alert('Resume saved successfully!');
      } catch (error) {
        console.error('Error saving resume:', error);
        alert('Failed to save resume. Please try again.');
      }
    }
  };

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit}>
      <Button variant="primary" type="submit" className="mt-4">Save Resume</Button>

        <h2 className="mb-4">Personal Information</h2>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" isInvalid={!!errors.title} />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control name="contact" value={formData.contact || ''} onChange={handleChange} placeholder="Contact" isInvalid={!!errors.contact} />
              <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Control name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location" isInvalid={!!errors.location} />
              <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Control name="linkedin" value={formData.linkedin || ''} onChange={handleChange} placeholder="LinkedIn" isInvalid={!!errors.linkedin} />
              <Form.Control.Feedback type="invalid">{errors.linkedin}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Control name="github" value={formData.github || ''} onChange={handleChange} placeholder="GitHub" isInvalid={!!errors.github} />
              <Form.Control.Feedback type="invalid">{errors.github}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <h2 className="mt-5 mb-4">Summary</h2>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} name="summary" value={formData.summary || ''} onChange={handleChange} placeholder="Professional summary" isInvalid={!!errors.summary} />
          <Form.Control.Feedback type="invalid">{errors.summary}</Form.Control.Feedback>
        </Form.Group>

        <h2 className="mt-5 mb-4">Projects</h2>
        {formData.projects?.map((project, index) => (
          <Row key={index} className="mb-3">
            <Col md={4}>
              <Form.Control value={project.name || ''} onChange={(e) => handleChange(e, 'projects', index, 'name')} placeholder="Project name" isInvalid={!!errors[`projects[${index}].name`]} />
              <Form.Control.Feedback type="invalid">{errors[`projects[${index}].name`]}</Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Control value={project.description || ''} onChange={(e) => handleChange(e, 'projects', index, 'description')} placeholder="Description" isInvalid={!!errors[`projects[${index}].description`]} />
              <Form.Control.Feedback type="invalid">{errors[`projects[${index}].description`]}</Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Control value={project.technologies ? project.technologies.join(', ') : ''} onChange={(e) => handleChange(e, 'projects', index, 'technologies')} placeholder="Technologies (comma-separated)" isInvalid={!!errors[`projects[${index}].technologies`]} />
              <Form.Control.Feedback type="invalid">{errors[`projects[${index}].technologies`]}</Form.Control.Feedback>
            </Col>
          </Row>
        ))}
        {errors.projects && <div className="text-danger">{errors.projects}</div>}

        <h2 className="mt-5 mb-4">Technical Skills</h2>
        {Object.entries(formData.technicalSkills || {}).map(([category, skills]) => (
          <Row key={category} className="mb-3">
            <Col md={6}>
              <Form.Control 
                value={category} 
                onChange={(e) => {
                  const newCategory = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    technicalSkills: {
                      ...prev.technicalSkills,
                      [newCategory]: prev.technicalSkills[category] || []
                    }
                  }));
                }} 
                placeholder="Skill category" 
                isInvalid={!!errors[`technicalSkills.${category}`]} 
              />
              <Form.Control.Feedback type="invalid">{errors[`technicalSkills.${category}`]}</Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Control 
                value={skills ? skills.join(', ') : ''} 
                onChange={(e) => {
                  const newSkills = e.target.value.split(',').map(skill => skill.trim());
                  setFormData(prev => ({
                    ...prev,
                    technicalSkills: {
                      ...prev.technicalSkills,
                      [category]: newSkills
                    }
                  }));
                }} 
                placeholder="Skills (comma-separated)" 
                isInvalid={!!errors[`technicalSkills.${category}`]} 
              />
              <Form.Control.Feedback type="invalid">{errors[`technicalSkills.${category}`]}</Form.Control.Feedback>
            </Col>
          </Row>
        ))}

        <h2 className="mt-5 mb-4">Certifications</h2>
        {formData.certifications?.map((cert, index) => (
          <Row key={index} className="mb-3">
            <Col md={3}>
              <Form.Control value={cert.name || ''} onChange={(e) => handleChange(e, 'certifications', index, 'name')} placeholder="Certification name" isInvalid={!!errors[`certifications[${index}].name`]} />
              <Form.Control.Feedback type="invalid">{errors[`certifications[${index}].name`]}</Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control value={cert.issuer || ''} onChange={(e) => handleChange(e, 'certifications', index, 'issuer')} placeholder="Issuer" isInvalid={!!errors[`certifications[${index}].issuer`]} />
              <Form.Control.Feedback type="invalid">{errors[`certifications[${index}].issuer`]}</Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control value={cert.date || ''} onChange={(e) => handleChange(e, 'certifications', index, 'date')} placeholder="Date" isInvalid={!!errors[`certifications[${index}].date`]} />
              <Form.Control.Feedback type="invalid">{errors[`certifications[${index}].date`]}</Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control value={cert.skills ? cert.skills.join(', ') : ''} onChange={(e) => handleChange(e, 'certifications', index, 'skills')} placeholder="Skills (comma-separated)" isInvalid={!!errors[`certifications[${index}].skills`]} />
              <Form.Control.Feedback type="invalid">{errors[`certifications[${index}].skills`]}</Form.Control.Feedback>
            </Col>
          </Row>
        ))}
        {errors.certifications && <div className="text-danger">{errors.certifications}</div>}

        <h2 className="mt-5 mb-4">Education</h2>
        {formData.education?.map((edu, index) => (
          <Row key={index} className="mb-3">
            <Col md={6}>
              <Form.Control value={edu.degree || ''} onChange={(e) => handleChange(e, 'education', index, 'degree')} placeholder="Degree" isInvalid={!!errors[`education[${index}].degree`]} />
              <Form.Control.Feedback type="invalid">{errors[`education[${index}].degree`]}</Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Control value={edu.institution || ''} onChange={(e) => handleChange(e, 'education', index, 'institution')} placeholder="Institution" isInvalid={!!errors[`education[${index}].institution`]} />
              <Form.Control.Feedback type="invalid">{errors[`education[${index}].institution`]}</Form.Control.Feedback>
            </Col>
          </Row>
        ))}
        {errors.education && <div className="text-danger">{errors.education}</div>}

        <h2 className="mt-5 mb-4">Languages</h2>
        <Form.Group className="mb-3">
          <Form.Control
            value={formData.languages ? formData.languages.join(', ') : ''}
            onChange={(e) => {
              const newLanguages = e.target.value.split(',').map(lang => lang.trim());
              setFormData(prev => ({ ...prev, languages: newLanguages }));
            }}
            placeholder="Languages (comma-separated)"
            isInvalid={!!errors.languages}
          />
          <Form.Control.Feedback type="invalid">{errors.languages}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">Save Resume</Button>
      </Form>
    </Container>
  );
};

export default Resume;