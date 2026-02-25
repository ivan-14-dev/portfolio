import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Title animation
    gsap.fromTo('.section-title', 
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    // Skill categories with stagger
    gsap.fromTo('.skill-category', 
      { x: -60, opacity: 0, rotateY: -15 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-container',
          start: 'top 80%',
        }
      }
    );

    // Skill items with stagger
    gsap.fromTo('.skill-item', 
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-container',
          start: 'top 70%',
        }
      }
    );

    // Animate skill bars with progress
    const animateSkillBars = () => {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        // Reset first
        gsap.set(bar, { width: 0 });
        
        gsap.to(bar, {
          width: `${width}%`,
          duration: 1.2,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        });
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(animateSkillBars, 500);
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>Mes Compétences</h2>
          <p className="section-subtitle">Technologies que je maîtrise</p>
        </div>
        <div className="skills-container">
          <div className="skill-category">
            <div className="category-header">
              <i className="fas fa-code"></i>
              <h3>Langages de programmation</h3>
            </div>
            {portfolioData.skills.languages.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width={skill.level}>
                    <div className="skill-glow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="skill-category">
            <div className="category-header">
              <i className="fas fa-tools"></i>
              <h3>Technologies & Outils</h3>
            </div>
            {portfolioData.skills.technologies.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width={skill.level}>
                    <div className="skill-glow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
