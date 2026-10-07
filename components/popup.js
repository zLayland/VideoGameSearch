export function Popup(name = "", img, genres = [], rating, release_date = "", description = "", platforms = [], developers = [], esrb = ""){
    const popupContainer = document.getElementById("popup");
    popupContainer.style.display = "flex";

    let popupHTML = '';
    popupHTML += `<div class="popupWindow">`;
        popupHTML += `<section class='popup-left'>`
            popupHTML += `<img src='${img}' class='popupImage' alt='${name}'>`;
            popupHTML += `<div class='popupGameInfo'>`;
                popupHTML += `<p class='gameRating'>★${rating}</p>`;
                popupHTML += `<p class='gameDate'>🗓${release_date}</p>`;
                popupHTML += `<section class='platforms'>`;
                    for (let platform of platforms){
                        popupHTML += `<p class='popupPlatform'>${platform.platform.name}</p>`;
                    }
                popupHTML += `</section>`;
                popupHTML += `<section class='developers'>`;
                    for (let developer of developers){
                        popupHTML += `<p class='popupDev'>${developer.name}</p>`;
                    }
                popupHTML += `</section>`;
                popupHTML += `<section class='popupGenres'>`;
                for (let genre of genres){
                    popupHTML += `<p class='genre'>${genre.name}</p>`;
                }
            popupHTML += `</section>`;
                popupHTML += `<p class='esrb'>${esrb?.name ?? "Not Rated"}</p>`;
            popupHTML += `</div>`;
        popupHTML += `</section>`
        popupHTML += `<section class='popup-right'>`
            popupHTML += `<h1 class='popupName'>${name}</h1>`;
            popupHTML += `<section class='popupDescription'>${description}</section>`;
        popupHTML += `</section>`
        popupHTML += `<button class='closePopup' id="close">X</button>`
    popupHTML += `</div>`;

    popupContainer.innerHTML = popupHTML;
    close = document.getElementById('close');
    close.addEventListener("click", () => {popupContainer.style.display = "none";})
}