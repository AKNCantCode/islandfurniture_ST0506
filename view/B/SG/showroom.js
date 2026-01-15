(function () {
  "use strict";

  var viewport = document.getElementById("roomViewport");
  var hoverCard = document.getElementById("hoverCard");
  var roomBg = document.getElementById("roomBg");
  var roomFallback = document.getElementById("roomFallback");

  // showroom.html is /view/B/SG/
  // images are /view/img/showroom/
  // => relative path: ../../img/showroom/<filename>
  var roomImages = {
    living: "../../img/showroom/livingroom.png",
    bedroom: "../../img/showroom/bedroom.png",
    study: "../../img/showroom/study.png",
    kitchen: "../../img/showroom/kitchen.png",
    bathroom: "../../img/showroom/bathroom.png",
    garden: "../../img/showroom/garden.png"
  };

  /**
   * Hotspot coordinates are normalized to the IMAGE (not the viewport):
   * x,y,w,h are in [0..1] relative to the image width/height.
   * JS will map them onto the actual drawn image area inside the viewport.
   */
  var rooms = {
    living: {
      items: [
        { label: "Rug", name: "SOFTWEAVE Rug", price: "$99", dim: "160 x 230 cm", x: 0.3250, y: 0.2344, w: 0.4875, h: 0.5781 },
        { label: "Sofa", name: "LUNAR 3-Seater Sofa", price: "$899", dim: "210 x 90 x 85 cm", x: 0.7750, y: 0.1250, w: 0.2125, h: 0.7500 },
        { label: "TV Console", name: "NOVA TV Console", price: "$329", dim: "160 x 40 x 50 cm", x: 0.1188, y: 0.1875, w: 0.0938, h: 0.4688 },
        { label: "Coffee Table", name: "ARC Coffee Table", price: "$159", dim: "110 x 55 x 42 cm", x: 0.6375, y: 0.4219, w: 0.1250, h: 0.2344 }
      ]
    },

    bedroom: {
      items: [
        { label: "Bed", name: "CLOUD Queen Bedframe", price: "$599", dim: "160 x 200 cm", x: 0.2778, y: 0.1429, w: 0.4657, h: 0.6429 },
        { label: "Nightstand", name: "LITE Nightstand", price: "$89", dim: "45 x 40 x 55 cm", x: 0.0572, y: 0.0408, w: 0.1879, h: 0.2041 },
        { label: "Nightstand", name: "LITE Nightstand", price: "$89", dim: "45 x 40 x 55 cm", x: 0.7516, y: 0.0408, w: 0.1879, h: 0.2041 },
        { label: "Console", name: "SLIM Bedroom Console", price: "$129", dim: "140 x 30 x 45 cm", x: 0.1144, y: 0.8367, w: 0.7680, h: 0.1224 }
      ]
    },

    study: {
      items: [
        { label: "Bookshelf", name: "STACK Bookshelf Set", price: "$299", dim: "Set of 2", x: 0.0714, y: 0.0204, w: 0.8571, h: 0.2245 },
        { label: "Chair", name: "ERGON Task Chair", price: "$129", dim: "60 x 60 x 95 cm", x: 0.3776, y: 0.2449, w: 0.2449, h: 0.1837 },
        { label: "Desk", name: "WORKPRO Desk", price: "$249", dim: "140 x 70 x 75 cm", x: 0.1633, y: 0.3878, w: 0.7959, h: 0.2857 },
        { label: "Sofa", name: "COMPACT 2-Seater Sofa", price: "$399", dim: "160 x 85 x 80 cm", x: 0.1633, y: 0.7143, w: 0.6735, h: 0.2449 }
      ]
    },

    kitchen: {
      items: [
        { label: "Cabinets", name: "WALL Cabinet Set", price: "$499", dim: "(set) 300 x 60 cm", x: 0.0400, y: 0.0000, w: 0.9200, h: 0.1795 },
        { label: "Counter", name: "PREP Kitchen Island", price: "$289", dim: "180 x 70 x 90 cm", x: 0.1000, y: 0.4435, w: 0.8000, h: 0.1478 },
        { label: "Stools", name: "BAR Stool (Set)", price: "$177", dim: "3 x (40 x 40 x 75 cm)", x: 0.3500, y: 0.5913, w: 0.3500, h: 0.1267 },
        { label: "Side Counter", name: "SIDE Countertop", price: "$199", dim: "Approx. 120 x 60 cm", x: 0.0000, y: 0.0000, w: 0.2500, h: 0.2323 }
      ]
    },

    bathroom: {
      items: [
        { label: "Bathtub", name: "SOAK Bathtub", price: "$699", dim: "170 x 75 x 55 cm", x: 0.0000, y: 0.0881, w: 0.6757, h: 0.3524 },
        { label: "Toilet", name: "CLEAN Toilet", price: "$199", dim: "70 x 40 x 75 cm", x: 0.6892, y: 0.0000, w: 0.1351, h: 0.2643 },
        { label: "Sink", name: "BASIN Sink", price: "$149", dim: "60 x 40 x 15 cm", x: 0.0946, y: 0.5947, w: 0.3243, h: 0.3965 },
        { label: "Storage", name: "CLEAN Storage Cabinet", price: "$219", dim: "120 x 45 x 60 cm", x: 0.6216, y: 0.6167, w: 0.2432, h: 0.3304 }
      ]
    },

    garden: {
      items: [
        { label: "Umbrella", name: "PATIO Umbrella", price: "$89", dim: "Dia 220 cm", x: 0.2400, y: 0.0772, w: 0.3200, h: 0.3528 },
        { label: "Outdoor Sofa", name: "PATIO Corner Sofa", price: "$499", dim: "220 x 160 x 80 cm", x: 0.6800, y: 0.0662, w: 0.3000, h: 0.1985 },
        { label: "Outdoor Table", name: "PATIO Coffee Table", price: "$129", dim: "80 x 80 x 45 cm", x: 0.7100, y: 0.2150, w: 0.1350, h: 0.1488 },
        { label: "Grill", name: "BBQ Grill", price: "$199", dim: "120 x 55 x 110 cm", x: 0.7000, y: 0.8379, w: 0.1200, h: 0.1323 }
      ]
    }
  };

  function getRoomFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var room = (params.get("room") || "living").toLowerCase();
    return rooms[room] ? room : "living";
  }

  function clearHotspots() {
    Array.from(viewport.querySelectorAll(".room-hotspot")).forEach(function (n) { n.remove(); });
  }

  /**
   * Compute the rendered image rect inside the viewport with object-fit: contain.
   * Returns { left, top, width, height } in viewport pixels.
   */
  function getContainedImageRect() {
    var vw = viewport.clientWidth;
    var vh = viewport.clientHeight;

    var iw = roomBg.naturalWidth;
    var ih = roomBg.naturalHeight;

    if (!iw || !ih || !vw || !vh) {
      return { left: 0, top: 0, width: vw, height: vh };
    }

    var scale = Math.min(vw / iw, vh / ih);
    var drawnW = iw * scale;
    var drawnH = ih * scale;

    var offsetX = (vw - drawnW) / 2;
    var offsetY = (vh - drawnH) / 2;

    return { left: offsetX, top: offsetY, width: drawnW, height: drawnH };
  }

  function createHotspots(roomKey) {
    var room = rooms[roomKey];
    if (!room) return;

    clearHotspots();

    var rect = getContainedImageRect();

    room.items.forEach(function (item) {
      var el = document.createElement("div");
      el.className = "room-hotspot";

      el.setAttribute("data-label", item.label);
      el.setAttribute("data-name", item.name);
      el.setAttribute("data-price", item.price);
      el.setAttribute("data-dim", item.dim);

      // map normalized coords -> actual drawn image pixels within viewport
      el.style.left = (rect.left + item.x * rect.width) + "px";
      el.style.top = (rect.top + item.y * rect.height) + "px";
      el.style.width = (item.w * rect.width) + "px";
      el.style.height = (item.h * rect.height) + "px";

      // clicking does nothing (requirement)
      el.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation(); return false;
      });

      el.addEventListener("mouseenter", function () { showHover(el); });
      el.addEventListener("mouseleave", hideHover);
      el.addEventListener("mousemove", moveHover);

      viewport.appendChild(el);
    });
  }

  function setBackgroundAndHotspots(roomKey) {
    roomFallback.style.display = "none";
    roomBg.style.display = "block";

    roomBg.onload = function () {
      createHotspots(roomKey);
    };

    roomBg.onerror = function () {
      roomBg.style.display = "none";
      roomFallback.style.display = "flex"; // Error flow E1
      clearHotspots();
      hideHover();
    };

    roomBg.src = roomImages[roomKey];
  }

  // If user resizes window, reflow hotspots to stay aligned
  function onResize() {
    var current = getRoomFromUrl();
    // Only reflow if image is loaded successfully
    if (roomBg && roomBg.naturalWidth && roomBg.naturalHeight && roomBg.style.display !== "none") {
      createHotspots(current);
    }
  }

  function showHover(el) {
    if (!hoverCard) return; // Error flow E2: do nothing

    hoverCard.innerHTML =
      '<div class="title">' + escapeHtml(el.getAttribute("data-name")) + '</div>' +
      '<div class="meta">Price: ' + escapeHtml(el.getAttribute("data-price")) + '</div>' +
      '<div class="meta">Dimensions: ' + escapeHtml(el.getAttribute("data-dim")) + '</div>';

    hoverCard.style.display = "block"; // instant
    hoverCard.setAttribute("aria-hidden", "false");
  }

  function hideHover() {
    if (!hoverCard) return;
    hoverCard.style.display = "none";
    hoverCard.setAttribute("aria-hidden", "true");
  }

  function moveHover(evt) {
    if (!hoverCard) return;

    var rect = viewport.getBoundingClientRect();
    var x = evt.clientX - rect.left + 14;
    var y = evt.clientY - rect.top + 14;

    var w = hoverCard.offsetWidth || 220;
    var h = hoverCard.offsetHeight || 80;

    if (x + w > rect.width) x = rect.width - w - 10;
    if (y + h > rect.height) y = rect.height - h - 10;

    hoverCard.style.left = Math.max(10, x) + "px";
    hoverCard.style.top = Math.max(10, y) + "px";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var roomKey = getRoomFromUrl();
    setBackgroundAndHotspots(roomKey);
    window.addEventListener("resize", onResize);
  });
})();
