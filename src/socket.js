import { io } from "socket.io-client";

const serverURl = "http://172.104.174.187:4064";
// const serverURl = "http://localhost:3054";
const socket = io(serverURl);

//Event emitters.

export const emitData = (data) => {
    console.log('linux-logs event triggered!')
  socket.emit("linux-logs", data);
};

//Event listeners.

  socket.on("linux-logs",(d) => {
    // const {a, b} = d;
    console.log('listened data-logs event');
    // lines(b)
    // const myDiv = document.getElementById("data").innerHTML
    // document.getElementById("data").innerHTML = myDiv + a;
  })

