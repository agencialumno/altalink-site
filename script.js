document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "5521990862337";

  // 1. Ano atual no rodapé
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Controle do Cabeçalho e Menu Mobile
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMobileMenu = () => {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeMobileMenu();
    });
  }

  // 3. Catálogo Oficial de Logos dos Canais e Combos do Plano 1 GIGA (Fiel à arte)
  const ALL_32_CHANNELS = [
    { name: "Premiere", file: "premiere.png" },
    { name: "SporTV", file: "sportv.svg" },
    { name: "Combate", file: "combate.png" },
    { name: "Animal Planet", file: "animalplanet.webp" },
    { name: "Discovery", file: "discovery.png" },
    { name: "Universal+", file: "universal.png" },
    { name: "Sony One", file: "sonyone.jpg", darkBg: true },
    { name: "Telecine", file: "telecine.png" },
    { name: "ESPN", file: "espn.png" },
    { name: "GE TV", file: "getv.png" },
    { name: "TNT", file: "tnt.svg" },
    { name: "TNT Series", file: "tntseries.svg" },
    { name: "Megapix", file: "megapix.webp" },
    { name: "Multishow", file: "multishow.webp" },
    { name: "HGTV", file: "hgtv.webp" },
    { name: "GNT", file: "gnt.svg" },
    { name: "AMC", file: "amc.png" },
    { name: "Universal TV", file: "universaltv.png" },
    { name: "Studio Universal", file: "studiouniversal.png" },
    { name: "USA", file: "usa.svg" },
    { name: "TLC", file: "TLC.webp" },
    { name: "ID", file: "id.webp" },
    { name: "Space", file: "space.svg" },
    { name: "Food Network", file: "foodnetwork.webp" },
    { name: "Discovery Turbo", file: "turbo.webp" },
    { name: "TCM", file: "tcm.svg" },
    { name: "Discovery H&H", file: "h&h.png" },
    { name: "CNN Brasil", file: "CNN.png" },
    { name: "GloboNews", file: "globonews.png" },
    { name: "Gloob", file: "gloob.webp" },
    { name: "Discovery Kids", file: "discoverykids.webp" },
    { name: "Canal Off", file: "canaloff.png" }
  ];

  const GIGA_COMBOS = {
    internet: {
      whatsappName: "Só Internet (Sem TV)",
      badgeTitle: "⚡ PLANO SÓ INTERNET FIBRA",
      priceInt: "129",
      priceCents: ",90",
      totalChannels: 0,
      desc: "1 Giga de fibra óptica pura com Modem Wi-Fi 6 incluso. Selecione um combo acima caso queira incluir canais ao vivo e streamings.",
      channels: []
    },
    powerplay: {
      whatsappName: "Power Play (68 canais)",
      badgeTitle: "🎬 POWER PLAY • 68 CANAIS",
      priceInt: "139",
      priceCents: ",90",
      totalChannels: 68,
      desc: "Inclui 68 canais ao vivo e sob demanda: SporTV, ESPN, Megapix, Canal Off e muito mais.",
      channels: [
        { name: "SporTV", file: "sportv.svg" },
        { name: "ESPN", file: "espn.png" },
        { name: "Megapix", file: "megapix.webp" },
        { name: "Canal Off", file: "canaloff.png" }
      ]
    },
    esporte: {
      whatsappName: "Power Esporte Clube (71 canais)",
      badgeTitle: "⚽ POWER ESPORTE CLUBE • 71 CANAIS",
      priceInt: "169",
      priceCents: ",90",
      totalChannels: 71,
      desc: "Futebol ao vivo com Premiere incluso + GNT, SporTV, Universal+, Sony One e muito mais.",
      channels: [
        { name: "Premiere", file: "premiere.png" },
        { name: "GNT", file: "gnt.svg" },
        { name: "SporTV", file: "sportv.svg" },
        { name: "Universal+", file: "universal.png" },
        { name: "Sony One", file: "sonyone.jpg", darkBg: true }
      ]
    },
    elite: {
      whatsappName: "Power Elite (99 canais)",
      badgeTitle: "🏆 POWER ELITE • 99 CANAIS",
      priceInt: "199",
      priceCents: ",90",
      totalChannels: 99,
      desc: "Futebol ao vivo com Premiere, SporTV, Combate, Animal Planet, Discovery, Universal+, Sony One e muito mais.",
      channels: ALL_32_CHANNELS
    }
  };

  let currentComboKey = "elite";
  let isLogosExpanded = false;

  const comboButtons = document.querySelectorAll("#gigaComboOptions .combo-btn");
  const gigaPriceInt = document.getElementById("gigaPriceInt");
  const gigaPriceCents = document.getElementById("gigaPriceCents");
  const gigaComboTitle = document.getElementById("gigaComboTitle");
  const gigaComboDesc = document.getElementById("gigaComboDesc");
  const gigaLogosGrid = document.getElementById("gigaLogosGrid");
  const toggleAllLogosBtn = document.getElementById("toggleAllLogosBtn");
  const gigaWhatsappBtn = document.getElementById("gigaWhatsappBtn");

  const renderGigaCombo = (comboKey) => {
    const data = GIGA_COMBOS[comboKey];
    if (!data) return;

    if (gigaPriceInt) gigaPriceInt.textContent = data.priceInt;
    if (gigaPriceCents) gigaPriceCents.textContent = data.priceCents;
    if (gigaComboTitle) gigaComboTitle.textContent = data.badgeTitle;
    if (gigaComboDesc) gigaComboDesc.textContent = data.desc;

    if (gigaWhatsappBtn) {
      const msg = `Olá! Quero assinar o plano HIGH SPEED 1 GIGA + ${data.whatsappName} por R$ ${data.priceInt}${data.priceCents}/mês.`;
      gigaWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }

    if (!gigaLogosGrid) return;
    gigaLogosGrid.innerHTML = "";

    if (data.channels.length === 0) {
      if (toggleAllLogosBtn) toggleAllLogosBtn.style.display = "none";
      const notice = document.createElement("div");
      notice.className = "internet-only-notice";
      notice.textContent = "Sem pacotes de TV neste plano. Clique em Power Play, Esporte ou Elite acima para ver os canais.";
      gigaLogosGrid.appendChild(notice);
      return;
    }

    const previewLimit = 7;
    const hasMoreToExpand = data.channels.length > previewLimit;

    if (toggleAllLogosBtn) {
      toggleAllLogosBtn.style.display = hasMoreToExpand ? "inline-block" : "none";
      toggleAllLogosBtn.textContent = isLogosExpanded
        ? "Recolher grade"
        : `Ver todos (${data.channels.length})`;
    }

    const visibleChannels = isLogosExpanded
      ? data.channels
      : data.channels.slice(0, previewLimit);

    visibleChannels.forEach((ch) => {
      const item = document.createElement("div");
      item.className = ch.darkBg ? "channel-logo-item dark-logo" : "channel-logo-item";
      item.title = ch.name;

      const img = document.createElement("img");
      img.src = ch.file;
      img.alt = ch.name;
      img.loading = "lazy";

      item.appendChild(img);
      gigaLogosGrid.appendChild(item);
    });

    const remainingCount = data.totalChannels - visibleChannels.length;
    if (remainingCount > 0) {
      const moreTile = document.createElement("div");
      moreTile.className = "channel-logo-more";
      moreTile.innerHTML = `<span>+${remainingCount} canais</span>`;
      gigaLogosGrid.appendChild(moreTile);
    }
  };

  comboButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      comboButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentComboKey = btn.dataset.combo;
      isLogosExpanded = false;
      renderGigaCombo(currentComboKey);
    });
  });

  if (toggleAllLogosBtn) {
    toggleAllLogosBtn.addEventListener("click", () => {
      isLogosExpanded = !isLogosExpanded;
      renderGigaCombo(currentComboKey);
    });
  }

  // Inicializa a grade do combo Power Elite por padrão
  renderGigaCombo(currentComboKey);

  // 4. Formulário de Consulta de Cobertura -> WhatsApp
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

  // 5. Accordion de Perguntas Frequentes (FAQ)
  const accordionItems = document.querySelectorAll("#faqAccordion .accordion-item");
  accordionItems.forEach((item) => {
    const headerBtn = item.querySelector(".accordion-header");
    headerBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      accordionItems.forEach((el) => el.classList.remove("active"));
      if (!isOpen) item.classList.add("active");
    });
  });

  // 6. Animação de Revelação Suave (Scroll Reveal)
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
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});