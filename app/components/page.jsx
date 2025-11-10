 
// components/Portfolio.jsx
'use client';
import { useState, useEffect } from 'react';
import { contactApi } from '../lib/contactApi';



// ContactForm Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
      setFormStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');

    try {
      const result = await contactApi.submitContact(formData);
      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
        setErrorMessage('Failed to submit contact form. Please try again.');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error.message || 'Sorry, there was an error sending your message. Please try again.');
      console.error('Contact form error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div>
        <input 
          type="text" 
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />
      </div>
      
      <div>
        <input 
          type="email" 
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />
      </div>
      
      <div>
        <input 
          type="text" 
          name="subject"
          placeholder="Subject (Optional)"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />
      </div>
      
      <div>
        <textarea 
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        ></textarea>
      </div>
      
      <button 
        type="submit"
        disabled={formStatus === 'sending'}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      
      {formStatus === 'success' && (
        <div className="p-3 bg-green-100 text-green-700 rounded-lg">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {errorMessage || 'Sorry, there was an error sending your message. Please try again.'}
        </div>
      )}
    </form>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates",
      technologies: ["React", "Firebase", "Material-UI"],
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Responsive weather application with forecast and mapping features",
      technologies: ["JavaScript", "API Integration", "Chart.js"],
    }
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "CSS/SCSS", level: 95 },
    { name: "UI/UX Design", level: 75 },
    { name: "MongoDB", level: 70 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">Portfolio</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-blue-600 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-blue-600 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
              <div className="flex flex-col space-y-4 px-4">
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">About</button>
                <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Projects</button>
                <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Skills</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Contact</button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors w-full text-center">
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                Hi, I&apos;m <span className="text-blue-600">Alex Johnson</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-gray-600 mb-6">
                Full-Stack Developer & UI/UX Designer
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                I create beautiful, functional web applications with modern technologies. Passionate about clean code, user experience, and bringing ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  View My Work
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Image/Graphics */}
            <div className="lg:w-1/2 relative">
              <div className="w-80 h-80 mx-auto bg-linear-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-white text-6xl">
                  👨‍💻
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                React
              </div>
              <div className="absolute top-1/2 -right-4 bg-white px-4 py-2 rounded-full shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                JS
              </div>
              <div className="absolute -bottom-4 left-1/4 bg-white px-4 py-2 rounded-full shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                CSS3
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get to know more about my journey and passion
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Creating digital experiences that matter
            </h3>
            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                I&apos;m a passionate full-stack developer with 3+ years of experience building web applications. 
                I specialize in React, Node.js, and modern JavaScript ecosystems. I love turning complex 
                problems into simple, beautiful designs.
              </p>
              <p>
                When I&apos;m not coding, you can find me contributing to open-source projects, learning new 
                technologies, or sharing knowledge through technical writing.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">My Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Some of my recent work and personal projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-4xl">💻</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">My Skills</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-linear-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s talk!
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-300">alex@example.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-300">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;