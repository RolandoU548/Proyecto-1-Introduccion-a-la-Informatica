const usuario = { nombre: "juan", apellido: "beli" };
usuario.nombre;

const keyboardForm = document.querySelector(".keyboard__form");
const keyboard = document.querySelector(".keyboard");
const messageContainer = document.querySelector(".message__container");
const chat = document.querySelector(".chat");
const messageRegex = /^(P|p)agar \d{4} \d{11} \d+ \d+$/;
const phoneRegex = /^04(12|14|16|24|26)\d{7}$/;

const sendMessage = (message) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add("outgoing");
  messageDiv.innerHTML = message;
  messageContainer.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
};

const receiveMessage = (message) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add("incoming");
  messageDiv.innerHTML = message;
  messageContainer.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
};

receiveMessage(
  `El mensaje debe tener la siguiente estructura: "Pagar &lt;código de Banco del destinatario&gt;	&lt;número de teléfono del destinatario&gt; &lt;cédula del destinatario&gt; &lt;monto&gt;"`
);
receiveMessage(`Por ejemplo: "Pagar 0102 04240170091 27312039 30"`);
receiveMessage(`Envie el mensaje "Saldo" para consultar su saldo actual`);

const handleSubmit = (e) => {
  e.preventDefault();
  const userMessage = keyboard.value;
  const actualAmount = parseInt(localStorage.getItem("amountSMS"));
  keyboard.value = "";
  if (userMessage == "") {
    return false;
  }
  sendMessage(userMessage);
  setTimeout(() => {
    if (userMessage.toLowerCase() === "saldo") {
      receiveMessage(`Su saldo actual es: ${actualAmount},00bs`);
      return true;
    }
    if (!messageRegex.test(userMessage)) {
      receiveMessage(
        `El mensaje debe tener la siguiente estructura: "Pagar &lt;código de Banco del destinatario&gt;	&lt;número de teléfono del destinatario&gt; &lt;cédula del destinatario&gt; &lt;monto&gt;"`
      );
      receiveMessage(`Por ejemplo: "Pagar 0102 04240170091 27312039 30"`);
      return false;
    }
    const userMessages = userMessage.split(" ");
    if (!phoneRegex.test(userMessages[2])) {
      receiveMessage("Télefono Inválido");
      return false;
    }
    if (userMessages[3] < 1 || userMessages[3] > 33000000) {
      receiveMessage("Cédula Inválida");
      return false;
    }
    if (userMessages[4] < 1) {
      receiveMessage("Monto Inválido");
      return false;
    }
    if (userMessages[4] > 1000000) {
      receiveMessage("El monto máximo es de un millón");
      return false;
    }
    if (userMessages[4] > actualAmount) {
      receiveMessage(
        `Saldo insuficiente. Su saldo actual: ${actualAmount},00bs`
      );
      return false;
    }
    localStorage.setItem("amountSMS", actualAmount - userMessages[4]);
    receiveMessage(
      `Pago realizado con éxito. Código de Operación: ${generateOperationCode()}. Monto: ${
        userMessages[4]
      },00bs`
    );
  }, 1000);
};

keyboardForm.addEventListener("submit", handleSubmit);
