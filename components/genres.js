export function GenreCard(name, img, count){
    let genreHTML = '';
    genreHTML += `<div class='genreCard' style='background-image: url("${img}");'>`;
        genreHTML += `<h1 class='genreName'>${name}</h1>`;
    genreHTML += `</div>`;
    genreHTML += `<p class='genreCount'>${count} Games</h1>`;

    return genreHTML
}