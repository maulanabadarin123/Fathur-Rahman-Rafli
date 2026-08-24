(function () {
  // ---- menu mobile ----
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  // close mobile menu on link click
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

  // ---- smooth scroll & nav active ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-menu a");
  function updateActive() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", updateActive);
  window.addEventListener("load", updateActive);

  // ---- project data ----
  const projects = {
    1: {
      title: "Sistem Informasi Pengendalian Persediaan Barang",
      client: "CV Anugerah Kencana Mandiri",
      period: "September 2022 – Januari 2023",
      role: "Analis & Perancang Sistem",
      desc: "Melakukan interview bersama direktur instansi untuk memahami proses bisnis aliran barang masuk dan keluar gudang. Mengidentifikasi kebutuhan bisnis, merancang prototype desain sistem informasi pengendalian persediaan barang/produk, dan mempresentasikan hasil prototype kepada pegawai dan direktur.",
      tags: [
        "Business Analysis",
        "System Design",
        "UI/UX Prototype",
        "Requirement Analysis",
      ],
    },
    2: {
      title: "Sistem Informasi Penjualan Buah",
      client: "PT Sata Harum",
      period: "September 2023 – Agustus 2024",
      role: "Analis & Pengembang",
      desc: "Melakukan analisis bisnis terkait proses pemesanan buah kepada pelanggan. Wawancara dengan Manager Farm, menganalisis proses bisnis yang berjalan, merancang sistem dan fitur berdasarkan kebutuhan, serta merancang kode program berbasis web untuk sistem yang telah dianalisis.",
      tags: [
        "Business Analysis",
        "Requirement Analysis",
        "System Design",
        "Web Development",
      ],
    },
  };

  // ---- modal ----
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function openProject(id) {
    const data = projects[id];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
        <p><span class="font-medium">Klien / Organisasi:</span> ${data.client}</p>
        <p><span class="font-medium">Periode:</span> ${data.period}</p>
        <p><span class="font-medium">Peran:</span> ${data.role}</p>
        <div class="mt-2"><span class="font-medium">Deskripsi:</span><br>${data.desc}</div>
        <div class="mt-2 flex flex-wrap gap-1">
          ${data.tags.map((t) => `<span class="skill-tag text-[0.7rem]">${t}</span>`).join("")}
        </div>
        <div class="mt-4 pt-3 border-t border-[#e8e8e8] text-xs text-[#6b6b6b] flex items-center gap-2">
          <span class="inline-block w-4 h-4 bg-[#e0e0e0] rounded-sm"></span> Project preview (placeholder)
        </div>
      `;
    modal.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", function (e) {
      const id = this.dataset.project;
      openProject(id);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---- fade-in on scroll (intersection) ----
  const fadeEls = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.08 },
  );
  fadeEls.forEach((el) => observer.observe(el));
  // force visible if already visible
  setTimeout(() => {
    fadeEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add("visible");
    });
  }, 100);
})();
