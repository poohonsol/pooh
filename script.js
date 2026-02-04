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
        "image (8).jpg",
        "image (9).jpg",
        "image (10).jpg",
        "image (13).jpg",
        "image (14).jpg",
        "image (15).jpg",
        "image (16).jpg",
        "image (17).jpg",
        "image (18).jpg",
        "image (19).jpg",
        "image (20).jpg",
        "image (21).jpg",
        "image (22).jpg",
        "image (23).jpg",
        "image (24).jpg",
        "image (26).jpg",
        "image (27).jpg",
        "image (28).jpg",
        "image (29).jpg",
        "image (30).jpg",
        "image (31).jpg",
        "image (32).jpg",
        "image (33).jpg",
        "image (34).jpg",
        "image (35).jpg",
        "photo_1_2026-02-02_16-22-31.jpg",
        "photo_2_2026-02-02_16-22-31.jpg",
        "photo_3_2026-02-02_16-22-31.jpg",
        "photo_2026-02-04_16-37-38.jpg"
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

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Store all gallery images for navigation
    let galleryImages = [];
    let currentImageIndex = 0;

    // Add click event to all gallery images
    gallery.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            // Get all unique images in gallery (first imageList.length only, not duplicates)
            galleryImages = Array.from(gallery.querySelectorAll('img')).slice(0, imageList.length);
            
            // Find current image index
            currentImageIndex = galleryImages.findIndex(img => img.src === e.target.src);
            if (currentImageIndex === -1) {
                currentImageIndex = 0;
            }
            
            // Show lightbox
            showLightboxImage(currentImageIndex);
        }
    });

    // Function to show image at specific index
    function showLightboxImage(index) {
        if (galleryImages.length > 0) {
            lightbox.style.display = 'block';
            lightboxImg.src = galleryImages[index].src;
            lightboxCaption.textContent = galleryImages[index].alt;
            currentImageIndex = index;
        }
    }

    // Navigate to next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (galleryImages.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                showLightboxImage(currentImageIndex);
            }
        });
    }

    // Navigate to previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (galleryImages.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                showLightboxImage(currentImageIndex);
            }
        });
    }

    // Close lightbox on click of close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Close lightbox on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Close lightbox on ESC key and navigate with arrow keys
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                showLightboxImage(currentImageIndex);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                showLightboxImage(currentImageIndex);
            }
        }
    });

    // Copy CA functionality
    const copyCABtn = document.getElementById('copyCA');
    if (copyCABtn) {
        copyCABtn.addEventListener('click', () => {
            const ca = copyCABtn.getAttribute('data-ca');
            navigator.clipboard.writeText(ca).then(() => {
                const caText = copyCABtn.querySelector('.ca-text');
                const originalText = caText.textContent;
                caText.textContent = 'COPIED!';
                copyCABtn.classList.add('copied');
                
                setTimeout(() => {
                    caText.textContent = originalText;
                    copyCABtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // Meme Generator functionality
    const christopherInput = document.getElementById('christopherText');
    const poohInput = document.getElementById('poohText');
    const bubbleChristopher = document.getElementById('bubbleChristopher');
    const bubblePooh = document.getElementById('bubblePooh');
    const downloadBtn = document.getElementById('downloadMeme');
    const memePreview = document.getElementById('memePreview');

    // Funkcja do automatycznego dopasowania rozmiaru czcionki
    function adjustFontSize(bubble, text) {
        const bubbleText = bubble.querySelector('.bubble-text');
        bubbleText.textContent = text;
        
        // Bazowy rozmiar czcionki (w rem)
        const baseSize = 0.65;
        const minSize = 0.35;
        
        // Zmniejszaj czcionkę w zależności od długości tekstu
        let fontSize = baseSize;
        if (text.length > 15) {
            fontSize = Math.max(minSize, baseSize - (text.length - 15) * 0.015);
        }
        
        bubbleText.style.fontSize = fontSize + 'rem';
    }

    if (christopherInput && bubbleChristopher) {
        christopherInput.addEventListener('input', (e) => {
            const text = e.target.value || 'Hey Pooh!';
            adjustFontSize(bubbleChristopher, text);
        });
    }

    if (poohInput && bubblePooh) {
        poohInput.addEventListener('input', (e) => {
            const text = e.target.value || 'Yes Chris?';
            adjustFontSize(bubblePooh, text);
        });
    }

    if (downloadBtn && memePreview) {
        downloadBtn.addEventListener('click', async () => {
            try {
                // Use html2canvas to capture the meme
                if (typeof html2canvas !== 'undefined') {
                    const canvas = await html2canvas(memePreview, {
                        backgroundColor: '#1a1a1a',
                        scale: 2
                    });
                    
                    const link = document.createElement('a');
                    link.download = 'pooh-meme.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                } else {
                    alert('Download feature loading... Please try again in a moment.');
                }
            } catch (err) {
                console.error('Failed to generate meme:', err);
                alert('Failed to generate meme. Please try again.');
            }
        });
    }

});
