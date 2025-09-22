import projectsData from './projects-data.js';

let initialProjects = 6;
let increment = 3;
let visibleProjects = initialProjects;
let visibleDesignProjects = initialProjects;
let currentTab = 'projects';

// Function to filter projects by tag
function filterProjectsByTag(tag) {
    return projectsData.filter(project => project.tags.includes(tag));
}

// Function to attach modal event listeners
function attachModalEventListeners() {
    const modalLinks = document.querySelectorAll('.folio-list__item-link');
    console.log('Attaching modal listeners to:', modalLinks.length, 'links');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const modalId = href.substring(1);
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.removeAttribute('hidden');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
}

// Function to generate project list items for a specific tab
function generateProjectList(tabType) {
    console.log(`=== Generating project list for ${tabType} tab ===`);
    
    const folioList = document.querySelector(`#${tabType}-tab .folio-list`);
    if (!folioList) {
        console.error(`Could not find .folio-list element in ${tabType}-tab`);
        return;
    }
    console.log('Found folio list element:', folioList);

    const filteredProjects = filterProjectsByTag(tabType === 'projects' ? 'project' : 'design');
    console.log(`Filtered projects for ${tabType}:`, filteredProjects);
    console.log(`Filtered projects count:`, filteredProjects.length);
    
    const projectsToShow = tabType === 'projects' 
        ? filteredProjects.slice(0, visibleProjects)
        : filteredProjects.slice(0, visibleDesignProjects);
    
    console.log(`Projects to show for ${tabType}:`, projectsToShow);
    console.log(`Projects to show count:`, projectsToShow.length);

    if (projectsToShow.length === 0) {
        console.warn(`No projects to show for ${tabType} tab`);
        folioList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No projects found in this category.</p>';
        return;
    }

    const html = projectsToShow.map((project, index) => {
        let backgroundImage = project.media[0].src;
        if (project.media[0].type === 'video') {
            const firstImage = project.media.find(media => media.type === 'image');
            if (firstImage) {
                backgroundImage = firstImage.src;
            }
        }

        // If design project, link to a new page; else, open modal
        const isDesign = project.tags && project.tags.includes('design');
        const cardLink = isDesign
            ? `design-project.html?id=${project.id}`
            : `#${project.id}`;
        const cardLinkTag = isDesign
            ? `<a class="folio-list__item-link" href="${cardLink}">`
            : `<a class="folio-list__item-link" href="${cardLink}">`;
        const projLink = isDesign
            ? cardLink
            : project.githubLink;
        const projLinkTag = isDesign
            ? `<a class="folio-list__proj-link" href="${projLink}" target="_blank" title="View Project">`
            : `<a class="folio-list__proj-link" href="${projLink}" title="View on GitHub">`;

        return `
            <div class="folio-list__item column" data-animate-el style="background-image: url('${backgroundImage}'); background-size: cover; background-position: center;">
                ${cardLinkTag}
                    <div class="folio-list__item-text">
                        <div class="folio-list__item-cat">
                            ${project.category}
                        </div>
                        <div class="folio-list__item-title">
                            ${project.title}
                        </div>
                    </div>
                </a>
                ${projLinkTag}
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        `;
    }).join('');
    
    console.log(`Generated HTML for ${tabType}:`, html);
    folioList.innerHTML = html;
    console.log(`Set innerHTML for ${tabType} tab`);
    
    // Re-attach modal event listeners after generating new content
    attachModalEventListeners();
    console.log(`=== Finished generating project list for ${tabType} tab ===`);
}

// Function to generate project modals
function generateProjectModals() {
    const worksSection = document.querySelector('#works');
    if (!worksSection) {
        console.error('Could not find #works section');
        return;
    }

    console.log('Generating project modals');
    const modalsContainer = document.createElement('div');
    modalsContainer.className = 'modals-container';

    projectsData.forEach(project => {
        console.log('Creating modal for project:', project.id);
        const modal = document.createElement('div');
        modal.id = project.id;
        modal.hidden = true;
        modal.setAttribute('data-current-index', '0');
        modal.innerHTML = `
            <div class="modal-popup">
                <div class="modal-header">
                    <button class="modal-close" aria-label="Close modal" onclick="(function(){document.getElementById('${project.id}').setAttribute('hidden','');document.body.style.overflow='';})()">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="media-content">
                        <div class="media-container">
                            ${project.tags && project.tags.includes('design')
                                ? `<div class='design-media-grid' style='display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;'>
                                    ${project.media.map(media =>
                                        media.type === 'image'
                                            ? `<img src="${media.src}" alt="${project.title}" style="width: 100%; object-fit: contain;">`
                                            : ''
                                    ).join('')}
                                </div>`
                                : (project.media[0].type === 'video'
                                    ? `<video width="100%" controls controlsList="nodownload" playsinline>
                                        <source src="${project.media[0].src}" type="video/mp4">
                                        Your browser doesn't support this video format.
                                    </video>`
                                    : `<img src="${project.media[0].src}" alt="${project.title}">`)
                            }
                        </div>
                        ${project.tags && project.tags.includes('design') ? '' : `<div class="media-nav">
                            <button class="prev" onclick="prevMedia('${project.id}')">❮</button>
                            <button class="next" onclick="nextMedia('${project.id}')">❯</button>
                        </div>`}
                    </div>
                    <div class="modal-popup__desc">
                        <h5 class="modal-title">${project.title}</h5>
                        ${
                            project.tags && project.tags.includes('design')
                            ? `
                                <p class="project-problem"><strong>Problem Statement:</strong> ${project.problemStatement || ''}</p>
                                <p class="project-intro">${project.description || ''}</p>
                                <div class="project-tools">
                                    <strong>Tools Used:</strong> ${(project.tools || []).join(', ')}
                                </div>
                                <div class="modal-popup__footer">
                                    <a href="${project.prototypeLink}" class="modal-popup__details" target="_blank" rel="noopener noreferrer">View Figma Prototype</a>
                                </div>
                            `
                            : `
                                <p class="project-intro">${project.description || ''}</p>
                                <div class="project-features">
                                    <h6>Key Features:</h6>
                                    <ul>
                                        ${(project.features || []).map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="tech-stack">
                                    <h6>Tech Stack:</h6>
                                    <ul class="modal-popup__cat">
                                        ${(project.techStack || []).map(tech => `<li>${tech}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="modal-popup__footer">
                                    <a href="${project.githubLink}" class="modal-popup__details" target="_blank" rel="noopener noreferrer">View Project</a>
                                </div>
                            `
                        }
                    </div>
                </div>
            </div>
        `;
        modalsContainer.appendChild(modal);
    });

    // Remove any existing modals container
    const existingContainer = document.querySelector('.modals-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    worksSection.appendChild(modalsContainer);
    console.log('Project modals generated and added to DOM');
}

// Function to handle media navigation with per-modal index
function prevMedia(modalId) {
    const project = projectsData.find(p => p.id === modalId);
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    let currentIndex = parseInt(modal.getAttribute('data-current-index') || '0', 10);
    currentIndex = (currentIndex - 1 + project.media.length) % project.media.length;
    modal.setAttribute('data-current-index', currentIndex);
    updateMedia(modalId, currentIndex);
}

function nextMedia(modalId) {
    const project = projectsData.find(p => p.id === modalId);
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    let currentIndex = parseInt(modal.getAttribute('data-current-index') || '0', 10);
    currentIndex = (currentIndex + 1) % project.media.length;
    modal.setAttribute('data-current-index', currentIndex);
    updateMedia(modalId, currentIndex);
}

function updateMedia(modalId, index) {
    const project = projectsData.find(p => p.id === modalId);
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    const mediaContainer = modal.querySelector('.media-container');
    if (!mediaContainer) return;

    const media = project.media[index];
    if (media.type === 'video') {
        mediaContainer.innerHTML = `
            <video width="100%" controls controlsList="nodownload" playsinline>
                <source src="${media.src}" type="video/mp4">
                Your browser doesn't support this video format.
            </video>
        `;
    } else {
        mediaContainer.innerHTML = `<img src="${media.src}" alt="${project.title}">`;
    }
}

// Function to update show more button for a specific tab
function updateShowMoreButton(tabType) {
    const btn = document.getElementById(tabType === 'projects' ? 'show-more-btn' : 'show-more-design-btn');
    const container = btn?.parentElement;
    if (!btn) return;

    const filteredProjects = filterProjectsByTag(tabType === 'projects' ? 'project' : 'design');
    const currentVisible = tabType === 'projects' ? visibleProjects : visibleDesignProjects;

    // Hide the button if there are 6 or fewer projects
    if (filteredProjects.length <= 6) {
        btn.style.display = 'none';
        if (container) container.style.display = 'none';
        return;
    } else {
        btn.style.display = '';
        if (container) container.style.display = '';
    }

    if (currentVisible >= filteredProjects.length) {
        btn.textContent = 'Show Less';
    } else {
        btn.textContent = 'Show More';
    }
}

// Function to handle tab switching
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    } else {
        console.error('Could not find button for tab:', tabName);
    }
    
    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeContent = document.getElementById(`${tabName}-tab`);
    if (activeContent) {
        activeContent.classList.add('active');
        
        // Generate content for the active tab with a small delay to ensure DOM is updated
        setTimeout(() => {
            generateProjectList(tabName);
            updateShowMoreButton(tabName);
        }, 50);
    } else {
        console.error('Could not find content for tab:', tabName);
    }
    
    currentTab = tabName;
}

// Debug function to log all projects and their tags
function debugProjectsData() {
    console.log('=== DEBUG: All Projects Data ===');
    projectsData.forEach((project, index) => {
        console.log(`Project ${index + 1}:`, {
            id: project.id,
            title: project.title,
            tags: project.tags,
            category: project.category
        });
    });
    
    const projectProjects = filterProjectsByTag('project');
    const designProjects = filterProjectsByTag('design');
    
    console.log('Projects with "project" tag:', projectProjects.length);
    console.log('Projects with "design" tag:', designProjects.length);
    console.log('=== END DEBUG ===');
}

// Initialize projects when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting project initialization');
    try {
        // Debug projects data
        debugProjectsData();
        
        generateProjectModals();
        console.log('Projects initialized successfully');
        
        // Initialize both tabs
        generateProjectList('projects');
        generateProjectList('design');
        updateShowMoreButton('projects');
        updateShowMoreButton('design');
        
        // Attach initial modal event listeners
        attachModalEventListeners();
        
        // Add tab click event listeners
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                switchTab(tabName);
            });
        });
        
        // Add show more button event listeners
        const showMoreBtn = document.getElementById('show-more-btn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                const filteredProjects = filterProjectsByTag('project');
                if (visibleProjects >= filteredProjects.length) {
                    visibleProjects = initialProjects; // Reset to initial
                } else {
                    visibleProjects = Math.min(visibleProjects + increment, filteredProjects.length);
                }
                generateProjectList('projects');
                updateShowMoreButton('projects');
            });
        }
        
        const showMoreDesignBtn = document.getElementById('show-more-design-btn');
        if (showMoreDesignBtn) {
            showMoreDesignBtn.addEventListener('click', () => {
                const filteredProjects = filterProjectsByTag('design');
                if (visibleDesignProjects >= filteredProjects.length) {
                    visibleDesignProjects = initialProjects; // Reset to initial
                } else {
                    visibleDesignProjects = Math.min(visibleDesignProjects + increment, filteredProjects.length);
                }
                generateProjectList('design');
                updateShowMoreButton('design');
            });
        }
        
        // Debug: Check if modals are in the DOM
        const modals = document.querySelectorAll('[id^="modal-"]');
        console.log('Found modals:', modals.length);
        modals.forEach(modal => {
            console.log('Modal:', modal.id, 'hidden:', modal.hidden);
        });

    } catch (error) {
        console.error('Error initializing projects:', error);
    }
});

// Export functions for use in other files
export { prevMedia, nextMedia }; 

// Make switchTab globally available for debugging
window.switchTab = switchTab; 