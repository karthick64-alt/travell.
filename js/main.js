// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
            dot.classList.remove('bg-white/50');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('active');
            dot.classList.add('bg-white/50');
            dot.classList.remove('bg-white');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Slider Controls
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Slider Dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Fade in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
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

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form validation logic here
        alert('Form submitted successfully!');
    });
});

// Package Filter (for packages page)
if (document.getElementById('package-filter')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            packageCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Search Functionality
const searchInputs = document.querySelectorAll('input[type="text"]');
searchInputs.forEach(input => {
    if (input.placeholder.toLowerCase().includes('search')) {
        input.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Add search functionality
                console.log('Searching for:', this.value);
            }
        });
    }
});

// Initialize animations on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const animatedElements = document.querySelectorAll('.animate-on-load');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in');
        }, index * 100);
    });
});

