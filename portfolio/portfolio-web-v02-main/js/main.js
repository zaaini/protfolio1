// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Populate Skills
Object.entries(skillsData).forEach(([category, skills]) => {
    const categoryElement = document.querySelector(`.skill-category h3:contains('${category}')`).parentElement;
    const skillItems = categoryElement.querySelector('.skill-items');
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <div class="skill-info">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillItems.appendChild(skillElement);
    });
});



// Populate Projects
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card';
    projectElement.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.demo}" target="_blank">Live Demo</a>
                <a href="${project.github}" target="_blank">GitHub</a>
            </div>
        </div>
    `;
    projectsGrid.appendChild(projectElement);
});

// Create particle effect
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Project Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectBubbles = document.querySelectorAll('.project-bubble');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showProject(index) {
        projectBubbles.forEach((bubble, i) => {
            if (i === index) {
                bubble.classList.remove('hidden');
                bubble.classList.add('active');
                // Add entrance animation
                gsap.fromTo(bubble, 
                    { opacity: 0, scale: 0.8 }, 
                    { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }
                );
            } else {
                bubble.classList.add('hidden');
                bubble.classList.remove('active');
            }
        });
        updateButtonStates();
    }

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentIndex < projectBubbles.length - 1) {
            currentIndex++;
            showProject(currentIndex);
        }
    });

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showProject(currentIndex);
        }
    });

    function updateButtonStates() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === projectBubbles.length - 1;
        
        // Update button opacity based on state
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
        nextBtn.style.opacity = currentIndex === projectBubbles.length - 1 ? "0.5" : "1";
    }

    // Initialize first project
    showProject(0);

    // Make sure links are clickable
    const githubLinks = document.querySelectorAll('.github-link');
    githubLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click from affecting the slider
            window.open(link.href, '_blank'); // Open link in new tab
        });
    });
});

// Enhanced GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-text', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    stagger: 0.2
});

gsap.from('.hero-image', {
    duration: 1.5,
    x: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

// Scroll Animations for Projects
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1
    });
});

// Skills Animation
gsap.utils.toArray('.skill-category').forEach((category, i) => {
    gsap.from(category, {
        scrollTrigger: {
            trigger: category,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1
    });
});

// Progress bar animation
gsap.utils.toArray('.progress').forEach(progress => {
    const width = progress.style.width;
    progress.style.width = 0;
    
    ScrollTrigger.create({
        trigger: progress,
        start: 'top bottom-=100',
        onEnter: () => {
            gsap.to(progress, {
                width: width,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
});

// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// GSAP Animations
// Hero Section Animation
gsap.from('.hero-text', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Scroll Animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Mobile Navigation Toggle
window.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const toggleIcon = document.querySelector('.nav-toggle i');

    if (!navToggle || !navMenu || !toggleIcon) return;

    function toggleMenu(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        if (toggleIcon.classList.contains('fa-bars')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        } else {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        });
    });
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.remove('active');
    }
});

// Active Navigation Link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Toast Notification Function
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon;
    switch(type) {
        case 'info':
            icon = 'info-circle';
            break;
        case 'warning':
            icon = 'exclamation-circle';
            break;
        case 'success':
            icon = 'check-circle';
            break;
        default:
            icon = 'info-circle';
    }

    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span class="message">${message}</span>
        <span class="close-btn">
            <i class="fas fa-times"></i>
        </span>
    `;

    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Add click event to close button
    const closeBtn = toast.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, 5000);
}

// Add click event listeners to certification view buttons
document.addEventListener('DOMContentLoaded', () => {
    const certButtons = document.querySelectorAll('.view-cert');
    
    certButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Certifications will be available soon. Please check back later!', 'warning');
        });
    });
});
