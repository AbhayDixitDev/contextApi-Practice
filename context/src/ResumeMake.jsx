import React, { useState, useContext } from 'react';
import { ProfileContext } from './contextCount';

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
  };

  return (
    <form onSubmit={handleSubmit} className="resume-form">
      <section>
        <h2>Personal Information</h2>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />
        <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" />
        <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub" />
      </section>

      <section>
        <h2>Summary</h2>
        <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Professional summary" />
      </section>

      <section>
        <h2>Projects</h2>
        {formData.projects.map((project, index) => (
          <div key={index}>
            <input value={project.name} onChange={(e) => handleChange(e, 'projects', index, 'name')} placeholder="Project name" />
            <input value={project.description} onChange={(e) => handleChange(e, 'projects', index, 'description')} placeholder="Description" />
            <input value={project.technologies.join(', ')} onChange={(e) => handleChange(e, 'projects', index, 'technologies')} placeholder="Technologies (comma-separated)" />
          </div>
        ))}
      </section>

      <section>
        <h2>Technical Skills</h2>
        {Object.entries(formData.technicalSkills).map(([category, skills]) => (
          <div key={category}>
            <input value={category} onChange={(e) => handleChange(e, 'technicalSkills', category)} placeholder="Skill category" />
            <input value={skills.join(', ')} onChange={(e) => handleChange(e, 'technicalSkills', category)} placeholder="Skills (comma-separated)" />
          </div>
        ))}
      </section>

      <section>
        <h2>Certifications</h2>
        {formData.certifications.map((cert, index) => (
          <div key={index}>
            <input value={cert.name} onChange={(e) => handleChange(e, 'certifications', index, 'name')} placeholder="Certification name" />
            <input value={cert.issuer} onChange={(e) => handleChange(e, 'certifications', index, 'issuer')} placeholder="Issuer" />
            <input value={cert.date} onChange={(e) => handleChange(e, 'certifications', index, 'date')} placeholder="Date" />
            <input value={cert.skills.join(', ')} onChange={(e) => handleChange(e, 'certifications', index, 'skills')} placeholder="Skills (comma-separated)" />
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input value={edu.degree} onChange={(e) => handleChange(e, 'education', index, 'degree')} placeholder="Degree" />
            <input value={edu.institution} onChange={(e) => handleChange(e, 'education', index, 'institution')} placeholder="Institution" />
          </div>
        ))}
      </section>

      <section>
        <h2>Languages</h2>
        <input value={formData.languages.join(', ')} onChange={(e) => handleChange(e, 'languages')} placeholder="Languages (comma-separated)" />
      </section>

      <button type="submit">Save Resume</button>
    </form>
  );
};

export default Resume;
