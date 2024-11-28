import React, { useContext } from 'react';
import { ProfileContext } from './contextCount';

const Home = () => {
  const { profile } = useContext(ProfileContext);

  return (
    <div className="container">
      <h1>{profile.name}</h1>
      <h2>{profile.title}</h2>
      <p>{profile.summary}</p>
      <div>
        <h3>Contact Information</h3>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.contact}</p>
        <p>Location: {profile.location}</p>
        <p>LinkedIn: <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">{profile.linkedin}</a></p>
        <p>GitHub: <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">{profile.github}</a></p>
      </div>
      <div>
        <h3>Projects</h3>
        {profile.projects.map((project, index) => (
          <div key={index}>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>
            <ul>
              {project.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h3>Technical Skills</h3>
        <ul>
          {Object.entries(profile.technicalSkills).map(([category, skills]) => (
            <li key={category}>{category}: {skills.join(', ')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
