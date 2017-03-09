function loadJQuery(){
  var waitForLoad = function () {
    if (typeof jQuery != "undefined") {
      console.log("WhatNow loaded");
      queryWebsite()

    } else {
      var oScriptElem = document.createElement("script");
      oScriptElem.type = "text/javascript";
      oScriptElem.src = "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js";
      document.head.insertBefore(oScriptElem, document.head.getElementsByTagName("script")[0])
      window.setTimeout(waitForLoad, 500);
    }
   };
   window.setTimeout(waitForLoad, 500);
}

window.onload = loadJQuery;

function queryWebsite() {
  $(document).ready(function() {
    $.ajax({
      url: "http://localhost:4000/websites/find",
      context: document.body,
      method: "post",
      data: {
        url: window.location.origin,
        href: window.location.href
      }
    }).done(function(data) {
      $(".content-body p").append("<a href='#' class='whatsnow-paragraph'>+</a>");
    });
  });
}
