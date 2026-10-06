export function Modal(name, img, genres, rating, release_date){
    let modalHTML = '';
    modalHTML += `<div class='gameCard'>`;
        modalHTML += `<img src='${img}' class='gameImage' alt='${name}'>`;
        modalHTML += `<h1 class='gameName'>${name}</h1>`;
        modalHTML += `<div class='genres'>`
            for (let genre of genres){
                modalHTML += `<p class='genre'>${genre.name}</p>`;
            }
        modalHTML += `</div>`
        modalHTML += `<div class='gameInfo'>`
            modalHTML += `<p class='gameRating'>★${rating}</p>`;
            modalHTML += `<p class='gameDate'>🗓${release_date}</p>`;
        modalHTML += `</div>`
    modalHTML += `</div>`;

    return modalHTML
}