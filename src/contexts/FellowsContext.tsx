"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Fellows {
  id?: string;
  name?: string;
  email?: string;
  smallBio?: string;
  country?: string;
  location?: string;
  skills?: Array<string>;
  jobTitles?: Array<string>;
  experience?: Record<string, any>;
  education?: Record<string, any>;
  awards?: Record<string, any>;
  experienceLevels?: Record<string, any>;
  accomplishments?: Record<string, any>;
  passions?: string;
  lookingFor?: string;
  hobbies?: Array<any>;
  bookOrQuote?: Array<any>;
  petDetails?: string;
  links?: Array<any>;
  aboutMe?: string;
  avatar?: any;
  shadow?: any;
  locationOptions?: Array<string>;
  colorScheme?: string;
  languages?: Array<string>;
  buttonShadow?: any;
  buttonImg?: any;
  profileIsBeingEdited?: boolean;
  addMoreInfo?: boolean;
  subscriptionAmount?: any;
  savedJobs?: Array<any>;
  dailyApplications?: Record<string, any>;
}

interface FellowsContextType {
  fellows: Fellows[] | null;
  setFellows: (fellows: Fellows[]) => void;
}

const FellowsContext = createContext<FellowsContextType | undefined>(undefined);

export const FellowsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fellows, setFellows] = useState<Fellows[] | null>([
    {
      avatar: "flower",
      id: "testid",
      name: "Jenny Sukut",
      email: "jennysukut@gmail.com",
      smallBio: "Passionate Graphic Designer, Coder, & Creative",
      country: "United States",
      location: "Montana",
      skills: ["Graphic Design", "React.js", "Web Development"],
      jobTitles: ["Web Developer", "Startup Founder"],
      languages: ["English"],
      profileIsBeingEdited: false,
      savedJobs: [],
      experience: [
        {
          title: "Graphic Designer",
          companyName: "WPD",
          yearDetails: "15 Years",
          details:
            "Lead graphic designer in charge of planner and digital designs.",
          id: 1,
        },
        {
          title: "Small Business Owner",
          companyName: "Color.Fully.Curated",
          yearDetails: "3 Years",
          details:
            "I owned and operated a small, colorful business in Columbia TN where I sold handcrafted, bright polymer clay earrings and unique secondhand clothes.",
          id: 2,
        },
      ],
      education: [
        {
          degree: "Full-Stack Engineer",
          school: "TripleTen",
          fieldOfStudy: "Full-Stack Software Development",
          id: 1,
        },
      ],
      awards: [],
      experienceLevels: [
        {
          experienceLevel: "Senior",
          expLevelSkill: "Graphic Design",
          skillYears: "15 Years",
          id: 1,
        },
        {
          experienceLevel: "Junior",
          expLevelSkill: "Front-End Engineer",
          skillYears: "1 Year",
          id: 2,
        },
      ],
      accomplishments: [],
      passions:
        "I'm passionate about living my life and making things better with imagination and creativity.",
      lookingFor:
        "I'm looking to make a meaningful contribution to a place and help make a meaningful contribution to the world in the process.",
      locationOptions: ["remote"],
      hobbies: [
        {
          hobbyTitle: "Polymer Clay Earring Creation",
          howLong: "4 Years",
          id: 1,
        },
        {
          hobbyTitle: "Reading",
          howLong: "Years",
          id: 2,
        },
        {
          hobbyTitle: "Sewing + Clothes Tailoring",
          howLong: "4 Years",
          id: 3,
        },
      ],
      bookOrQuote: [
        {
          bookOrQuote: "The Way Of Kings",
          author: "Brandon Sanderson",
          id: 1,
        },
        {
          bookOrQuote: "Ender's Game",
          author: "Orson Scott Card",
          id: 2,
        },
      ],
      petDetails:
        "I have had an array of pets and I love them all! I don't have any at the moment, but I'd love to get a new one sometime.",
      links: [
        {
          linkType: "Personal Website",
          link: "https://jennysukut.github.io/personal-website/",
          id: 1,
        },
      ],
      aboutMe:
        "I'm wildly passionate about freedom, self-expression, goodness, authenticity, light, beauty, and all things expansive. I like to do things well and for a good purpose. ",
      addMoreInfo: false,
      subscriptionAmount: "0",
    },
    {
      avatar: "checks",
      id: "kittyfritz",
      name: "Cleo Cat",
      email: "kittyfritz@gmail.com",
      smallBio:
        "Part Cat, Part God. I can do everything except for catch that blasted red dot.",
      country: "United States",
      location: "Wyoming",
      skills: ["Nap Expert", "Graphic Design", "Snuggling", "Web Development"],
      jobTitles: ["SnuggleBug", "Pstpstpstpstpst, Here Kitty!"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [
        {
          degree: "Bath Expert",
          school: "Life",
          fieldOfStudy: "Cleanliness",
          id: 1,
        },
      ],
      awards: [],
      accomplishments: [],
      passions:
        "I'm passionate about living my being the amazing ball of fuzz I am.",
      lookingFor: "Snacks, naps, constant praise and adoration.",
      locationOptions: ["remote"],
      hobbies: [
        {
          hobbyTitle: "Being Fantastic",
          howLong: "1 Years",
          id: 1,
        },
        {
          hobbyTitle: "Acting Aloof",
          howLong: "2 Months",
          id: 1,
        },
      ],
      bookOrQuote: [
        {
          bookOrQuote: "I can't read.",
          author: "Every Cat Ever",
          id: 1,
        },
      ],
      petDetails: "I find the term pets derogatory.",
      links: [
        {
          linkType: "Favorite Website",
          link: "https://www.montereybayaquarium.org/animals/live-cams/jelly-cam",
          id: 1,
        },
      ],
      aboutMe:
        "I'm everything you would expect of a great god incarnate into a tiny, furry, pouncy little cat body.",
      subscriptionAmount: "0",
    },
    {
      avatar: "plant",
      id: "123",
      name: "Emily Carter",
      email: "emily.carter@example.com",
      smallBio:
        "A passionate graphic designer with a love for minimalist art and typography. Enjoys hiking and exploring new cultures.",
      country: "United States",
      location: "California",
      skills: ["Graphic Design", "Typography", "Web Development"],
      jobTitles: ["Graphic Designer", "Artist", "Typographer"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [],
      awards: [],
      accomplishments: [],
      locationOptions: ["remote"],
      subscriptionAmount: "0",
    },
    {
      avatar: "chess",
      id: "456",
      name: "Rajesh Patel",
      email: "rajesh.patel@example.com",
      smallBio:
        "Software engineer specializing in AI and machine learning. Loves solving complex problems and playing chess in his free time.",
      country: "India",
      location: "Maharashtra",
      skills: ["Software Engineering", "AI Learning", "Problem Solving"],
      jobTitles: ["AI Specialist", "Software Engineer"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [],
      awards: [],
      accomplishments: [],
      locationOptions: ["remote"],
      subscriptionAmount: "0",
    },
    {
      avatar: "books",
      id: "789",
      name: "Sofia Martínez",
      email: "sofia.martinez@example.com",
      smallBio:
        "Data engineer with a strong background in building scalable ETL pipelines and optimizing data workflows. Enjoys exploring new tools and frameworks to streamline data processing.",
      country: "Mexico",
      location: "Jalisco",
      skills: [
        "Data Engnieering",
        "Data Workflows",
        "Data Entry",
        "Data Security",
        "Cloud Platforms",
        "ETL Pipelines",
        "Big Data Tools",
        "SQL",
        "NoSQL",
        "Data Modeling",
        "Python Programming",
        "Workflow Automation",
      ],
      jobTitles: [
        "ETL Pipeline Scientist",
        "Data Engineer",
        "Cloud Data Architect",
        "ETL Developer",
        "Big Data Specialist",
        "Data Infrastructure Engineer",
      ],
      languages: ["English", "Spanish"],
      savedJobs: [],
      experience: [
        {
          title: "Data Engineer",
          companyName: "Cemex",
          yearDetails: "4 Years",
          details:
            "Designed and implemented scalable ETL pipelines to optimize data flow across the company's global operations. Worked closely with cross-functional teams to integrate data from various sources into a centralized data warehouse.",
          id: 1,
        },
        {
          title: "Senior Cloud Data Architect",
          companyName: "Google Cloud",
          yearDetails: "3 Years",
          details:
            "Led the development of cloud-based data solutions for enterprise clients, focusing on scalability and security. Spearheaded the migration of legacy systems to Google Cloud Platform (GCP) and mentored junior engineers.",
          id: 2,
        },
      ],
      education: [
        {
          degree: "Bachelor's Degree in Computer Science",
          school: "Massachusetts Institute of Technology (MIT)",
          fieldOfStudy: "Computer Science",
          id: 1,
        },
        {
          degree: "Master's Degree in Data Engineering",
          school: "Carnegie Mellon University",
          fieldOfStudy: "Data Engineering",
          id: 2,
        },
        {
          degree: "AWS Certified Solutions Architect",
          school: "Amazon Web Services (AWS)",
          id: 3,
        },
        {
          degree: "Apache Spark and Hadoop Developer",
          school: "Cloudera",
          id: 4,
        },
      ],
      awards: [],
      hobbies: [
        {
          hobbyTitle: "Reading sci-fi and tech-related books",
          id: 1,
        },
        {
          hobbyTitle: "Participating in hackathons and coding challenges",
          id: 2,
        },
        {
          hobbyTitle: "Learning new programming languages or frameworks",

          id: 3,
        },
        {
          hobbyTitle: "Cooking and experimenting with international cuisines",

          id: 4,
        },
      ],
      aboutMe:
        "I’m a Data Engineer and Cloud Data Architect with a passion for building scalable, secure, and efficient data solutions. I grew up in Guadalajara, Mexico, and earned my Bachelor’s in Computer Science from MIT and my Master’s in Data Engineering from Carnegie Mellon University. I’ve worked at Cemex in Monterrey, where I designed ETL pipelines for global operations, and at Google Cloud in California, where I led cloud migrations and mentored teams. I’m certified in AWS and Apache Spark, and I love solving complex data challenges. Outside of work, I enjoy hiking, contributing to open-source projects, and advocating for women in tech. I bring a global perspective, technical expertise, and a commitment to innovation to every project I tackle.",
      accomplishments: [],
      locationOptions: ["remote"],
      subscriptionAmount: "0",
    },
    {
      avatar: "app",
      id: "101",
      name: "Liam O'Connor",
      email: "liam.oconnor@example.com",
      smallBio:
        "Data scientist with a focus on natural language processing and sentiment analysis. Enjoys building predictive models and contributing to open-source projects.",
      country: "Ireland",
      location: "Dublin",
      skills: [
        "Data Science",
        "Natural Language Processing",
        "Sentiment Analysis",
        "Data Entry",
      ],
      jobTitles: ["Data Scientist", "Predictive-Model Architect"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [],
      awards: [],
      accomplishments: [],
      locationOptions: ["remote"],
      subscriptionAmount: "0",
    },
    {
      avatar: "code",
      id: "234",
      name: "Aisha Bello",
      email: "aisha.bello@example.com",
      smallBio:
        "Machine learning engineer specializing in computer vision applications. Passionate about using AI to solve real-world problems in healthcare and agriculture.",
      country: "Nigeria",
      location: "Lagos",
      skills: ["Machine Learning", "Visual Applications", "AI Scientist"],
      jobTitles: ["Machine Learning Engineer", "AI Problem-Solver"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [],
      awards: [],
      accomplishments: [],
      locationOptions: ["remote"],
      subscriptionAmount: "0",
    },
    {
      avatar: "dice",
      id: "567",
      name: "Hiroshi Tanaka",
      email: "hiroshi.tanaka@example.com",
      smallBio:
        "Data analyst with expertise in big data and cloud computing. Enjoys visualizing complex datasets and mentoring aspiring data professionals.",
      country: "Japan",
      location: "Tokyo",
      skills: ["Data Analysis", "Cloud Computing", "Data Visualization"],
      jobTitles: ["Data Analyst"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [],
      awards: [],
      accomplishments: [],
      locationOptions: ["remote"],
      subscriptionAmount: "0",
    },
  ]);

  return (
    <FellowsContext.Provider value={{ fellows, setFellows }}>
      {children}
    </FellowsContext.Provider>
  );
};

export const useFellows = () => {
  const context = useContext(FellowsContext);
  if (!context) {
    throw new Error("useFellows must be used within a FellowsProvider");
  }
  return context;
};
