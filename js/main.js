// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const header = document.querySelector('header');

mobileMenuBtn.addEventListener('click', () => {
    header.classList.toggle('mobile-menu-open');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        header.classList.remove('mobile-menu-open');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
const totalSlides = testimonialSlides.length;

// Set initial active slide
updateSlider();

// Next button click
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

// Previous button click
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Dot click
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Update slider function
function updateSlider() {
    // Update slides
    testimonialSlides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto slide change
let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
});

// Animate stats counter
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(number => {
                animateCounter(number);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats container
const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
}

// Form validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Lütfen tüm zorunlu alanları doldurun.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Form submission success (in a real project, you would send data to server)
        alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
        contactForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const cookieSettingsBtn = document.getElementById('cookie-settings');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show cookie consent popup after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
    
    // Accept all cookies
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        localStorage.setItem('analyticsEnabled', 'true');
        localStorage.setItem('marketingEnabled', 'true');
        localStorage.setItem('preferencesEnabled', 'true');
        cookieConsent.classList.remove('show');
    });
    
    // Open cookie settings
    cookieSettingsBtn.addEventListener('click', () => {
        // Create settings panel if it doesn't exist
        if (!document.querySelector('.cookie-settings-panel')) {
            const settingsPanel = document.createElement('div');
            settingsPanel.className = 'cookie-settings-panel';
            settingsPanel.innerHTML = `
                <h4>Çerez Ayarları</h4>
                <div class="cookie-option">
                    <div>
                        <label>Gerekli Çerezler</label>
                        <p>Bu çerezler web sitesinin temel işlevleri için gereklidir ve devre dışı bırakılamaz.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked disabled>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="cookie-option">
                    <div>
                        <label>Analitik Çerezler</label>
                        <p>Bu çerezler, web sitemizdeki trafiği analiz etmemize ve kullanıcı davranışlarını anlamamıza yardımcı olur.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="analytics-cookies" ${localStorage.getItem('analyticsEnabled') === 'true' ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="cookie-option">
                    <div>
                        <label>Pazarlama Çerezleri</label>
                        <p>Bu çerezler, size daha alakalı reklamlar göstermek için kullanılır.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="marketing-cookies" ${localStorage.getItem('marketingEnabled') === 'true' ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="cookie-option">
                    <div>
                        <label>Tercih Çerezleri</label>
                        <p>Bu çerezler, web sitesi tercihlerinizi ve seçimlerinizi hatırlamak için kullanılır.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="preferences-cookies" ${localStorage.getItem('preferencesEnabled') === 'true' ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div style="margin-top: 20px; text-align: right;">
                    <button id="save-preferences" class="btn btn-primary">Tercihleri Kaydet</button>
                </div>
            `;
            
            cookieConsent.querySelector('.cookie-content').appendChild(settingsPanel);
            
            // Save preferences button
            document.getElementById('save-preferences').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                localStorage.setItem('analyticsEnabled', document.getElementById('analytics-cookies').checked ? 'true' : 'false');
                localStorage.setItem('marketingEnabled', document.getElementById('marketing-cookies').checked ? 'true' : 'false');
                localStorage.setItem('preferencesEnabled', document.getElementById('preferences-cookies').checked ? 'true' : 'false');
                cookieConsent.classList.remove('show');
            });
        }
        
        // Toggle settings panel
        const settingsPanel = document.querySelector('.cookie-settings-panel');
        settingsPanel.classList.toggle('show');
    });
});