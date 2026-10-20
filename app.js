import { GenreCard } from "./components/genres.js";
import { Modal } from "./components/modal.js";
import { Popup } from "./components/popup.js";

const API_KEY = "36608f598d154077a2e477e170a3bb8f";
const BASE_URL = "https://api.rawg.io/api";

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const loadButton = document.getElementById("load-more");
const backButton = document.getElementById("backBtn");
const genresButton = document.getElementById("genresBtn");
const browseButton = document.getElementById("browseBtn");
const homeLink = document.getElementById("homeLink");
const pageTitle = document.getElementById("pageTitle");
const popupContainer = document.getElementById("popup");

let nextPage = null;
let currentView = { type: "genres" };
let navIndex = 0;

function updateBackButton() {
    backButton.disabled = navIndex <= 0;
}

function closePopup() {
    popupContainer.style.display = "none";
    popupContainer.innerHTML = "";
}

function updateLoadMoreVisibility() {
    loadButton.style.display = currentView.type === "games" && nextPage ? "block" : "none";
}

function setHistory(view, mode = "push") {
    currentView = { ...view };

    if (mode === "replace") {
        history.replaceState({ view: currentView, navIndex }, "", window.location.href);
    } else if (mode === "push") {
        navIndex += 1;
        history.pushState({ view: currentView, navIndex }, "", window.location.href);
    }

    updateBackButton();
}

async function fetchGames(search = "", genreId = "", genreName = "") {
    closePopup();

    let url = `${BASE_URL}/games?key=${API_KEY}&page_size=40`;
    if (genreId) url += `&genres=${genreId}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    gamesContainer.innerHTML = '<p class="status-message">Loading games...</p>';

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    nextPage = data.next;

    if (search) {
        pageTitle.textContent = `Search: ${search}`;
    } else if (genreName) {
        pageTitle.textContent = genreName;
    } else {
        pageTitle.textContent = "Browse Games";
    }

    displayGames(data.results);
    updateLoadMoreVisibility();
}

async function showGames(search = "", genreId = "", genreName = "", historyMode = "push") {
    try {
        const view = { type: "games", search, genreId, genreName };
        await fetchGames(search, genreId, genreName);
        setHistory(view, historyMode);
    } catch (error) {
        console.error("Failed:", error);
        gamesContainer.innerHTML = '<p class="status-message">Could not load games.</p>';
    }
}

function appendGames(games) {
    games.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.id = game.id;
        gameCard.className = "game-card-wrapper";

        gameCard.innerHTML = Modal(
            game.name,
            game.background_image,
            game.genres,
            game.tags,
            game.rating,
            game.released
        );

        gameCard.addEventListener("click", () => {
            getGame(game.id);
        });

        gamesContainer.append(gameCard);
    });
}

async function loadNextPage() {
    if (!nextPage) return;

    try {
        loadButton.disabled = true;
        loadButton.textContent = "Loading...";

        const response = await fetch(nextPage);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        nextPage = data.next;
        appendGames(data.results);
    } catch (error) {
        console.error("Failed:", error);
    } finally {
        loadButton.disabled = false;
        loadButton.textContent = "Load More";
        updateLoadMoreVisibility();
    }
}

async function getGame(id) {
    try {
        const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        Popup(
            data.name,
            data.background_image,
            data.genres,
            data.rating,
            data.released,
            data.description,
            data.platforms,
            data.developers,
            data.esrb_rating
        );
    } catch (error) {
        console.error("Failed: ", error);
    }
}

async function fetchGenres() {
    closePopup();
    gamesContainer.innerHTML = '<p class="status-message">Loading genres...</p>';

    const url = `${BASE_URL}/genres?key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    nextPage = null;
    pageTitle.textContent = "Game Genres";
    displayGenres(data.results);
    updateLoadMoreVisibility();
}

async function showGenres(historyMode = "push") {
    try {
        await fetchGenres();
        setHistory({ type: "genres" }, historyMode);
    } catch (error) {
        console.error("Failed: ", error);
        gamesContainer.innerHTML = '<p class="status-message">Could not load genres.</p>';
    }
}

function displayGames(games) {
    gamesContainer.innerHTML = "";

    if (!games.length) {
        gamesContainer.innerHTML = '<p class="status-message">No games found.</p>';
        return;
    }

    appendGames(games);
}

function displayGenres(genres) {
    gamesContainer.innerHTML = "";

    genres.forEach((genre) => {
        const genreCard = document.createElement("div");
        genreCard.id = genre.id;
        genreCard.className = "genre-card-wrapper";
        genreCard.innerHTML = GenreCard(genre.name, genre.image_background, genre.games_count);

        genreCard.addEventListener("click", () => {
            showGames("", genre.id, genre.name);
        });

        gamesContainer.append(genreCard);
    });
}

async function restoreView(view) {
    currentView = { ...view };

    try {
        if (view.type === "genres") {
            await fetchGenres();
        } else if (view.type === "games") {
            await fetchGames(view.search || "", view.genreId || "", view.genreName || "");
        }
    } catch (error) {
        console.error("Could not restore previous page:", error);
        gamesContainer.innerHTML = '<p class="status-message">Could not restore the previous page.</p>';
    }

    updateBackButton();
}

function goBack() {
    if (popupContainer.style.display === "flex") {
        closePopup();
        return;
    }

    if (navIndex > 0) {
        history.back();
    }
}

function searchGames() {
    const search = searchInput.value.trim();
    if (!search) return;
    showGames(search);
}

searchBtn.addEventListener("click", searchGames);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchGames();
});

loadButton.addEventListener("click", loadNextPage);
backButton.addEventListener("click", goBack);
genresButton.addEventListener("click", () => {
    if (currentView.type !== "genres") showGenres();
});
browseButton.addEventListener("click", () => showGames());

homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentView.type !== "genres") showGenres();
});

window.addEventListener("popstate", async (event) => {
    closePopup();

    const state = event.state;
    if (!state?.view) return;

    navIndex = state.navIndex ?? 0;
    await restoreView(state.view);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popupContainer.style.display === "flex") {
        closePopup();
    }
});

async function initializeApp() {
    navIndex = 0;
    await fetchGenres();
    setHistory({ type: "genres" }, "replace");
}

initializeApp();
