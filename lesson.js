let lastScrollTop = 0; // Initialize variable to store last scroll position

window.addEventListener("scroll", function() { // Listen for scroll events
let currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Get current scroll position
if (currentScroll > lastScrollTop) { // If scrolled down
    document.querySelector("header").style.top = "-90px"; // Hide the header by moving it up
} else { // If scrolled up
    document.querySelector("header").style.top = "0"; // Show the header by moving it back to its original position
}
lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update last scroll position
}, false);

function search() {
    var searchTerm = document.getElementById("search-bar").value.trim().toLowerCase();
    var elementsToSearch = ["p", "li", "ol", "ul", "h2", "h4", "h5"];
    var searchResults = [];

    // Remove existing highlights
    clearHighlights();

    elementsToSearch.forEach(function(element) {
        var elements = document.getElementsByTagName(element);
        for (var i = 0; i < elements.length; i++) {
            var content = elements[i].innerHTML.toLowerCase();
            var index = content.indexOf(searchTerm);
            while (index !== -1) {
                searchResults.push({ element: elements[i], index: index });
                index = content.indexOf(searchTerm, index + 1);
            }
        }
    });

    // Highlight all search results
    searchResults.forEach(function(result) {
        highlightResult(result.element, searchTerm);
    });

    // Add navigation buttons if there are multiple search results
    var navigationContainer = document.getElementById("navigation-container");
    if (searchResults.length > 1) {
        addNavigationButtons(searchResults, navigationContainer);
    } else {
        navigationContainer.innerHTML = ""; // Clear navigation buttons if no search results
    }
}

function highlightResult(element, searchTerm) {
    var content = element.innerHTML;
    var regex = new RegExp('(' + searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    var highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
    element.innerHTML = highlightedContent;
}

function clearHighlights() {
    var highlights = document.querySelectorAll(".highlight");
    highlights.forEach(function(element) {
        element.outerHTML = element.innerHTML;
    });

    // Remove navigation buttons
    var navigationButtons = document.getElementById("navigation-container");
    navigationButtons.innerHTML = ""; // Clear navigation buttons
}

function addNavigationButtons(searchResults, container) {
    var navigationButtons = document.createElement("div");
    navigationButtons.classList.add("navigation-buttons");

    var prevButton = document.createElement("button");
    prevButton.textContent = "▲";
    prevButton.onclick = function() {
        navigateToResult(-1, searchResults);
    };
    navigationButtons.appendChild(prevButton);

    var nextButton = document.createElement("button");
    nextButton.textContent = "▼";
    nextButton.onclick = function() {
        navigateToResult(1, searchResults);
    };
    navigationButtons.appendChild(nextButton);

    // Append navigation buttons to the container
    container.innerHTML = ""; // Clear previous content
    container.appendChild(navigationButtons);
}

var currentSearchIndex = 0; // Initialize the current search index

function navigateToResult(direction, searchResults) {
    // Logic to navigate to the previous or next search result based on the direction
    if (direction === -1) { // Navigate to previous result
        currentSearchIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    } else { // Navigate to next result
        currentSearchIndex = (currentSearchIndex + 1) % searchResults.length;
    }

    var currentElement = searchResults[currentSearchIndex].element;
    var headerHeight = document.getElementById("header").offsetHeight; // Adjust "header" to the actual ID of your header element
    var elementTop = currentElement.getBoundingClientRect().top + window.scrollY;
    var scrollTop = elementTop - (window.innerHeight / 2) + (currentElement.offsetHeight / 2) - headerHeight;
    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
}

function search() {
    var searchTerm = document.getElementById("search-bar").value.trim().toLowerCase();
    var elementsToSearch = ["p", "li", "ol", "ul", "h2", "h4", "h5"];
    var searchResults = [];
    var firstHighlight = null;

    // Remove existing highlights
    clearHighlights();

    elementsToSearch.forEach(function(element) {
        var elements = document.getElementsByTagName(element);
        for (var i = 0; i < elements.length; i++) {
            var content = elements[i].innerHTML.toLowerCase();
            var index = content.indexOf(searchTerm);
            while (index !== -1) {
                searchResults.push({ element: elements[i], index: index });
                if (firstHighlight === null) {
                    firstHighlight = elements[i];
                }
                index = content.indexOf(searchTerm, index + 1);
            }
        }
    });

    // Highlight all search results
    searchResults.forEach(function(result) {
        highlightResult(result.element, searchTerm);
    });

    // Scroll to the first search result
    if (firstHighlight !== null) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Add navigation buttons if there are multiple search results
    var navigationContainer = document.getElementById("navigation-container");
    if (searchResults.length > 1) {
        addNavigationButtons(searchResults, navigationContainer);
    } else {
        navigationContainer.innerHTML = ""; // Clear navigation buttons if no search results
    }
}