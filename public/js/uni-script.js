/**
 * VANDAMAFRICA — UNI LOGISTICS INTERACTION & ANIMATION SCRIPT
 * Handles Loader, Sticky Header, Mega Menu Popup, Vertical Dot Nav,
 * Skewed Cards, Timeline Switcher, Parallax & Number Counter.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader
    const loader = document.getElementById('uniLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
        }, 500);
    }

    // 2. Sticky Header on Scroll
    const header = document.getElementById('uniHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // 3. Mega Menu Popup Toggle
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuPopup = document.getElementById('menuPopup');
    const popupBackdrop = document.querySelector('.popup-backdrop');

    function toggleMenu(show) {
        if (!menuPopup) return;
        if (show) {
            menuPopup.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            menuPopup.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    openMenuBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    popupBackdrop?.addEventListener('click', () => toggleMenu(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuPopup?.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    // 4. Vertical Dot Navigation Spy (Section scrollspy)
    const dotNav = document.getElementById('cd-vertical-nav');
    const dotLinks = dotNav ? dotNav.querySelectorAll('li a') : [];
    const sections = document.querySelectorAll('section[id], footer[id]');

    function updateActiveDot() {
        if (!dotNav || dotLinks.length === 0) return;
        let currentSectionId = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        dotLinks.forEach((link) => {
            const parentLi = link.parentElement;
            parentLi.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                parentLi.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot();

    // 5. Skewed Cards Dynamic Text Updater
    const skewCards = document.querySelectorAll('.skew-card');
    const dynamicTitle = document.getElementById('skewSliderTitle');
    const dynamicDesc = document.getElementById('skewSliderDesc');

    skewCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            const currentLang = document.documentElement.lang || 'vi';
            const title = (currentLang === 'en' && card.getAttribute('data-title-en')) ? card.getAttribute('data-title-en') : card.getAttribute('data-title');
            const desc = (currentLang === 'en' && card.getAttribute('data-desc-en')) ? card.getAttribute('data-desc-en') : card.getAttribute('data-desc');
            if (dynamicTitle && title) dynamicTitle.textContent = title;
            if (dynamicDesc && desc) dynamicDesc.textContent = desc;
        });
    });

    // 6. Interactive Horizontal Timeline Switcher
    const yearNodes = document.querySelectorAll('.year-node');
    const eventItems = document.querySelectorAll('.timeline-event-item');

    yearNodes.forEach((node) => {
        node.addEventListener('click', () => {
            const targetYear = node.getAttribute('data-year');

            yearNodes.forEach((n) => n.classList.remove('active'));
            node.classList.add('active');

            eventItems.forEach((item) => {
                if (item.getAttribute('data-year') === targetYear) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // 7. Stat Counter Animation on Scroll
    const statCounters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function runCounters() {
        statCounters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            if (!target) return;
            const duration = 2000;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString('vi-VN');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString('vi-VN');
                }
            }, stepTime);
        });
    }

    const statSection = document.getElementById('wrap_about');
    if (statSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    runCounters();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statSection);
    }

    // 8. Parallax on Mouse Move (Hero Section)
    const heroSection = document.getElementById('section1');
    const plane = document.querySelector('.sky-plane');
    const cloud1 = document.querySelector('.cloud-1');
    const cloud2 = document.querySelector('.cloud-2');

    heroSection?.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        if (plane) {
            plane.style.transform = `translate(${deltaX * 30}px, ${deltaY * 20}px)`;
        }
        if (cloud1) {
            cloud1.style.transform = `translate(${deltaX * -20}px, ${deltaY * -15}px)`;
        }
        if (cloud2) {
            cloud2.style.transform = `translate(${deltaX * 25}px, ${deltaY * 15}px)`;
        }
    });

    // 9. Back To Top Button
    const backToTop = document.getElementById('backToTop');
    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
