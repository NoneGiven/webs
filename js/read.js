"use strict";
(function() {
  var baseURL = "https://dl.dropboxusercontent.com/s/";
  var chapterInfo = [
    {
      "number": "1",
      "title": "One Punch",
      "pages": [
        "cadz9o1zrnftgjd/OPM_1_01.jpg",
        "tm10u82i6fisd8c/OPM_1_02-03.jpg",
        "dnccp9idmwlbj82/OPM_1_04.jpg",
        "1ppjf2cdj708zku/OPM_1_05.jpg",
        "q46jiur8xkmtrxv/OPM_1_06.jpg",
        "yf2ch4b9m9pxtyp/OPM_1_07.jpg",
        "b8n0t27zf0ruzt7/OPM_1_08.jpg",
        "efcfbrw4jzglpyz/OPM_1_09.jpg",
        "gtowm1j5qrtbgm5/OPM_1_10.jpg",
        "r4ajxgkmfzr0xa3/OPM_1_11.jpg",
        "a6znj0s5zsp5we4/OPM_1_12.jpg",
        "trzmatbr9s1rpdm/OPM_1_13.jpg",
        "xm05vuha9g3mdo6/OPM_1_14-15.jpg",
        "ng0x19z2r740hf5/OPM_1_16.jpg",
        "41yx5va4bwyk9i4/OPM_1_17.jpg",
        "d1pc2ruexmo8box/OPM_1_18-19.jpg",
        "98rx0erbl7boqnh/OPM_1_20-21.jpg",
        "9gsjxzy85na9h0q/OPM_1_22.jpg"
      ]
    }
  ]
  
  var lastChapter = chapterInfo.length;
  
  var currentChapter = 1;
  var currentPage = 1;
  var chapterSize = 1;
  
  var imageElement = null;
  
  function switchChapter(chapterIndex) {
    currentChapter = chapterIndex;
    chapterSize = chapterInfo[currentChapter].pages.length;
    loadPage(1);
  }
  
  function loadPage(pageIndex) {
    currentPage = pageIndex;
    imageElement.src = baseURL + chapterInfo[currentChapter].pages[currentPage];
  }
  
  function pageBack() {
    if (currentPage < 2) {
      if (currentChapter > 1) {
        switchChapter(currentChapter - 1);
      }
    }
    else {
      loadPage(currentPage - 1);
    }
  }
  
  function pageForward() {
    if (currentPage >= chapterSize) {
      if (currentChapter < lastChapter) {
        switchChapter(currentChapter + 1);
      }
    }
    else {
      loadPage(currentPage + 1);
    }
  }
  
  function keyCheck(e) {
    if (e.keyCode === 37) { // Left Arrow
      pageBack();
    }
    else if (e.keyCode === 39) { // Right Arrow
      pageForward();
    }
  }
  
  function setup() {
    document.removeEventListener("DOMContentLoaded", setup);
    imageElement = document.getElementById("image");
    document.getElementById("left").addEventListener("click", pageBack);
    document.getElementById("right").addEventListener("click", pageForward);
    document.addEventListener("keydown", keyCheck);
    loadPage(1);
  }
  
  document.addEventListener("DOMContentLoaded", setup);
}).call(this);
