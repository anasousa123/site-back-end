import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD383cNYT1V1aC2mT72kadQJtqGBi_kMyw",
  authDomain: "site-back-end.firebaseapp.com",
  databaseURL: "https://site-back-end-default-rtdb.firebaseio.com",
  projectId: "site-back-end",
  storageBucket: "site-back-end.firebasestorage.app",
  messagingSenderId: "1097058815178",
  appId: "1:1097058815178:web:d65b9e7d7d6f565db37833"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("form-recado");
const lista = document.getElementById("lista-recados");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const autor = document.getElementById("autor").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!autor || !turma || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  push(ref(db, "recados"), {
    autor,
    turma,
    mensagem
  });

  form.reset();
});

onValue(ref(db, "recados"), (snapshot) => {
  lista.innerHTML = "";

  if (!snapshot.exists()) {
    lista.innerHTML = "<p>Nenhum recado cadastrado ainda.</p>";
    return;
  }

  snapshot.forEach((item) => {
    const dados = item.val();

    lista.innerHTML += `
      <div class="recado">
        <strong>${dados.autor}</strong> - ${dados.turma}
        <p>${dados.mensagem}</p>
        <button onclick="removerRecado('${item.key}')">Excluir</button>
      </div>
    `;
  });
});

window.removerRecado = function (id) {
  remove(ref(db, "recados/" + id));
};