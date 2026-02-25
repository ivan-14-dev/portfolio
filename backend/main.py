"""
FastAPI backend for portfolio.
Provides API endpoints for contact form and project management.
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional, List
from datetime import datetime

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Load environment variables from .env file
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# SQLAlchemy Project Model
class ProjectDB(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    subtitle = Column(String(300))
    description = Column(Text)
    image_url = Column(String(500))
    video_link = Column(String(500))
    github = Column(String(500))
    demo = Column(String(500))
    work_time = Column(String(100))
    idea = Column(Text)
    learned = Column(Text)  # Stored as JSON string
    technologies = Column(Text)  # Stored as JSON string
    icon = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio Contact API",
    description="Backend API for portfolio contact form",
    version="1.0.0"
)

# Configure CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for request validation
class ContactRequest(BaseModel):
    """Model for contact form request validation."""
    name: str = Field(..., min_length=1, max_length=100, description="Sender's name")
    email: EmailStr = Field(..., description="Sender's email address")
    subject: str = Field(..., min_length=1, max_length=200, description="Email subject")
    message: str = Field(..., min_length=1, description="Email message body")


class ContactResponse(BaseModel):
    """Model for contact form response."""
    success: bool
    message: str


class ErrorResponse(BaseModel):
    """Model for error responses."""
    success: bool = False
    message: str
    detail: Optional[str] = None


# Pydantic models for Project CRUD
class ProjectBase(BaseModel):
    """Base model for Project."""
    title: str = Field(..., min_length=1, max_length=200)
    subtitle: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    video_link: Optional[str] = None
    github: Optional[str] = None
    demo: Optional[str] = None
    work_time: Optional[str] = None
    idea: Optional[str] = None
    learned: Optional[List[str]] = []
    technologies: Optional[List[str]] = []
    icon: Optional[str] = None


class ProjectCreate(ProjectBase):
    """Model for creating a new project."""
    pass


class ProjectUpdate(BaseModel):
    """Model for updating a project - all fields are optional."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    subtitle: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    video_link: Optional[str] = None
    github: Optional[str] = None
    demo: Optional[str] = None
    work_time: Optional[str] = None
    idea: Optional[str] = None
    learned: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    icon: Optional[str] = None


class ProjectResponse(ProjectBase):
    """Model for project response."""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ProjectListResponse(BaseModel):
    """Model for list of projects response."""
    success: bool = True
    projects: List[ProjectResponse]
    total: int


def get_env_variable(var_name: str) -> str:
    """
    Get environment variable or raise error if not found.
    
    Args:
        var_name: Name of the environment variable
        
    Returns:
        Value of the environment variable
        
    Raises:
        ValueError: If environment variable is not set
    """
    value = os.getenv(var_name)
    if not value:
        raise ValueError(f"Environment variable {var_name} is not set")
    return value


def send_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Send contact form message via SMTP email.
    
    Args:
        name: Sender's name
        email: Sender's email address
        subject: Email subject
        message: Email message body
        
    Returns:
        True if email sent successfully
        
    Raises:
        SMTPException: If there's an error sending the email
    """
    try:
        # Get SMTP configuration from environment variables
        smtp_host = get_env_variable("SMTP_HOST")
        smtp_port = int(get_env_variable("SMTP_PORT"))
        smtp_user = get_env_variable("SMTP_USER")
        smtp_password = get_env_variable("SMTP_PASSWORD")
        from_email = get_env_variable("FROM_EMAIL")
        to_email = get_env_variable("TO_EMAIL")
        
        # Create email message
        msg = MIMEMultipart("alternative")
        msg["From"] = from_email
        msg["To"] = to_email
        msg["Subject"] = f"Portfolio Contact: {subject}"
        
        # Create plain text and HTML versions of the message
        plain_text = f"""
        New contact form submission from your portfolio:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        """
        
        html_content = f"""
        <html>
            <body>
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <h3>Message:</h3>
                <p>{message.replace('\n', '<br>')}</p>
            </body>
        </html>
        """
        
        # Attach both plain text and HTML versions
        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(html_content, "html"))
        
        # Connect to SMTP server and send email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()  # Enable TLS security
            server.login(smtp_user, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())
        
        return True
        
    except smtplib.SMTPAuthenticationError as e:
        raise SMTPException("Failed to authenticate with SMTP server. Please check your credentials.")
    except smtplib.SMTPException as e:
        raise SMTPException(f"SMTP error occurred: {str(e)}")
    except Exception as e:
        raise SMTPException(f"Failed to send email: {str(e)}")


class SMTPException(Exception):
    """Custom exception for SMTP errors."""
    pass


# Database helper functions
def get_db():
    """Get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def serialize_project(project: ProjectDB) -> ProjectResponse:
    """Convert database model to Pydantic response model."""
    import json
    learned = []
    technologies = []
    
    if project.learned:
        try:
            learned = json.loads(project.learned)
        except:
            learned = project.learned.split(',') if project.learned else []
    
    if project.technologies:
        try:
            technologies = json.loads(project.technologies)
        except:
            technologies = project.technologies.split(',') if project.technologies else []
    
    return ProjectResponse(
        id=project.id,
        title=project.title,
        subtitle=project.subtitle,
        description=project.description,
        image_url=project.image_url,
        video_link=project.video_link,
        github=project.github,
        demo=project.demo,
        work_time=project.work_time,
        idea=project.idea,
        learned=learned,
        technologies=technologies,
        icon=project.icon,
        created_at=project.created_at,
        updated_at=project.updated_at
    )


# ==================== PROJECT CRUD ENDPOINTS ====================

@app.get("/api/v1/projects", response_model=ProjectListResponse, tags=["projects"])
async def get_projects(db: Session = Depends(get_db)):
    """
    Get all projects.
    
    Returns:
        List of all projects in the database
    """
    projects = db.query(ProjectDB).order_by(ProjectDB.id).all()
    return ProjectListResponse(
        success=True,
        projects=[serialize_project(p) for p in projects],
        total=len(projects)
    )


@app.get("/api/v1/projects/{project_id}", response_model=ProjectResponse, tags=["projects"])
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Get a single project by ID.
    
    Args:
        project_id: ID of the project to retrieve
        
    Returns:
        Project details
        
    Raises:
        HTTPException: If project not found
    """
    project = db.query(ProjectDB).filter(ProjectDB.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    return serialize_project(project)


@app.post("/api/v1/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED, tags=["projects"])
async def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """
    Create a new project.
    
    Args:
        project: Project data to create
        
    Returns:
        Created project
    """
    import json
    
    db_project = ProjectDB(
        title=project.title,
        subtitle=project.subtitle,
        description=project.description,
        image_url=project.image_url,
        video_link=project.video_link,
        github=project.github,
        demo=project.demo,
        work_time=project.work_time,
        idea=project.idea,
        learned=json.dumps(project.learned) if project.learned else "[]",
        technologies=json.dumps(project.technologies) if project.technologies else "[]",
        icon=project.icon
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    return serialize_project(db_project)


@app.put("/api/v1/projects/{project_id}", response_model=ProjectResponse, tags=["projects"])
async def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    """
    Update an existing project.
    
    Args:
        project_id: ID of the project to update
        project: Updated project data
        
    Returns:
        Updated project
        
    Raises:
        HTTPException: If project not found
    """
    import json
    
    db_project = db.query(ProjectDB).filter(ProjectDB.id == project_id).first()
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    
    # Update only provided fields
    update_data = project.model_dump(exclude_unset=True)
    
    if 'learned' in update_data and update_data['learned'] is not None:
        update_data['learned'] = json.dumps(update_data['learned'])
    if 'technologies' in update_data and update_data['technologies'] is not None:
        update_data['technologies'] = json.dumps(update_data['technologies'])
    
    for key, value in update_data.items():
        setattr(db_project, key, value)
    
    db_project.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_project)
    
    return serialize_project(db_project)


@app.delete("/api/v1/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["projects"])
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    """
    Delete a project.
    
    Args:
        project_id: ID of the project to delete
        
    Raises:
        HTTPException: If project not found
    """
    db_project = db.query(ProjectDB).filter(ProjectDB.id == project_id).first()
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    
    db.delete(db_project)
    db.commit()
    
    return None


# ==================== EXISTING ENDPOINTS ====================


@app.get("/")
async def root():
    """Root endpoint to check if API is running."""
    return {
        "success": True,
        "message": "Portfolio Contact API is running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post(
    "/api/v1/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    responses={
        400: {"model": ErrorResponse, "description": "Validation error"},
        500: {"model": ErrorResponse, "description": "Server error"},
        503: {"model": ErrorResponse, "description": "Service unavailable"}
    }
)
async def contact_form(contact: ContactRequest):
    """
    Handle contact form submissions.
    
    Accepts contact form data, validates it, and sends an email
    to the configured recipient.
    
    Args:
        contact: Validated contact form data
        
    Returns:
        Success message if email was sent successfully
        
    Raises:
        HTTPException: If validation fails or email sending fails
    """
    try:
        # Attempt to send the email
        send_email(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! We will get back to you soon."
        )
        
    except ValueError as e:
        # Handle missing environment variables
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except SMTPException as e:
        # Handle SMTP errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    
    # Get server configuration from environment variables
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    
    # Run the FastAPI application
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True
    )
