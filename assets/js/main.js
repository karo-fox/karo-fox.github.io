function openMobileNav() {
  const closedMenuClass = "grid gap-4 grid-cols-1 justify-items-end my-4 text-slate-400 md:hidden";
  const openMenuClass = "hidden grid gap-4 grid-cols-1 justify-items-end my-4 text-slate-400";
  var menu = document.getElementById("menu");
  if (menu.className == openMenuClass) {
    menu.className = closedMenuClass;
  } else {
    menu.classList = openMenuClass;
  }
}