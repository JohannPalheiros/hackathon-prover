// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Countdown Timer with animation
function updateCountdown() {
    const eventDate = new Date('2025-08-15T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Animate count changes
    animateCountChange('days', days);
    animateCountChange('hours', hours);
    animateCountChange('minutes', minutes);
    animateCountChange('seconds', seconds);

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h3 style="color: white; font-size: 2rem;"><i class="fas fa-rocket"></i> Hackathon em andamento!</h3>';
    }
}

function animateCountChange(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent);
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.textContent = newValue >= 0 ? newValue : 0;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Smooth scrolling
function setupSmoothScrolling() {
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

// Enhanced form submission
function setupFormSubmission() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            department: document.getElementById('department')?.value || '',
            experience: document.getElementById('experience')?.value || '',
            skills: document.getElementById('skills')?.value || '',
            motivation: document.getElementById('motivation')?.value || '',
            timestamp: new Date().toISOString()
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.department) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            console.log('Dados da inscrição:', formData);
            showNotification('Inscrição realizada com sucesso! Em breve entraremos em contato.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Form field animations
function setupFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentNode) {
                this.parentNode.style.transform = 'scale(1.02)';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.parentNode) {
                this.parentNode.style.transform = 'scale(1)';
            }
            
            // Email validation
            if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = '#ef4444';
                    this.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                } else {
                    this.style.borderColor = '#10b981';
                    this.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                }
            }
        });
    });
}

// Character counter for textareas
function setupCharacterCounters() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        const maxLength = 500;
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            
            let counter = this.nextElementSibling;
            if (!counter || !counter.classList.contains('char-counter')) {
                counter = document.createElement('div');
                counter.classList.add('char-counter');
                counter.style.cssText = `
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-align: right;
                    margin-top: 0.5rem;
                    font-weight: 500;
                `;
                this.parentNode.appendChild(counter);
            }
            
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (currentLength > maxLength) {
                counter.style.color = '#ef4444';
                this.style.borderColor = '#ef4444';
            } else if (currentLength > maxLength * 0.9) {
                counter.style.color = '#f59e0b';
                this.style.borderColor = '#f59e0b';
            } else {
                counter.style.color = 'rgba(255, 255, 255, 0.7)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    });
}

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    createParticles();
    handleHeaderScroll();
    setupSmoothScrolling();
    setupFormSubmission();
    setupFormAnimations();
    setupCharacterCounters();
    
    // Start countdown timer
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Setup scroll reveal with throttling for better performance
    const throttledScrollReveal = throttle(scrollReveal, 100);
    window.addEventListener('scroll', throttledScrollReveal);
    scrollReveal(); // Check on page load
    
    // Console message for developers
    console.log('🚀 Hackathon Premium Landing Page carregada com sucesso!');
    console.log('💻 Developed with ❤️ for Provertec');
    
    // Add keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key closes notifications
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                if (notification.parentNode) {
                    notification.remove();
                }
            });
        }
    });
});

// Add error handling for any uncaught errors
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add PWA capabilities in the future
        // navigator.serviceWorker.register('/sw.js');
    });
}