// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Initialize theme icon based on current theme
function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        if (theme === 'dark') {
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Get saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
updateThemeIcon(savedTheme);

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add smooth transition
        html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Set new theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
        updateThemeIcon(newTheme);
        
        // Add ripple effect
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// GitHub API Integration
const GITHUB_USERNAME = 'seenumehta';
const PROJECTS_CONTAINER = document.getElementById('projects-container');

// Featured projects (these are the pinned repositories from GitHub)
const FEATURED_PROJECTS = [
    'CROWEDfund',
    'Dlottery-application',
    'Event-oraganisaton',
    'Machine_Learing',
    'NextGEN-Orbit',
    'SHA256-cracker',
    'SignLanguage',
    'insta_bot',
    'espEvilTwin-DeAuth',
    'Car-Crash-Game'
];

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter and sort featured projects first
        const featured = repos.filter(repo => FEATURED_PROJECTS.includes(repo.name));
        const others = repos.filter(repo => !FEATURED_PROJECTS.includes(repo.name));
        
        // Combine featured first, then others
        const sortedRepos = [...featured, ...others].slice(0, 10);
        
        displayProjects(sortedRepos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        displayError();
    }
}

// Display projects
function displayProjects(repos) {
    PROJECTS_CONTAINER.innerHTML = '';
    
    if (repos.length === 0) {
        PROJECTS_CONTAINER.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-secondary);">No projects found.</p>';
        return;
    }
    
    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        PROJECTS_CONTAINER.appendChild(projectCard);
    });
}

// Generate project description if missing
function generateDescription(repo) {
    const descriptions = {
        'CROWEDfund': 'A decentralized crowdfunding platform built on blockchain technology. Allows users to create and contribute to campaigns with full transparency and security through smart contracts.',
        'Dlottery-application': 'Blockchain-based lottery application using smart contracts to ensure fairness and transparency. Features decentralized random number generation and automated prize distribution.',
        'Event-oraganisaton': 'Decentralized event organization platform that simplifies event creation, ticketing, and management using blockchain technology for secure and transparent transactions.',
        'Machine_Learing': 'Machine learning project showcasing various algorithms and models. Includes data preprocessing, model training, and evaluation techniques for predictive analytics.',
        'NextGEN-Orbit': 'Next generation orbital simulation and visualization platform. Demonstrates advanced computational techniques for space dynamics and orbital mechanics calculations.',
        'SHA256-cracker': 'Cybersecurity tool demonstrating SHA-256 hash analysis and brute-force techniques. Educational project showcasing cryptographic concepts and password security.',
        'SignLanguage': 'Sign language recognition application using computer vision and machine learning to interpret and translate sign language gestures in real-time.',
        'insta_bot': 'Instagram automation bot built with Python for automated interactions, engagement, and management. Includes features for scheduling posts and managing accounts efficiently.',
        'espEvilTwin-DeAuth': 'Cybersecurity penetration testing tool using ESP32 for wireless security research. Demonstrates deauthentication attacks and network vulnerability assessment.',
        'Car-Crash-Game': 'Interactive car escape game built with JavaScript, HTML5, and CSS. Features dynamic gameplay, collision detection, and responsive controls for an engaging gaming experience.'
    };
    
    return descriptions[repo.name] || `A ${repo.language || 'software'} project showcasing skills in ${repo.language || 'programming'}. This project demonstrates expertise in modern development practices and includes ${repo.topics && repo.topics.length > 0 ? repo.topics.join(', ') : 'advanced features'}. Built with best practices for performance, security, and user experience.`;
}

// Create project card element
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.projectId = repo.id || Math.random().toString(36).substr(2, 9);
    
    // Determine technology/language icon
    const language = repo.language || 'Code';
    const languageColor = getLanguageColor(repo.language);
    
    // Get full description (from repo or generated)
    const fullDescription = repo.description || generateDescription(repo);
    
    // Truncate description for card preview
    const previewDescription = fullDescription.length > 120 
        ? fullDescription.substring(0, 120) + '...' 
        : fullDescription;
    
    // Store full description in data attribute
    card.dataset.fullDescription = fullDescription;
    card.dataset.projectName = repo.name;
    card.dataset.projectUrl = repo.html_url;
    card.dataset.projectHomepage = repo.homepage || '';
    card.dataset.projectLanguage = language;
    card.dataset.projectTopics = repo.topics ? JSON.stringify(repo.topics) : '[]';
    
    card.innerHTML = `
        <div class="project-header" style="background: linear-gradient(135deg, ${languageColor}, ${adjustColorBrightness(languageColor, -20)});">
            <i class="${getLanguageIcon(repo.language)}"></i>
        </div>
        <div class="project-content">
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${previewDescription}</p>
            <div class="project-footer">
                <div class="project-tech">
                    ${repo.language ? `<span class="tech-badge" style="background: ${languageColor}; color: white;">${repo.language}</span>` : ''}
                    ${repo.topics && repo.topics.length > 0 
                        ? repo.topics.slice(0, 3).map(topic => 
                            `<span class="tech-badge">${topic}</span>`
                          ).join('') 
                        : ''}
                </div>
                <div class="project-links">
                    <button class="read-more-btn" data-project-id="${card.dataset.projectId}">
                        <i class="fas fa-info-circle"></i> Read More
                    </button>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" aria-label="Live Demo" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    <a href="${repo.html_url}" target="_blank" aria-label="View on GitHub" class="project-link"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener for read more button
    const readMoreBtn = card.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            openProjectDrawer(card);
        });
    }
    
    return card;
}

// Get language color
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f7df1e',
        'Python': '#3776ab',
        'Java': '#ed8b00',
        'Solidity': '#363636',
        'HTML': '#e34c26',
        'CSS': '#1572b6',
        'TypeScript': '#3178c6',
        'C++': '#00599c',
        'C': '#a8b9cc',
        'Go': '#00add8',
        'Rust': '#000000',
        'PHP': '#777bb4',
        'Ruby': '#cc342d',
        'Swift': '#fa7343',
        'Kotlin': '#7f52ff',
        'Dart': '#0175c2',
        'Shell': '#89e051',
        'R': '#276dc3',
        'Jupyter Notebook': '#da5b0b'
    };
    
    return colors[language] || '#6366f1';
}

// Get language icon
function getLanguageIcon(language) {
    const icons = {
        'JavaScript': 'fab fa-js',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'Solidity': 'fab fa-ethereum',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'TypeScript': 'fab fa-js-square',
        'Go': 'fab fa-go',
        'Rust': 'fab fa-rust',
        'PHP': 'fab fa-php',
        'Ruby': 'fas fa-gem',
        'Swift': 'fab fa-swift',
        'Dart': 'fas fa-dart',
        'Shell': 'fas fa-terminal',
        'R': 'fab fa-r-project',
        'Jupyter Notebook': 'fas fa-book'
    };
    
    return icons[language] || 'fas fa-code';
}

// Adjust color brightness
function adjustColorBrightness(hex, percent) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Adjust brightness
    const newR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const newG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const newB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    // Convert back to hex
    const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return '#' + toHex(newR) + toHex(newG) + toHex(newB);
}

// Display error message
function displayError() {
    PROJECTS_CONTAINER.innerHTML = `
        <div style="text-align: center; grid-column: 1 / -1; padding: 2rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <p style="color: var(--text-secondary);">Unable to load projects from GitHub. Please check your connection or visit 
            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" style="color: var(--primary-color);">GitHub</a> directly.</p>
        </div>
    `;
}

// Open Project Drawer
function openProjectDrawer(card) {
    const drawer = document.getElementById('projectDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const drawerContent = drawer.querySelector('.drawer-content');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerDescription = document.getElementById('drawerDescription');
    const drawerTech = document.getElementById('drawerTech');
    const drawerLinks = document.getElementById('drawerLinks');
    const drawerClose = document.getElementById('drawerClose');
    
    // Get project data from card
    const projectName = card.dataset.projectName;
    const fullDescription = card.dataset.fullDescription;
    const projectUrl = card.dataset.projectUrl;
    const projectHomepage = card.dataset.projectHomepage;
    const projectLanguage = card.dataset.projectLanguage;
    const topics = JSON.parse(card.dataset.projectTopics || '[]');
    
    // Set drawer content
    drawerTitle.textContent = projectName;
    drawerDescription.textContent = fullDescription;
    
    // Set technologies
    const languageColor = getLanguageColor(projectLanguage);
    let techHTML = '';
    if (projectLanguage && projectLanguage !== 'Code') {
        techHTML += `<span class="drawer-tech-badge" style="background: ${languageColor}; color: white;">${projectLanguage}</span>`;
    }
    topics.forEach(topic => {
        techHTML += `<span class="drawer-tech-badge">${topic}</span>`;
    });
    drawerTech.innerHTML = techHTML || '<span class="drawer-tech-badge">General</span>';
    
    // Set links
    let linksHTML = '';
    if (projectHomepage) {
        linksHTML += `
            <a href="${projectHomepage}" target="_blank" class="drawer-link-btn drawer-link-primary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        `;
    }
    linksHTML += `
        <a href="${projectUrl}" target="_blank" class="drawer-link-btn drawer-link-secondary">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    `;
    drawerLinks.innerHTML = linksHTML;
    
    // Open drawer
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate drawer in
    setTimeout(() => {
        drawerContent.style.transform = 'translateX(0)';
        overlay.style.opacity = '1';
    }, 10);
    
    // Close handlers
    const closeDrawer = () => {
        drawerContent.style.transform = 'translateX(100%)';
        overlay.style.opacity = '0';
        setTimeout(() => {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    };
    
    // Use one-time event listeners
    drawerClose.onclick = closeDrawer;
    overlay.onclick = closeDrawer;
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeDrawer();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Fetch and display certifications
function loadCertifications() {
    const certificationsContainer = document.getElementById('certificationsContainer');
    
    // ADD YOUR CERTIFICATIONS HERE - Just name and issuer needed
    // Simple format - just add your certification name and issuer
    const certifications = [
        // Add your certifications like this:
        { name: 'Blockchain Developer', issuer: 'LinkedIn' },
        { name: 'Cybersecurity Fundamentals', issuer: 'LinkedIn' },
        { name: 'Python Programming', issuer: 'LinkedIn' },
        { name: 'Linux System Administration', issuer: 'LinkedIn' },
        { name: 'Web Development', issuer: 'LinkedIn' },
        { name: 'Smart Contract Development', issuer: 'LinkedIn' },
    ];
    
    if (!certificationsContainer) return;
    
    certificationsContainer.innerHTML = '';
    
    if (certifications.length === 0) {
        certificationsContainer.innerHTML = `
            <div style="text-align: center; grid-column: 1 / -1; padding: 3rem; background: var(--bg-secondary); border-radius: 15px; border: 2px dashed var(--border-color);">
                <i class="fas fa-certificate" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 0.5rem;">No certifications added yet</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 600px; margin: 0 auto;">
                    To add your LinkedIn certifications, open <code style="background: var(--bg-primary); padding: 0.25rem 0.5rem; border-radius: 4px; color: var(--primary-color);">script.js</code> 
                    and find the <code style="background: var(--bg-primary); padding: 0.25rem 0.5rem; border-radius: 4px; color: var(--primary-color);">loadCertifications()</code> function. 
                    Follow the instructions in the comments to add your certifications.
                </p>
            </div>
        `;
        return;
    }
    
    certifications.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'certification-card';
        
        // Cycle through different icons for variety
        const icons = ['fa-certificate', 'fa-award', 'fa-medal', 'fa-trophy', 'fa-ribbon', 'fa-star', 'fa-badge'];
        const icon = icons[index % icons.length];
        
        certCard.innerHTML = `
            <div class="cert-badge">
                <i class="fas ${icon}"></i>
            </div>
            <div class="cert-content">
                <h3 class="cert-name">${cert.name}</h3>
                <p class="cert-issuer">${cert.issuer || 'Professional Certification'}</p>
                ${cert.date ? `<div class="cert-date"><i class="fas fa-calendar"></i> ${cert.date}</div>` : ''}
                ${cert.credentialId ? `<div class="cert-credential-id">Credential ID: ${cert.credentialId}</div>` : ''}
                ${cert.url ? `<a href="${cert.url}" target="_blank" class="cert-link">View on LinkedIn <i class="fab fa-linkedin"></i></a>` : ''}
            </div>
        `;
        
        certificationsContainer.appendChild(certCard);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
    updateProjectCount();
    loadCertifications();
    
    // Add active class to navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate numbers on scroll
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueEl = entry.target.querySelector('.stat-value');
                if (valueEl) {
                    const text = valueEl.textContent;
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const target = parseInt(match[1]);
                        animateValue(valueEl, 0, target, 2000);
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-box').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Add typing effect to hero section (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('h3');
            const value = statValue.textContent;
            
            // Only animate if it's a number
            if (value.match(/^\d+/)) {
                const target = parseInt(value);
                animateCounter(statValue, target);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Animate skill progress bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.skill-progress-fill');
            if (progressFill) {
                const percent = progressFill.getAttribute('data-percent');
                progressFill.style.setProperty('--fill-width', percent + '%');
                progressFill.style.width = percent + '%';
                skillObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(skill => {
    skillObserver.observe(skill);
});

// Animate experience progress bar
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = document.getElementById('experienceProgress');
            if (progressBar) {
                const width = progressBar.style.width || '75%';
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                experienceObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) {
    experienceObserver.observe(heroSection);
}

// Add interactive badge hover effects
document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(15deg)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Update project count dynamically
async function updateProjectCount() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (response.ok) {
            const data = await response.json();
            const projectCountEl = document.getElementById('projectCount');
            if (projectCountEl && data.public_repos) {
                projectCountEl.textContent = data.public_repos + '+';
            }
        }
    } catch (error) {
        console.error('Error fetching project count:', error);
    }
}


