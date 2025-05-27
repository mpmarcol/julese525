let slideIndex = 1;
const slides = document.getElementsByClassName("slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Function to display a specific slide
function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1; // Loop back to the first slide
    }
    if (n < 1) {
        slideIndex = slides.length; // Loop to the last slide
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active-slide");
    }

    // Display the current slide
    if (slides.length > 0) { // Check if slides exist
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("active-slide");
    }
}

// Function to change slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Event listeners for prev/next buttons
if (prevButton && nextButton) { // Check if buttons exist
    prevButton.addEventListener("click", function() {
        plusSlides(-1);
    });

    nextButton.addEventListener("click", function() {
        plusSlides(1);
    });
}

// Initially display the first slide
showSlides(slideIndex);

// Comment Submission Functionality
const commentTextarea = document.getElementById("comment-text");
const submitCommentButton = document.getElementById("submit-comment-button");

if (commentTextarea && submitCommentButton) {
    submitCommentButton.addEventListener("click", function() {
        const commentValue = commentTextarea.value.trim();

        if (commentValue) {
            alert("Comment submitted: " + commentValue);
            commentTextarea.value = ""; // Clear the textarea
        } else {
            alert("Cannot submit an empty comment.");
        }
    });
}
