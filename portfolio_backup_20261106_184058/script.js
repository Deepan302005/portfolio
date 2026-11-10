"use strict";

// ============================================================
// Deepan Kumar Portfolio - Interactive Features & State
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // DOM Elements
    // ========================================================
    const preloader = document.querySelector(".preloader");
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const contactForm = document.getElementById("contactForm");
    const progressFills = document.querySelectorAll(".progress-fill");

    // Photo Elements
    const heroProfilePhoto = document.getElementById("heroProfilePhoto");
    const aboutProfilePhoto = document.getElementById("aboutProfilePhoto");

    // Toast Element
    const portfolioToast = document.getElementById("portfolioToast");
    const toastIcon = document.getElementById("toastIcon");
    const toastTitle = document.getElementById("toastTitle");
    const toastBody = document.getElementById("toastBody");

    // Project Cards & Modal
    const projectCards = document.querySelectorAll(".project-card");
    const projectModalOverlay = document.getElementById("projectModalOverlay");
    const closeProjectModalBtn = document.getElementById("closeProjectModalBtn");
    const closeProjectModalBtn2 = document.getElementById("closeProjectModalBtn2");
    const modalProjectImg = document.getElementById("modalProjectImg");
    const modalProjectType = document.getElementById("modalProjectType");
    const modalProjectTitle = document.getElementById("modalProjectTitle");
    const modalProjectDesc = document.getElementById("modalProjectDesc");
    const modalProjectHighlights = document.getElementById("modalProjectHighlights");
    const modalProjectTags = document.getElementById("modalProjectTags");
    const modalDirectLaunchLink = document.getElementById("modalDirectLaunchLink");

    // Resume Modal Elements
    const openResumeBtn = document.getElementById("openResumeBtn");
    const resumeModalOverlay = document.getElementById("resumeModalOverlay");
    const closeResumeModalBtn = document.getElementById("closeResumeModalBtn");
    const closeResumeModalBtn2 = document.getElementById("closeResumeModalBtn2");

    const revealElements = document.querySelectorAll(
        ".section-title, " +
        ".about-content, " +
        ".timeline-card, " +
        ".skill-category, " +
        ".project-card, " +
        ".honor-item-card, " +
        ".contact-content"
    );

    // ========================================================
    // Toast Notification System
    // ========================================================
    let toastTimeout = null;
    const showToast = (icon, title, message) => {
        if (!portfolioToast) return;
        if (toastTimeout) clearTimeout(toastTimeout);

        toastIcon.textContent = icon;
        toastTitle.textContent = title;
        toastBody.textContent = message;

        portfolioToast.classList.add("show");
        toastTimeout = setTimeout(() => {
            portfolioToast.classList.remove("show");
        }, 3600);
    };

    // ========================================================
    // Preloader
    // ========================================================
    const initializePreloader = () => {
        if (!preloader) return;
        const hidePreloader = () => {
            preloader.classList.add("loading");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 600);
        };

        if (document.readyState === "complete") {
            hidePreloader();
        } else {
            window.addEventListener("load", hidePreloader, { once: true });
        }
    };
    initializePreloader();

    // ========================================================
    // Navbar Scroll Effect
    // ========================================================
    const initializeNavbar = () => {
        if (!navbar) return;
        const updateNavbar = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        };
        window.addEventListener("scroll", updateNavbar, { passive: true });
        updateNavbar();
    };
    initializeNavbar();

    // ========================================================
    // Mobile Navigation Menu
    // ========================================================
    const initializeMobileMenu = () => {
        if (!hamburger || !navLinks) return;

        const closeMenu = () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        };

        const toggleMenu = () => {
            const isOpen = navLinks.classList.toggle("active");
            hamburger.classList.toggle("active", isOpen);
            hamburger.setAttribute("aria-expanded", String(isOpen));
        };

        hamburger.addEventListener("click", toggleMenu);

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });
    };
    initializeMobileMenu();

    // ========================================================
    // Smooth Anchor Scrolling
    // ========================================================
    const initializeSmoothScrolling = () => {
        const navigationLinks = document.querySelectorAll('a[href^="#"]');
        navigationLinks.forEach(link => {
            link.addEventListener("click", event => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    };
    initializeSmoothScrolling();

    // ========================================================
    // Profile Photos Initialization
    // ========================================================
    const initializeProfilePhotos = () => {
        const DEFAULT_PHOTO = "assets/images/profile.jpg";
        if (heroProfilePhoto) heroProfilePhoto.src = DEFAULT_PHOTO;
        if (aboutProfilePhoto) aboutProfilePhoto.src = DEFAULT_PHOTO;
    };
    initializeProfilePhotos();

    // ========================================================
    // Project Navigation & Modal Data
    // ========================================================
    const projectDetailsData = {
        healthspan: {
            title: "HealthSpan - A Personalized Dietary Nutrition System for Elderly Health Management",
            type: "AI Healthcare & Cross-Platform System",
            image: "assets/images/project-healthspan.jpg",
            url: "projects/healthspan.html",
            description: "A comprehensive dietary nutrition system designed specifically for elderly health management. It combines personalized nutrition planning with AI-powered recommendations using Llama 3 and FAISS vector similarity search to help elderly individuals maintain optimal health through proper nutrition, condition-specific meal plans, and medication-nutrient safety checks.",
            highlights: [
                "AI-powered dietary recommendations using Llama 3 with clinical guidelines",
                "FAISS vector similarity search across USDA FoodData Central and NHANES datasets",
                "Automated medication-nutrient interaction and contraindication checking",
                "Cross-platform architecture: Flutter mobile app, React + Vite web, and FastAPI backend",
                "Caregiver monitoring portal, grocery list generation, and offline functionality"
            ],
            tags: ["Flutter", "React + Vite", "FastAPI", "Llama 3", "FAISS", "PostgreSQL", "Firebase Auth", "USDA & NHANES"]
        },
        alpr: {
            title: "Automatic License Plate Recognition (ALPR)",
            type: "Computer Vision & OCR Application",
            image: "assets/images/project-alpr.jpg",
            url: "projects/alpr.html",
            description: "A real-time ALPR computer vision system developed to detect vehicle number plates in live video streams, isolate plate regions using bilateral filtering and edge contours, and extract alphanumeric registration text using deep learning EasyOCR. Engineered during software engineering internship at Tunga Aerospace Pvt Ltd.",
            highlights: [
                "Bilateral filtering, Canny edge detection & morphological contour localization",
                "Deep learning optical character recognition powered by EasyOCR",
                "Sub-30ms low-latency inference for real-time video surveillance streams",
                "Engineered & validated during software engineering internship at Tunga Aerospace"
            ],
            tags: ["Python", "OpenCV", "EasyOCR", "Computer Vision", "Video Processing", "Tunga Aerospace"]
        },
        nearnow: {
            title: "NearNow – AI Hyper-Local Discovery Platform",
            type: "Full-Stack Web & AI Application",
            image: "assets/images/project-nearnow.jpg",
            url: "projects/nearnow.html",
            description: "A full-stack web application for discovering nearby events, restaurants, hotels, and cultural heritage places using AI-powered personalized recommendations, interactive dynamic maps, and real-time geolocation.",
            highlights: [
                "Interactive dynamic map canvas with spatial geolocation pins",
                "AI-driven match scoring based on user activity & proximity distance",
                "Instant search autocomplete & multi-category venue filtering",
                "Full-stack architecture with REST APIs and mobile-first design"
            ],
            tags: ["Full Stack", "AI Recommendations", "Interactive Maps", "Geolocation API", "REST APIs"]
        },
        "student-rag": {
            title: "Student Assistant System (RAG Academic AI)",
            type: "Generative AI & LLM Architecture",
            image: "assets/images/project-rag.jpg",
            url: "projects/student-rag.html",
            description: "An AI-powered academic assistant that enables students to upload PDFs, ask context-aware questions, generate revision quizzes and flashcards, and receive accurate citation-grounded responses using a RAG pipeline with LLMs.",
            highlights: [
                "Semantic document chunking & vector embedding similarity search",
                "Context-grounded QA eliminating hallucinations with exact page citations",
                "Automated multiple-choice quiz generator with instant explanations",
                "Interactive revision flashcard deck for engineering syllabus review"
            ],
            tags: ["RAG Pipeline", "LLMs", "Python", "Vector Embeddings", "PDF Ingestion", "Generative AI"]
        },
        portfolio: {
            title: "Modern Developer Portfolio Platform",
            type: "Frontend Architecture & UI/UX",
            image: "assets/images/project-portfolio.jpg",
            url: "projects/portfolio-showcase.html",
            description: "A high-performance personal web platform designed to present software engineering projects, academic credentials (B.Tech IT CGPA 7.87), internship experience at Tunga Aerospace, competition honors, and certified competencies.",
            highlights: [
                "Modern dark cyan & violet glassmorphism with sleek squircle profile frame",
                "Interactive live application sandbox demos for ALPR, NearNow & RAG",
                "Zero external heavy libraries, pure semantic HTML5, modern CSS3 & ES6+",
                "Validated frontend engineering aligned with Infosys Springboard certification"
            ],
            tags: ["HTML5", "CSS3", "JavaScript ES6+", "Glassmorphism", "Responsive UI", "UI/UX"]
        }
    };

    const initializeProjectInteractions = () => {
        // Project card click navigation
        projectCards.forEach(card => {
            card.addEventListener("click", event => {
                // If user specifically clicked the "Quick Details" button, open modal instead
                if (event.target.closest(".project-btn-preview")) {
                    event.preventDefault();
                    event.stopPropagation();
                    const projectId = event.target.closest(".project-btn-preview").dataset.preview;
                    openProjectModal(projectId);
                    return;
                }

                // If user clicked a direct anchor tag inside, let it navigate naturally
                if (event.target.closest(".project-link-primary")) {
                    return;
                }

                // Otherwise, navigating to project demo page
                const projectUrl = card.dataset.projectUrl;
                if (projectUrl) {
                    window.location.href = projectUrl;
                }
            });

            // Accessibility: Enter or Space on card navigates to project
            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    const projectUrl = card.dataset.projectUrl;
                    if (projectUrl) window.location.href = projectUrl;
                }
            });
        });

        // Quick Preview Modal triggers
        document.querySelectorAll(".project-btn-preview").forEach(btn => {
            btn.addEventListener("click", e => {
                e.stopPropagation();
                const projectId = btn.dataset.preview;
                openProjectModal(projectId);
            });
        });

        const openProjectModal = projectId => {
            const data = projectDetailsData[projectId];
            if (!data || !projectModalOverlay) return;

            modalProjectImg.src = data.image;
            modalProjectImg.alt = `${data.title} Preview`;
            modalProjectType.textContent = data.type;
            modalProjectTitle.textContent = data.title;
            modalProjectDesc.textContent = data.description;
            modalDirectLaunchLink.href = data.url;

            modalProjectHighlights.innerHTML = data.highlights
                .map(item => `<li>${item}</li>`)
                .join("");

            modalProjectTags.innerHTML = data.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join("");

            projectModalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        };

        const closeProjectModal = () => {
            if (!projectModalOverlay) return;
            projectModalOverlay.classList.remove("active");
            document.body.style.overflow = "";
        };

        if (closeProjectModalBtn) closeProjectModalBtn.addEventListener("click", closeProjectModal);
        if (closeProjectModalBtn2) closeProjectModalBtn2.addEventListener("click", closeProjectModal);

        if (projectModalOverlay) {
            projectModalOverlay.addEventListener("click", e => {
                if (e.target === projectModalOverlay) closeProjectModal();
            });
        }

        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && projectModalOverlay && projectModalOverlay.classList.contains("active")) {
                closeProjectModal();
            }
        });

        // ========================================================
        // Resume Modal Logic
        // ========================================================
        const openResumeModal = () => {
            if (!resumeModalOverlay) return;
            resumeModalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        };

        const closeResumeModal = () => {
            if (!resumeModalOverlay) return;
            resumeModalOverlay.classList.remove("active");
            document.body.style.overflow = "";
        };

        if (openResumeBtn) {
            openResumeBtn.addEventListener("click", openResumeModal);
        }
        if (closeResumeModalBtn) {
            closeResumeModalBtn.addEventListener("click", closeResumeModal);
        }
        if (closeResumeModalBtn2) {
            closeResumeModalBtn2.addEventListener("click", closeResumeModal);
        }
        if (resumeModalOverlay) {
            resumeModalOverlay.addEventListener("click", e => {
                if (e.target === resumeModalOverlay) closeResumeModal();
            });
        }
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && resumeModalOverlay && resumeModalOverlay.classList.contains("active")) {
                closeResumeModal();
            }
        });
    };
    initializeProjectInteractions();

    // ========================================================
    // Skill Progress Bar Animation
    // ========================================================
    const initializeSkillBars = () => {
        if (!progressFills.length) return;

        const setProgress = fill => {
            const width = fill.dataset.width || "0%";
            fill.style.width = width;
        };

        if ("IntersectionObserver" in window) {
            const skillObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    setProgress(entry.target);
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.3 });

            progressFills.forEach(fill => skillObserver.observe(fill));
        } else {
            progressFills.forEach(setProgress);
        }
    };
    initializeSkillBars();

    // ========================================================
    // Contact Form Submission
    // ========================================================
    const initializeContactForm = () => {
        if (!contactForm) return;
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        contactForm.addEventListener("submit", event => {
            event.preventDefault();
            if (submitButton.disabled) return;

            const originalText = submitButton.textContent;
            submitButton.textContent = "Message Sent ✓";
            submitButton.classList.add("success");
            submitButton.disabled = true;

            showToast("📬", "Message Sent!", "Thank you for reaching out. Deepan will get back to you soon.");

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.classList.remove("success");
                submitButton.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    };
    initializeContactForm();

    // ========================================================
    // Scroll Reveal Animation
    // ========================================================
    const initializeRevealAnimations = () => {
        if (!revealElements.length) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            revealElements.forEach(element => element.classList.add("reveal-visible"));
            return;
        }

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12 });

            revealElements.forEach(element => {
                element.classList.add("reveal");
                revealObserver.observe(element);
            });
        } else {
            revealElements.forEach(element => element.classList.add("reveal-visible"));
        }
    };
    initializeRevealAnimations();

});