// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
        notification.style.color = '#fff';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
        notification.style.color = '#fff';
    } else {
        notification.style.backgroundColor = '#d4af37';
        notification.style.color = '#1a1a1a';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio items for scroll animation
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.6s ease';
    observer.observe(item);
});

// ============================================
// PORTFOLIO PLAY BUTTON FUNCTIONALITY
// ============================================

// Sample video URLs for demo (replace with actual video URLs)
const videoUrls = {
    // Use a known embeddable Vimeo video for all items for testing
    'Michael & Jessica': 'https://play.gumlet.io/embed/69d7bd2ae2653946cb388377',
    'Dominique & Sean': 'https://play.gumlet.io/embed/69d7bd2ae2653946cb388377',
    'Douglas & Nick': 'https://play.gumlet.io/embed/69d7acd779cd218090ffb26c',
    'Lauren & Johnny': 'https://play.gumlet.io/embed/69d7b39ae2653946cb3798be',
    'Alexandra & Jacob': 'https://play.gumlet.io/embed/69d7b68779cd21809000aa64',
    'Laura & Joseph': 'https://play.gumlet.io/embed/69d7514c79cd218090f67736',
   
};

function openVideoModal(coupleName) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoLink = document.getElementById('modalVideoLink');

    // Set video URL and force autoplay for YouTube
    let videoUrl = videoUrls[coupleName] || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    // If it's a YouTube embed, ensure autoplay=1 is present
    if (videoUrl.includes('youtube.com/embed')) {
        if (!videoUrl.includes('autoplay=1')) {
            videoUrl += (videoUrl.includes('?') ? '&' : '?') + 'autoplay=1';
        }
    }
    modalVideo.src = videoUrl;

    // Set the direct link (strip autoplay for user link)
    if (modalVideoLink) {
        let directUrl = videoUrl.replace(/[?&]autoplay=1/, '');
        modalVideoLink.href = directUrl;
    }

    // Show modal
    modal.style.display = 'block';

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    // Hide modal
    modal.style.display = 'none';
    
    // Stop video
    modalVideo.src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const container = button.closest('.portfolio-item, .portfolio-image');
        const titleEl = container && container.querySelector('.portfolio-title');
        if (titleEl) {
            openVideoModal(titleEl.textContent.trim());
        }
    });
});

// Close modal when clicking the close button
document.querySelector('.close-modal').addEventListener('click', closeVideoModal);

// Close modal when clicking outside the modal content
document.getElementById('videoModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeVideoModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('videoModal').style.display === 'block') {
        closeVideoModal();
    }
});

// Support for custom modal openers (e.g., direct link)
const customModalLink = document.querySelector('a[href="#"]');
if (customModalLink && customModalLink.textContent.includes('Watch Full Video')) {
    customModalLink.addEventListener('click', function(e) {
        e.preventDefault();
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        const modalVideoLink = document.getElementById('modalVideoLink');
        const gumletUrl = 'https://play.gumlet.io/embed/69d7acd779cd218090ffb26c';
        modalVideo.src = gumletUrl;
        if (modalVideoLink) {
            modalVideoLink.href = gumletUrl;
        }
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// ============================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ADD CSS ANIMATIONS DYNAMICALLY
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// MOBILE MENU RESPONSIVE STYLES
// ============================================

const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(26, 26, 26, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            padding: 2rem 0;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            gap: 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            padding: 1rem;
            border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }
        
        .nav-menu li:last-child {
            border-bottom: none;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Wedding Films Portfolio - Script loaded');

// ============================================
// SEE MORE BUTTON FUNCTIONALITY
// ============================================

const seeMoreBtn = document.getElementById('seeMoreBtn');
const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');
let itemsShown = false;

if (seeMoreBtn && hiddenItems.length > 0) {
    seeMoreBtn.addEventListener('click', () => {
        hiddenItems.forEach(item => {
            item.style.display = itemsShown ? 'none' : 'block';
        });
        itemsShown = !itemsShown;
        seeMoreBtn.textContent = itemsShown ? 'Show Less' : 'See More';
    });
}

// ============================================
// CLASSIC TAB GALLERY EXPANDING IMAGE FUNCTION
// ============================================
function classicTabGalleryExpand(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    var modal = document.querySelector('.classic-tab-gallery-modal');
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    modal.style.display = "block";
}

// ============================================
// TAB GALLERY WITH EXPANDING IMAGE FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Tab switching for tab gallery
    const tabGalleryTabs = document.querySelectorAll('.tab-gallery-tab');
    const tabGalleryContents = document.querySelectorAll('.tab-gallery-content');
    tabGalleryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabGalleryTabs.forEach(t => t.classList.remove('active'));
            tabGalleryContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const tabName = this.getAttribute('data-tab');
            const content = document.querySelector('.tab-gallery-content[data-content="' + tabName + '"]');
            if (content) content.classList.add('active');
        });
    });

    // Expanding image functionality
    const expandingImgContainer = document.getElementById('expandingImgContainer');
    const expandedImg = document.getElementById('expandedImg');
    const imgText = document.getElementById('imgtext');
    document.querySelectorAll('.expandable-img').forEach(img => {
        img.addEventListener('click', function () {
            expandingImgContainer.style.display = 'flex';
            expandedImg.src = this.src;
            imgText.textContent = this.getAttribute('data-caption') || this.alt || '';
        });
    });
    // Close on background click
    expandingImgContainer && expandingImgContainer.addEventListener('click', function(e) {
        if (e.target === expandingImgContainer) {
            expandingImgContainer.style.display = 'none';
        }
    });
});

// ============================================
// TABBED PORTFOLIO GALLERY FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.portfolio-tab');
    const tabContents = document.querySelectorAll('.portfolio-tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            const tab = this.getAttribute('data-tab');
            const content = document.querySelector('.portfolio-tab-content[data-content="' + tab + '"]');
            if (content) content.classList.add('active');
        });
    });

    // Ensure play buttons in tabbed gallery open the video modal
    document.querySelectorAll('.tabbed-portfolio .play-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioItem = button.closest('.portfolio-item');
            const title = portfolioItem.querySelector('.portfolio-title').textContent;
            openVideoModal(title);
        });
    });
});
