function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const deviceType = navigator.userAgent;

const buttonsContainer = document.getElementById("buttons-container");
const phonepe = document.getElementById("phonepe");
const gpay = document.getElementById("gpay");
const paytm = document.getElementById("paytm");
const bhim = document.getElementById("bhim");

if (/iPhone/.test(deviceType)) {
  paytm.parentNode.removeChild(paytm);
  bhim.parentNode.removeChild(bhim);
} else if (/Android/.test(deviceType)) {
} else {
  removeAllChildNodes(buttonsContainer);
  const newDiv = document.createElement("h1");
  newDiv.innerHTML = "No available payment options";
  buttonsContainer.appendChild(newDiv);
}

let userObject = {};
let orderObject = {};

let paymentbtn = document.getElementsByClassName("paymentbutton");
let upiType = "";

let dialo = document.getElementById("dialo");

const openModal = (e) => {
  upiType = e.target.getAttribute("name");
  if (Object.keys(userObject).length === 0) {
    dialo.showModal();
  } else {
    console.log("ntg");
    var data = { phoneNumber: userObject.phoneNumber, amount: 599 };

    fetch(`localhost:8080/${upiType}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  console.log("khidesakbn", e.target.getAttribute("name"));
};

const closeModal = () => {
  dialo.close();
};

function toggle(button) {
  if (button.value == "OFF") {
    button.value = "ON";
    userObject["notifications"] = true;
  } else {
    button.value = "OFF";
    userObject["notifications"] = false;
  }
}

const buttonsList = document.getElementsByClassName("paymentbutton");
for (let i = 0; i < buttonsList.length; i++) {
  buttonsList[i].addEventListener("click", openModal);
}

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", () => {
  dialo.close();
});

document.getElementById("name").onchange = function () {
  onChangeName();
};
function onChangeName() {
  let x = document.getElementById("name");
  userObject["name"] = x.value;
  console.log(x.value);
}

document.getElementById("phoneNumber").onchange = function () {
  onChangePhoneNumber();
};
document.getElementById("subject").onchange = function () {
  onChangeSubject();
};
document.getElementById("email").onchange = function () {
  onChangeEmail();
};
document.getElementById("comments").onchange = function () {
  onChangeMessage();
};

function onChangePhoneNumber() {
  let x = document.getElementById("phoneNumber");
  console.log(x.value);
  userObject["phoneNumber"] = x.value;
}

function onChangeSubject() {
  let x = document.getElementById("subject");
  console.log(x.value);
  userObject["subject"] = x.value;
}

function onChangeEmail() {
  let x = document.getElementById("email");
  console.log(x.value);
  userObject["email"] = x.value;
}

function onChangeMessage() {
  let x = document.getElementById("comments");

  userObject["message"] = x.value;
  console.log(x.value);
}

const submitbtn = document.getElementById("submit");
submitbtn.addEventListener("click", function (e) {
  e.preventDefault();

  var data = { phoneNumber: userObject.phoneNumber, amount: 599 };

  fetch(`localhost:8080/${upiType}`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error:", error);
    });

  let x = document.getElementById("phoneNumber");
  document.getElementById("smsno").value = x.value;
  closeModal();
});

const sendsmsbtn = document.getElementById("sendsms");
sendsmsbtn.addEventListener("click", function (e) {
  e.preventDefault();

  fetch("localhost:8080/send", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error:", error);
    });
});
