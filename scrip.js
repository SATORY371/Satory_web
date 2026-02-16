// Datos de ejemplo simulando una base de datos externa
const movies = [
    {
        title: "EL TIEMPO CON TIGO",
        image: "media/EL TIEMPO CONTIGO.jpg",
        streamUrl: "https://www.youtube.com/watch?v=prLF6luRNp4&list=RDprLF6luRNp4&start_radio=1" // Ejemplo: Rickroll (Link externo)
    },
    {
        title: "YOUR NAME",
        image: "media/TU NOMBRE.jpg",
        streamUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE"
    },
    {
        title: "Space Voyager",
        image: "https://via.placeholder.com/200x300/050510/00FF00?text=Space+Voyager",
        streamUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE"
    },
    {
        title: "Dark Hacker",
        image: "https://via.placeholder.com/200x300/000000/FFFFFF?text=Dark+Hacker",
        streamUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE"
    },
    {
        title: "Retro Future",
        image: "https://via.placeholder.com/200x300/222/FFD700?text=Retro+Future",
        streamUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE"
    },
    {
        title: "Galactic Empire",
        image: "https://via.placeholder.com/200x300/111/FF4500?text=Galactic",
        streamUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE"
    }
];

// Cargar películas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('movieGrid');

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
            </div>
        `;

        card.addEventListener('click', () => openPlayer(movie));
        grid.appendChild(card);
    });

    // Event listeners para el modal
    const modal = document.getElementById("playerModal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
        document.getElementById('videoContainer').innerHTML = ''; // Limpiar iframe
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById('videoContainer').innerHTML = ''; // Limpiar iframe
        }
    }
});

function openPlayer(movie) {
    const modal = document.getElementById("playerModal");
    const container = document.getElementById("videoContainer");
    const title = document.getElementById("movieTitle");

    // En un caso real, aquí usarías el link externo
    // Como Youtube bloquea a veces embeds locales si no es localhost, esto es un ejemplo.
    container.innerHTML = `<iframe src="${movie.streamUrl}" allowfullscreen></iframe>`;

    title.innerText = movie.title;
    modal.style.display = "block";
}

function scrollToGrid() {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}
