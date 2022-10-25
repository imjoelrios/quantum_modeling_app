const express = require("express");
const { spawn } = require("child_process");
var cors = require("cors");

const server = express(); // Create a server
const port = 9000; // Port to listen on
server.use(cors());
server.use(express.static(__dirname));

// ========= ROUTES =========

// GET
server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.get("/get_test", (req, res) => {
  res.send("GET Test!");
});
server.get("/julia", (req, res) => {
  var dataToSend;
  const julia_script = spawn("julia", ["test.jl"]); // spawn new child process to call the julia_script script

  // collect data from script
  julia_script.stdout.on("data", function (data) {
    console.log("Pipe data from julia script ...");
    dataToSend = data.toString();
  });

  // in close event we are sure that stream from child process is closed
  julia_script.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend); // send data to browser
  });
});
server.get("/python", (req, res) => {
  var dataToSend;
  console.log("Python script called");
  const julia_script = spawn("python", ["test.py"]); // spawn new child process to call the julia_script script
  // // collect data from script
  // julia_script.stdout.on("data", function (data) {
  //   console.log("Pipe data from python script ...");
  //   dataToSend = data.toString();
  // });

  // // in close event we are sure that stream from child process is closed
  // julia_script.on("close", (code) => {
  //   console.log(`child process close all stdio with code ${code}`);
  //   res.send(dataToSend); // send data to browser
  // });
});

// ============= POST =============
server.post("/tunneling", (req, res) => {
  // use req.body to get the data sent from the client

  var phenomena = req.body.phenomena; // the phenomena to be used (e.g. tunneling, interference, etc.)
  var num1 = req.body.var1; //
  var num2 = req.body.var2;

  var img_to_send;

  // spawn new child process to call the julia script
  const julia_script = spawn("julia_script", ["script2.py", "arg1", "arg2"]); // spawn new child process to call the julia_script script

  // get GIF/img from script

  // in close event we are sure that stream from child process is closed
  julia_script.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(img_to_send); // send data to browser
  });
});
server.post("/interference", (req, res) => {});
server.post("/spin", (req, res) => {});
server.post("/wave_function", (req, res) => {});
server.post("/potential_barrier", (req, res) => {});
server.post("/post_test", (req, res) => {
  console.log("POST Test!");
  res.send("POST Test!");
});
server.post("/julia_test", (req, res) => {
  const julia_script = spawn("julia", ["test.jl"]); // spawn new child process to call the julia_script script

  // in close event we are sure that stream from child process is closed
  julia_script.on("close", (code) => {
    console.log(`Julia child process close all stdio with code ${code}`);
    // send image to browser
    // res.send(dataToSend); // send data to browser
    res.send("julia script works!"); // send data to browser
  });
});

// ============= LISTEN =============
server.listen(port, () =>
  console.log(`Example server listening on port ${port}!`)
);
