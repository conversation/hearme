function loadJQuery(){
  var waitForLoad = function () {
    if (typeof $ != "undefined") {
      console.log("HereMe loaded");
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

loadJQuery();

function queryWebsite() {
  $.ajax({
    url: "http://localhost:4000/websites/find",
    context: document.body,
    method: "post",
    data: {
      url: window.location.origin,
      href: window.location.href,
      body: $(".content-body, .article__body, .article-text, .field-body, .article-copy-container, #story").html(),
      title: $("h1").text().trim()
    }
  }).done(function(data) {

    var articleUrl = "http://localhost:4000/websites/" + data[0].id + "/articles/" + data[1].id

    // Set up styling
    var stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "http://localhost:4000/hearme.css";
    document.head.insertBefore(stylesheet, document.head.getElementsByTagName("script")[0])

    var paragraphSelections = $(".content-body p, .article__body p, .article-text p, .field-body p, .article-copy-container p, #story p");


    // Hacks
    $(".outer-wrap, .source-pullquote").css("overflow", "visible");
    paragraphSelections.css("position", "relative");

    // Add the buttons
    paragraphSelections.prepend(
      "<div style='" +
        data[0]['position'] + ": " + data[0]['offset'] + ";" +
        "background-color: #" + data[0]['background_colour'] + ";" +
        "color: #" + data[0]['foreground_colour'] +
        "' class='hearme-paragraph'><?xml version='1.0' encoding='utf-8'?><svg style='fill: #" +
        data[0]['foreground_colour'] +
        "' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 200 200' style='enable-background:new 0 0 200 200;' xml:space='preserve'><path class='st0' d='M162.4,175.3l-30.2-23.5H30.9c-9,0-16.1-7.3-16.1-16.1V60.1c0-9,7.3-16.1,16.1-16.1h137.7c9,0,16.1,7.3,16.1,16.1v75.5c0,9-7.3,16.1-16.1,16.1h-6.1L162.4,175.3z M30.9,52.4c-4.2,0-7.7,3.5-7.7,7.7v75.5c0,4.2,3.5,7.7,7.7,7.7h106l17,12.9v-12.9h14.7c4.2,0,7.7-3.5,7.7-7.7V60.1c0-4.2-3.5-7.7-7.7-7.7H30.9z M124.5,93.9H104V73.4h-8.4v20.5H75.1v8.4h20.5v20.5h8.4v-20.5h20.5V93.9z'/></svg></div>"
    );

    // Set up event listeners
    $("body").on("click", ".hearme-curtain", function(event) {
      event.preventDefault();

      $(".hearme-paragraph-opened").removeClass("hearme-paragraph-opened");
      $(".hearme-actions").remove();
      $(".hearme-curtain").remove();
    });

    $(".hearme-paragraph").on("click", function(event) {
      event.preventDefault();

      var tell_me_more = 0;
      var make_it_clearer = 0;
      var prove_it = 0;

      var index = $(event.currentTarget).parents("p").index(paragraphSelections);

      for (i = 0; i < data[2].length; i++) {

        if (data[2][i].action_type == "tell_me_more" && data[2][i].paragraph == index) {
          tell_me_more += 1;
        }

        if (data[2][i].action_type == "make_it_clearer" && data[2][i].paragraph == index) {
          make_it_clearer += 1;
        }

        if (data[2][i].action_type == "prove_it" && data[2][i].paragraph == index) {
          prove_it += 1;
        }
      }

      if (!$(event.currentTarget).hasClass("hearme-paragraph-opened")) {
        $(event.currentTarget).addClass("hearme-paragraph-opened");

        if (parseInt(data[0]['offset'].replace("px", "")) <= 0) {
          var actionOffset = -(parseInt(data[0]['offset'].replace("px", ""))) + "px"
        } else {
          var actionOffset = data[0]['offset'];
        }

        $(event.currentTarget).append(
          "<div class='hearme-actions' style='" +
          data[0]['position'] + ": " + actionOffset + ";" +
          "background-color: #" + data[0]['background_colour'] + ";" +
          "color: #" + data[0]['foreground_colour'] +
          "' ></div>"
        );

        var person = "<?xml version=1.0 encoding=utf-8?><svg style='fill: #" +
        data[0]['foreground_colour'] +
        "' version=1.1 id=Layer_1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px viewBox=0 0 20 20 style=enable-background:new 0 0 20 20; xml:space=preserve><g><path class=st0 d=M14.4,15.4H5.7c-0.3,0-0.5-0.2-0.5-0.5v-1.7c0-0.4,0.2-0.8,1.7-1.8c0.4-0.2,0.8-0.5,1.2-0.7c-0.4-0.5-0.6-1.1-0.6-1.7V7.4c0-1.5,1.2-2.6,2.6-2.6s2.7,1.2,2.7,2.6v1.6c0,0.7-0.2,1.3-0.7,1.8c1.1,0.6,2.8,1.6,2.8,2.4v1.7C14.9,15.1,14.7,15.4,14.4,15.4z/><path class=st0 d=M6.9,10.8c-0.2-0.1-0.5-0.3-0.6-0.4C6.7,9.9,7,9.1,7,8.3c0-1.5-1-2.6-2.3-2.6S2.4,6.8,2.4,8.3c0,0.8,0.2,1.5,0.6,2.1c-0.3,0.2-0.8,0.5-1.5,0.9c-0.6,0.4-0.9,1-0.9,1.7v0.5c0,0.5,0.3,0.8,0.8,0.8h3.4v-1.2C4.7,12.3,5.9,11.4,6.9,10.8z M5.3,11.1C5.3,11.1,5.3,11.1,5.3,11.1C5.3,11.1,5.3,11.1,5.3,11.1z M3.9,11.1L3.9,11.1L3.9,11.1z/><path class=st0 d=M19.5,13c0-0.8-0.5-1.4-1.3-1.8l0,0c0.1,0,0.1-0.1,0.2-0.2c0.1-0.2,0.1-0.4,0-0.5c0,0-0.3-0.7-0.4-1.3l0-1.1c0-1.3-1.1-2.4-2.3-2.4h0c-1.3,0-2.3,1.1-2.3,2.4l0,1.1c-0.1,0.6-0.4,1.3-0.4,1.3c0,0,0,0.1,0,0.1c0.9,0.5,2.5,1.5,2.5,2.5v1.2h3.4c0.4,0,0.8-0.4,0.8-0.8v-0.5C19.5,13.1,19.5,13,19.5,13z,0/></g></svg>"

        $(".hearme-actions").append("<a href='#' style='color: #" + data[0]['foreground_colour'] +"' class='hearme-button hearme-tell-me-more'>Tell me more <span class='hearme-count'></span></a>");
        if (tell_me_more == 1) {
          $(".hearme-tell-me-more").find(".hearme-count").html(person + tell_me_more + " other person also asked");
        }
        if (tell_me_more > 1) {
          $(".hearme-tell-me-more").find(".hearme-count").html(person + tell_me_more + " other people also asked");
        }

        $(".hearme-actions").append("<a href='#' style='color: #" + data[0]['foreground_colour'] +"' class='hearme-button hearme-make-it-clearer'>Make it clearer <span class='hearme-count'></span></a>");
        if (make_it_clearer == 1) {
          $(".hearme-make-it-clearer").find(".hearme-count").html(person + make_it_clearer + " other person also asked");
        }
        if (make_it_clearer > 1) {
          $(".hearme-make-it-clearer").find(".hearme-count").html(person + make_it_clearer + " other people also asked");
        }

        $(".hearme-actions").append("<a href='#' style='color: #" + data[0]['foreground_colour'] +"' class='hearme-button hearme-prove-it'>Prove it <span class='hearme-count'></span></a>");
        if (prove_it == 1) {
          $(".hearme-prove-it").find(".hearme-count").html(person + prove_it + " other person also asked");
        }
        if (prove_it > 1) {
          $(".hearme-prove-it").find(".hearme-count").html(person + prove_it + " other people also asked");
        }


        $("body").append("<a href='#' class='hearme-curtain'></a>")

        $(".hearme-tell-me-more").on("click", function(event) {
          $.ajax({
            url: articleUrl + "/action",
            context: document.body,
            method: "post",
            data: {
              action_type: "tell_me_more",
              paragraph: $(event.currentTarget).parents("p").index(paragraphSelections)
            }
          }).done(function(data) {
            var count = parseInt($(event.currentTarget).find(".hearme-count").html() || 0);
            if (count == 0) {
              $(event.currentTarget).find(".hearme-count").html("Thank you. We'll tell the author.");
            }
            if (count > 1) {
              $(event.currentTarget).find(".hearme-count").html(person + count + " other people also asked");
            }
          });
        });

        $(".hearme-make-it-clearer").on("click", function(event) {
          $.ajax({
            url: articleUrl + "/action",
            context: document.body,
            method: "post",
            data: {
              action_type: "make_it_clearer",
              paragraph: $(event.currentTarget).parents("p").index(paragraphSelections)
            }
          }).done(function(data) {
            var count = parseInt($(event.currentTarget).find(".hearme-count").html() || 0);
            if (count == 0) {
              $(event.currentTarget).find(".hearme-count").html("Thank you. We'll tell the author.");
            }
            if (count > 1) {
              $(event.currentTarget).find(".hearme-count").html(person + count + " other people also asked");
            }
          });
        });

        $(".hearme-prove-it").on("click", function(event) {
          $.ajax({
            url: articleUrl + "/action",
            context: document.body,
            method: "post",
            data: {
              action_type: "prove_it",
              paragraph: $(event.currentTarget).parents("p").index(paragraphSelections)
            }
          }).done(function(data) {
            var count = parseInt($(event.currentTarget).find(".hearme-count").html() || 0);
            if (count == 0) {
              $(event.currentTarget).find(".hearme-count").html("Thank you. We'll tell the author.");
            }
            if (count > 1) {
              $(event.currentTarget).find(".hearme-count").html(person + count + " other people also asked");
            }
          });
        });
      }
    });
  });
}
