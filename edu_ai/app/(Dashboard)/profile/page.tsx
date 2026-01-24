"use client";
import React from "react";
import Image from "next/image";

const ProfilePage = () => {
  // Technical skills with icons - using popular tech logo CDNs
  const technicalSkills = [
    {
      name: "React",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "TypeScript",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Python",
      level: "Expert",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      name: "Node.js",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "bg-green-50 border-green-200"
    },
    {
      name: "MongoDB",
      level: "Intermediate",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "bg-green-50 border-green-200"
    },
    {
      name: "Docker",
      level: "Intermediate",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Git",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "bg-orange-50 border-orange-200"
    },
    {
      name: "AWS",
      level: "Intermediate",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  // Education and certifications
  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University Name",
      year: "2020 - 2024",
      icon: "🎓"
    },
    {
      degree: "AI/ML Certification",
      institution: "Coursera",
      year: "2023",
      icon: "📜"
    }
  ];

  // Projects showcase
  const projects = [
    {
      title: "Concept Master AI",
      description: "AI-powered educational platform with personalized learning paths",
      tech: ["React", "Python", "TensorFlow"],
      icon: "🚀"
    },
    {
      title: "Smart Study Assistant",
      description: "Intelligent note-taking app with automatic summarization",
      tech: ["TypeScript", "Node.js", "MongoDB"],
      icon: "📚"
    },
    {
      title: "3D Learning Visualizer",
      description: "Interactive 3D models for complex concept visualization",
      tech: ["Three.js", "WebGL", "React"],
      icon: "🎨"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-4xl text-gray-600">👤</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center border-4 border-white">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-lg text-gray-600 mb-4">Full Stack Developer & AI Enthusiast</p>
              <p className="text-gray-500 mb-6 max-w-2xl">
                Passionate about creating innovative solutions that bridge the gap between technology and education. 
                Specialized in building scalable web applications and implementing machine learning models to solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Contact Me
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-900">12+</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">folder</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="text-2xl font-bold text-gray-900">3 Years</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">work</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Skills</p>
                <p className="text-2xl font-bold text-gray-900">15+</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">code</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600">verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">terminal</span>
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technicalSkills.map((skill, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl border ${skill.color} p-4 hover:shadow-md transition-all duration-300 cursor-pointer`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 relative">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{skill.name}</p>
                    <p className="text-xs text-gray-600">{skill.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">rocket_launch</span>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{project.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">school</span>
            Education & Certifications
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl">{edu.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Let&apos;s connect and build something amazing together!</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span className="text-gray-700">in</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span className="text-gray-700">gh</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span className="text-gray-700">@</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;