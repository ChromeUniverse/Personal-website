function toggleMenu() {
  var x = document.getElementById("topbar-menu");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}