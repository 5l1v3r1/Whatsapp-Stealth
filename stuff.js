/*
Whatsapp Stealth Logger v. 0.2
by Luca Lambia, 2017

For educational purpose only.
Code intended to be copy-n-pasted into Chrome Inspector Console (F12)
*/

//load-stuff.js
/*
var version = "3.2.1";
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/"+version+"/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
console.log("jQuery "+version+" Loaded");
*/

//Create our "space"
var style = `<style>
body {
	color: white; background-color: #222;
	font-family: Verdana, sans-serif;
}
span {
	display: block;
}
.users {
	padding: 0.5em;
}
</style><div id="head">Whatsapp Stealth Logger v0.2 + Patch 2017 (Bella S&agrave;!)<br/><br/></div>`;

var win = window.open("", "Whatsapp Stealth", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,fullscreen=yes,width="+screen.width+",height="+screen.height);
win.document.body.innerHTML = style;

//Understand where the stuff is
var leftPanel = {class: ".chatlist-panel-body", id: "#pane-side" };
var chatRows = {class: ".chat" };
var thisChat = {class: ".active" };

//"Globals"
var buffer = {};
var thetime = null;
var timing = 50;

//Copy the last message of the first chats to an array with keys (I know, contact's names are bad)
function init() {
	$(".chatlist-panel-body").scrollTop(0);

	$( "#pane-side .chat .chat-body .chat-secondary .chat-status span .ellipsify" ).each(function( index ) {
		who = $(this).parent().parent().parent().parent().find(".chat-main .chat-title span").text();
		what = $(this).text();
		//pic = $(this).parent().parent().parent().parent().parent().find(".chat-avatar .avatar span > img").attr("src").toString();

		buffer[who] = [what];
	});

	thetime = window.setTimeout(check, timing);
}

//Same as init, but check if already buffered or new message
function check() {
	$(".chatlist-panel-body").scrollTop(0);

	$( "#pane-side .chat .chat-body .chat-secondary .chat-status span .ellipsify" ).each(function( index ) {
		who = $(this).parent().parent().parent().parent().find(".chat-main .chat-title span").text();
		what = $(this).text();
		//pic = $(this).parent().parent().parent().parent().parent().find(".chat-avatar .avatar span > img").attr("src").toString();

		//If we are checking a message from a known contact..
		if( buffer[who] ) {
			var c = buffer[who].length-1;
			//...and its text is not buffered
			if( buffer[who][c].toString() != what.toString() ) {
				buffer[who].push(what);
				writedown(who,what);
			} else {
				//else buffer is still valid
			}
		} else {
			//If we are checking a message from a new contact, add everything to the array
			buffer[who] = [what];
			writedown(who,what)
		}
	});
	thetime = window.setTimeout(check, timing);
}

//Close it
function killer() {
	clearInterval(thetime);
	$("#logger").empty().remove();
}

//Write a new div to our frontend
function writenew(who,what) {
	win.document.body.innerHTML += "<div id='"+who+"'><span><b>"+who+"</b></span></div>";
}

//Write a new content to our frontend
function writedown(who,what) {
	if( !win.document.getElementById(who) ) {
		writenew(who,what);
	}
	win.document.getElementById(who).innerHTML += "<span>"+what+"</span>";
}

init();

/*
ToDo:
wait for jquery loaded before continue
bootstrap layout
use avatar img
save complete conversations each time one become opened
handle emoticon, audio recordings and groups (name: text)
save everything to file
use a DOMChanged, MutationObserver or similar function instead of timers, like in the first version, but working with React
put everything in a chrome extension or apk?
oneliner
*/