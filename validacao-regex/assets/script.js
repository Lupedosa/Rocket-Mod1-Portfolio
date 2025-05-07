const form = document.getElementById("validaForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");

const nomeMsg = document.getElementById("nomeMsg");
const emailMsg = document.getElementById("emailMsg");
const cpfMsg = document.getElementById("cpfMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valido = true;

  const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  if (regexNome.test(nome.value.trim())) {
    nome.classList.add("valid-border");
    nome.classList.remove("invalid-border");
    nomeMsg.textContent = "Válido ✔️";
    nomeMsg.classList.remove("text-danger");
    nomeMsg.classList.add("text-success");
  } else {
    nome.classList.add("invalid-border");
    nome.classList.remove("valid-border");
    nomeMsg.textContent = "Inválido ❌";
    nomeMsg.classList.remove("text-success");
    nomeMsg.classList.add("text-danger");
    valido = false;
  }

  if (regexEmail.test(email.value.trim())) {
    email.classList.add("valid-border");
    email.classList.remove("invalid-border");
    emailMsg.textContent = "Válido ✔️";
    emailMsg.classList.remove("text-danger");
    emailMsg.classList.add("text-success");
  } else {
    email.classList.add("invalid-border");
    email.classList.remove("valid-border");
    emailMsg.textContent = "Inválido ❌";
    emailMsg.classList.remove("text-success");
    emailMsg.classList.add("text-danger");
    valido = false;
  }

  // Valida CPF
  if (regexCPF.test(cpf.value.trim())) {
    cpf.classList.add("valid-border");
    cpf.classList.remove("invalid-border");
    cpfMsg.textContent = "Válido ✔️";
    cpfMsg.classList.remove("text-danger");
    cpfMsg.classList.add("text-success");
  } else {
    cpf.classList.add("invalid-border");
    cpf.classList.remove("valid-border");
    cpfMsg.textContent = "Inválido ❌";
    cpfMsg.classList.remove("text-success");
    cpfMsg.classList.add("text-danger");
    valido = false;
  }

  if (valido) {
    alert("Todos os campos estão válidos!");
  }
});
