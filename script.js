// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

const updateFollower = () => {
    const speed = 0.2;
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';
    requestAnimationFrame(updateFollower);
};
updateFollower();

// Interactive Elements
document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Particle System
const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
};

// Neural Network Background
const createNeuralNetwork = () => {
    const container = document.getElementById('neuralNetwork');
    const nodeCount = 30;
    const nodes = [];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('neural-node');
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(node);
        nodes.push(node);
    }

    // Create connections
    nodes.forEach((node, index) => {
        if (index < nodes.length - 1) {
            const connection = document.createElement('div');
            connection.classList.add('neural-connection');

            const rect1 = node.getBoundingClientRect();
            const rect2 = nodes[index + 1].getBoundingClientRect();

            const distance = Math.sqrt(
                Math.pow(rect2.left - rect1.left, 2) +
                Math.pow(rect2.top - rect1.top, 2)
            );

            connection.style.width = distance + 'px';
            connection.style.left = rect1.left + 'px';
            connection.style.top = rect1.top + 'px';
            connection.style.transformOrigin = '0 0';
            connection.style.transform = `rotate(${Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left)}rad)`;
            connection.style.animationDelay = Math.random() * 6 + 's';

            container.appendChild(connection);
        }
    });
};

// Initialize effects
createParticles();
setTimeout(createNeuralNetwork, 1000);

// Smooth Scrolling
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields');
        return;
    }

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate sending
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Enhanced Navigation Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.backdropFilter = 'blur(30px)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.02)';
        nav.style.backdropFilter = 'blur(20px)';
    }

    // Hide nav on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.style.transform = 'translateX(-50%) translateY(-100%)';
    } else {
        nav.style.transform = 'translateX(-50%) translateY(0)';
    }

    lastScrollY = currentScrollY;
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotateY(${scrolled * 0.1}deg) rotateX(${scrolled * 0.05}deg)`;
    });
});

// Magnetic Effect for Cards
document.querySelectorAll('.project-card, .skill-card, .timeline-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Typewriter Effect for Hero
const typewriterText = "Passionate about building data-driven systems and scalable web solutions.";
const typewriterElement = document.querySelector('.hero-content .subtitle');
let i = 0;

const typeWriter = () => {
    if (i < typewriterText.length) {
        typewriterElement.textContent = typewriterText.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 50);
    }
};

// Start typewriter after hero animation
setTimeout(typeWriter, 2000);