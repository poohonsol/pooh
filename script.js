document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observe-fade').forEach(el => {
        observer.observe(el);
    });

    // Gallery Image Loader - Auto-scrolling Carousel
    const artsSection = document.getElementById('arts');
    
    // List of images found in the 'art' directory
    const imageList = [
        "photo_1_2026-02-02_16-22-31.jpg",
        "photo_2_2026-02-02_16-22-31.jpg",
        "photo_3_2026-02-02_16-22-31.jpg",
        "photo_4_2026-02-02_16-22-31.jpg",
        "photo_5_2026-02-02_16-22-31.jpg",
        "photo_6_2026-02-02_16-22-31.jpg",
        "photo_7_2026-02-02_16-22-31.jpg",
        "photo_8_2026-02-02_16-22-31.jpg",
        "photo_9_2026-02-02_16-22-31.jpg",
        "photo_10_2026-02-02_16-22-31.jpg",
        "photo_11_2026-02-02_16-22-31.jpg",
        "photo_12_2026-02-02_16-22-31.jpg",
        "photo_13_2026-02-02_16-22-31.jpg",
        "photo_14_2026-02-02_16-22-31.jpg",
        "photo_15_2026-02-02_16-22-31.jpg",
        "photo_16_2026-02-02_16-22-31.jpg",
        "photo_17_2026-02-02_16-22-31.jpg",
        "photo_18_2026-02-02_16-22-31.jpg",
        "photo_19_2026-02-02_16-22-31.jpg",
        "photo_20_2026-02-02_16-22-31.jpg",
        "photo_21_2026-02-02_16-22-31.jpg",
        "photo_22_2026-02-02_16-22-31.jpg",
        "photo_23_2026-02-02_16-22-31.jpg",
        "photo_24_2026-02-02_16-22-31.jpg",
        "photo_25_2026-02-02_16-22-31.jpg",
        "photo_26_2026-02-02_16-22-31.jpg",
        "photo_27_2026-02-02_16-22-31.jpg",
        "photo_28_2026-02-02_16-22-31.jpg",
        "photo_29_2026-02-02_16-22-31.jpg",
        "photo_30_2026-02-02_16-22-31.jpg",
        "photo_31_2026-02-02_16-22-31.jpg"
    ];

    // Create carousel
    const gallery = document.createElement('div');
    gallery.className = 'gallery-grid';
    
    // Add images twice for seamless looping
    [...imageList, ...imageList].forEach(filename => {
        const item = document.createElement('div');
        item.className = 'gallery-item observe-fade';
        
        const img = document.createElement('img');
        img.src = `art/${filename}`;
        img.alt = 'Winnie Art';
        img.loading = 'lazy';
        
        item.appendChild(img);
        gallery.appendChild(item);
        
        // Observe newly created items
        observer.observe(item);
    });
    
    artsSection.appendChild(gallery);

});
