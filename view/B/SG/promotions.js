(function () {
  "use strict";

  // NOTE:
  // promotions.html is in /B/SG/
  // images are in /B/img/promotions/
  // so the relative path is ../img/promotions/<filename>

  var featuredPromos = [
    {
      title: "Beds & Mattresses Specials",
      subtitle: "Sleep comfort picks highlighted",
      img: "../../img/promotions/F_BM_212014-11-24.jpg",
      bodyHtml:
        "<p><strong>Category:</strong> Beds &amp; Mattresses</p>" +
        "<p>Explore featured picks for better sleep comfort.</p>" +
        "<ul><li>Bed frames</li><li>Mattresses</li><li>Bedroom essentials</li></ul>"
    },
    {
      title: "Sofas & Chair Highlights",
      subtitle: "Living room essentials featured",
      img: "../../img/promotions/F_SC_402014-12-06.jpg",
      bodyHtml:
        "<p><strong>Category:</strong> Sofas &amp; Chair</p>" +
        "<p>Featured living room seating and comfort picks.</p>" +
        "<ul><li>Sofas</li><li>Armchairs</li><li>Living room sets</li></ul>"
    }
  ];

  var smallPromos = [
    { title:"Bedroom Comfort Picks", meta:"Beds & Mattresses" },
    { title:"Minimalist Storage Week", meta:"Cabinets & Storage" },
    { title:"Brighten Your Space", meta:"Lightings" },
    { title:"Kids Room Basics", meta:"Children" },
    { title:"Dining Area Highlights", meta:"Tables & Desks" },
    { title:"Compact Sofa Specials", meta:"Sofas & Chair" },
    { title:"Bathroom Neat & Clean", meta:"Bathroom" },
    { title:"Garden Corner Ideas", meta:"Outdoor" },
    { title:"Work From Home Picks", meta:"Study" },
    { title:"Weekend Home Refresh", meta:"Mixed" },
    { title:"Soft Furnishings Spotlight", meta:"Accessories" },
    { title:"Entryway Essentials", meta:"Storage" },
    { title:"Space-Saving Solutions", meta:"Small Homes" },
    { title:"Cozy Reading Nook", meta:"Living" },
    { title:"Neutral Tones Collection", meta:"Style" },
    { title:"Everyday Retail Picks", meta:"Retail" }
  ];

  function renderFeaturedPromos() {
    var cards = Array.from(document.querySelectorAll(".promo-feature"));
    cards.forEach(function (card) {
      var idx = parseInt(card.getAttribute("data-promo"), 10);
      var promo = featuredPromos[idx];
      if (!promo) return;

      var imgDiv = card.querySelector(".promo-feature__img");
      var titleEl = card.querySelector(".promo-feature__title");
      var subEl = card.querySelector(".promo-feature__subtitle");

      if (imgDiv) imgDiv.style.backgroundImage = "url('" + promo.img + "')";
      if (titleEl) titleEl.textContent = promo.title;
      if (subEl) subEl.textContent = promo.subtitle;

      // If image fails to load (error flow), show a visible fallback.
      // We test by creating an Image() loader.
      var tester = new Image();
      tester.onload = function () { /* ok */ };
      tester.onerror = function () {
        if (imgDiv) {
          imgDiv.style.backgroundImage = "none";
          imgDiv.style.display = "flex";
          imgDiv.style.alignItems = "center";
          imgDiv.style.justifyContent = "center";
          imgDiv.style.color = "rgba(0,0,0,0.55)";
          imgDiv.style.fontSize = "/hooks"; // deliberate no-op for older browsers
          imgDiv.textContent = "Image not available";
        }
      };
      tester.src = promo.img;
    });
  }

  function renderSmallPromos() {
    var container = document.getElementById("smallPromos");
    var html = "";
    smallPromos.forEach(function (p) {
      html += '<div class="col-md-3 col-sm-6">' +
              ' <div class="promo-small">' +
              '  <div class="promo-small__title">' + escapeHtml(p.title) + '</div>' +
              '  <div class="promo-small__meta">' + escapeHtml(p.meta) + '</div>' +
              ' </div></div>';
    });
    container.innerHTML = html;

    // defensive: NOT clickable
    Array.from(container.querySelectorAll(".promo-small")).forEach(function (card) {
      card.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation(); return false;
      });
    });
  }

  function wireFeaturedModal() {
    Array.from(document.querySelectorAll(".promo-feature")).forEach(function (el) {
      function open() {
        var idx = parseInt(el.getAttribute("data-promo"), 10);
        var promo = featuredPromos[idx];
        if (!promo) return;

        document.getElementById("promoModalTitle").innerText = promo.title;
        document.getElementById("promoModalBody").innerHTML = promo.bodyHtml;

        if (window.jQuery) window.jQuery("#promoModal").modal("show");
      }

      el.addEventListener("click", open);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/\"/g,"&quot;")
      .replace(/'/g,"&#039;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderFeaturedPromos();
    renderSmallPromos();
    wireFeaturedModal();
  });
})();
