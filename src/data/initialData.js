// Offline / instant-load snapshot of portfolio data.
// Automatically updated in localStorage whenever live backend responds.

export const initialAbout = [
  {
    id: 1,
    name: "Muralidharan A",
    profession: "Aspiring Java Full Stack Developer",
    description: "B.Tech Information Technology graduate with hands-on training in Java Full Stack Development and practical experience in web application development. Proficient in Java, Spring, Spring Boot, Spring Security, Hibernate, JDBC, JSP, Servlets, RESTful APIs, PostgreSQL, React.js, HTML, CSS, and JavaScript. A motivated, adaptable, and quick-learning aspiring software developer with strong problem-solving skills and a passion for technology. Seeking an opportunity to contribute to a professional IT organization while continuously strengthening technical expertise and building a successful career in software engineering. ",
    email: "md9611250@gmail.com",
    mobile: "+918610356350",
    loc: "Chennai",
    lang: "Tamil, English, Telugu",
    linkedId: "https://linkedin.com/in/muralidhar0506/",
    gitId: "https://github.com/Muralidharan005/",
    img: "f1fa2b2d-9195-4b60-ab6d-4951741797b0.png",
    resume: "resume_19c26ee7-0285-4a65-b983-f7b8beaa0557.pdf"
  }
];

export const initialEducation = [
  {
    id: 1,
    eduType: "B.Tech - Information Technology",
    eduDesc: "Indra Ganesan College of Engineering | Trichy | Sep 2022 – May 2026 ",
    eduPer: "8.25"
  },
  {
    id: 2,
    eduType: "Higher Secondary Certificate (HSC) ",
    eduDesc: "Sir SivaSwami Ayyar Higher Secondary School | Thirukkattupalli | 2022 ",
    eduPer: "74"
  },
  {
    id: 3,
    eduType: "Secondary School Leaving Certificate (SSLC)",
    eduDesc: "Sir SivaSwami Ayyar Higher Secondary School | Thirukkattupalli | 2020",
    eduPer: "85"
  }
];

export const initialSkills = [
  {
    id: 1,
    skillTitle: "Programming",
    skill: "Java",
    skillImg: "5211ef61-41cf-4338-8170-375c2fa9c547.png"
  },
  {
    id: 2,
    skillTitle: "Frontend",
    skill: "HTML | CSS | JavaScript | React.js",
    skillImg: "8e805d76-9df9-41ce-8e12-bfaf899f4153.png"
  },
  {
    id: 3,
    skillTitle: "Backend",
    skill: "Servlets | JSP | JDBC | Hibernate | Spring | Spring Boot | Spring Security | JWT | RESTful APIs",
    skillImg: "c93c71b9-bae9-43a8-b803-88d862ed2309.png"
  },
  {
    id: 4,
    skillTitle: "Database",
    skill: "PostgreSQL | MySQL | SQL",
    skillImg: "170fe780-3d85-4956-b60c-ecc4f6bdd53b.svg"
  },
  {
    id: 5,
    skillTitle: "Tools",
    skill: "Git | GitHub | Maven | Postman",
    skillImg: "756e55f6-7ada-498c-9845-abf5266383ba.png"
  },
  {
    id: 8,
    skillTitle: "UI/UX",
    skill: "Figma | Canva",
    skillImg: "f4ce2fd8-c8fd-4128-a6e7-548f2e842bfc.png"
  },
  {
    id: 9,
    skillTitle: "Development Environment",
    skill: "Visual Studio | Visual Studio Code | Jupyter Notebook | Anaconda",
    skillImg: ""
  }
];

export const initialProjects = [
  {
    id: 2,
    proName: "Event Management & Ticketing Platform – Bridge2Event | React.js, Java, Spring Boot, Spring Security,  JWT, PostgreSQL",
    proDesc: "Developed a full-stack event ticketing and management platform enabling attendees to discover events and book tickets, and organizers to create events with multi-tier pricing. Implemented JWT-based role authentication, automated digital QR code ticket generation, real-time mobile camera gate check-in, and transactional seat inventory management using Spring Boot and PostgreSQL. ",
    liveLink: "https://bridge2event.vercel.app",
    gitLink: "https://github.com/Muralidharan005/Event_Management_System",
    pubTitle: "",
    pubDesc: ""
  },
  {
    id: 3,
    proName: "Job Portal | JSP, Java, Jakarta Servlets, JDBC, PostgreSQL ",
    proDesc: "Developed a web-based job portal that enables companies to post job openings and candidates to search and apply for jobs. Implemented user authentication, job management, resume upload, and dashboards for companies and candidates using Java web technologies and PostgreSQL. ",
    liveLink: "",
    gitLink: "https://github.com/Muralidharan005/Job_Portal",
    pubTitle: "",
    pubDesc: ""
  },
  {
    id: 6,
    proName: "Student Vote Web Application | HTML, Tailwind CSS, JavaScript, Google Sheets ",
    proDesc: "Built a responsive student voting platform with online voting and an admin dashboard. Implemented real-time vote counting and result tracking for student elections such as President, Vice President and Treasurer.Implemented secure vote submission with candidate-wise result visualization and Google Sheets integration for storing and managing election data. ",
    liveLink: "",
    gitLink: "",
    pubTitle: "",
    pubDesc: ""
  },
  {
    id: 5,
    proName: "See Your Luck Today | HTML5",
    proDesc: "A simple fortune and luck-themed web page built using HTML. The project presents a visually designed interface that allows users to explore their luck and daily predictions through a clean and engaging webpage layout.",
    liveLink: "",
    gitLink: "https://github.com/Muralidharan005/See-your-luck-today-",
    pubTitle: "",
    pubDesc: ""
  },
  {
    id: 4,
    proName: "2D Running Game | HTML5, CSS3, JavaScript",
    proDesc: "A browser-based 2D endless running game developed using HTML5, CSS3, and JavaScript. The game features 30 selectable characters, obstacle avoidance, distance-based scoring, progressive difficulty, character-specific sounds, and microphone-based jump detection. Implemented real-time game physics, collision detection, animations, and responsive gameplay using the HTML5 Canvas API.",
    liveLink: "",
    gitLink: "https://github.com/Muralidharan005/2D-Running_Game",
    pubTitle: "",
    pubDesc: ""
  },
  {
    id: 1,
    proName: "",
    proDesc: "",
    liveLink: "",
    gitLink: "",
    pubTitle: "Content Moderation in Cloud Storage Service using Artificial Intelligence",
    pubDesc: "Presented at the 7th International Conference on Artificial Intelligence, Data Science, and Cyber Security, held at Indra Ganesan College of Engineering on April 3–4, 2025. "
  }
];

export const initialInternships = [
  {
    id: 1,
    internTitle: "Java Full Stack",
    internDesc: " QSpiders Training & Development, Vadapalani, Chennai",
    internDur: "Dec 2025 – Present",
    certifiTitle: "",
    certifiDesc: "",
    certifiDur: ""
  },
  {
    id: 2,
    internTitle: "Full Stack Web Development",
    internDesc: "Ezone Technologies, Trichy",
    internDur: "Jul 2025 – Aug 2025",
    certifiTitle: "",
    certifiDesc: "",
    certifiDur: ""
  },
  {
    id: 3,
    internTitle: "UI/UX Design",
    internDesc: " Marcello Tech, Trichy",
    internDur: "Feb 2025 – Mar 2025",
    certifiTitle: "",
    certifiDesc: "",
    certifiDur: ""
  },
  {
    id: 4,
    internTitle: "",
    internDesc: "",
    internDur: "",
    certifiTitle: "Java",
    certifiDesc: "NPTEL",
    certifiDur: "Jul 2025 – Oct 2025"
  },
  {
    id: 5,
    internTitle: "",
    internDesc: "",
    internDur: "",
    certifiTitle: "UI/UX Design",
    certifiDesc: "Marcello",
    certifiDur: "Feb 2025"
  },
  {
    id: 6,
    internTitle: "",
    internDesc: "",
    internDur: "",
    certifiTitle: "Excel",
    certifiDesc: "Lets Upgrade & Office Master",
    certifiDur: "Feb 2025"
  }
];
