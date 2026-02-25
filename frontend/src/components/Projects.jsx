import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import { fetchProjects } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const mainRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API with fallback to local data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const apiProjects = await fetchProjects();
        
        if (apiProjects && apiProjects.length > 0) {
          setProjects(apiProjects);
        } else {
          // Fallback to local data if API returns empty
          setProjects(portfolioData.projects);
        }
        setError(null);
      } catch (err) {
        console.warn('API unavailable, using local data:', err.message);
        // Fallback to local data on error
        setProjects(portfolioData.projects);
        setError('Using local data');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const currentProject = projects.length > 0 ? projects[activeProject] : portfolioData.projects[0];

  useEffect(() => {
    const section = sectionRef.current;

    // Create a scroll-triggered fade-in effect
    const slides = document.querySelectorAll('.project-slide-full');
    
    slides.forEach((slide, index) => {
      gsap.fromTo(slide,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, []);

  // Animation when project changes
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Animate out current slide
    tl.to(mainRef.current, {
      opacity: 0,
      x: -50,
      scale: 0.95,
      duration: 0.4
    })
    // Animate in new slide
    .set(mainRef.current, {
      x: 50,
      scale: 0.95
    })
    .to(mainRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.6
    });
  }, [activeProject]);

  const nextProject = () => {
    setActiveProject(prev => prev < projects.length - 1 ? prev + 1 : 0);
  };

  const prevProject = () => {
    setActiveProject(prev => prev > 0 ? prev - 1 : projects.length - 1);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="section projects-section" id="projects" ref={sectionRef}>
        <div className="projects-presentation">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des projets...</p>
          </div>
        </div>
      </section>
    );
  }

  const displayProjects = projects.length > 0 ? projects : portfolioData.projects;

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="projects-presentation">
        {/* Progress Bar */}
        <div className="projects-progress">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${((activeProject + 1) / displayProjects.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-info">
            <span className="current-slide">{String(activeProject + 1).padStart(2, '0')}</span>
            <span className="separator">/</span>
            <span className="total-slides">{String(displayProjects.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Main Project Slide */}
        <div className="project-slide-full" ref={mainRef}>
          {/* Slide Header */}
          <div className="slide-header-full">
            <div className="profile-section">
              <img 
                src={portfolioData.profileImage}
                alt={portfolioData.name}
                className="profile-img"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=BI&background=007bff&color=fff&size=100`;
                }}
              />
              <div className="profile-details">
                <span className="profile-name">{portfolioData.name}</span>
                <span className="profile-role">{portfolioData.title}</span>
              </div>
            </div>
            <div className="slide-number">
              <span className="number">{String(activeProject + 1).padStart(2, '0')}</span>
              <span className="label">Projet</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="slide-grid">
            {/* Left Content Area */}
            <div className="slide-content-area">
              <div className="project-title-block">
                <h2 className="project-title">{currentProject.title}</h2>
                <p className="project-subtitle">{currentProject.subtitle}</p>
              </div>

              <div className="project-info-grid">
                {/* Time & Idea Card */}
                <div className="info-card idea-card">
                  <div className="card-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="card-content">
                    <h4>Idée & Temps</h4>
                    <p className="time">{currentProject.workTime}</p>
                    <p className="description">{currentProject.idea}</p>
                  </div>
                </div>

                {/* Learned Card */}
                <div className="info-card learned-card">
                  <div className="card-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="card-content">
                    <h4>Ce que j'ai appris</h4>
                    <ul className="learned-items">
                      {currentProject.learned.map((item, index) => (
                        <li key={index}>
                          <span className="bullet">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="tech-tags">
                {currentProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <a href={currentProject.videoLink} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                  <i className="fas fa-play"></i>
                  <span>Regarder la présentation</span>
                </a>
                <a href={currentProject.github} className="action-btn secondary">
                  <i className="fab fa-github"></i>
                  <span>Voir le code</span>
                </a>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="slide-media-area">
              <div className="media-container">
                <img 
                  src={currentProject.imageUrl}
                  alt={currentProject.title}
                  className="project-main-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/007bff/ffffff?text=${encodeURIComponent(currentProject.title)}`;
                  }}
                />
                <div className="media-overlay">
                  <a href={currentProject.videoLink} target="_blank" rel="noopener noreferrer" className="play-button">
                    <div className="play-icon-inner">
                      <i className="fas fa-play"></i>
                    </div>
                  </a>
                </div>
                <div className="image-frame-corner top-left"></div>
                <div className="image-frame-corner top-right"></div>
                <div className="image-frame-corner bottom-left"></div>
                <div className="image-frame-corner bottom-right"></div>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="slide-footer-full">
            <div className="footer-left">
              <span><i className="fas fa-map-marker-alt"></i> {portfolioData.location}</span>
              <span><i className="fas fa-envelope"></i> {portfolioData.email}</span>
            </div>
            
            <div className="navigation-controls">
              <button className="nav-btn" onClick={prevProject}>
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <div className="slide-dots">
                {displayProjects.map((_, index) => (
                  <button 
                    key={index}
                    className={`dot ${index === activeProject ? 'active' : ''}`}
                    onClick={() => setActiveProject(index)}
                  />
                ))}
              </div>
              
              <button className="nav-btn" onClick={nextProject}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="footer-right">
              <span className="nav-hint">Utilisez les flèches ou cliquez sur les points</span>
            </div>
          </div>
        </div>

        {/* Project Thumbnails Navigation */}
        <div className="projects-thumbnails">
          {displayProjects.map((project, index) => (
            <button 
              key={project.id || index}
              className={`thumbnail ${index === activeProject ? 'active' : ''}`}
              onClick={() => setActiveProject(index)}
            >
              <span className="thumb-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="thumb-title">{project.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
