import { Modal } from "./components/modal.js";
import { Popup } from "./components/popup.js";

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

async function getGame(id) {
    try {
        let url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data.name, data.background_image, data.genres, data.rating, data.released, data.description, data.platforms, data.developers, data.esrb_rating);
        Popup(data.name, data.background_image, data.genres, data.rating, data.released, data.description, data.platforms, data.developers, data.esrb_rating);
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
        gameCard.id = `${game.id}`;
        gameCard.innerHTML = Modal(game.name, game.background_image, game.genres, game.rating, game.released);
        gameCard.addEventListener("click", () => {
            console.log(`Clicked ${gameCard.id}`);
            getGame(gameCard.id)
        })

        gamesContainer.append(gameCard);
    });
}

searchBtn.addEventListener("click", () => {
  getGames(searchInput.value.trim());
});

getGames();