document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "5521990862337";

  // 1. Ano atual no rodapé
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Efeito de scroll no cabeçalho e menu mobile
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // 3. Seletor Interativo de Combos TV no Plano HIGH SPEED 1 GIGA
  const comboButtons = document.querySelectorAll("#gigaComboOptions .combo-btn");
  const gigaPriceInt = document.getElementById("gigaPriceInt");
  const gigaPriceCents = document.getElementById("gigaPriceCents");
  const gigaComboDesc = document.getElementById("gigaComboDesc");
  const gigaWhatsappBtn = document.getElementById("gigaWhatsappBtn");

  comboButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      comboButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const comboName = btn.dataset.name;
      const priceInt = btn.dataset.int;
      const priceCents = btn.dataset.cents;
      const comboDesc = btn.dataset.desc;

      if (gigaPriceInt) gigaPriceInt.textContent = priceInt;
      if (gigaPriceCents) gigaPriceCents.textContent = priceCents;
      if (gigaComboDesc) gigaComboDesc.textContent = comboDesc;

      if (gigaWhatsappBtn) {
        const message = `Olá! Quero assinar o plano HIGH SPEED 1 GIGA + ${comboName} por R$ ${priceInt}${priceCents}/mês.`;
        gigaWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      }
    });
  });

  // 4. Filtro de Categorias na Grade de Canais Alta TV
  const filterChips = document.querySelectorAll("#channelFilters .filter-chip");
  const channelTiles = document.querySelectorAll("#channelsGrid .channel-tile");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const selectedCategory = chip.dataset.filter;

      channelTiles.forEach((tile) => {
        if (selectedCategory === "all" || tile.dataset.cat === selectedCategory) {
          tile.classList.remove("hidden");
        } else {
          tile.classList.add("hidden");
        }
      });
    });
  });

  // 5. Formulário de Consulta de Cobertura -> WhatsApp
  const coverageForm = document.getElementById("coverageForm");
  if (coverageForm) {
    coverageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("clientName").value.trim();
      const address = document.getElementById("clientAddress").value.trim();
      const plan = document.getElementById("clientPlan").value;

      const text =
        `Olá, Alta Link! Meu nome é *${name}*.\n` +
        `Gostaria de consultar a disponibilidade de fibra óptica no endereço/CEP: *${address}*.\n` +
        `Plano de interesse: *${plan}*.`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }

  // 6. Accordion de Perguntas Frequentes (FAQ)
  const accordionItems = document.querySelectorAll("#faqAccordion .accordion-item");
  accordionItems.forEach((item) => {
    const headerBtn = item.querySelector(".accordion-header");
    headerBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      accordionItems.forEach((el) => el.classList.remove("active"));
      if (!isOpen) item.classList.add("active");
    });
  });

  // 7. Animação de Revelação Suave (Scroll Reveal)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});