export function Modal(name, img, genres, tags, rating, release_date){
    let modalHTML = '';
    modalHTML += `<div class='game-card'>`;
        modalHTML += `<img src='${img}' class='game-image' alt='${name}'>`;

        modalHTML += `<div class='game-info'>`

        for (let genre of genres){
            modalHTML += `<span class='genre'>${genre.name}</span>`;
        }

        modalHTML += `<div class='game-name'>${name}</div>`;

        modalHTML += `<span class='game-rating'>★${rating}</span>`;
        modalHTML += `<span class='game-date'>🗓${release_date}</span><br>`;

        for (let tag of tags){
            if(tag.language == 'eng'){
                modalHTML += `<span class='tag'>${tag.name}</span>`;
            }
        }

        modalHTML += `</div>`
    modalHTML += `</div>`;

    return modalHTML
}