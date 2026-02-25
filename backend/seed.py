"""
Database seeder script to populate the SQLite database with initial project data.
Run this script to seed the database with projects from portfolio.js
"""

import json
import os
import sys

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import SessionLocal, ProjectDB, engine, Base

def seed_projects():
    """Seed the database with initial project data."""
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    # Get database session
    db = SessionLocal()
    
    try:
        # Check if projects already exist
        existing_count = db.query(ProjectDB).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} projects. Skipping seed.")
            return
        
        # Project data from portfolio.js
        projects_data = [
            {
                "title": "Jeu de cartes",
                "subtitle": "Application de jeu interactif",
                "description": "Développement d'un jeu de cartes interactif avec interface graphique moderne utilisant le framework Qt en C++.",
                "image_url": "https://drive.google.com/uc?export=view&id=YOUR_CARD_GAME_IMAGE",
                "video_link": "https://drive.google.com/file/d/VIDEO_ID/view",
                "work_time": "3 mois",
                "idea": "Créer un jeu de cartes divertissant avec une interface intuitive et des animations fluides",
                "learned": [
                    "Programmation orientée objet en C++",
                    "Gestion des événements et interactions utilisateur",
                    "Design d'interfaces graphiques avec Qt",
                    "Animation et transitions visuelles"
                ],
                "technologies": ["C++", "Qt", "UI/UX"],
                "icon": "fa-gamepad",
                "github": "#",
                "demo": "#"
            },
            {
                "title": "Application de lecture musicale",
                "subtitle": "Lecteur audio moderne",
                "description": "Création d'un lecteur audio avec gestion de playlists, égaliseur et interface utilisateur intuitive en C++/Qt.",
                "image_url": "https://drive.google.com/uc?export=view&id=YOUR_MUSIC_APP_IMAGE",
                "video_link": "https://drive.google.com/file/d/VIDEO_ID/view",
                "work_time": "2 mois",
                "idea": "Développer un lecteur audio complet avec des fonctionnalités professionnelles",
                "learned": [
                    "Traitement audio et formats de fichiers",
                    "Gestion des bibliothèques multimedia",
                    "Création d'interfaces audio interactives",
                    "Optimisation des performances"
                ],
                "technologies": ["C++", "Qt", "Multimédia"],
                "icon": "fa-music",
                "github": "#",
                "demo": "#"
            },
            {
                "title": "Jeu du serpent",
                "subtitle": "Classic Snake Game",
                "description": "Implémentation du jeu classique du serpent avec interface graphique, scores et différents niveaux de difficulté en Python.",
                "image_url": "https://drive.google.com/uc?export=view&id=YOUR_SNAKE_GAME_IMAGE",
                "video_link": "https://drive.google.com/file/d/VIDEO_ID/view",
                "work_time": "1 mois",
                "idea": "Recréer le jeu emblématique du serpent avec des graphiques modernes",
                "learned": [
                    "Programmation de jeux avec Pygame",
                    "Logique de collision et détection",
                    "Gestion des scores et sauvegardes",
                    "Design de niveaux.progressifs"
                ],
                "technologies": ["Python", "Pygame", "Jeu vidéo"],
                "icon": "fa-gamepad",
                "github": "#",
                "demo": "#"
            },
            {
                "title": "ERP pour école",
                "subtitle": "Système de gestion scolaire",
                "description": "Développement d'un système de gestion intégré pour établissements scolaires avec Django en backend et React en frontend.",
                "image_url": "https://drive.google.com/uc?export=view&id=YOUR_ERP_IMAGE",
                "video_link": "https://drive.google.com/file/d/VIDEO_ID/view",
                "work_time": "6 mois",
                "idea": "Digitaliser la gestion administrative des écoles avec une solution complète",
                "learned": [
                    "Architecture full stack Django + React",
                    "Gestion des utilisateurs et rôles",
                    "API REST et consommation de données",
                    "Base de données PostgreSQL",
                    "Déploiement et maintenance"
                ],
                "technologies": ["Django", "React", "PostgreSQL"],
                "icon": "fa-school",
                "github": "#",
                "demo": "#"
            },
            {
                "title": "Library Manager System",
                "subtitle": "Système de gestion de bibliothèque",
                "description": "Système de gestion de bibliothèque avec recherche avancée, gestion des emprunts et interface administrateur complète.",
                "image_url": "https://drive.google.com/uc?export=view&id=YOUR_LIBRARY_IMAGE",
                "video_link": "https://drive.google.com/file/d=VIDEO_ID/view",
                "work_time": "3 mois",
                "idea": "Simplifier la gestion des bibliothèques avec une interface moderne",
                "learned": [
                    "CRUD complexe avec Django ORM",
                    "Recherche et filtrage avancés",
                    "Gestion des emprunts et retours",
                    "Tableau de bord administrateur"
                ],
                "technologies": ["Django", "React", "REST API"],
                "icon": "fa-book",
                "github": "#",
                "demo": "#"
            },
            {
                "title": "Outils et scripts divers",
                "subtitle": "Automatisation et IA",
                "description": "Collection de scripts Python, outils d'automatisation et petits projets d'IA pour résoudre des problèmes spécifiques.",
                "image_url": "https://drive.google.com/uc?export=view&id=YOUR_TOOLS_IMAGE",
                "video_link": "https://drive.google.com/file/d/VIDEO_ID/view",
                "work_time": "En cours",
                "idea": "Automatiser des tâches répétitives et explorer l'IA",
                "learned": [
                    "Automatisation avec Python",
                    "Introduction au machine learning",
                    "API et intégrations tierces",
                    "Optimisation de scripts"
                ],
                "technologies": ["Python", "IA", "Automatisation"],
                "icon": "fa-tools",
                "github": "#",
                "demo": "#"
            }
        ]
        
        # Insert projects into database
        for project_data in projects_data:
            db_project = ProjectDB(
                title=project_data["title"],
                subtitle=project_data.get("subtitle"),
                description=project_data.get("description"),
                image_url=project_data.get("image_url"),
                video_link=project_data.get("video_link"),
                github=project_data.get("github"),
                demo=project_data.get("demo"),
                work_time=project_data.get("work_time"),
                idea=project_data.get("idea"),
                learned=json.dumps(project_data.get("learned", [])),
                technologies=json.dumps(project_data.get("technologies", [])),
                icon=project_data.get("icon")
            )
            db.add(db_project)
        
        db.commit()
        print(f"Successfully seeded {len(projects_data)} projects into the database!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_projects()
