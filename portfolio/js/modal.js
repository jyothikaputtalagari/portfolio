// Import the media navigation functions
import { prevMedia, nextMedia } from './projects-manager.js';

// Make media navigation functions globally available
window.prevMedia = (modalId) => {
    console.log('prevMedia called for modal:', modalId);
    prevMedia(modalId);
};

window.nextMedia = (modalId) => {
    console.log('nextMedia called for modal:', modalId);
    nextMedia(modalId);
};

// Define media items with your specific image paths
const mediaItems = [
    {
        type: 'video',
        src: 'Project video/ShopNGo.mp4'
    },
    {
        type: 'image',
        src: 'images/ShopNGo1.png'
    },
    {
        type: 'image',
        src: 'images/ShopNGo2.png'
    }
];

let currentMediaIndex = 0;
const mediaContainer = document.querySelector('.media-container');

// Function to update the dots navigator
function updateDots() {
    const dotsContainer = document.querySelector('.dots-nav');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    // Create a dot for each media item
    mediaItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === currentMediaIndex ? 'active' : ''}`;
        dot.onclick = () => showMediaAt(index);
        dotsContainer.appendChild(dot);
    });
}

// Function to show media at specific index
function showMediaAt(index) {
    currentMediaIndex = index;
    updateMedia();
    updateDots();
}

// Function to update displayed media
function updateMedia() {
    const currentItem = mediaItems[currentMediaIndex];

    // Clear the container first
    if (mediaContainer) {
        mediaContainer.innerHTML = '';

        // Handle video type
        if (currentItem.type === 'video') {
            const video = document.createElement('video');
            video.width = '100%';
            video.controls = true;
            video.controlsList = 'nodownload';
            video.src = currentItem.src;
            mediaContainer.appendChild(video);
        }
        // Handle image type
        else if (currentItem.type === 'image') {
            const img = document.createElement('img');
            img.src = currentItem.src;
            img.alt = `Project screenshot ${currentMediaIndex + 1}`;
            mediaContainer.appendChild(img);
        }
    }
}

// Modal functionality - Only handle global modal events, not project-specific ones
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing global modal functionality');

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modals-container')) {
            console.log('Closing modal by clicking outside');
            const visibleModal = document.querySelector('.modals-container [id^="modal-"]:not([hidden])');
            if (visibleModal) {
                visibleModal.setAttribute('hidden', '');
                document.body.style.overflow = '';
            }
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('Closing modal with escape key');
            const visibleModal = document.querySelector('.modals-container [id^="modal-"]:not([hidden])');
            if (visibleModal) {
                visibleModal.setAttribute('hidden', '');
                document.body.style.overflow = '';
            }
        }
    });
});