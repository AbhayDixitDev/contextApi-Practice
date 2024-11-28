import React, { useContext } from 'react';
import { ProfileContext } from './contextCount';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Document as DocxDocument, Paragraph, TextRun, Packer } from 'docx';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Roboto' },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 5, fontWeight: 'bold' },
  subheading: { fontSize: 12, marginBottom: 3, fontWeight: 'bold' },
  text: { fontSize: 10, marginBottom: 2 },
  column: { flexDirection: 'row', justifyContent: 'space-between' },
  leftColumn: { width: '60%' },
  rightColumn: { width: '35%' },
});

const Home = () => {
  const { profile } = useContext(ProfileContext);

  const generatePDF = async () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>{profile.name}</Text>
            <Text style={styles.subheading}>{profile.title}</Text>
            <Text style={styles.text}>{profile.summary}</Text>
          </View>
          <View style={styles.column}>
            <View style={styles.leftColumn}>
              <View style={styles.section}>
                <Text style={styles.subheading}>Projects</Text>
                {profile.projects.map((project, index) => (
                  <View key={index}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>{project.name}</Text>
                    <Text style={styles.text}>{project.description}</Text>
                    <Text style={styles.text}>Technologies: {project.technologies.join(', ')}</Text>
                    {project.responsibilities.map((resp, i) => (
                      <Text key={i} style={styles.text}>• {resp}</Text>
                    ))}
                  </View>
                ))}
              </View>
              <View style={styles.section}>
                <Text style={styles.subheading}>Education</Text>
                {profile.education.map((edu, index) => (
                  <View key={index}>
                    <Text style={styles.text}>{edu.degree}</Text>
                    <Text style={styles.text}>{edu.institution}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.section}>
                <Text style={styles.subheading}>Contact Information</Text>
                <Text style={styles.text}>Email: {profile.email}</Text>
                <Text style={styles.text}>Phone: {profile.contact}</Text>
                <Text style={styles.text}>Location: {profile.location}</Text>
                <Text style={styles.text}>LinkedIn: {profile.linkedin}</Text>
                <Text style={styles.text}>GitHub: {profile.github}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.subheading}>Certifications</Text>
                {profile.certifications.map((cert, index) => (
                  <View key={index}>
                    <Text style={styles.text}>{cert.name}</Text>
                    <Text style={styles.text}>Issuer: {cert.issuer}</Text>
                    {cert.date && <Text style={styles.text}>Date: {cert.date}</Text>}
                    <Text style={styles.text}>Skills: {cert.skills.join(', ')}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.section}>
                <Text style={styles.subheading}>Technical Skills</Text>
                {Object.entries(profile.technicalSkills).map(([category, skills]) => (
                  <Text key={category} style={styles.text}>{category}: {skills.join(', ')}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text style={styles.subheading}>Soft Skills</Text>
                <Text style={styles.text}>{profile.softSkills.join(', ')}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.subheading}>Languages</Text>
                <Text style={styles.text}>{profile.languages.join(', ')}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
    const blob = await pdf(MyDocument).toBlob();
    saveAs(blob, `${profile.name} Resume.pdf`);
  };

  const generateDOCX = async () => {
    const doc = new DocxDocument({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: profile.name, bold: true, size: 28 }),
              new TextRun({ text: "\n" + profile.title, size: 24 }),
              new TextRun({ text: "\n\n" + profile.summary, size: 20 }),
            ],
          }),
          new Paragraph({
            text: "Contact Information",
            heading: 'Heading2',
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Email: ${profile.email}\n` }),
              new TextRun({ text: `Phone: ${profile.contact}\n` }),
              new TextRun({ text: `Location: ${profile.location}\n` }),
              new TextRun({ text: `LinkedIn: ${profile.linkedin}\n` }),
              new TextRun({ text: `GitHub: ${profile.github}\n` }),
            ],
          }),
          new Paragraph({
            text: "Projects",
            heading: 'Heading2',
          }),
          ...profile.projects.flatMap(project => [
            new Paragraph({
              text: project.name,
              heading: 'Heading3',
            }),
            new Paragraph({ text: project.description }),
            new Paragraph({ text: `Technologies: ${project.technologies.join(', ')}` }),
            ...project.responsibilities.map(resp => new Paragraph({ text: `• ${resp}` })),
          ]),
          new Paragraph({
            text: "Education",
            heading: 'Heading2',
          }),
          ...profile.education.map(edu => new Paragraph({
            text: `${edu.degree} - ${edu.institution}`,
          })),
          new Paragraph({
            text: "Certifications",
            heading: 'Heading2',
          }),
          ...profile.certifications.flatMap(cert => [
            new Paragraph({ text: cert.name, heading: 'Heading3' }),
            new Paragraph({ text: `Issuer: ${cert.issuer}` }),
            ...(cert.date ? [new Paragraph({ text: `Date: ${cert.date}` })] : []),
            new Paragraph({ text: `Skills: ${cert.skills.join(', ')}` }),
          ]),
          new Paragraph({
            text: "Technical Skills",
            heading: 'Heading2',
          }),
          ...Object.entries(profile.technicalSkills).map(([category, skills]) =>
            new Paragraph({ text: `${category}: ${skills.join(', ')}` })
          ),
          new Paragraph({
            text: "Soft Skills",
            heading: 'Heading2',
          }),
          new Paragraph({ text: profile.softSkills.join(', ') }),
          new Paragraph({
            text: "Languages",
            heading: 'Heading2',
          }),
          new Paragraph({ text: profile.languages.join(', ') }),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${profile.name} Resume.docx`);
    });
  };

  const generateImage = () => {
    const node = document.getElementById('resume-content');
    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${profile.name} Resume.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <Container>
      <Card id="resume-content" className="mb-4">
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{profile.title}</Card.Subtitle>
          <Card.Text>{profile.summary}</Card.Text>
          <Card.Text>
            <strong>Email:</strong> {profile.email}<br />
            <strong>Contact:</strong> {profile.contact}<br />
            <strong>Location:</strong> {profile.location}<br />
            <strong>LinkedIn:</strong> {profile.linkedin}<br />
            <strong>GitHub:</strong> {profile.github}
          </Card.Text>
          <Card.Text>
            <strong>Projects:</strong>
            <ListGroup>
              {profile.projects.map((project, index) => (
                <ListGroup.Item key={index}>
                  <h5>{project.name}</h5>
                  <p>{project.description}</p>
                  <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
                  <ul>
                    {project.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
          <Card.Text>
            <strong>Certifications:</strong>
            <ListGroup>
              {profile.certifications.map((cert, index) => (
                <ListGroup.Item key={index}>
                  <h5>{cert.name}</h5>
                  <p><strong>Issuer:</strong> {cert.issuer}</p>
                  {cert.date && <p><strong>Date:</strong> {cert.date}</p>}
                  <p><strong>Skills:</strong> {cert.skills.join(', ')}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
          <Card.Text>
            <strong>Technical Skills:</strong>
            <ul>
              {Object.entries(profile.technicalSkills).map(([category, skills]) => (
                <li key={category}><strong>{category}:</strong> {skills.join(', ')}</li>
              ))}
            </ul>
          </Card.Text>
          <Card.Text>
            <strong>Soft Skills:</strong> {profile.softSkills.join(', ')}
          </Card.Text>
          <Card.Text>
            <strong>Education:</strong>
            <ListGroup>
              {profile.education.map((edu, index) => (
                <ListGroup.Item key={index}>
                  <h5>{edu.degree}</h5>
                  <p>{edu.institution}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
          <Card.Text>
            <strong>Languages:</strong> {profile.languages.join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
      <Row className="mt-3">
        <Col>
          <Button onClick={generatePDF} variant="primary">Download PDF</Button>
        </Col>
        <Col>
          <Button onClick={generateDOCX} variant="secondary">Download DOCX</Button>
        </Col>
        <Col>
          <Button onClick={generateImage} variant="info">Download Image</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
