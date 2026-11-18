/* ------------------------------------------------------------------
   Site settings. Fill in your own links here; empty entries are hidden.
   No e-mail address is stored anywhere on this site. The contact form
   sends messages through a form service (see contact.html / README).
------------------------------------------------------------------- */
window.SITE = {
  links: {
    linkedin: "",   // e.g. "https://www.linkedin.com/in/your-name/"
    instagram: "https://www.instagram.com/felixwin2710/",
    github: "https://github.com/Felix-Winkler"
  },
  // Formspree endpoint, e.g. "https://formspree.io/f/abcdwxyz".
  // Leave empty to hide the form.
  formEndpoint: ""
};

(function () {
  document.documentElement.classList.remove("no-js");

  /* ---- contact page: links + form ---- */
  var linkBox = document.getElementById("social-links");
  if (linkBox) {
    var names = { linkedin: "LinkedIn", instagram: "Instagram", github: "GitHub" };
    Object.keys(names).forEach(function (k) {
      var url = window.SITE.links[k];
      if (!url) return;
      var a = document.createElement("a");
      a.href = url;
      a.textContent = names[k];
      a.target = "_blank";
      a.rel = "noopener noreferrer me";
      linkBox.appendChild(a);
    });
  }

  var form = document.getElementById("contact-form");
  var formSection = document.getElementById("form-section");
  if (form && formSection) {
    if (!window.SITE.formEndpoint) {
      formSection.hidden = true;
    } else {
      var status = document.getElementById("form-status");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        status.textContent = "Sending…";
        fetch(window.SITE.formEndpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        }).then(function (r) {
          if (r.ok) { form.reset(); status.textContent = "Thanks, your message was sent."; }
          else { status.textContent = "Something went wrong. Please try again later."; }
        }).catch(function () {
          status.textContent = "Something went wrong. Please try again later.";
        });
      });
    }
  }
})();
