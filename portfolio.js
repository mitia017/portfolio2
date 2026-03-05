document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeFormHandling();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
            updateActiveNav(section);
            closeNavMenu();
        });
    });

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function navigateToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateActiveNav(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavOnScroll() {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                updateActiveNav(sectionId);
            }
        }
    });
}

function closeNavMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
}

function initializeAnimations() {
    observeElements();
    observeSkillBars();
}

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .tech-card, .timeline-card').forEach(el => {
        observer.observe(el);
    });
}

function observeSkillBars() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target.querySelector('.skill-fill');
                if (skillFill) {
                    const width = skillFill.style.width;
                    skillFill.style.width = '0';
                    setTimeout(() => {
                        skillFill.style.transition = 'width 1s ease-out';
                        skillFill.style.width = width;
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-bar').forEach(el => {
        observer.observe(el);
    });
}

function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value
    };

    console.log('Form submitted:', formData);

    form.reset();

    alert('Thank you for your message! I will get back to you as soon as possible.');
}

function downloadCV() {
    alert('CV download feature coming soon! Please contact me directly for my CV.');
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', function() {
    const scrollToHashId = window.location.hash.slice(1);
    if (scrollToHashId) {
        setTimeout(() => {
            navigateToSection(scrollToHashId);
            updateActiveNav(scrollToHashId);
        }, 500);
    }
});

const mutationObserver = new MutationObserver(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
        updateActiveNavOnScroll();
    }
});

mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});

document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');

    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});
