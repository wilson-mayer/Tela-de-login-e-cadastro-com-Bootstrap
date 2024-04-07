const formLoginUser = document.getElementById("login-user");
const alertPlaceholder = document.getElementById("alert");

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.innerHTML = "";
  }, 3000);
};

formLoginUser.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    if (!formLoginUser.checkValidity()) {
      event.stopPropagation();

      appendAlert("Ops, check the fields!", "danger");
    }

    formLoginUser.classList.add("was-validated");

    const email = formLoginUser.elements["login-input-login"].value;
    const password = formLoginUser.elements["password-input-login"].value;

    if (formLoginUser.checkValidity()) {
      axios
        .post("http://localhost:3333/login/", {
          email: email,
          password: password,
        })
        .then(function (response) {
          // manipula o sucesso da requisição

          appendAlert("login successful", "primary");
          formLoginUser.classList.remove("was-validated");

          sessionStorage.setItem("userLogged", email);
          sessionStorage.setItem("passLogged", response.data.password);
          formLoginUser.reset();

          setTimeout(() => {
            window.location.href = "../index.html";
          }, 1000);
        })
        .catch(function (error) {
          // manipula erros da requisição
          console.error(error);
          appendAlert("OPS, login ou senha errado!", "danger");
          formLoginUser.classList.remove("was-validated");
        });
    }
  },
  false
);

function checkUserLogged() {
  const user = sessionStorage.getItem("userLogged");
  if (user) {
    window.location.href = "../index.html";
  }
}

checkUserLogged();
