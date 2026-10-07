export function Modal(name, img, genres, rating, release_date){
    let modalHTML = '';
    modalHTML += `<div class='game-card'>`;
        modalHTML += `<img src='${img}' class='game-image' alt='${name}'>`;
        modalHTML += `<h1 class='game-name'>${name}</h1>`;
        modalHTML += `<div class='genres'>`
            for (let genre of genres){
                modalHTML += `<p class='genre'>${genre.name}</p>`;
            }
        modalHTML += `</div>`
        modalHTML += `<div class='game-info'>`
            modalHTML += `<p class='game-rating'>★${rating}</p>`;
            modalHTML += `<p class='game-date'>🗓${release_date}</p>`;
        modalHTML += `</div>`
    modalHTML += `</div>`;

    return modalHTML
}