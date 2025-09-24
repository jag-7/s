document.addEventListener('DOMContentLoaded', function() {
    // --- Accordion Logic ---
    const accordionItems = document.querySelectorAll('.portfolio-accordion-item');

    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.portfolio-item');
        
        header.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Deep-linking and Default Open Logic ---
    const urlHash = window.location.hash;

    if (urlHash) {
        const targetId = urlHash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement && targetElement.classList.contains('portfolio-accordion-item')) {
            // Open the targeted item
            targetElement.classList.add('active');
            // Scroll to the element after a short delay to ensure it's visible
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        } else {
            // If hash is invalid, open the first item by default
            if (accordionItems.length > 0) {
                accordionItems[0].classList.add('active');
            }
        }
    } else {
        // If no hash, open the first item by default
        if (accordionItems.length > 0) {
            accordionItems[0].classList.add('active');
        }
    }

    // --- Gallery Logic ---
    const galleries = document.querySelectorAll('.project-gallery');

    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery-image');
        const prevButton = gallery.querySelector('.gallery-prev');
        const nextButton = gallery.querySelector('.gallery-next');
        const accordionItem = gallery.closest('.portfolio-accordion-item');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            nextImage();
        });

        // Hide controls and disable slideshow if there's only one image
        if (images.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            // Start slideshow
            setInterval(() => {
                // Only advance the slideshow if the parent accordion item is open
                if (accordionItem.classList.contains('active')) {
                    nextImage();
                }
            }, 10000); // 10 seconds
        }
    });
});