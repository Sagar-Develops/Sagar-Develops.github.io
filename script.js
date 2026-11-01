document.addEventListener("DOMContentLoaded", () => {

    // NAVBAR SCROLL EFFECT

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // SMOOTH SCROLLING

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e) {

            const href = this.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion.matches
                        ? "auto"
                        : "smooth",
                    block: "start"
                });

            }

        });

    });


    // ACTIVE NAVIGATION

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".navbar nav a"
    );

    function updateActiveLink() {

        let current = "home";

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 180) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === "#" + current
            );

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();


    // SCROLL REVEAL ANIMATION

    const revealElements = document.querySelectorAll(
        ".skill-card, .project-card, .education-item, .contact-card"
    );

    if ("IntersectionObserver" in window &&
        !reduceMotion.matches) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal-item");
            observer.observe(element);
        });

    }

});