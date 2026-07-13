function renderWatchlist() {
    const grid = document.getElementById('watchlistGrid');
    const savedIds = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    // Filter movies that are in the savedIds array
    const savedMovies = movies.filter(m => savedIds.includes(m.id));

    if (savedMovies.length === 0) {
        grid.innerHTML = `<p class="empty-msg">Your watchlist is empty. Add movies from the home page!</p>`;
        return;
    }

    grid.innerHTML = savedMovies.map(movie => `
        <div class="card">
            <img src="${movie.img}" alt="${movie.title}">
            <div class="card-info">
                <div class="icons">
                    <i class="fa fa-play"></i>
                    <i class="fa fa-trash" onclick="removeFromWatchlist(${movie.id})"></i>
                </div>
                <div class="stats">${movie.match} Match</div>
                <h4>${movie.title}</h4>
            </div>
        </div>
    `).join('');
}

function removeFromWatchlist(id) {
    let savedIds = JSON.parse(localStorage.getItem('watchlist')) || [];
    savedIds = savedIds.filter(mId => mId !== id);
    localStorage.setItem('watchlist', JSON.stringify(savedIds));
    renderWatchlist(); // Refresh the page
}

renderWatchlist();