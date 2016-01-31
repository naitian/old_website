$("document").ready(function(){
	$("#input").keypress(function(e){
		if(e.which == 13){
			e.preventDefault();
			input($("#input").text());
		}
	});

	var today = new Date();
	if(today.getHours() > 20 || today.getHours() < 3)
		$("#about").addClass("night");

	if($("#overlay").css("pointer-events") == "none"){
		$("#input").attr("contenteditable", "false");
	}

	$("#overlay").click(function(){
		if($("#overlay").css("pointer-events") != "none"){
			$("#input").attr("contenteditable", "true");
		}
		else {
			$("#input").attr("contenteditable", "false");

		}
		$("#input").focus()
	});
	$("#input").focus();



	// $(".project-frame").slick({
	// 	dots: true, 
	// })
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
	else {
		out = "That command is not yet supported. Try ls or open."
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