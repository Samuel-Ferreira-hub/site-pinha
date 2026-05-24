/* =========================================================
   North's Barbearia — Scripts
   ========================================================= */

(() => {
  /* -----------------------------------------------------------
     CONFIG (edite aqui se mudar número, mensagem, etc.)
  ------------------------------------------------------------ */
  const WHATSAPP_NUMBER = "554396759609"; // +55 43 99675-9609
  const WHATSAPP_MSG = "Olá João Victor! Gostaria de agendar um horário na North's Barbearia.";

  /* WhatsApp links */
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.setAttribute("href", waUrl);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* -----------------------------------------------------------
     STICKY NAV — adiciona classe ao rolar
  ------------------------------------------------------------ */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------------ */
  const navToggle = document.querySelector(".nav__toggle");
  navToggle?.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
  document.querySelectorAll(".nav__menu a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("is-open"));
  });

  /* -----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ------------------------------------------------------------ */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-visible"));
  }

  /* -----------------------------------------------------------
     HERO PARALLAX SUTIL
  ------------------------------------------------------------ */
  const heroBg = document.querySelector(".hero__bg");
  if (heroBg) {
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      heroBg.style.transform = `scale(1.05) translateY(${y * 0.18}px)`;
      raf = 0;
    };
    window.addEventListener("scroll", () => {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
  }

  /* -----------------------------------------------------------
     ACTIVE NAV LINK ao rolar
  ------------------------------------------------------------ */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__menu a");
  if ("IntersectionObserver" in window && sections.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(l => {
            l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => navIo.observe(s));
  }

  /* -----------------------------------------------------------
     SCISSORS CUT DIVIDER — dispara ao entrar na viewport
  ------------------------------------------------------------ */
  const cuts = document.querySelectorAll(".scissors-cut");
  if ("IntersectionObserver" in window && cuts.length) {
    const cutIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-cutting");
          cutIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    cuts.forEach(el => cutIo.observe(el));
  } else {
    cuts.forEach(el => el.classList.add("is-cutting"));
  }

  /* -----------------------------------------------------------
     ANO NO FOOTER
  ------------------------------------------------------------ */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
