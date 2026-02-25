export const portfolioData = {
  name: 'BAYIGA BOGMIS IVAN',
  title: 'Étudiant en génie logiciel',
  subtitle: 'Passionné par le développement full stack, l\'intelligence artificielle et la conception de logiciels innovants.',
  university: 'ICT University, Cameroun',
  email: 'ivanbayigabogmis0@gmail.com',
  github: 'github.com/ivan-dev-14',
  location: 'ICT University, Cameroun',
  profileImage: 'https://drive.google.com/uc?export=view&id=YOUR_PROFILE_IMAGE_ID', // Replace with your profile image URL

  stats: [
    { icon: 'fa-code', value: '15+', label: 'Projets réalisés' },
    { icon: 'fa-clock', value: '2+', label: 'Années d\'expérience' },
    { icon: 'fa-award', value: '', label: 'Certifications' }
  ],

  skills: {
    languages: [
      { name: 'C++', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Java', level: 75 }
    ],
    technologies: [
      { name: 'Django', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Qt', level: 75 },
      { name: 'Git & Docker', level: 85 }
    ]
  },

  projects: [
    {
      id: 1,
      title: 'Jeu de cartes',
      subtitle: 'Application de jeu interactif',
      description: 'Développement d\'un jeu de cartes interactif avec interface graphique moderne utilisant le framework Qt en C++.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_CARD_GAME_IMAGE',
      videoLink: 'https://drive.google.com/file/d/VIDEO_ID/view',
      workTime: '3 mois',
      idea: 'Créer un jeu de cartes divertissant avec une interface intuitive et des animations fluides',
      learned: [
        'Programmation orientée objet en C++',
        'Gestion des événements et interactions utilisateur',
        'Design d\'interfaces graphiques avec Qt',
        'Animation et transitions visuelles'
      ],
      technologies: ['C++', 'Qt', 'UI/UX'],
      icon: 'fa-gamepad',
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Application de lecture musicale',
      subtitle: 'Lecteur audio moderne',
      description: 'Création d\'un lecteur audio avec gestion de playlists, égaliseur et interface utilisateur intuitive en C++/Qt.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_MUSIC_APP_IMAGE',
      videoLink: 'https://drive.google.com/file/d/VIDEO_ID/view',
      workTime: '2 mois',
      idea: 'Développer un lecteur audio complet avec des fonctionnalités professionnelles',
      learned: [
        'Traitement audio et formats de fichiers',
        'Gestion des bibliothèques multimedia',
        'Création d\'interfaces audio interactives',
        'Optimisation des performances'
      ],
      technologies: ['C++', 'Qt', 'Multimédia'],
      icon: 'fa-music',
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Jeu du serpent',
      subtitle: 'Classic Snake Game',
      description: 'Implémentation du jeu classique du serpent avec interface graphique, scores et différents niveaux de difficulté en Python.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_SNAKE_GAME_IMAGE',
      videoLink: 'https://drive.google.com/file/d/VIDEO_ID/view',
      workTime: '1 mois',
      idea: 'Recréer le jeu emblématique du serpent avec des graphiques modernes',
      learned: [
        'Programmation de jeux avec Pygame',
        'Logique de collision et détection',
        'Gestion des scores et sauvegardes',
        'Design de niveaux.progressifs'
      ],
      technologies: ['Python', 'Pygame', 'Jeu vidéo'],
      icon: 'fa-gamepad',
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'ERP pour école',
      subtitle: 'Système de gestion scolaire',
      description: 'Développement d\'un système de gestion intégré pour établissements scolaires avec Django en backend et React en frontend.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_ERP_IMAGE',
      videoLink: 'https://drive.google.com/file/d/VIDEO_ID/view',
      workTime: '6 mois',
      idea: 'Digitaliser la gestion administrative des écoles avec une solution complète',
      learned: [
        'Architecture full stack Django + React',
        'Gestion des utilisateurs et rôles',
        'API REST et consommation de données',
        'Base de données PostgreSQL',
        'Déploiement et maintenance'
      ],
      technologies: ['Django', 'React', 'PostgreSQL'],
      icon: 'fa-school',
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Library Manager System',
      subtitle: 'Système de gestion de bibliothèque',
      description: 'Système de gestion de bibliothèque avec recherche avancée, gestion des emprunts et interface administrateur complète.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_LIBRARY_IMAGE',
      videoLink: 'https://drive.google.com/file/d/VIDEO_ID/view',
      workTime: '3 mois',
      idea: 'Simplifier la gestion des bibliothèques avec une interface moderne',
      learned: [
        'CRUD complexe avec Django ORM',
        'Recherche et filtrage avancés',
        'Gestion des emprunts et retours',
        'Tableau de bord administrateur'
      ],
      technologies: ['Django', 'React', 'REST API'],
      icon: 'fa-book',
      github: '#',
      demo: '#'
    },
    {
      id: 6,
      title: 'Outils et scripts divers',
      subtitle: 'Automatisation et IA',
      description: 'Collection de scripts Python, outils d\'automatisation et petits projets d\'IA pour résoudre des problèmes spécifiques.',
      imageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_TOOLS_IMAGE',
      videoLink: 'https://drive.google.com/file/d/VIDEO_ID/view',
      workTime: 'En cours',
      idea: 'Automatiser des tâches répétitives et explorer l\'IA',
      learned: [
        'Automatisation avec Python',
        'Introduction au machine learning',
        'API et intégrations tierces',
        'Optimisation de scripts'
      ],
      technologies: ['Python', 'IA', 'Automatisation'],
      icon: 'fa-tools',
      github: '#',
      demo: '#'
    }
  ],

  socialLinks: [
    { icon: 'fa-github', url: '#', label: 'GitHub' },
    { icon: 'fa-linkedin-in', url: '#', label: 'LinkedIn' },
    { icon: 'fa-twitter', url: '#', label: 'Twitter' },
    { icon: 'fa-instagram', url: '#', label: 'Instagram' }
  ],

  navLinks: [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ]
};
