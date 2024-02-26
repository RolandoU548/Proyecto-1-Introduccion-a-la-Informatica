export const showToast = (texto, iconP = "") => {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  let icon = "";
  if (iconP == "check") {
    icon = '<i class="fa-solid fa-circle-check"></i>';
    toast.classList.add("check");
  } else if (iconP == "error") {
    icon = '<i class="fa-solid fa-circle-xmark"></i>';
    toast.classList.add("error");
  } else if (iconP == "warn") {
    icon = '<i class="fa-solid fa-circle-exclamation"></i>';
    toast.classList.add("warn");
  }
  toast.innerHTML = icon + " " + texto;
  let toastBox = document.querySelector("#toastBox");
  if (!toastBox) {
    let body = document.getElementsByTagName("body")[0];
    toastBox = document.createElement("div");
    toastBox.id = "toastBox";
    body.appendChild(toastBox);
  }
  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
};

export const findUser = (email) => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key == email) return JSON.parse(localStorage.getItem(key));
  }
  return false;
};

export const checkLogIn = () => {
  if (!(localStorage.getItem("logged") == "true")) {
    window.location.href = "../index.html";
  }
};

export const logIn = () => {
  localStorage.setItem("logged", "true");
  localStorage.setItem("loggedFirstTime", "true");
  window.location.href = "./private.html";
};

export const logOut = () => {
  localStorage.setItem("logged", "false");
  localStorage.setItem("loggedFirstTime", "false");
  window.location.href = "../index.html";
};
