const audio = document.getElementById('miAudio');
const muteButton = document.getElementById('muteButton');
const muteIcon = document.getElementById('muteIcon');

audio.volume = 0.07; // Volumen un poco más bajo para sutileza

// Function to handle muting/unmuting the audio
function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
        audio.play().catch(error => {
            console.warn('Could not play audio after unmuting without user interaction.', error);
        });
    } else {
        audio.muted = true;
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    }
}

// Attach event listener to the mute button
muteButton.addEventListener('click', toggleMute);

function abrirPagina(url) {
    // Abre la URL en la misma pestaña
    window.location.href = url;
}

// --- Lógica del contador de visitas (básico, solo por navegador) ---
function updateVisitCount() {
    let visits = localStorage.getItem('satory_web_visits');
    if (visits) {
        visits = parseInt(visits) + 1;
    } else {
        visits = 1;
    }
    localStorage.setItem('satory_web_visits', visits);
    document.getElementById('visit-count').textContent = visits;
}

document.addEventListener('DOMContentLoaded', () => {
    // Intenta reproducir audio al cargar
    if (audio.paused) {
        audio.play().catch(error => {
            console.warn('Autoplay prevented. User interaction required to play audio.', error);
        });
    }

    // Update the mute icon based on initial audio state
    if (audio.muted) {
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    } else {
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
    }

    // Actualiza el contador de visitas
    updateVisitCount();
});

// Para permitir la reproducción de audio con el primer clic en cualquier parte del body
document.body.addEventListener('click', () => {
    if (audio.paused && !audio.muted) { // Only try to play if paused and not intentionally muted
        audio.play().catch(error => {
            console.log("No se pudo reproducir el audio automáticamente con el clic.");
        });
    }
}, { once: true }); // Solo se activa una vez