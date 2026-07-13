function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;

    // 1. Get the Liked IDs using the EXACT same key as app.js
    const likedIds = JSON.parse(localStorage.getItem('likedMovies')) || [];
    
    // 2. Filter the movies array (from movies.js)
    // We use Number(id) to ensure we are comparing numbers to numbers
    const favoriteMovies = movies.filter(movie => likedIds.includes(movie.id));

    console.log("IDs found in storage:", likedIds);
    console.log("Matching movies found:", favoriteMovies);

    // 3. Handle Empty State
    if (favoriteMovies.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; margin-top: 50px;">
                <p style="color: #808080; font-size: 1.2rem;">You haven't liked any movies yet.</p>
                <button onclick="location.href='index.html'" style="margin-top: 20px; padding: 10px 20px; cursor: pointer; background: white; border: none; font-weight: bold; border-radius: 4px;">Browse Home</button>
            </div>
        `;
        return;
    }

    // 4. Render the filtered movies
    grid.innerHTML = favoriteMovies.map(movie => `
        <div class="card">
            <img src="${movie.img}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/280x157/141414/ffffff?text=StreamFlix'">
            <div class="card-info">
                <div class="icons">
                    <i class="fa fa-play"></i>
                    <i class="fa fa-heart" style="color: red; cursor: pointer;" onclick="removeFavorite(${movie.id})"></i>
                </div>
                <h4>${movie.title}</h4>
                <div class="stats" style="color: #46d369;">${movie.match} Match</div>
            </div>
        </div>
    `).join('');
}

function removeFavorite(id) {
    let likedIds = JSON.parse(localStorage.getItem('likedMovies')) || [];
    likedIds = likedIds.filter(mId => mId !== id);
    localStorage.setItem('likedMovies', JSON.stringify(likedIds));
    renderFavorites(); // Refresh the list
}

// Initialize the page
renderFavorites();