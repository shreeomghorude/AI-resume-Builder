const dummyResumeData = [
  {
    _id: "1",
    title: "John Doe Resume",

    personal_info: {
      full_name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 98765 43210",
      location: "New York, USA",
      linkedin: "https://linkedin.com/in/johndoe",
      website: "https://johndoe.dev",
      image: ""
    },

    professional_summary:
      "Full Stack Developer with 3+ years of experience building scalable web apps using React, Node.js, and MongoDB.",

    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
      "Git"
    ],

    experience: [
      {
        position: "Full Stack Developer",
        company: "TechCorp Inc.",
        start_date: "2022-06",
        end_date: "",
        is_current: true,
        description:
          "Built MERN applications, improved frontend performance by 35%, implemented reusable components."
      },
      {
        position: "Frontend Developer",
        company: "WebStudio",
        start_date: "2020-02",
        end_date: "2022-05",
        is_current: false,
        description:
          "Developed reactive UI interfaces using React and Tailwind CSS."
      }
    ],

    education: [
      {
        degree: "B.Tech",
        field: "Computer Science",
        institution: "MIT",
        graduation_date: "2020-05"
      }
    ],

    // IMPORTANT: Your template expects "project", not "projects"
    project: [
      {
        name: "Portfolio Website",
        description: "Created a personal portfolio using React and animations."
      }
    ],

    template: "classic",
    accent_color: "#3B82F6",
    public: false
  }
];

export default dummyResumeData;
