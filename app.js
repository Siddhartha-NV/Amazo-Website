let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];


// 2. Optimized Core Functions
function createRow(categoryName, filterCat) {
    const mainRows = document.getElementById('mainRows');
    // Using movies.filter but ensuring "Trending" shows a mix
    const filteredMovies = filterCat === 'All' ? movies : movies.filter(m => m.cat === filterCat);

    const rowHTML = `
        <div class="movie-row">
            <h2>${categoryName}</h2>
            <div class="slider">
                ${filteredMovies.map(movie => `
                    <div class="card">
                        <!-- Added onerror to handle broken links automatically -->
                        <img src="${movie.img}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/280x157/141414/ffffff?text=StreamFlix'">
                        <div class="card-info">
                            <div class="icons">
                                <i class="fa fa-play"></i>
                                <i class="fa ${watchlist.includes(movie.id) ? 'fa-check' : 'fa-plus'}" onclick="toggleWatchlist(event, ${movie.id})"></i>
                                <!-- UPDATE: Added style and onclick here -->
                                <i class="fa fa-thumbs-up" 
                                   style="color: ${likedMovies.includes(movie.id) ? 'red' : 'white'}" 
                                   onclick="toggleLike(event, ${movie.id})"></i>
                            </div>
                            <div class="stats">${movie.match} Match <span style="color:white; margin-left:5px;">${movie.year}</span></div>
                            <h4>${movie.title}</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    mainRows.insertAdjacentHTML('beforeend', rowHTML);
}

function renderAllRows() {
    const mainRows = document.getElementById('mainRows');
    if (!mainRows) return;
    
    mainRows.innerHTML = ''; 
    createRow("Trending Now", "Trending");
    createRow("Action & Adventure", "Action");
    createRow("Critically Acclaimed Anime", "Anime");
    createRow("Sci-Fi Universe", "Sci-Fi");
    createRow("Horror Favorites", "Horror");
    updateStats();
}

function toggleWatchlist(event, id) {
    event.stopPropagation(); // Prevents click from triggering "Play"
    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(mId => mId !== id);
    } else {
        watchlist.push(id);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    // Efficiently update only the icon instead of re-rendering everything
    const icon = event.target;
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-check');
    updateStats();
}

function updateStats() {
    const countEl = document.getElementById('watchlistCount');
    if (countEl) countEl.innerText = watchlist.length;
}

// 3. Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// 4. Enhanced Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const mainRows = document.getElementById('mainRows');
    
    if (val === "") {
        renderAllRows();
        return;
    }
    
    const results = movies.filter(m => m.title.toLowerCase().includes(val));
    mainRows.innerHTML = '';
    
    if (results.length > 0) {
        // We temporarily create a new row function for search results
        const searchRowHTML = `
            <div class="movie-row">
                <h2>Results for "${val}"</h2>
                <div class="slider" style="flex-wrap: wrap;">
                    ${results.map(movie => `
                        <div class="card" style="margin-bottom: 20px;">
                            <img src="${movie.img}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/280x157/141414/ffffff?text=StreamFlix'">
                            <div class="card-info">
                                <div class="icons">
                                    <i class="fa fa-play"></i>
                                    <i class="fa ${watchlist.includes(movie.id) ? 'fa-check' : 'fa-plus'}" onclick="toggleWatchlist(event, ${movie.id})"></i>
                                    <!-- UPDATE: Added thumbs up to search results too -->
                                    <i class="fa fa-thumbs-up" 
                                       style="color: ${likedMovies.includes(movie.id) ? 'red' : 'white'}" 
                                       onclick="toggleLike(event, ${movie.id})"></i>
                                </div>
                                <h4>${movie.title}</h4>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        mainRows.innerHTML = searchRowHTML;
    } else {
        mainRows.innerHTML = `<h2 style="padding: 4%;">No titles found for "${val}"</h2>`;
    }
});

// Initial Load
renderAllRows();

function toggleLike(event, id) {
    event.stopPropagation();
    
    // Check if movie is already liked
    if (likedMovies.includes(id)) {
        // Remove it
        likedMovies = likedMovies.filter(mId => mId !== id);
        event.target.style.color = "white";
    } else {
        // Add it
        likedMovies.push(id);
        event.target.style.color = "red";
    }
    
    // SAVE TO LOCAL STORAGE
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    console.log("Saved to favorites:", likedMovies); 
}