function openMobileNav() {
  const closedMenuClass = "flex flex-col items-end my-4 text-cyan-500 md:hidden";
  const openMenuClass = "hidden flex flex-col items-end my-4 text-cyan-500";
  var menu = document.getElementById("menu");
  if (menu.className == openMenuClass) {
    menu.className = closedMenuClass;
  } else {
    menu.classList = openMenuClass;
  }
}