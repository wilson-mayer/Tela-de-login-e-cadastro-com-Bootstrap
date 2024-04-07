function checkUserLogged() {
  const user = sessionStorage.getItem("userLogged");
  if (!user) {
    window.location.href = "../login.html";
  }
}

checkUserLogged();
