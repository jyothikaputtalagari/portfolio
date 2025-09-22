// Project data structure
const projectsData = [
    {
        id: 'modal-01',
        title: 'Rock Paper Scissors Game',
        category: 'Web Application',
        githubLink: 'https://github.com/jyothikaputtalagari/rock-paper-scissors-',
        tags: ['project'],
        media: [
            { type: 'video', src: 'videos/rps-project.mp4' },
            { type: 'image', src: 'images/rps1.png' },
            { type: 'image', src: 'images/rps2.png' }
        ],
        description: `A Simple yet interactive Rock Paper Scissors experience with immediate feedback for every round.`,
        features: [
            'User can play against computer opponent',
            'Instant result display for each round',
            'Computer generates random choices for fair gameplay',
            'Minimal responsive design'
        ],
        techStack: [
            'HTML',
            'CSS',
            'JavaScript'
        ]
    },
    {
        id: 'modal-02',
        title: 'Portfolio Website',
        category: 'Web Application',
        githubLink: 'https://github.com/jyothikaputtalagari/portfolio',
        tags: ['project'],
        media: [
            { type: 'image', src: 'images/portfolio.png' }
        ],
        description: `A personal portfolio website showcasing my projects and skills.
This is a simple and clean portfolio website that showcases my projects and skills.
It is a single page website that is responsive and uses a modern design.
It is a static website that is built using HTML, CSS and JavaScript.
It is a responsive website that is built using Bootstrap.`,
        features: [
            'Responsive design',
            'Project showcase with modals',
            'Skills section',
            'Contact form'
        ],
        techStack: [
            'HTML',
            'CSS',
            'JavaScript',
            'Bootstrap'
        ]
    },
    {
        id: 'modal-03',
        title: 'JoeShop',
        category: 'Web Application',
        githubLink: 'https://github.com/jyothikaputtalagari/JoeShop',
        tags: ['project'],
        media: [
            {type: 'video', src: ' videos/joeshop-project.mp4'},
            { type: 'image', src: 'images/joeshop1.png' },
            { type: 'image', src: 'images/joeshop2.png' },
        ],
        description: 'JoeShop curated & cozy offers a handpicked collection of minimalist items, allowing users to browse, shop, and explore products through categories and sorting options.',
        features: [
            'Interactive product display',
            'Add and remove from Cart',
            'Sorting options',
            'Category-based search'
        ],
        techStack: [
            'HTML',
            'CSS',
            'JavaScript'
        ]
    },
];

// Export the data
export default projectsData;

let projectsPerPage = 6;
let currentPage = 1;

function renderProjects() {
    const folioList = document.querySelector('.folio-list');
    folioList.innerHTML = '';
    const end = currentPage * projectsPerPage;
    const projectsToShow = projectsData.slice(0, end);

    projectsToShow.forEach(project => {
        // ... your existing code to create and append project items ...
    });
}

function updateShowMoreButton() {
    const btn = document.getElementById('show-more-btn');
    if ((currentPage * projectsPerPage) >= projectsData.length) {
        btn.textContent = 'Show Less';
    } else {
        btn.textContent = 'Show More';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateShowMoreButton();

    document.getElementById('show-more-btn').addEventListener('click', () => {
        if ((currentPage * projectsPerPage) >= projectsData.length) {
            currentPage = 1; // Reset to first page
        } else {
            currentPage++;
        }
        renderProjects();
        updateShowMoreButton();
    });
}); 