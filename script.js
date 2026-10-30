
"use strict";

// ========================================
// TRAVEL BUD - DESTINATIONS
// ========================================

const destinations = [
    {
        id: 1,
        name: "Manali",
        country: "Himachal Pradesh, India",
        category: "Mountains",
        tripType: "family",
        budget: 12000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        description: "Enjoy beautiful mountains, snow, and peaceful valleys."
    },
    {
        id: 2,
        name: "Goa",
        country: "India",
        category: "Beach",
        budget: 10000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        description: "Relax on sunny beaches and enjoy coastal adventures."
    },
    {
        id: 3,
        name: "Rishikesh",
        country: "Uttarakhand, India",
        category: "Adventure",
        budget: 8000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
        description: "Discover river rafting, yoga, and scenic river views."
    },
    {
        id: 4,
        name: "Jaipur",
        country: "Rajasthan, India",
        category: "Culture",
        budget: 9000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
        description: "Explore royal palaces, forts, and colourful markets."
    },
    {
        id: 5,
        name: "Munnar",
        country: "Kerala, India",
        category: "Nature",
        budget: 11000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        description: "Experience green tea gardens and misty hills."
    },
    {
        id: 6,
        name: "Bali",
        country: "Indonesia",
        category: "Beach",
        budget: 35000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        description: "Visit tropical beaches, temples, and beautiful landscapes."
    },
    {
        id: 7,
        name: "Varanasi",
        country: "Uttar Pradesh, India",
        category: "Culture",
        budget: 7000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        description: "Experience historic temples and the Ganges riverfront."
    },
    {
        id: 8,
        name: "Paris",
        country: "France",
        category: "City",
        budget: 85000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        description: "Discover iconic landmarks, museums, and city streets."
    },
    {
        id: 9,
        name: "Ooty",
        country: "Tamil Nadu, India",
        category: "Nature",
        budget: 8000,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=80",
        description: "Enjoy cool weather, gardens, and scenic hill views."
    }
];

// ========================================
// ELEMENTS
// ========================================

const destinationGrid = document.getElementById("destinationGrid");
const destinationSearch = document.getElementById("destinationSearch");
const budgetFilter = document.getElementById("budgetFilter");
const searchForm = document.getElementById("searchForm");
const sortFilter = document.getElementById("sortFilter");
const emptyState = document.getElementById("emptyState");

const budgetForm = document.getElementById("budgetForm");
const tripName = document.getElementById("tripName");
const travellersInput = document.getElementById("travellers");
const tripBudget = document.getElementById("tripBudget");

const transportCost = document.getElementById("transportCost");
const stayCost = document.getElementById("stayCost");
const foodCost = document.getElementById("foodCost");
const activityCost = document.getElementById("activityCost");

const totalCost = document.getElementById("totalCost");
const perPersonCost = document.getElementById("perPersonCost");
const budgetMessage = document.getElementById("budgetMessage");

const savedTripsList = document.getElementById("savedTripsList");
const toast = document.getElementById("toast");


const categoryButtons = document.querySelectorAll(".category-card");
let selectedCategory = "";
console.log("Category buttons found:", categoryButtons.length);



categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (selectedCategory === button.dataset.category) {
            selectedCategory = "";

            button.classList.remove("active");
        } else {
            selectedCategory = button.dataset.category;

            categoryButtons.forEach(function (categoryButton) {
                categoryButton.classList.remove("active");
            });

            button.classList.add("active");
        }

        renderDestinations();
    });
});

const clearFiltersBtn = document.getElementById("clearFiltersBtn");

clearFiltersBtn.addEventListener("click", function () {
    selectedCategory = "";
    if (destinationSearch) {
        destinationSearch.value = "";
    }
    if (budgetFilter) {
        budgetFilter.value = "all";
    }

    categoryButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    renderDestinations();
});



// ========================================
// APPLICATION STATE
// ========================================

let wishlist = [];

try {
    const storedWishlist = JSON.parse(
        localStorage.getItem("travelBudWishlist") || "[]"
    );

    if (Array.isArray(storedWishlist)) {
        wishlist = storedWishlist;
    }
} catch (error) {
    wishlist = [];
}

let savedTrips = [];

try {
    const storedTrips = JSON.parse(
        localStorage.getItem("travelBudTrips") || "[]"
    );

    if (Array.isArray(storedTrips)) {
        savedTrips = storedTrips;
    }
} catch (error) {
    savedTrips = [];
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);
}

function showToast(message) {
    if (!toast) {
        console.log(message);
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

function saveWishlist() {
    localStorage.setItem(
        "travelBudWishlist",
        JSON.stringify(wishlist)
    );
}

function saveTripsToStorage() {
    localStorage.setItem(
        "travelBudTrips",
        JSON.stringify(savedTrips)
    );
}

// ========================================
// DISPLAY DESTINATIONS
// ========================================

function renderDestinations() {
    if (!destinationGrid) {
        console.warn("Element #destinationGrid was not found.");
        return;
    }

    let filteredDestinations = [...destinations];
    const searchTerm = destinationSearch
        ? destinationSearch.value.trim().toLowerCase()
        : "";

    if (searchTerm) {
        filteredDestinations = filteredDestinations.filter(function (place) {
            return (
                place.name.toLowerCase().includes(searchTerm) ||
                place.country.toLowerCase().includes(searchTerm) ||
                place.category.toLowerCase().includes(searchTerm) ||
                place.description.toLowerCase().includes(searchTerm)
            );
        });
    }

    const maximumBudget = budgetFilter ? Number(budgetFilter.value) : 0;
    if (maximumBudget) {
        filteredDestinations = filteredDestinations.filter(function (place) {
            return place.budget <= maximumBudget;
        });
    }

    if (selectedCategory !== "") {
    const categoryMap = {
        nature: ["Nature", "Mountains"],
        beaches: ["Beach"],
        adventure: ["Adventure"],
        culture: ["Culture"],
        heritage: ["City", "Culture"],
        luxury: ["City"],
        family: ["family"],
        solo: ["Nature", "Mountains"]
    };

    filteredDestinations = filteredDestinations.filter(
    function (place) {
        if (selectedCategory === "family") {
            return place.tripType === "family";
        }

        return categoryMap[selectedCategory].includes(
            place.category
        );
    }
);
}

    const sortValue = sortFilter ? sortFilter.value : "popular";

    if (sortValue === "price-low") {
        filteredDestinations.sort((a, b) => a.budget - b.budget);
    } else if (sortValue === "price-high") {
        filteredDestinations.sort((a, b) => b.budget - a.budget);
    } else if (sortValue === "name") {
        filteredDestinations.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredDestinations.sort((a, b) => b.rating - a.rating);
    }

    destinationGrid.innerHTML = "";

    if (emptyState) {
        emptyState.hidden = filteredDestinations.length > 0;
    }

    if (filteredDestinations.length === 0) {
        return;
    }

    filteredDestinations.forEach(function (place) {
        const isSaved = wishlist.includes(place.id);

        const card = document.createElement("article");
        card.className = "destination-card";

        card.innerHTML = `
            <div class="destination-image">
                <img
                    src="${place.image}"
                    alt="${place.name}"
                    loading="lazy"
                >

                <button
                    class="wishlist-button ${isSaved ? "active" : ""}"
                    data-wishlist-id="${place.id}"
                    aria-label="Save ${place.name} to wishlist"
                    aria-pressed="${isSaved}"
                    type="button"
                >
                    ${isSaved ? "♥" : "♡"}
                </button>
            </div>

            <div class="destination-info">
                <p class="destination-category">
                    ${place.category}
                </p>

                <h3>${place.name}</h3>

                <p class="destination-country">
                    ${place.country}
                </p>

                <p class="destination-description">
                    ${place.description}
                </p>

                <div class="destination-details">
                    <span>★ ${place.rating}</span>
                    <span>From ${formatCurrency(place.budget)}</span>
                </div>

                <button
                    class="plan-trip-button"
                    data-plan-id="${place.id}"
                    type="button"
                >
                    Plan this trip
                </button>
            </div>
        `;

        destinationGrid.appendChild(card);
    });
}

// ========================================
// SEARCH DESTINATIONS
// ========================================

if (destinationSearch) {
    destinationSearch.addEventListener("input", function () {
        renderDestinations();
    });
}

if (budgetFilter) {
    budgetFilter.addEventListener("change", function () {
        renderDestinations();
    });
}

if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        renderDestinations();
        document.getElementById("destinations")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

// ========================================
// SORT DESTINATIONS
// ========================================

if (sortFilter) {
    sortFilter.addEventListener("change", function () {
        renderDestinations();
    });
}

// ========================================
// WISHLIST BUTTONS
// ========================================

if (destinationGrid) {
    destinationGrid.addEventListener("click", function (event) {
        const wishlistButton = event.target.closest("[data-wishlist-id]");
        const planButton = event.target.closest("[data-plan-id]");

        if (wishlistButton) {
            const destinationId = Number(
                wishlistButton.dataset.wishlistId
            );

            if (wishlist.includes(destinationId)) {
                wishlist = wishlist.filter(function (id) {
                    return id !== destinationId;
                });

                showToast("Removed from your wishlist.");
            } else {
                wishlist.push(destinationId);
                showToast("Added to your wishlist!");
            }

            saveWishlist();
            renderDestinations();
            return;
        }

        if (planButton) {
            const destinationId = Number(planButton.dataset.planId);

            const place = destinations.find(function (destination) {
                return destination.id === destinationId;
            });

            if (place) {
                if (tripName) {
                    tripName.value = place.name;
                }

                if (tripBudget) {
                    tripBudget.value = place.budget;
                }

                calculateBudget();

                const planner = document.getElementById("planner");

                if (planner) {
                    planner.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                showToast("Destination added to your trip planner.");
            }
        }
    });
}

// ========================================
// BUDGET CALCULATOR
// ========================================

function calculateBudget() {
    const transport = Number(transportCost?.value) || 0;
    const stay = Number(stayCost?.value) || 0;
    const food = Number(foodCost?.value) || 0;
    const activities = Number(activityCost?.value) || 0;

    const travellers = Math.max(
        1,
        Number(travellersInput?.value) || 1
    );

    const total = transport + stay + food + activities;
    const perPerson = total / travellers;

    if (totalCost) {
        totalCost.textContent = formatCurrency(total);
    }

    if (perPersonCost) {
        perPersonCost.textContent = formatCurrency(perPerson);
    }

    const budget = Number(tripBudget?.value) || 0;

    if (budgetMessage) {
        if (budget <= 0) {
            budgetMessage.textContent =
                "Enter your budget to compare your trip cost.";
        } else if (total > budget) {
            budgetMessage.textContent =
                "Your estimated expenses exceed your budget.";
        } else {
            budgetMessage.textContent =
                "Your estimated expenses are within your budget.";
        }
    }

    return {
        transport: transport,
        stay: stay,
        food: food,
        activities: activities,
        travellers: travellers,
        total: total,
        perPerson: perPerson,
        budget: budget
    };
}

[
    transportCost,
    stayCost,
    foodCost,
    activityCost,
    travellersInput,
    tripBudget
].forEach(function (element) {
    if (element) {
        element.addEventListener("input", calculateBudget);
    }
});

// ========================================
// SAVE TRIP
// ========================================

if (budgetForm) {
    budgetForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const destination = tripName
            ? tripName.value.trim()
            : "";

        if (!destination) {
            showToast("Please enter a trip name or destination.");
            if (tripName) {
                tripName.focus();
            }
            return;
        }

        const costs = calculateBudget();

        const trip = {
            id: Date.now(),
            name: destination,
            travellers: costs.travellers,
            budget: costs.budget,
            transport: costs.transport,
            stay: costs.stay,
            food: costs.food,
            activities: costs.activities,
            total: costs.total,
            perPerson: costs.perPerson,
            createdAt: new Date().toLocaleDateString()
        };

        const existingIndex = savedTrips.findIndex(function (savedTrip) {
            return savedTrip.name.toLowerCase() ===
                destination.toLowerCase();
        });

        if (existingIndex !== -1) {
            trip.id = savedTrips[existingIndex].id;
            savedTrips[existingIndex] = trip;
            showToast("Your trip idea has been updated.");
        } else {
            savedTrips.push(trip);
            showToast("Your trip idea has been saved!");
        }

        saveTripsToStorage();
        renderSavedTrips();
    });
}

// ========================================
// DISPLAY SAVED TRIPS
// ========================================

function renderSavedTrips() {
    if (!savedTripsList) {
        return;
    }

    savedTripsList.innerHTML = "";

    if (savedTrips.length === 0) {
        savedTripsList.innerHTML = `
            <p class="empty-trips">
                You haven't saved any trips yet.
            </p>
        `;
        return;
    }

    savedTrips.forEach(function (trip) {
        const tripCard = document.createElement("div");
        tripCard.className = "saved-trip-card";

        tripCard.innerHTML = `
            <div class="saved-trip-info">
                <h3>${escapeHTML(trip.name)}</h3>

                <p>
                    Estimated total:
                    <strong>${formatCurrency(trip.total)}</strong>
                </p>

                <p>
                    Per person:
                    <strong>${formatCurrency(trip.perPerson)}</strong>
                </p>

                <p>Travellers: ${trip.travellers}</p>
                <p>Saved on: ${escapeHTML(trip.createdAt)}</p>
            </div>

            <div class="saved-trip-actions">
                <button
                    type="button"
                    data-edit-trip="${trip.id}"
                >
                    Edit
                </button>

                <button
                    type="button"
                    data-delete-trip="${trip.id}"
                >
                    Delete
                </button>
            </div>
        `;

        savedTripsList.appendChild(tripCard);
    });
}

// ========================================
// PROTECT TEXT INSERTED INTO HTML
// ========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return replacements[character];
    });
}

// ========================================
// EDIT AND DELETE SAVED TRIPS
// ========================================

if (savedTripsList) {
    savedTripsList.addEventListener("click", function (event) {
        const editButton = event.target.closest("[data-edit-trip]");
        const deleteButton = event.target.closest("[data-delete-trip]");

        if (editButton) {
            const tripId = Number(editButton.dataset.editTrip);

            const trip = savedTrips.find(function (savedTrip) {
                return savedTrip.id === tripId;
            });

            if (!trip) {
                return;
            }

            if (tripName) tripName.value = trip.name;
            if (travellersInput) {
                travellersInput.value = trip.travellers;
            }
            if (tripBudget) tripBudget.value = trip.budget;
            if (transportCost) transportCost.value = trip.transport;
            if (stayCost) stayCost.value = trip.stay;
            if (foodCost) foodCost.value = trip.food;
            if (activityCost) activityCost.value = trip.activities;

            calculateBudget();

            const planner = document.getElementById("planner");

            if (planner) {
                planner.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            showToast("Trip loaded. Make your changes and save again.");
        }

        if (deleteButton) {
            const tripId = Number(deleteButton.dataset.deleteTrip);

            savedTrips = savedTrips.filter(function (trip) {
                return trip.id !== tripId;
            });

            saveTripsToStorage();
            renderSavedTrips();
            showToast("Saved trip deleted.");
        }
    });
}

// ========================================
// START THE APPLICATION
// ========================================

renderDestinations();
calculateBudget();
renderSavedTrips();

console.log("Travel Bud JavaScript loaded successfully!");

/* STEP 4 - Mobile Menu */

const travelBudMenuButton = document.getElementById("menuToggle");
const travelBudNavLinks = document.getElementById("navLinks");

if (travelBudMenuButton && travelBudNavLinks) {
    travelBudMenuButton.addEventListener("click", function () {
        const isOpen = travelBudNavLinks.classList.toggle("open");

        travelBudMenuButton.textContent = isOpen ? "✕" : "☰";
        travelBudMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    travelBudNavLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            travelBudNavLinks.classList.remove("open");
            travelBudMenuButton.textContent = "☰";
            travelBudMenuButton.setAttribute("aria-expanded", "false");
        });
    });
}

/* STEP 8 - Active Navigation on Scroll */

const travelBudSections = document.querySelectorAll(
    "section[id]"
);

const travelBudNavItems = document.querySelectorAll(
    "#navLinks a"
);

function updateTravelBudActiveLink() {
    let currentSection = "";

    travelBudSections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    travelBudNavItems.forEach(function (link) {
        const sectionId = link.getAttribute("href");

        link.classList.toggle(
            "active",
            sectionId === "#" + currentSection
        );
    });
}

window.addEventListener(
    "scroll",
    updateTravelBudActiveLink
);

updateTravelBudActiveLink();
