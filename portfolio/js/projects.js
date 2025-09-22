// Check if video can play
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    const fallback = document.querySelector('.video-fallback');
    
    if (video) {
        video.addEventListener('error', function() {
            video.style.display = 'none';
            if (fallback) {
                fallback.style.display = 'block';
            }
        });

        // Try to play the video
        video.play().catch(function(error) {
            console.log("Video playback error:", error);
        });
    }
});

let currentMediaIndex = 0;
const mediaItems = [
    { type: 'video', src: 'Project video/ShopNGo.mp4' },
    { type: 'image', src: 'images/ShopNGo1.png' },
    { type: 'image', src: 'images/ShopNGo2.png' }
];

function showMedia(index) {
    const mediaContent = document.querySelector('.media-content');
    if (!mediaContent) return;
    
    const item = mediaItems[index];
    
    if (item.type === 'video') {
        mediaContent.innerHTML = `
            <div class="video-container">
                <video width="100%" controls controlsList="nodownload" playsinline>
                    <source src="${item.src}" type="video/mp4">
                    Your browser doesn't support this video format.
                </video>
            </div>
            <div class="media-nav">
                <button class="prev" onclick="prevMedia()">❮</button>
                <button class="next" onclick="nextMedia()">❯</button>
            </div>
        `;
        // Auto-play the video when shown
        const video = mediaContent.querySelector('video');
        if (video) {
            video.play().catch(e => console.log("Auto-play prevented:", e));
        }
    } else if (item.type === 'image') {
        mediaContent.innerHTML = `
            <div class="image-container" style="background: #000; display: flex; justify-content: center; align-items: center; max-height: 60vh;">
                <img src="${item.src}" alt="ShopNGo Screenshot" style="width: 100%; height: auto; max-height: 60vh; object-fit: contain;">
            </div>
            <div class="media-nav">
                <button class="prev" onclick="prevMedia()">❮</button>
                <button class="next" onclick="nextMedia()">❯</button>
            </div>
        `;
    }
}

function nextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    showMedia(currentMediaIndex);
    updateDots();
}

function prevMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    showMedia(currentMediaIndex);
    updateDots();
}

// Add dots indicator for navigation
function updateDots() {
    const dotsContainer = document.querySelector('.dots-nav');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = mediaItems.map((_, index) => `
        <button class="dot ${index === currentMediaIndex ? 'active' : ''}" 
                onclick="showMediaAt(${index})"></button>
    `).join('');
}

function showMediaAt(index) {
    currentMediaIndex = index;
    showMedia(index);
    updateDots();
}

// Initialize dots on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDots();
}); 