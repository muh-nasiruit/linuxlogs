import { io } from "socket.io-client";

const serverURl = "http://172.104.174.187:4064";
// const serverURl = "http://localhost:4064";
const socket = io(serverURl);

//Event emitters.

export const emitData = (data) => {
    console.log('linux-logs event triggered!')
  socket.emit("linux-logs", data);
};

//Event listeners.

export const listenerData = (lines) => {
  socket.on("linux-logs",(d) => {
    const {lineData} = d;
    console.log('listened data-logs event');
    // const myDiv = document.getElementById("data").innerHTML
    // document.getElementById("data").innerHTML = myDiv + a;
    lines(oldArr => [...oldArr, lineData])
  })
}

