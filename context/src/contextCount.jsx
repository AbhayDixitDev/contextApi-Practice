import { createContext, useState } from 'react'

const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: "ABHAY DIXIT",
        title: "MERN Full Stack Developer",
        location: "BHOPAL",
        email: "Abhaydixit.dev@gmail.com",
        contact: "+91 7017709865",
        linkedin: "linkedin.com/in/AbhayDixitDev",
        github: "github.com/AbhayDixitDev",
        summary: "A highly driven web developer with a strong foundation in both frontend and backend development, committed to staying ahead of the curve in the IT sector, eager to collaborate on cutting-edge projects and drive success and innovation in a dynamic organization.",
        projects: [
            {
                name: "Flight Booking System Website",
                technologies: ["HTML", "CSS", "JavaScript", "JSON", "Vercel", "VS Code", "GitHub"],
                description: "Developed a flight booking system simulating a real-world scenario for an online travel agency.",
                responsibilities: [
                    "Developed features for flight search, booking, history, and an admin panel",
                    "Created a responsive website using HTML, CSS, and JavaScript",
                    "Used GitHub for version control and Vercel for deployment"
                ]
            },
            {
                name: "E-Voting Web Application",
                technologies: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "XAMPP Server"],
                description: "Developed a functional Server-Side E-voting web application, simulating a secure voting system.",
                responsibilities: [
                    "Developed secure PHP/SQL applications",
                    "Used JavaScript to add dynamic features to the client side",
                    "Employed XAMPP Server for testing and deployment"
                ]
            }
        ],
        certifications: [
            {
                name: "MERN Full Stack Developer",
                issuer: "CYBROM Technologies Pvt. Ltd., Bhopal",
                date: "April 2024 - Present",
                skills: ["Front-End Expert", "Tech Savvy", "Problem-Solver"]
            },
            {
                name: "Global Service Desk Certificate",
                issuer: "NIIT Foundation & DXC Technology",
                skills: ["Client Focus", "Efficient Problem-Solving", "Collaborative & Adaptable"]
            }
        ],
        technicalSkills: {
            programmingLanguages: ["C++", "JavaScript"],
            frontEnd: ["React js", "Tailwind CSS", "BootStrap-5", "HTML5"],
            backEnd: ["Node.js", "Express"],
            database: ["MongoDB", "Database Design"],
            tools: ["Git", "GitHub", "VS Code", "Net Beans IDE", "JIRA"],
            api: ["Axios"]
        },
        softSkills: ["Effective Communication", "Problem-Solving", "Teamwork"],
        education: [
            {
                degree: "B. Tech. in Information Technology",
                institution: "University Institute of Technology RGPV, Bhopal, Madhya Pradesh"
            },
            {
                degree: "Polytechnic Diploma in Computer Science",
                institution: "S.R. Govt. Polytechnic College, Sagar, Madhya Pradesh"
            }
        ],
        languages: ["English (Proficient)", "Hindi (Excellent)"]
    })

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider
export { ProfileContext }