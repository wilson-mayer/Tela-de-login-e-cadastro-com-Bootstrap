const formCreateUser = document.getElementById("create-user");
const alertPlaceholder = document.getElementById("alert");
const rePasswordInput = document.getElementById("re-password");
const passwordInput = document.getElementById("password");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");

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

const velidateRepassword = () => {
  const password = passwordInput.value;
  const rePassword = rePasswordInput.value;

  if (password !== rePassword) {
    rePasswordInput.value = null;
    formCreateUser.classList.add("was-validated");
  }
};

formCreateUser.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    if (!formCreateUser.checkValidity()) {
      event.stopPropagation();

      appendAlert("Ops, check the fields!", "danger");
    }

    formCreateUser.classList.add("was-validated");
    if (formCreateUser.checkValidity()) {
      axios
        .post("http://localhost:3333/signup/crypto/", {
          name: userNameInput.value,
          email: emailInput.value,
          password: `${passwordInput.value}`,
        })
        .then(function (response) {
          // manipula o sucesso da requisição

          appendAlert("account created successfully", "primary");
          formCreateUser.classList.remove("was-validated");
          formCreateUser.reset();

          setTimeout(() => {
            window.location.href = "../login.html";
          }, 2000);
        })
        .catch(function (error) {
          // manipula erros da requisição
          console.error(error);
          appendAlert("OPS, conta não foi criada!", "danger");
          formCreateUser.classList.remove("was-validated");
        });
    }
  },
  false
);
