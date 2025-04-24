const API_KEY = "AIzaSyA-jFmUpm2zd0Ry9c6PDqYxvU6Y9w0Zoj4";
const API_URL = "https://www.googleapis.com/youtube/v3/search";

function startVibe() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('search').style.display = 'flex';
    }, 5000);
}

async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const results = document.getElementById('results');
    results.innerHTML = ""; // Limpa resultados anteriores

    try {
        const response = await fetch(`${API_URL}?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=15&key=${API_KEY}`);
        if (!response.ok) throw new Error("Erro na API YouTube");

        const data = await response.json();

        data.items.forEach(video => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
                <h2>${video.snippet.title}</h2>
                <button class="play-button" onclick="openYouTube('${video.id.videoId}')">✦</button>
            `;

            results.appendChild(card);
        });
    } catch (error) {
        results.innerHTML = "<p>Não foi possível buscar músicas.</p>";
        console.error(error);
    }
}



function openYouTube(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}
