/* ===========================================
   LINEAR CREATIVE - JAVASCRIPT
   Fungsi: 
   1. Mobile menu toggle
   2. Sticky header
   3. Smooth scroll
   4. Animasi on scroll
   5. Tahun dinamis di footer
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. MOBILE MENU TOGGLE
    // ====================
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Animasi hamburger icon
            const bars = this.querySelectorAll('.bar');
            if (mobileNav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Tutup mobile menu saat link diklik
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            menuToggle.querySelectorAll('.bar')[0].style.transform = 'none';
            menuToggle.querySelectorAll('.bar')[1].style.opacity = '1';
            menuToggle.querySelectorAll('.bar')[2].style.transform = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // ====================
    // 2. STICKY HEADER
    // ====================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efek sticky dan shadow
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up - show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ====================
    // 3. SMOOTH SCROLL
    // ====================
    // Ditangani oleh CSS: html { scroll-behavior: smooth; }
    // Fallback untuk browser lama
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ====================
    // 4. ANIMASI ON SCROLL
    // ====================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .step, .client-logo');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state untuk animasi
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .step, .client-logo');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Jalankan animasi saat scroll
    window.addEventListener('scroll', animateOnScroll);
    // Jalankan sekali saat load
    animateOnScroll();
    
    // ====================
    // 5. TAHUN DINAMIS DI FOOTER
    // ====================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ====================
    // 6. ACTIVE NAV LINK ON SCROLL
    // ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ====================
    // 7. HOVER EFFECT UNTUK SERVICE CARDS
    // ====================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ====================
    // 8. FORM VALIDATION (JIKA ADA FORM)
    // ====================
    // Tidak ada form di website ini karena semua konversi melalui WhatsApp
    
    // ====================
    // 9. LAZY LOADING UNTUK GAMBAR
    // ====================
    // Implementasi lazy loading untuk performa
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ====================
    // 10. BACK TO TOP BUTTON (OPTIONAL)
    // ====================
    // Tidak diperlukan karena website single-page dan header sticky
    
    console.log('Linear Creative website loaded successfully!');
});