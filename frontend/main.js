// HTML Import error EventListener
// import OFFLINE from "./errorEventListner.js";
URL = "http://192.168.10.102:9999"

// messages = [
//   {
//     msg: "Hello, This is a test",
//     id: "11:32:45~19/11/2019~62.92.50.17",
// }]

let messages = []

async function postDB(url = URL, body ={}) {
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content_Type": "application/json"
    },
    body: JSON.stringify(body),
  })
  return response
}

let today = new Date();

function clear() {
    try {
      element = document.getElementById("app");
      element.remove();
    }
    catch (error) {
      // Do nothing
    }
}

async function add(url=URL) {
  message = document.querySelector("#msg").value
  if (message.trim() != "") {
    await postDB(URL, ({
      msg: document.querySelector("#msg").value,
      usr: get_id(),
    })).then(response => {
      update()
      console.log(response)
      if (response.status == 200 && message == 'clear') {
        clear()
      }
    })
    document.querySelector("#msg").value = ""
  }
}
let ip

function get_id() {
  let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  $.getJSON("http://jsonip.com", function (data) {
    ip = data.ip
  });

  if (ip != undefined) {
    return (time+"~"+date+"~"+ip)
      }
      return (time+"~"+date+"~LOCAL")
} 
// document.getElementById("msg").addEventListener("submit", add(document.querySelector("#msg").value))


async function getDB(url = URL) {
  const response = await fetch(url);
  console.log(response)
  const jsonData = await response.json();
  return jsonData;
}

async function update(url=URL){
  const DB = await getDB()
  let head_div = document.createElement('div');
  head_div.id = "app"
  let div = []

    for (let i = DB.messages.length - 1; i >= 0; i--) {  
      div[i] = document.createElement('div');
      
      let id = document.createElement('p');
      let content = document.createElement('p');

      id_body = document.createTextNode(DB.messages[i].id);
      content_body = document.createTextNode(DB.messages[i].msg);

      id.appendChild(id_body);
      id.id = "id"
      content.appendChild(content_body);
      content.id = "content"

      div[i].appendChild(id);
      div[i].appendChild(content);
      div[i].id = "message"

      head_div.appendChild(div[i])
      document.body.appendChild(head_div)
      clear()      
  }
  document.body.appendChild(head_div)
}

update()
