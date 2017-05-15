/*
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
*/

var counter = 0;
var author;
var time;
var message;
var avatar;

// 1. merge text and emoji in author and message (remove text, parse)
// 2. avatar doesn't work
// 3. note that this expose to trouble if there more than one person with the same name
// 4. use regex less strict (only spaces?) (/\W/g) > (/[^A-Za-z0-9]/g) > (/[^A-Za-z0-9]\/_?:.,/g) > (/[^-A-Za-z0-9]/g) 
// 5. if group message, include: span.chat-status-name and span.chat-status-divider
// 6. use rando to trigger with random sender
// 7. centrare a $("header.pane-header.pane-list-header").position()

// X Button + Overlay icon
// Make as Chrome Extension

//Notification trigger
function triggera(primo) {
    //var rando = Math.floor((Math.random() * $(".infinite-list-item.infinite-list-item-transition").length-1) + 0); //6
    if (primo) {
        $(".first.infinite-list-item.infinite-list-item-transition").find(".chat-status").children("span").html("<!-- commento -->"+Date.now());
    } else {
        $(".infinite-list-item.infinite-list-item-transition").last().find(".chat-status").children("span").html("<!-- commento -->"+Date.now());
    }
}

$("body").append("<div id='injectedBox' style='display: none; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(30, 190, 165,0.92); overflow-y: scroll; padding: 1em; box-sizing: border-box;'>"+
                 "<div id='injectedClose' class='injectedUI' style='position: fixed; cursor: pointer; top: 0.25em; right: 0.25em; font-size: 1.5em;'>&#10006;</div>"+
                 "<span style='font-style: italic; font-weight: bold;'>Welcome to Whatsapp Stealth Logger 0.1<br/>Notifications will be shown below.</span>"+
                 "</div>"+
                 "<div id='injectedPop' class='injectedUI' style='position: fixed; top: 0; right: 50%; font-size: 0.8em; color: white; background-color: rgba(30, 190, 165,0.92); padding: 0.45em; cursor: pointer;'>Stealth</div>");

$("#injectedPop").css({"margin-right": -$("#injectedPop").width()/2}); //7
$("#injectedClose").click(function() {
    $("#injectedBox").fadeOut(350);
    $("#injectedPop").fadeIn(350);
});
$("#injectedPop").click(function() {
    $("#injectedBox").fadeIn(350);
    $("#injectedPop").fadeOut(350);
});

$(".chat-status").on('DOMSubtreeModified', "span", function () {
    author = $(this).parent().parent().parent().find(".chat-title").find("span").contents().filter(function(){ return this.nodeType != 8; }).text(); //1
    
    time = $(this).parent().parent().parent().find(".chat-meta").find("span.chat-time").contents().filter(function(){ return this.nodeType != (1 || 8); }).text(); //1
    
    message = $(this).text(); //5
    //.find("span.emojitext").contents().filter(function(){ return this.nodeType != 8; }).text();
    
    //avatar =  $(this).parent().parent().parent().find(".avatar-body").find("img"); //.attr('src'); //2
    
    //var author = "Arianna"; var time = "03:21"; var message = "Ciao amorino!";
    
    if(!$("#injectedAuthor-"+author.replace(/\W/g, '')).length) // 3 //4
    {
        $("<div id='injectedAuthor-"+author.replace(/\W/g, '')+"' style='margin-top: 1em;'>"+ //4
         "<span class='author' style='float:left; font-weight: bold;'>"+author+"</span>"+
         "<span class='time' style='float:right;'>"+time+"</span>"+
         "<span class='message' style='clear: both; display: block;'>"+message+"</span>"+
         "</div>").appendTo("#injectedBox");
    
    } else {
        $("<span class='message' style='clear: both; display: block;'>"+message+"</span>").appendTo("#injectedAuthor-"+author);
        $("#injectedAuthor-"+author).find(".time").text(time);
    }

});