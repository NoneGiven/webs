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
      for (var j = 0; j < splits.length; j++) {
        splits[j] = splits[j].replace(/>/g, "&gt;").replace(/</g, "&lt;")
      }
      unicodeData[splits[0]] = splits.slice(1);
    }
    displayMsg("Ready");
    buttonEnabled(true);
    checkboxEnabled(true);
  }
  
  function readText() {
    var ta, text;
    displayRes("");
    ta = document.getElementById("txt");
    if (!(text = ta.value)) {
      complainMsg("No text entered.");
      return;
    }
    displayMsg("Processing...")
    textareaEnabled(false);
    buttonEnabled(false);
    if (isCheckboxTicked()) {
      processTextVerbose(text);
    }
    else {
      processText(text);
    }
  }
  
  function processText(text) {
    var hex, attr, s;
    s = "";
    for (var i = 0; i < text.length; i++) {
      hex = text.charCodeAt(i).toString(16).toUpperCase();
      while (hex.length < 4) {
        hex = "0" + hex;
      }
      attr = unicodeData[hex];
      if (attr == null) {
        s += "<br>Could not find data for U+" + hex + ".";
        continue;
      }
      if (attr[0] == "&lt;control&gt;") {
        s += "<br>&nbsp;&nbsp;- U+" + hex + " - " + attr[9] + " &lt;control&gt;";
      }
      else {
        s += "<br>" + text.charAt(i) + " - U+" + hex + " - " + attr[0];
      }
    }
    happyMsg("Done.")
    displayRes(s);
    textareaEnabled(true);
    buttonEnabled(true);
  }
  
  function processTextVerbose(text) {
    var hex, attr, s;
    s = "";
    for (var i = 0; i < text.length; i++) {
      hex = text.charCodeAt(i).toString(16).toUpperCase();
      while (hex.length < 4) {
        hex = "0" + hex;
      }
      attr = unicodeData[hex];
      if (attr == null) {
        s += "<br>Could not find data for U+" + hex + ".";
        continue;
      }
      if (attr[0] == "&lt;control&gt;") {
        s += "<br>&nbsp;&nbsp;- U+" + hex + " - " + attr[9] + " &lt;control&gt;";
      }
      else {
        s += "<br>" + text.charAt(i) + " - U+" + hex + " - " + attr[0];
      }
      for (var i = 1; i < 14; i++) {
        if (i == 9 || attr[i] == "") {
          continue;
        }
        s += "<br>&nbsp;&nbsp;" + attr[i];
      }
    }
    happyMsg("Done.")
    displayRes(s);
    textareaEnabled(true);
    buttonEnabled(true);
  }
  
  function isCheckboxTicked(yn) {
    return document.getElementById("chk").checked;
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
  
  function checkboxEnabled(yn) {
    var chk = document.getElementById("chk");
    if (yn) {
      chk.removeAttribute("disabled");
    }
    else {
      chk.setAttribute("disabled", "");
    }
  }
  
  function textareaEnabled(yn) {
    var txt = document.getElementById("txt");
    if (yn) {
      txt.removeAttribute("readonly");
    }
    else {
      txt.setAttribute("readonly", "");
    }
  }
  
  function displayRes(res) {
    document.getElementById("msg-res").innerHTML = res;
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
