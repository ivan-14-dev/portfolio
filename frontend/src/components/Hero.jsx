import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    // Initial load animations - Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Animate background shapes
    tl.fromTo('.hero-shape', 
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 0.6, duration: 1.5, stagger: 0.2 }
    )
    // Animate profile image
    .fromTo(image,
      { x: 100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1 },
      '-=1'
    )
    // Animate text elements
    .fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    )
    .fromTo('.hero h1',
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
      '-=0.6'
    )
    .fromTo('.hero-description',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.7'
    )
    .fromTo('.hero-btns',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    );

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(image, {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to('.hero-shapes-container', {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    // Scroll animation
    gsap.to(hero, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      opacity: 0.5
    });

    // Floating animation for shapes
    gsap.to('.hero-shape', {
      y: -30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    hero.addEventListener('mousemove', handleMouseMove);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-shapes-container">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>
      
      <div className="container">
        <div className="hero-content" ref={textRef}>
          <span className="hero-subtitle">{portfolioData.title} à {portfolioData.university}</span>
          <h1>Bonjour, je suis <span className="highlight">{portfolioData.name}</span></h1>
          <p className="hero-description">{portfolioData.subtitle}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn">Voir mes projets</a>
            <a href="#contact" className="btn btn-outline">Me contacter</a>
          </div>
        </div>
        
        <div className="hero-image" ref={imageRef}>
          <div className="image-wrapper">
            <img 
              src={portfolioData.profileImage}
              alt={portfolioData.name}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=BI&background=007bff&color=fff&size=200`;
              }}
            />
            <div className="image-glow"></div>
            <div className="image-ring"></div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Défiler</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
