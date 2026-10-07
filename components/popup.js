export function Popup(name = "", img, genres = [], rating, release_date = "", description = "", platforms = [], developers = [], esrb = ""){
    const popupContainer = document.getElementById("popup");
    popupContainer.style.display = "flex";

    let popupHTML = '';
    popupHTML += `<div class="popup-window">`;
        popupHTML += `<section class='popup-left'>`
            popupHTML += `<img src='${img}' class='popup-image' alt='${name}'>`;
            popupHTML += `<div class='popup-game-info'>`;
                popupHTML += `<p class='game-rating'>★${rating}</p>`;
                popupHTML += `<p class='game-date'>🗓${release_date}</p>`;
                popupHTML += `<section class='platforms'>`;
                    for (let platform of platforms){
                        popupHTML += `<p class='popup-platform'>${platform.platform.name}</p>`;
                    }
                popupHTML += `</section>`;
                popupHTML += `<section class='developers'>`;
                    for (let developer of developers){
                        popupHTML += `<p class='popup-dev'>${developer.name}</p>`;
                    }
                popupHTML += `</section>`;
                popupHTML += `<section class='popup-genres'>`;
                for (let genre of genres){
                    popupHTML += `<p class='genre'>${genre.name}</p>`;
                }
            popupHTML += `</section>`;
                popupHTML += `<p class='esrb'>${esrb?.name ?? "Not Rated"}</p>`;
            popupHTML += `</div>`;
        popupHTML += `</section>`
        popupHTML += `<section class='popup-right'>`
            popupHTML += `<h1 class='popup-name'>${name}</h1>`;
            popupHTML += `<section class='popup-description'>${description}</section>`;
        popupHTML += `</section>`
        popupHTML += `<button class='close-popup' id="close">X</button>`
    popupHTML += `</div>`;

    popupContainer.innerHTML = popupHTML;
    close = document.getElementById('close');
    close.addEventListener("click", () => {popupContainer.style.display = "none";})
}