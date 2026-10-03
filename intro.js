// Tela de abertura do portfólio — JavaScript puro, sem dependências.
(function () {
    const intro = document.getElementById("intro");
    const root = document.documentElement;
    if (!intro) return;

    const terminal = document.getElementById("introTerminal");
    const barra = document.getElementById("introBarra");
    const percent = document.getElementById("introPercent");
    const btnPular = document.getElementById("introPular");

    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DURACAO_MIN = reduzirMovimento ? 600 : 2800; // tempo mínimo da abertura (ms)

    const linhas = [
        { texto: "> iniciando portfólio...", ok: false },
        { texto: "> carregando projetos...", ok: true },
        { texto: "> carregando certificados...", ok: true },
        { texto: "> acesso liberado", ok: false }
    ];

    let paginaCarregada = document.readyState === "complete";
    let encerrando = false;
    let cancelarDigitacao = false;

    window.addEventListener("load", () => { paginaCarregada = true; });

    // ---------- Digitação do terminal ----------
    function esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function digitar() {
        for (const linha of linhas) {
            const div = document.createElement("div");
            terminal.appendChild(div);

            if (reduzirMovimento) {
                div.textContent = linha.texto;
            } else {
                for (const letra of linha.texto) {
                    if (cancelarDigitacao) return;
                    div.textContent += letra;
                    await esperar(22);
                }
            }

            if (linha.ok) {
                const ok = document.createElement("span");
                ok.className = "ok";
                ok.textContent = " [ok]";
                div.appendChild(ok);
            }

            if (!reduzirMovimento) await esperar(160);
        }
    }

    // ---------- Barra de progresso ----------
    // Chega a 92% pelo tempo e só vai a 100% quando a página terminou de carregar.
    const inicio = performance.now();

    function atualizarBarra(agora) {
        if (encerrando) return;

        const decorrido = agora - inicio;
        let progresso = Math.min(decorrido / DURACAO_MIN, 1) * 100;

        if (!paginaCarregada) progresso = Math.min(progresso, 92);

        barra.style.width = progresso + "%";
        percent.textContent = Math.floor(progresso) + "%";

        if (progresso >= 100) {
            setTimeout(encerrar, 350);
        } else {
            requestAnimationFrame(atualizarBarra);
        }
    }

    // ---------- Encerramento ----------
    function encerrar() {
        if (encerrando) return;
        encerrando = true;
        cancelarDigitacao = true;

        barra.style.width = "100%";
        percent.textContent = "100%";
        intro.classList.add("saindo");

        const remover = () => {
            intro.remove();
            root.classList.remove("intro-ativa");
        };

        // Se a transição não disparar por algum motivo, remove do mesmo jeito.
        intro.addEventListener("transitionend", remover, { once: true });
        setTimeout(remover, 1000);

        try { sessionStorage.setItem("intro-vista", "1"); } catch (e) { /* ignora */ }
    }

    btnPular.addEventListener("click", encerrar);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") encerrar();
    });

    btnPular.focus({ preventScroll: true });
    digitar();
    requestAnimationFrame(atualizarBarra);
})();
