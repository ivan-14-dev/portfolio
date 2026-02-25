import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolio';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
            Ivan<span>.</span>
          </a>
          <ul className="nav-links">
            {portfolioData.navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div 
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </nav>
      </div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {portfolioData.navLinks.map((link) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
