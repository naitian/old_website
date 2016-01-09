$("document").ready(function(){
	$("#input").keypress(function(e){
		if(e.which == 13){
			e.preventDefault();
			input($("#input").text());
		}
	});

	$("#overlay").click(function(){
		$("#input").focus()
	});

	$("#input").focus();

	$(".project-frame").slick({
		dots: true, 
	})
});

function input(input){
	if (input.length == 0) {
		return;
	};

	var parsed = parse(input);
	var out = "";
	if(parsed.cmd == "open"){
		var target = "#" + parsed.arg;
		$.smoothScroll({
			scrollTarget: target
	    });
	}
	else if(parsed.cmd == "ls"){
		out = "about&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;projects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact"
	}
	

	$("#content").append("<br>$ " + input);
	$("#input").empty();
	if(out.length > 0)
		$("#content").append("<br>" + out);
}

function parse(cmd){
	var cmdAr = cmd.split(" ");
	var command = cmdAr[0];
	var arg = cmdAr[cmdAr.length - 1];

	return {"cmd": command, "arg": arg};
}