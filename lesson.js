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
    var searchTerm = document.getElementById("search-bar").value;
    var elementsToSearch = ["p", "li", "ol", "ul", "h2", "h4", "h5"];
    var highlights = document.querySelectorAll(".highlight");
    highlights.forEach(function(element) {
        element.classList.remove("highlight");
    });
    var firstHighlight = null;

    elementsToSearch.forEach(function(element) {
        var elements = document.getElementsByTagName(element);
        for (var i = 0; i < elements.length; i++) {
            var content = elements[i].innerHTML;
            var searchResult = content.search(new RegExp(searchTerm, "ig"));
            if (searchResult !== -1) {
                content = content.replace(new RegExp('(' + searchTerm + ')', 'ig'), function(match, p1, offset, string) {
                    if (firstHighlight === null) {
                        firstHighlight = elements[i];
                    }
                    return '<span class="highlight">' + p1 + '</span>';
                });
                elements[i].innerHTML = content;
            }
        }
    });

    if (firstHighlight !== null) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}