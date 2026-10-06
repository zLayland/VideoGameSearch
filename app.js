import { Modal } from "./components/modal.js";

const API_KEY = "36608f598d154077a2e477e170a3bb8f";
const BASE_URL = "https://api.rawg.io/api";

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

async function getGames(search = "") {
    try {
        let url = `${BASE_URL}/games?key=${API_KEY}`;

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        displayGames(data.results);
    }
    catch (error) {
        console.error("Failed: ", error);
        gamesContainer.innerHTML = "<p>Could not load games.</p>";
    }
}

function displayGames(games) {
    gamesContainer.innerHTML = '';

    games.forEach((game) => {
        let gameCard = document.createElement('div');
        gameCard.id = `${game.id}`
        gameCard.innerHTML = Modal(game.name, game.background_image, game.genres, game.rating, game.released)
        gamesContainer.append(gameCard);
    });
}

searchBtn.addEventListener("click", () => {
  getGames(searchInput.value.trim());
});

getGames();