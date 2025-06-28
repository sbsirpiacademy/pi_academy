document.addEventListener('DOMContentLoaded', () => {
    // Hide the loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        requestAnimationFrame(() => { //
            loadingOverlay.style.opacity = '0'; //
        });
        loadingOverlay.addEventListener('transitionend', () => {
            loadingOverlay.style.display = 'none';
        }, { once: true }); //
    }

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i'); // Get the icon element

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode'); // Remove default class
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to light mode if no preference is saved
        body.classList.add('light-mode');
        updateThemeIcon('light-mode');
    }

    function updateThemeIcon(currentTheme) {
        if (currentTheme === 'dark-mode') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        }
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Get header height dynamically for accurate scroll
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                // Close mobile nav if open
                if (document.querySelector('.nav-links').classList.contains('nav-active')) {
                    toggleNav();
                }
            }
        });
    });

    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const toggleNav = () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); // Burger animation

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    };

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const section = document.getElementById(targetId);
        if (section) {
          e.preventDefault();
          // Only smooth scroll to the section, without hiding others
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    burger.addEventListener('click', toggleNav);

    // --- "Read More" functionality for About Section ---
    const readMoreBtn = document.querySelector('.read-more-btn');
    const teacherDetailsP = document.querySelector('.teacher-details p:nth-of-type(4)'); // Selects the paragraph with the main description
    let fullText = '';
    let shortText = '';

    if (readMoreBtn && teacherDetailsP) {
        fullText = teacherDetailsP.innerHTML;
        const maxLength = 250; // You can adjust this
        if (fullText.length > maxLength) {
            shortText = fullText.substring(0, maxLength) + '...';
            teacherDetailsP.innerHTML = shortText; // Initialize with short text
            readMoreBtn.style.display = 'inline-block'; // Show button if text is long
        } else {
            readMoreBtn.style.display = 'none'; // Hide button if text is short
        }


        readMoreBtn.addEventListener('click', () => {
            if (teacherDetailsP.innerHTML === shortText) {
                teacherDetailsP.innerHTML = fullText;
                readMoreBtn.textContent = 'Read Less';
            } else {
                teacherDetailsP.innerHTML = shortText;
                readMoreBtn.textContent = 'Read More';
            }
        });
    }


    // --- PYQ Filtering Logic ---
    const boardSelect = document.getElementById('board-select');
    const classSelect = document.getElementById('class-select');
    const filterPyqBtn = document.getElementById('filter-pyq-btn');
    const pyqResults = document.querySelector('.pyq-results');

    // Dummy PYQ Data (Replace with real data structure and actual PDF links)
    const pyqData = {
        'wbbse': {
            '8': [
                { year: 2023, link: 'pyqs/wbbse_class8_2023.pdf' },
                { year: 2022, link: 'pyqs/wbbse_class8_2022.pdf' },
                { year: 2021, link: 'pyqs/wbbse_class8_2021.pdf' }
            ],
            '9': [
                { year: 2023, link: 'pyqs/wbbse_class9_2023.pdf' },
                { year: 2022, link: 'pyqs/wbbse_class9_2022.pdf' }
            ],
            '10': [
                { year: 2025, link: 'wb-board-class-10-mathematics-2025.pdf' },
                { year: 2024, link: 'wb-board-class-10-mathematics-2024.pdf' },
                { year: 2023, link: 'wb-board-class-10-mathematics-2023.pdf' },
                { year: 2022, link: 'wb-board-class-10-mathematics-2022.pdf' },
                { year: 2021, link: 'wb-board-class-10-mathematics-2021.pdf' },
                { year: 2020, link: 'wb-board-class-10-mathematics-2020.pdf' }
            ],
            '11': [
                { year: 2023, link: 'pyqs/wbbse_class11_2023.pdf' },
                { year: 2022, link: 'pyqs/wbbse_class11_2022.pdf' },
                { year: 2021, link: 'pyqs/wbbse_class11_2021.pdf' }
            ],
            '12': [
                { year: 2025, link: 'wb-board-class-12-mathematics-2025.pdf' },
                { year: 2024, link: 'wb-board-class-12-mathematics-2024.pdf' },
                { year: 2023, link: 'wb-board-class-12-mathematics-2023.pdf' },
                { year: 2022, link: 'wb-board-class-12-mathematics-2022.pdf' },
                { year: 2021, link: 'wb-board-class-12-mathematics-2021.pdf' },
                { year: 2020, link: 'wb-board-class-12-mathematics-2020.pdf' },
                { year: 2019, link: 'wb-board-class-12-mathematics-2019.pdf' },
                { year: 2018, link: 'wb-board-class-12-mathematics-2018.pdf' },
            ]
        },
        'cbse': {
            '8': [
                { year: 2023, link: 'pyqs/cbse_class8_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class8_2022.pdf' }
            ],
            '9': [
                { year: 2023, link: 'pyqs/cbse_class9_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class9_2022.pdf' }
            ],
            '10': [
                { year: 2023, link: 'pyqs/cbse_class10_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class10_2022.pdf' }
            ],
            '11': [
                { year: 2023, link: 'pyqs/cbse_class11_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class11_2022.pdf' }
            ],
            '12': [
                { year: 2023, link: 'pyqs/cbse_class12_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class12_2022.pdf' }
            ]
        },
        'wbjee': {
            '': [
                { year: 2023, link: 'pyqs/wbjee_2023.pdf' },
                { year: 2022, link: 'pyqs/wbjee_2022.pdf' }
            ]
        },
        'jee-main': {
            '': [
                { year: 2023, link: 'pyqs/jee_main_2023.pdf' },
                { year: 2022, link: 'pyqs/jee_main_2022.pdf' }
            ]
        },
        'jee-advanced': {
            '': [
                { year: 2023, link: 'pyqs/jee_advanced_2023.pdf' },
                { year: 2022, link: 'pyqs/jee_advanced_2022.pdf' }
            ]
        }
    };

    function populateClassSelect(board) { //
        classSelect.innerHTML = '<option value="">Select Class</option>'; //
        if (pyqData[board]) { //
            if (board === 'wbjee' || board === 'jee-main' || board === 'jee-advanced') { //
                classSelect.disabled = true; //
                classSelect.innerHTML = '<option value="">N/A</option>'; //
                classSelect.value = ''; //
            } else {
                classSelect.disabled = false; //
                Object.keys(pyqData[board]).forEach(className => { //
                    const option = document.createElement('option'); //
                    option.value = className; //
                    option.textContent = `Class ${className}`; //
                    classSelect.appendChild(option); //
                });
            }
        } else { //
            classSelect.disabled = true; //
            classSelect.innerHTML = '<option value="">Select Class</option>'; //
        }
    }

    // Initialize class select state on load
    populateClassSelect(boardSelect.value); //

    boardSelect.addEventListener('change', (event) => {
        const selectedBoard = event.target.value;
        populateClassSelect(selectedBoard);
        pyqResults.innerHTML = '<p>Select a board and class to see previous year questions.</p>'; // Reset results
    });

    filterPyqBtn.addEventListener('click', () => {
        const selectedBoard = boardSelect.value;
        const selectedClass = classSelect.value;
        displayPyqResults(selectedBoard, selectedClass);
    });

    function displayPyqResults(board, className) {
        pyqResults.innerHTML = ''; // Clear previous results
        let resultsFound = false;

        if (pyqData[board]) {
            if (board === 'wbjee' || board === 'jee-main' || board === 'jee-advanced') {
                // For exams without specific classes, just display all available
                const pyqs = pyqData[board][''];
                if (pyqs && pyqs.length > 0) {
                    const ul = document.createElement('ul');
                    pyqs.forEach(pyq => {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${board.toUpperCase()} ${pyq.year}</span> <a href="${pyq.link}" target="_blank" download>Download PDF <i class="fas fa-download"></i></a>`;
                        ul.appendChild(li);
                    });
                    pyqResults.appendChild(ul);
                    resultsFound = true;
                }
            } else if (pyqData[board][className]) {
                const pyqs = pyqData[board][className];
                if (pyqs.length > 0) {
                    const ul = document.createElement('ul');
                    pyqs.forEach(pyq => {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>Class ${className} - ${pyq.year}</span> <a href="${pyq.link}" target="_blank" download>Download PDF <i class="fas fa-download"></i></a>`;
                        ul.appendChild(li);
                    });
                    pyqResults.appendChild(ul);
                    resultsFound = true;
                }
            }
        }

        if (!resultsFound) {
            pyqResults.innerHTML = '<p>No previous year questions found for your selection.</p>';
        }
    }

    // --- Testimonial Carousel ---
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;
    const cardsPerPage = 1; // Show one card at a time on mobile

    function updateCarousel() {
        if (testimonialCards.length === 0) return;

        const cardWidth = testimonialCards[0].offsetWidth + 20; // Card width + gap
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Hide/show navigation buttons based on current index
        // prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        // nextBtn.style.display = currentIndex >= testimonialCards.length - cardsPerPage ? 'none' : 'block';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < testimonialCards.length - cardsPerPage) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initial update and update on resize
    updateCarousel();
    window.addEventListener('resize', updateCarousel);


    // --- Section Animations on scroll ---
    const sectionsToObserve = document.querySelectorAll('section:not(#hero)'); // All sections except hero
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1 // When 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's the achievements section, start the counters
                if (entry.target.id === 'achievements') {
                    startCounters();
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sectionsToObserve.forEach(section => {
        section.classList.add('hidden'); // Add a hidden class initially in CSS
        observer.observe(section);
    });

    // --- Counter Animation for Achievements Section ---
    function startCounters() {
        const counterElements = document.querySelectorAll('.stat-number');

        counterElements.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const isFloat = counter.getAttribute('data-target').includes('.');
            let start = 0;
            let increment = target / (duration / 10); // Calculate increment based on duration and update interval

            const updateCounter = () => {
                if (isFloat) {
                    // For floating point numbers, increment and then fix to 1 decimal place
                    start += increment;
                    if (start < target) {
                        counter.textContent = start.toFixed(1);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toFixed(1);
                    }
                } else {
                    // For integers
                    start += increment;
                    if (start < target) {
                        counter.textContent = Math.ceil(start);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
            };
            requestAnimationFrame(updateCounter);
        });
    }


    // Optional: Add pulse animation to CTA button on hero
    const heroCtaButton = document.querySelector('.hero-section .cta-button');
    if (heroCtaButton) {
        heroCtaButton.classList.add('pulse');
    }
});

// --- Admission Pop-up Logic ---
    const admissionPopupOverlay = document.getElementById('admission-popup-overlay');
    const closePopupBtn = document.querySelector('#admission-popup-content .close-popup-btn');
    const popupCta = document.querySelector('#admission-popup-content .popup-cta');

    // Function to show the pop-up
    function showAdmissionPopup() {
        admissionPopupOverlay.classList.add('active');
    }

    // Function to hide the pop-up
    function hideAdmissionPopup() {
        admissionPopupOverlay.classList.remove('active');
    }

    // Show pop-up when the page loads (after 1 second delay for better user experience)
    // You can adjust or remove this delay
    setTimeout(showAdmissionPopup, 1000); 

    // Close pop-up when the close button is clicked
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hideAdmissionPopup);
    }

    // Close pop-up when clicking outside the content
    if (admissionPopupOverlay) {
        admissionPopupOverlay.addEventListener('click', (e) => {
            if (e.target === admissionPopupOverlay) {
                hideAdmissionPopup();
            }
        });
    }

    // Optional: Close pop-up when CTA button inside pop-up is clicked
    if (popupCta) {
        popupCta.addEventListener('click', hideAdmissionPopup);
    }

    const carousel = document.querySelector('.testimonial-carousel');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotContainer = document.getElementById('testimonial-dots');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

let currentIndex = 0;

function updateCarousel() {
  testimonialCards.forEach((card, index) => {
    card.classList.toggle('active', index === currentIndex);
  });

  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function createDots() {
  dotContainer.innerHTML = '';
  testimonialCards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    dotContainer.appendChild(dot);
  });
}

prevBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
  updateCarousel();
});

nextBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonialCards.length;
  updateCarousel();
});

createDots();
updateCarousel();

// Auto-rotate every 6 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonialCards.length;
  updateCarousel();
}, 6000);


// To ensure the loading overlay is visible immediately before DOMContentLoaded fires,
// add a class to the body on load and remove it when the DOM is ready.
// This small script needs to be placed at the very top of your <head> or before </body>
// to ensure it runs as early as possible.
document.documentElement.classList.add('loading'); // Add to html to prevent FOUC for body styles
window.addEventListener('load', () => {
    document.documentElement.classList.remove('loading');
});

if ('mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices) {
    // Listen for the Page Visibility API to detect screenshot attempts (not reliable, but a hint)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            document.body.classList.add('blur-on-screenshot');
        } else {
            document.body.classList.remove('blur-on-screenshot');
        }
    });
}

// CSS to blur the page (add this to your CSS file)
/*
.blur-on-screenshot *:not(.admission-popup-overlay):not(.admission-popup-overlay *) {
    filter: blur(10px) !important;
    pointer-events: none !important;
    user-select: none !important;
}
*/

// Note: There is no reliable, cross-browser way to detect screenshots via JavaScript.
// This is a best-effort approach using the Page Visibility API, but users can still take screenshots.
