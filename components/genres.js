export function GenreCard(name, img, count){
    let genreHTML = '';
    genreHTML += `<div class='genre-card' style='background-image: url("${img}");'>`;
        genreHTML += `<h1 class='genre-name'>${name}</h1>`;
    genreHTML += `</div>`;
    genreHTML += `<p class='genre-count'>${count} Games</h1>`;

    return genreHTML
}