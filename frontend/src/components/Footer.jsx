import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.footer-content', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="container">
        <div className="footer-content">
          <div className="logo">BAYIGA BOGMIS IVAN</div>
          <div className="social-links">
            {portfolioData.socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                aria-label={link.label}
                title={link.label}
              >
                <i className={`fab ${link.icon}`}></i>
              </a>
            ))}
          </div>
          <p>&copy; 2025 BAYIGA BOGMIS IVAN. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
