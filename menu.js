function toggleMenu() {
    const menu = document.getElementById("sidebar");
    menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
}

// Fecha o menu ao clicar em qualquer link dele (útil no celular)
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("sidebar");
    if (!menu) return;

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.style.left = "-250px";
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (event) => {
        const isMenuOpen = menu.style.left === "0px";
        const clickedInsideMenu = menu.contains(event.target);
        const clickedMenuBtn = event.target.closest(".menu-btn");

        if (isMenuOpen && !clickedInsideMenu && !clickedMenuBtn) {
            menu.style.left = "-250px";
        }
    });
});
