import { GenreCard } from "./components/genres.js";
import { Modal } from "./components/modal.js";
import { Popup } from "./components/popup.js";

const API_KEY = "36608f598d154077a2e477e170a3bb8f";
const BASE_URL = "https://api.rawg.io/api";

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

let nextPage = null;

async function getGames(search = "", genreId = "") {
    try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page_size=40`;

        if (genreId) {
            url += `&genres=${genreId}`;
        }

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        nextPage = data.next;

        displayGames(data.results);
    }
    catch (error) {
        console.error("Failed:", error);
        gamesContainer.innerHTML = "<p>Could not load games.</p>";
    }
}

function appendGames(games) {
    games.forEach((game) => {
        const gameCard = document.createElement("div");

        gameCard.id = game.id;

        gameCard.innerHTML = Modal(
            game.name,
            game.background_image,
            game.genres,
            game.rating,
            game.released
        );

        gameCard.addEventListener("click", () => {
            console.log(game)
            getGame(game.id);
        });

        gamesContainer.append(gameCard);
    });
}

async function loadNextPage() {
    if (!nextPage) return;

    try {
        const response = await fetch(nextPage);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        nextPage = data.next;

        appendGames(data.results);
    }
    catch (error) {
        console.error("Failed:", error);
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

        Popup(data.name, data.background_image, data.genres, data.rating, data.released, data.description, data.platforms, data.developers, data.esrb_rating);
    }
    catch (error) {
        console.error("Failed: ", error);
        gamesContainer.innerHTML = "<p>Could not load games.</p>";
    }
}

async function getGenres() {
    try {
        let url = `${BASE_URL}/genres?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        displayGenres(data.results);
    }
    catch (error) {
        console.error("Failed: ", error);
        gamesContainer.innerHTML = "<p>Could not load games.</p>";
    }
}

function displayGames(games) {
    gamesContainer.innerHTML = "";

    appendGames(games);
}

function displayGenres(genres) {
    console.log(genres);
    gamesContainer.innerHTML = '';

    genres.forEach((genre) => {
        let genreCard = document.createElement('div');
        genreCard.id = `${genre.id}`;
        genreCard.innerHTML = GenreCard(genre.name, genre.image_background, genre.games_count)
        genreCard.addEventListener("click", () => {
            console.log(`Clicked ${genreCard.id}`);
            getGames("", genre.id)
        })

        gamesContainer.append(genreCard);
    });
}

searchBtn.addEventListener("click", () => {
  getGames(searchInput.value.trim());
});

getGenres();