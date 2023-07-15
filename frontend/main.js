// HTML Import error EventListener
// import OFFLINE from "./errorEventListner.js";
const IP_ADDRESS = "" // Enter IP Address as str without subnet | ex: "192.168.0.1"
const PORT = "8080"
const URL = "http://" + IP_ADDRESS + ":" + PORT

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
  try { 
    const response = await fetch(url);
    console.log(response)
    const jsonData = await response.json();
    return jsonData;
  } catch {
    return undefined
  }
}

async function update(url=URL){
  let DB = await getDB()

  console.log(DB)

  if (DB == undefined) {
    DB = {
      messages: [
        {id:'', msg:''},
        {id:'', msg:''},
        {id:'', msg:''}
      ]
    }
    DB.messages[0].id = "ERROR";
    DB.messages[0].msg = "Cannot find backend server"

    DB.messages[1].id = "Suggestion";
    DB.messages[1].msg = "Make sure 'chatroom/backend/httpserver.py' is running";

    DB.messages[2].id = "Suggestion";
    DB.messages[2].msg = "IP_ADDRESS variable in chatroom/frontend/main.js might be wrong, double check you use the same address and port number as httpserver.py";
  }

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

