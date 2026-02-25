import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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

    // Text content with stagger
    gsap.fromTo('.about-text > *', 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
        }
      }
    );

    // Image parallax
    gsap.fromTo('.about-image', 
      { x: 80, opacity: 0, rotation: 5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
        }
      }
    );

    // Stats counter animation
    gsap.fromTo('.stat', 
      { y: 50, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        }
      }
    );

    // Floating animation for stats
    gsap.to('.stat', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>À propos de moi</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Étudiant en génie logiciel à ICT University, Cameroun</h3>
            <p>Je suis passionné par le développement de solutions logicielles innovantes qui résolvent des problèmes réels. Mon parcours académique et mes projets personnels m'ont permis d'acquérir une solide expertise en développement full stack, conception de logiciels et systèmes cloud.</p>
            <p>Je m'intéresse particulièrement à l'intersection entre le développement logiciel et l'intelligence artificielle, et je cherche constamment à améliorer mes compétences pour créer des applications performantes et intuitives.</p>
            <div className="about-stats">
              {portfolioData.stats.map((stat, index) => (
                <div className="stat" key={index}>
                  <div className="stat-icon">
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image">
            <div className="image-showcase">
              <div className="showcase-card card-1">
                <i className="fas fa-code"></i>
                <span>Développement</span>
              </div>
              <div className="showcase-card card-2">
                <i className="fas fa-brain"></i>
                <span>IA</span>
              </div>
              <div className="showcase-card card-3">
                <i className="fas fa-cloud"></i>
                <span>Cloud</span>
              </div>
              <div className="showcase-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
