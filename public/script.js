console.log("js is working");

const ul = document.querySelector("#addchat");
const sendbtn = document.querySelector("#send");
const usermessage = document.querySelector("#usermessage");
const lodingtag = document.querySelector("#loading");
const hallow = document.querySelector("#h-allow");
lodingtag.style.display = "none";

// handle when the user submits a question through the form
async function chatboldapi(message) {
  usermessage.value = "";
  // input validation
  if (!message) {
    return alert("Please enter your support question");
  }

  lodingtag.style.display = "block";

  // send fetch request to our backend endpoint
  const response = await fetch("/apiv1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  // parse our server's response as json
  const payload = await response.json();
  console.log("payload :", payload);

  // return the response
  return payload;
}

const datashow = async () => {
  const messageDiv = document.createElement("div");
  const atext = `
    <div class="flex w-full items-end flex-col">
    <li class="text-white bg-blue-700 py-1 px-3 w-fit rounded-md mb-5 sm:text-lg float-right">
                      ${usermessage.value}
  <i class='bx bxs-user pl-1' ></i></li> </div>`;
  messageDiv.innerHTML = atext;
  ul.appendChild(messageDiv);

  let userlanguage = "";

  if (hallow.checked) {
    userlanguage = "hindi";
  }

  const objsend = {
    message: usermessage.value,
    language: userlanguage,
  };
  const data = await chatboldapi(objsend);
  console.log("data :", data);
  copyText = data.message;
  lodingtag.style.display = "none";
  ul.innerHTML += `
  <li id='myget' class="text-white bg-blue-700 py-1 px-3 w-fit rounded-md mb-5 sm:text-lg text-[14px]">
          <i class='bx bxs-message-square-dots bx-sm pr-1'></i> ${data.message}
          <div class="text-sm text-slate-300 pt-1 flex justify-between">
          <div><i class='bx bx-time-five bx-spin'></i> Timing :- ${data.timeing}</div>
          <div><button data-clipboard-text="${data.message}" class='bx bx-copy'></button></div>
          </div>
        </li>`;

   const myget = document.querySelector("#myget");
   myget.ltw1i
};

sendbtn.addEventListener("click", datashow);
