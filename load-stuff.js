// You can bookmarklet this

javascript:void((function(){
	var version = "3.2.1";
	var jq = document.createElement('script');
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/"+version+"/jquery.min.js";
	document.getElementsByTagName('head')[0].appendChild(jq);
	console.log("jQuery "+version+" Loaded");
})());

//Just for reminder
//jQuery.noConflict();
//<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'" />