(function() {
  
  var unicodeData = null;
  var proto = location.protocol;
  
  function startup() {
    displayMsg("Fetching <span class='good'>UnicodeData.txt</span>...")
    var xhr = new XMLHttpRequest();
    xhr.onload = getData;
    xhr.open("GET", "../res/UnicodeData.txt", true);
    xhr.send();
  }
  
  function getData() {
    if (this.status != "200") {
      complainMsg("Error fetching the file!")
    }
    else {
      displayMsg("Fetched file successfully. Parsing...");
      parseData(this.responseText);
    }
  }
  
  function parseData(data) {
    var lines, splits;
    lines = data.match(/[^\r\n]+/g);
    unicodeData = {};
    for (var i = 0; i < lines.length; i++) {
      splits = lines[i].split(";");
      unicodeData[splits[0]] = splits.slice(1);
    }
    displayMsg("Ready");
    buttonEnabled(true);
  }
  
  function readText() {
    var ta, text;
    ta = document.getElementById("txt");
    if (!(text = ta.value)) {
      complainMsg("No text entered.");
      return;
    }
    displayMsg("Processing...")
    textareaEnabled(false);
    buttonEnabled(false);
    processText(text);
  }
  
  function processText(text) {
    var hex;
    for (var i = 0; i < text.length; i++) {
      hex = text.charCodeAt(i).toString(16);
      for (var j = 0; j < 4 - hex.length; j++) {
        hex = "0" + hex;
      }
      console.log(hex);
    }
    happyMsg("Done.")
    textareaEnabled(true);
    buttonEnabled(true);
  }
  
  function processTextVerbose(text) {
    //hi
  }
  
  function buttonEnabled(yn) {
    var btn = document.getElementById("btn");
    if (yn) {
      btn.removeAttribute("disabled");
    }
    else {
      btn.setAttribute("disabled", "");
    }
  }
  
  function textareaEnabled(yn) {
    var btn = document.getElementById("txt");
    if (yn) {
      btn.removeAttribute("readonly");
    }
    else {
      btn.setAttribute("readonly", "");
    }
  }
  
  function displayMsg(msg) {
    document.getElementById("msg-line").className = "msg";
    writeMsg(msg);
  }
  
  function happyMsg(msg) {
    document.getElementById("msg-line").className = "msg good";
    writeMsg(msg); 
  }
  
  function complainMsg(msg) {
    document.getElementById("msg-line").className = "msg bad";
    writeMsg(msg); 
  }
  
  function writeMsg(msg) {
    document.getElementById("msg-line").innerHTML = msg;
  }
  
  window.submitText = function() {
    readText();
  }
  
  addEventListener("DOMContentLoaded", startup);
  
}).call();
