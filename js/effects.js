/* Splash screen (home page, once per visit) and the animated network background. */
(function () {
  var s = document.getElementById("splash");
  if (s) {
    var seen = false;
    try { seen = sessionStorage.getItem("splash") === "1"; sessionStorage.setItem("splash", "1"); } catch (e) {}
    if (seen) { s.remove(); } else {
      var t = Date.now(), hid = false;
      var hide = function () { if (hid) return; hid = true; s.classList.add("done"); setTimeout(function () { s.remove(); }, 600); };
      var go = function () { setTimeout(hide, Math.max(0, 1600 - (Date.now() - t))); };
      if (document.readyState === "complete") go(); else addEventListener("load", go);
      setTimeout(hide, 4000);
    }
  }

  var c = document.getElementById("net");
  if (!c) return;
  var x = c.getContext("2d"), N = [], P = [], W = 0, H = 0, f = 0,
      D = Math.min(window.devicePixelRatio || 1, 2), col = "#2547d0", sig = "#f5b50a",
      rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function size() {
    W = innerWidth; H = innerHeight; c.width = W * D; c.height = H * D; x.setTransform(D, 0, 0, D, 0, 0);
    var n = Math.round(W * H / 22000); N = []; P = [];
    for (var i = 0; i < n; i++) N.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 });
  }
  function tone() { var v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(); if (v) col = v; }
  function draw() {
    f++; if (f % 120 === 1) tone();
    x.clearRect(0, 0, W, H); x.lineWidth = 1;
    for (var i = 0; i < N.length; i++) {
      var a = N[i];
      if (!rm) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
      for (var j = i + 1; j < N.length; j++) {
        var b = N[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
        if (d < 22500) {
          x.globalAlpha = (1 - d / 22500) * .35; x.strokeStyle = col;
          x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
          if (!rm && Math.random() < .0008 && P.length < 14) P.push({ a: a, b: b, t: 0 });
        }
      }
      x.globalAlpha = .6; x.fillStyle = col; x.beginPath(); x.arc(a.x, a.y, 2, 0, 6.3); x.fill();
    }
    x.fillStyle = sig; x.globalAlpha = 1;
    for (var k = P.length - 1; k >= 0; k--) {
      var p = P[k]; p.t += .02;
      if (p.t >= 1) { P.splice(k, 1); continue; }
      x.beginPath(); x.arc(p.a.x + (p.b.x - p.a.x) * p.t, p.a.y + (p.b.y - p.a.y) * p.t, 3, 0, 6.3); x.fill();
    }
    if (!rm) requestAnimationFrame(draw);
  }
  size(); tone(); draw();
  addEventListener("resize", function () { if (innerWidth !== W) { size(); if (rm) draw(); } });
})();
