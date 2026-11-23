/* Loads partials/header.html and partials/footer.html into every page.
   Needs a web server (GitHub Pages, Firebase, localhost); a small fallback shows if it can't load. */
(function () {
  var fallback = {
    header: '<header class="top"><a class="logo" href="index.html">Kapul<span>.</span></a><nav><a href="systems.html">Systems</a><a href="contact.html">Contact</a></nav></header>',
    footer: '<footer class="site"><p class="copy">© Kapul. <a href="contact.html">Contact</a></p></footer>'
  };
  function finish(el) {
    var y = el.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
    var page = location.pathname.split("/").pop() || "index.html";
    el.querySelectorAll("a[data-p]").forEach(function (a) {
      if (a.getAttribute("data-p") === page) a.setAttribute("aria-current", "page");
    });
  }
  document.querySelectorAll("[data-include]").forEach(function (el) {
    var name = el.getAttribute("data-include");
    fetch("partials/" + name + ".html")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) { el.innerHTML = html; finish(el); })
      .catch(function () { el.innerHTML = fallback[name] || ""; finish(el); });
  });

  var refined = document.createElement("script");
  refined.src = "js/refined.js";
  refined.defer = true;
  document.body.appendChild(refined);
})();
