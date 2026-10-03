const MENU_FECHADO = "-250px";

function setMenu(aberto) {
    const menu = document.getElementById("sidebar");
    const btn = document.querySelector(".menu-btn");
    if (!menu) return;

    menu.style.left = aberto ? "0px" : MENU_FECHADO;

    if (btn) {
        btn.setAttribute("aria-expanded", String(aberto));
        btn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }
}

function toggleMenu() {
    const menu = document.getElementById("sidebar");
    if (!menu) return;
    setMenu(menu.style.left !== "0px");
}

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("sidebar");
    if (!menu) return;

    // Fecha ao clicar em qualquer link do menu (útil no celular)
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });

    // Fecha ao clicar fora do menu
    document.addEventListener("click", (event) => {
        const aberto = menu.style.left === "0px";
        const dentro = menu.contains(event.target);
        const noBotao = event.target.closest(".menu-btn");

        if (aberto && !dentro && !noBotao) setMenu(false);
    });

    // Fecha com a tecla Esc
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenu(false);
    });
});
