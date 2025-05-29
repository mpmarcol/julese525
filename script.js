// --- Slideshow Functionality ---

// Function to display a specific slide for a given slideshow container
function showSlides(slideshowContainer, n) {
    const slides = slideshowContainer.getElementsByClassName("slide");
    let slideIndex = slideshowContainer.currentSlide;

    if (n > slides.length) {
        slideIndex = 1; // Loop back to the first slide
    }
    if (n < 1) {
        slideIndex = slides.length; // Loop to the last slide
    }
    slideshowContainer.currentSlide = slideIndex; // Update the container's current slide index

    // Hide all slides for this specific slideshow
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active-slide");
    }

    // Display the current slide for this specific slideshow
    if (slides.length > 0) { // Check if slides exist
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("active-slide");
    }
}

// Function to change slide for a given slideshow container
function plusSlides(slideshowContainer, n) {
    showSlides(slideshowContainer, slideshowContainer.currentSlide + n);
}

// Initialize all slideshows on the page
const slideshowContainers = document.getElementsByClassName("slideshow-container");

for (let i = 0; i < slideshowContainers.length; i++) {
    const container = slideshowContainers[i];
    container.currentSlide = 1; // Initialize slide index for this container

    const prevButton = container.querySelector(".prev");
    const nextButton = container.querySelector(".next");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", function() {
            plusSlides(container, -1);
        });

        nextButton.addEventListener("click", function() {
            plusSlides(container, 1);
        });
    }

    // Initially display the first slide for this container
    showSlides(container, container.currentSlide);
}

// --- Comment Submission Functionality ---
const submitCommentButtons = document.querySelectorAll(".submit-comment");

submitCommentButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // 'this' refers to the clicked button
        const commentsSection = this.closest(".comments-section");
        const commentTextarea = commentsSection.querySelector(".comment-input");

        if (commentTextarea) {
            const commentValue = commentTextarea.value.trim();
            if (commentValue) {
                // For demonstration, we'll include which post the comment is for, if possible
                // by finding the main post title or some identifier.
                // This is an enhancement and not strictly required by the current instructions.
                let postIdentifier = "";
                const blogPost = this.closest(".blog-post");
                if (blogPost) {
                    const titleElement = blogPost.querySelector("h2");
                    if (titleElement) {
                        postIdentifier = ` for "${titleElement.textContent}"`;
                    }
                }
                alert(`Comment submitted${postIdentifier}: ${commentValue}`);
                commentTextarea.value = ""; // Clear the textarea
            } else {
                alert("Cannot submit an empty comment.");
            }
        } else {
            // This case should ideally not happen if HTML is structured correctly
            console.error("Could not find comment textarea for this button.");
            alert("Error submitting comment: Text area not found.");
        }
    });
});

// --- Single Blog Post Navigation Functionality ---
const blogPosts = document.querySelectorAll('.blog-post');
const prevPostButton = document.getElementById('prev-post-button');
const nextPostButton = document.getElementById('next-post-button');

let currentPostIndex = 0;

function showPost(index) {
    // Hide all posts by removing 'active-post' class
    blogPosts.forEach(post => {
        post.classList.remove('active-post');
        // CSS already handles display:none for .blog-post and display:block for .active-post
    });

    // Show the selected post
    if (blogPosts[index]) {
        blogPosts[index].classList.add('active-post');
    }

    // Update button states
    if (prevPostButton) {
        prevPostButton.disabled = index === 0;
    }
    if (nextPostButton) {
        nextPostButton.disabled = index === blogPosts.length - 1;
    }
}

if (prevPostButton && nextPostButton && blogPosts.length > 0) {
    nextPostButton.addEventListener('click', function() {
        if (currentPostIndex < blogPosts.length - 1) {
            currentPostIndex++;
            showPost(currentPostIndex);
        }
    });

    prevPostButton.addEventListener('click', function() {
        if (currentPostIndex > 0) {
            currentPostIndex--;
            showPost(currentPostIndex);
        }
    });

    // Initial display
    showPost(currentPostIndex);
} else {
    // If there are no posts or buttons, perhaps hide the navigation area
    const blogNavigation = document.querySelector('.blog-navigation');
    if (blogNavigation) {
        // blogNavigation.style.display = 'none'; // Option: hide nav if no posts/buttons
        console.warn("Blog navigation buttons or posts not found. Navigation will not be initialized.");
    }
    // If there's only one post, disable both buttons.
    if (blogPosts.length === 1 && prevPostButton && nextPostButton) {
        prevPostButton.disabled = true;
        nextPostButton.disabled = true;
        // And make sure the single post is shown if not already by showPost(0)
        if (!blogPosts[0].classList.contains('active-post')) {
             showPost(0); // Call showPost to display the single post
        }
    } else if (blogPosts.length > 0 && (!prevPostButton || !nextPostButton)) {
        // If posts exist but buttons don't, ensure first post is shown
        showPost(0);
    }
}

// --- Sticky Header Functionality ---
window.addEventListener('DOMContentLoaded', (event) => {
    const header = document.getElementById("main-header");
    if (!header) {
        console.error("Sticky header functionality: Main header not found.");
        return;
    }

    const stickyOffset = header.offsetTop; // Get the original top offset of the header

    function handleStickyHeader() {
        const headerHeight = header.offsetHeight;

        if (window.pageYOffset > stickyOffset) {
            if (!header.classList.contains("sticky")) {
                header.classList.add("sticky");
                document.body.classList.add("header-sticky-padding");
                document.body.style.paddingTop = headerHeight + "px";
            }
        } else {
            if (header.classList.contains("sticky")) {
                header.classList.remove("sticky");
                document.body.classList.remove("header-sticky-padding");
                document.body.style.paddingTop = "0px";
            }
        }
    }

    // Debounce function to limit the rate of execution
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Initial check in case page is already scrolled
    handleStickyHeader(); 
    
    // Listen for scroll events (debounced for performance)
    window.addEventListener("scroll", debounce(handleStickyHeader, 10));

    // Optional: Recalculate on resize if header height might change
    // window.addEventListener("resize", debounce(function() {
    //    // Recalculate stickyOffset if header's position relative to document changes
    //    // For this simple case, we assume offsetTop doesn't change unless layout drastically changes.
    //    // However, recalculating body padding based on new header height is important.
    //    if (header.classList.contains("sticky")) {
    //        document.body.style.paddingTop = header.offsetHeight + "px";
    //    }
    // }, 50));
});

// --- Image Carousel Functionality (for index.html) ---
window.addEventListener('DOMContentLoaded', (event) => {
    // Check if carousel elements exist on the page
    const carouselSlides = document.getElementsByClassName("carousel-slide");
    if (carouselSlides.length === 0) {
        return; // No carousel on this page, so do nothing
    }

    let carouselSlideIndex = 1;
    const carouselDots = document.getElementsByClassName("carousel-dot");

    function showCarouselSlides(n) {
        let i;
        if (n > carouselSlides.length) { carouselSlideIndex = 1 }
        if (n < 1) { carouselSlideIndex = carouselSlides.length }
        
        for (i = 0; i < carouselSlides.length; i++) {
            carouselSlides[i].style.display = "none";
        }
        
        for (i = 0; i < carouselDots.length; i++) {
            carouselDots[i].className = carouselDots[i].className.replace(" active-dot", "");
        }
        
        carouselSlides[carouselSlideIndex - 1].style.display = "block";
        if (carouselDots[carouselSlideIndex - 1]) { // Check if dot exists
            carouselDots[carouselSlideIndex - 1].className += " active-dot";
        }
    }

    // Make plusCarouselSlides and currentCarouselSlide globally accessible if called by inline HTML onclick
    // Alternatively, attach event listeners programmatically. For now, sticking to onclick.
    window.plusCarouselSlides = function(n) {
        showCarouselSlides(carouselSlideIndex += n);
    }

    window.currentCarouselSlide = function(n) {
        showCarouselSlides(carouselSlideIndex = n);
    }

    // Initial display for the carousel
    showCarouselSlides(carouselSlideIndex);
});
