// API service for fetching portfolio data from backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Fetch all projects from the backend API
 * @returns {Promise<Array>} Array of projects
 */
export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.projects) {
      // Transform API response to match frontend format
      return data.projects.map(project => ({
        id: project.id,
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        imageUrl: project.image_url,
        videoLink: project.video_link,
        github: project.github,
        demo: project.demo,
        workTime: project.work_time,
        idea: project.idea,
        learned: project.learned || [],
        technologies: project.technologies || [],
        icon: project.icon
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching projects from API:', error);
    throw error;
  }
};

/**
 * Fetch a single project by ID
 * @param {number} id - Project ID
 * @returns {Promise<Object>} Project data
 */
export const fetchProjectById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const project = await response.json();
    
    // Transform API response to match frontend format
    return {
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      imageUrl: project.image_url,
      videoLink: project.video_link,
      github: project.github,
      demo: project.demo,
      workTime: project.work_time,
      idea: project.idea,
      learned: project.learned || [],
      technologies: project.technologies || [],
      icon: project.icon
    };
  } catch (error) {
    console.error(`Error fetching project ${id} from API:`, error);
    throw error;
  }
};

/**
 * Create a new project (for admin use)
 * @param {Object} projectData - Project data to create
 * @returns {Promise<Object>} Created project
 */
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Update an existing project (for admin use)
 * @param {number} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} Updated project
 */
export const updateProject = async (id, projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a project (for admin use)
 * @param {number} id - Project ID
 * @returns {Promise<void>}
 */
export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};

export default {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject
};
