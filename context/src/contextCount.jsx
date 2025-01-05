import { createContext, useState } from 'react'

const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: "",
        title: "",
        location: "",
        email: "",
        contact: "",
        linkedin: "",
        github: "",
        summary: "",
        projects: [
            {
                name: "",
                technologies: [],
                description: "",
                responsibilities: []
            },
            {
                name: "",
                technologies: [],
                description: "",
                responsibilities: []
            }
        ],
        certifications: [
            {
                name: "",
                issuer: "",
                date: "",
                skills: []
            },
            {
                name: "",
                issuer: "",
                skills: []
            }
        ],
        technicalSkills: {
            programmingLanguages: [],
            frontEnd: [],
            backEnd: [],
            database: [],
            tools: [],
            api: []
        },
        softSkills: [],
        education: [
            {
                degree: "",
                institution: ""
            },
            {
                degree: "",
                institution: ""
            }
        ],
        languages: []
    })

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider
export { ProfileContext }