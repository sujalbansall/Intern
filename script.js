// Sample data for destinations
const destinations = {
    visakhapatnam: {
        name: "Visakhapatnam, India",
        attractions: [
            {
                name: "Borra Caves",
                description: "A stunning network of caves formed by the Gosthani River.",
                image: "borra_caves.jpg",
                reviewsId: "borra-reviews"
            },
            {
                name: "Kailasagiri Hill",
                description: "Offers panoramic views of the city and the sea.",
                image: "kailashgiri.jpg",
                reviewsId: "kailasagiri-reviews"
            },
            {
                name: "Submarine Museum",
                description: "A unique museum showcasing a real submarine.",
                image: "submarine.jpg",
                reviewsId: "submarine-reviews"
            },
            {
                name: "Rose Hill Church",
                description: "A church with a beautiful view of the city and sea.",
                image: "rose_hill_church.jpg",
                reviewsId: "rose-reviews"
            },
            {
                name: "Indra Gandhi Zoological Park",
                description: "A must-visit for wildlife lovers.",
                image: "zoo.jpg",
                reviewsId: "zoo-reviews"
            }
        ]
    },
    bali: {
        name: "Bali, Indonesia",
        attractions: [
            {
                name: "Uluwatu Temple",
                description: "A clifftop temple with stunning ocean views.",
                image: "bali.png",
                reviewsId: "bali-reviews"
            }
        ]
    },
    tokyo: {
        name: "Tokyo, Japan",
        attractions: [
            {
                name: "Shibuya Crossing",
                description: "Famous for its busy pedestrian crossing and neon lights.",
                image: "tokyo.png",
                reviewsId: "tokyo-reviews"
            }
        ]
    },
    paris: {
        name: "Paris, France",
        attractions: [
            {
                name: "Eiffel Tower",
                description: "The iconic symbol of Paris and one of the most famous landmarks in the world.",
                image: "effiel_tower.png",
                reviewsId: "paris-reviews"
            }
        ]
    }
};

// Function to display the details for selected destinations and manage comments and reviews
function showDetails(location) {
    const destination = destinations[location];
    let content = `
        <div class="destination-details">
            <h3>${destination.name}</h3>
            <div class="star-rating" id="${location}-stars">
                ${generateStarRating(location)}
            </div>
            <div class="reviews" id="${location}-reviews"></div>
            <h4>Leave a Comment:</h4>
            <textarea rows="3" class="form-control" placeholder="Your comment here..." id="${location}-comment"></textarea>
            <button class="btn btn-success mt-2" id="submit-${location}-comment">Submit</button>
    `;

    destination.attractions.forEach(attraction => {
        content += `
            <div class="sub-attraction">
                <div class="description">
                    <strong>${attraction.name}:</strong> ${attraction.description}
                    <div class="reviews" id="${attraction.reviewsId}"></div>
                    <h5>Leave a Comment:</h5>
                    <textarea rows="2" class="form-control" placeholder="Your comment here..." id="${attraction.reviewsId}-comment"></textarea>
                    <button class="btn btn-success mt-2" id="submit-${attraction.reviewsId}-comment">Submit</button>
                </div>
                <img src="${attraction.image}" alt="${attraction.name}" class="img-fluid">
            </div>
        `;
    });

    content += `</div>`;
    document.getElementById('destination-container').innerHTML = content;

    // Add event listeners for destination comment submission
    document.getElementById(`submit-${location}-comment`).addEventListener('click', () => {
        submitComment(location);
    });

    // Add event listeners for each attraction's comment submission
    destination.attractions.forEach(attraction => {
        document.getElementById(`submit-${attraction.reviewsId}-comment`).addEventListener('click', () => {
            submitSubComment(attraction.reviewsId);
        });
    });
}

// Generate star rating HTML
function generateStarRating(location) {
    return Array.from({ length: 5 }, (_, index) => `
        <span class="star" data-value="${index + 1}" onclick="setRating(event, '${location}')">★</span>
    `).join('');
}

// Global variable to store current rating
let currentRating = 0;

// Function to set the star rating for the destination
function setRating(event, location) {
    const starValue = parseInt(event.target.getAttribute('data-value'));
    currentRating = starValue;

    // Highlight the selected stars
    const stars = document.querySelectorAll(`#${location}-stars .star`);
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', value <= currentRating);
    });
}

// Function to reset star ratings after submission
function resetStars(location) {
    const stars = document.querySelectorAll(`#${location}-stars .star`);
    stars.forEach(star => {
        star.classList.remove('selected');
    });
}

// Function to handle comment submission for each destination
function submitComment(location) {
    const commentTextarea = document.getElementById(`${location}-comment`);
    const comment = commentTextarea.value.trim();

    if (comment) {
        appendCommentToReviews(location, comment, currentRating);
        clearCommentInput(commentTextarea);
        resetStars(location);
    } else {
        alert('Please enter a comment before submitting.');
    }
}

// Function to append a comment to the review section
function appendCommentToReviews(location, comment, rating) {
    const reviewsDiv = document.getElementById(`${location}-reviews`);
    const newComment = document.createElement('div');
    newComment.classList.add('review');
    newComment.innerHTML = `<p>${comment} <strong>Rating: ${rating}</strong></p>`;
    reviewsDiv.appendChild(newComment);
}

// Function to handle comment submission for each sub-attraction
function submitSubComment(attractionId) {
    const commentTextarea = document.getElementById(`${attractionId}-comment`);
    const comment = commentTextarea.value.trim();

    if (comment) {
        const reviewsDiv = document.getElementById(attractionId);
        const newComment = document.createElement('div');
        newComment.classList.add('review');
        newComment.innerHTML = `<p>${comment}</p>`;
        
        // Append comment to the correct review section
        reviewsDiv.appendChild(newComment);
        clearCommentInput(commentTextarea);
    } else {
        alert('Please enter a comment before submitting.');
    }
}

// Function to clear comment input
function clearCommentInput(textarea) {
    textarea.value = '';
}

// Initial call to load destination details
showDetails('visakhapatnam');
