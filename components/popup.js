export function Popup(name, img, genres, rating, release_date, description, platforms, developers, esrb){
    let popupHTML = '';
    popupHTML += `<div class='popupContainer'>`;
        popupHTML += `<img src='${img}' class='popupImage' alt='${name}'>`;
        popupHTML += `<h1 class='popupName'>${name}</h1>`;
        popupHTML += `<div class='popupGenres'>`
            for (let genre of genres){
                popupHTML += `<p class='popupGenre'>${genre.name}</p>`;
            }
        popupHTML += `</div>`
        popupHTML += `<div class='popupGameInfo'>`
            popupHTML += `<p class='popupGameRating'>★${rating}</p>`;
            popupHTML += `<p class='popupGameDate'>🗓${release_date}</p>`;
            popupHTML += `<p class='popupDescription'>${description}</p>`;
            popupHTML += `<p class='popupPlatforms'>${platforms}</p>`;
            popupHTML += `<p class='popupDevelopers'>${developers}</p>`;
            popupHTML += `<p class='popupESRB'>${esrb}</p>`;
        popupHTML += `</div>`
    popupHTML += `</div>`;

    return popupHTML
}