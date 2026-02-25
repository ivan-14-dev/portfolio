import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo('.section-title', 
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.contact-info', 
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.contact-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.contact-form', 
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.contact-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Une erreur est survenue. Veuillez réessayer.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erreur de connexion. Veuillez réessayer plus tard.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>Contactez-moi</h2>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>{portfolioData.email}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="contact-text">
                <h4>GitHub</h4>
                <p>{portfolioData.github}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h4>Localisation</h4>
                <p>{portfolioData.location}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-file-download"></i>
              </div>
              <div className="contact-text">
                <h4>Télécharger mon CV</h4>
                <a href="#" className="btn">Télécharger</a>
              </div>
            </div>
          </div>
          <div className="contact-form">
            {status.message && (
              <div className={`alert alert-${status.type}`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
