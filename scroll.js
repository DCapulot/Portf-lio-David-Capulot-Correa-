// Rola um carrossel horizontal pela largura de um card (+ espaçamento).
function scrollCarrossel(idLista, seletorCard, direcao) {
    const container = document.getElementById(idLista);
    if (!container) return;

    const card = container.querySelector(seletorCard);
    if (!card) return;

    const espacamento = parseFloat(getComputedStyle(container).columnGap) || 32;

    container.scrollBy({
        left: direcao * (card.offsetWidth + espacamento),
        behavior: "smooth"
    });
}

function scrollProjetos(direcao) {
    scrollCarrossel("listaProjetos", ".card-projeto", direcao);
}

function scrollCursos(direcao) {
    scrollCarrossel("listaCursos", ".card-curso", direcao);
}

function scrollCertificados(direcao) {
    scrollCarrossel("listaCertificados", ".card-curso", direcao);
}
