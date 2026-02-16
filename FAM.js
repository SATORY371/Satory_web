console.log("ANIMALAND POS: Galería cargada.");

console.log("ANIMALAND POS: Galería cargada.");

// sample content to recycle (Infinite Scroll)
const samplePosts = [
    {
        img: 'https://i.pinimg.com/736x/2a/3b/b3/2a3bb3bf483b8f2252c5054700d72f10.jpg',
        title: 'Cyberpunk Edgerunners',
        desc: 'Increíble fanart de Lucy.',
        category: 'fanart'
    },
    {
        img: 'https://wallpapers.com/images/hd/cool-anime-character-pfp-v525676771.jpg',
        title: 'Nuevo Icono',
        desc: '¿Qué opinan de este estilo?',
        category: 'fanart'
    },
    {
        img: 'https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg',
        title: 'Tanjiro Kamado',
        desc: 'Esperando la nueva temporada.',
        category: 'noticias'
    },
    {
        img: 'https://images5.alphacoders.com/126/1263728.jpg',
        title: 'Eve - Chainsaw Man',
        desc: 'Un cosplay impresionante.',
        category: 'cosplay'
    },
    {
        img: 'https://i.pinimg.com/736x/0d/4b/65/0d4b6563f458c973a2412808e2f67645.jpg',
        title: 'Genshin Impact Update',
        desc: 'Nuevos personajes revelados.',
        category: 'juegos'
    },
    {
        img: 'https://wallpaperaccess.com/full/126715.jpg',
        title: 'NieR: Automata',
        desc: '2B Cosplay event fotos.',
        category: 'cosplay'
    }
];

const grid = document.getElementById('forumGrid');
let isLoading = false;
let currentFilter = 'all';

// Function to create a post element
function createPostElement(post) {
    const div = document.createElement('div');
    div.className = 'forum-post';
    div.dataset.category = post.category; // data attribute for filtering if needed locally

    // Badge color based on category (simple logic)
    let badgeColor = 'var(--primary-neon)';
    if (post.category === 'noticias') badgeColor = '#ff4d4d'; // Red
    if (post.category === 'juegos') badgeColor = '#4d94ff'; // Blue
    if (post.category === 'cosplay') badgeColor = '#ff4dff'; // Pink

    div.innerHTML = `
        <img src="${post.img}" alt="${post.title}" loading="lazy">
        <div class="forum-post-content">
            <span style="background:${badgeColor}; color:black; font-size:0.7em; padding:2px 8px; border-radius:10px; font-weight:bold; text-transform:uppercase; margin-bottom:5px; display:inline-block;">${post.category}</span>
            <h4>${post.title}</h4>
            <p>${post.desc}</p>
        </div>
    `;
    return div;
}

// Filter Function
function filterPosts(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'Todo')) {
            btn.classList.add('active');
        }
    });

    // Clear grid and reload initial filtered selection
    grid.innerHTML = '';

    // Load initial batch for this category
    const initialBatch = samplePosts.filter(p => category === 'all' || p.category === category);

    // If no exact matches in sample, just show all (fallback) or show empty message
    // For demo, we will cycle the filtered list

    // Force at least some content to show
    let contentToShow = initialBatch.length > 0 ? initialBatch : samplePosts;

    contentToShow.forEach(post => {
        const newPost = createPostElement(post);
        grid.appendChild(newPost);
        observer.observe(newPost);
    });
}

// Function to append more posts (Infinite Scroll) - DISABLED by request
// function loadMorePosts() { ... }

// Scroll Event for Infinite Loading - DISABLED by request
// window.addEventListener('scroll', () => { ... });

// Intersection Observer for Fade-In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Slight offset
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Initialize observer for existing posts
document.querySelectorAll('.forum-post').forEach(post => {
    observer.observe(post);
});
