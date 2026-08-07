function scrollProjetos(direcao) {
    const container = document.getElementById("listaProjetos");
    const card = container.querySelector(".card-projeto");
    const larguraCard = card.offsetWidth + 32;

    container.scrollBy({
        left: direcao * larguraCard,
        behavior: "smooth"
    });
}

function scrollCursos(direcao) {
    const container = document.getElementById("listaCursos");
    const card = container.querySelector(".card-curso");
    const larguraCard = card.offsetWidth + 32;

    container.scrollBy({
        left: direcao * larguraCard,
        behavior: "smooth"
    });
}

function scrollCertificados(direcao) {
    const container = document.getElementById("listaCertificados");
    const card = container.querySelector(".card-curso");
    const larguraCard = card.offsetWidth + 32;

    container.scrollBy({
        left: direcao * larguraCard,
        behavior: "smooth"
    });
}