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
