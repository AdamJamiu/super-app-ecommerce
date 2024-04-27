const dropdown = document.getElementById("dropdown");
const profileMenu = document.querySelector(".profile__menu");

window.addEventListener("DOMContentLoaded", function () {
  /* Show and hide user navigation menu */
  if (dropdown) {
    dropdown.addEventListener("click", function () {
      profileMenu.classList.toggle("show");
    });

    /* Hide user navigation menu when target loses focus */
    document.addEventListener("click", (e) => {
      if (!profileMenu.contains(e.target) && !dropdown.contains(e.target)) {
        profileMenu.classList.remove("show");
      }
    });
  }
});
