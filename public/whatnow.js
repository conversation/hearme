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
        href: window.location.href,
        body: $(".content-body").html(),
        title: $("h1").text().trim()
      }
    }).done(function(data) {

      var articleUrl = "http://localhost:4000/websites/" + data[0].id + "/" + data[1].id

      // Set up styling
      var stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "http://localhost:4000/whatnow.css";
      document.head.insertBefore(stylesheet, document.head.getElementsByTagName("script")[0])

      // Add the buttons
      $(".content-body p").prepend(
        "<div style='background-color: #" +
          data[0]['background_colour'] +
          "; color: #" + data[0]['foreground_colour'] +
          "' class='whatnow-paragraph'><?xml version='1.0' encoding='utf-8'?><svg style='fill: #" +
          data[0]['foreground_colour'] +
          "' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 200 200' style='enable-background:new 0 0 200 200;' xml:space='preserve'><path class='st0' d='M162.4,175.3l-30.2-23.5H30.9c-9,0-16.1-7.3-16.1-16.1V60.1c0-9,7.3-16.1,16.1-16.1h137.7c9,0,16.1,7.3,16.1,16.1v75.5c0,9-7.3,16.1-16.1,16.1h-6.1L162.4,175.3z M30.9,52.4c-4.2,0-7.7,3.5-7.7,7.7v75.5c0,4.2,3.5,7.7,7.7,7.7h106l17,12.9v-12.9h14.7c4.2,0,7.7-3.5,7.7-7.7V60.1c0-4.2-3.5-7.7-7.7-7.7H30.9z M124.5,93.9H104V73.4h-8.4v20.5H75.1v8.4h20.5v20.5h8.4v-20.5h20.5V93.9z'/></svg></div>"
      );

      // Set up event listeners
      $("body").on("click", ".whatnow-curtain", function(event) {
        event.preventDefault();

        $(".whatnow-paragraph-opened").removeClass("whatnow-paragraph-opened");
        $(".whatnow-actions").remove();
        $(".whatnow-curtain").remove();
      });

      $(".whatnow-paragraph").on("click", ".whatnow-tell-me-more", function(event) {

      });

      $(".whatnow-paragraph").on("click", ".whatnow-make-it-clearer", function(event) {

      });

      $(".whatnow-paragraph").on("click", ".whatnow-prove-it", function(event) {

      });

      $(".whatnow-paragraph").on("click", function(event) {
        event.preventDefault();

        if (!$(event.currentTarget).hasClass("whatnow-paragraph-opened")) {
          $(event.currentTarget).addClass("whatnow-paragraph-opened");
          $(event.currentTarget).append(
            "<div class='whatnow-actions' style='background-color: #" +
            data[0]['background_colour'] +
            "; color: #" + data[0]['foreground_colour'] +
            "' ></div>"
          );

          $(".whatnow-actions").append("<a href='#' class='whatnow-button whatnow-tell-me-more'>Tell me more</a>");
          $(".whatnow-actions").append("<a href='#' class='whatnow-button whatnow-make-it-clearer'>Make it clearer</a>");
          $(".whatnow-actions").append("<a href='#' class='whatnow-button whatnow-prove-it'>Prove it</a>");
          $("body").append("<a href='#' class='whatnow-curtain'></a>")
        }
      });
    });
  });
}
