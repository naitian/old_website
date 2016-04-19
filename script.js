'use strict';

function parse(cmd) {
	var cmdAr = cmd.split(' ');
	var command = cmdAr[0];
	var arg = cmdAr[cmdAr.length - 1];

	return { 'cmd': command, 'arg': arg };
}

function input(input) {
	if (input.length === 0) {
		return;
	}

	var parsed = parse(input);
	var out = '';
	if (parsed.cmd === 'open') {
		var target = '#' + parsed.arg;
		$.smoothScroll({
			scrollTarget: target
		});
	} else if (parsed.cmd === 'ls') {
		out = 'about&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;projects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact';
	} else {
		out = 'That command is not yet supported. Try ls or open.';
	}

	$('#content').append('<br>$ ' + input);
	$('#input').empty();
	if (out.length > 0) $('#content').append('<br>' + out);
}


$('document').ready(function () {
	$('#input').keypress(function (e) {
		if (e.which === 13) {
			e.preventDefault();
			input($('#input').text());
		}
	});

  $('body').height($(window).height() + 60);

	var allPossible = ['about', 'open', 'ls', 'projects', 'contact'];

	$('#input').keydown(function (e) {
		var node = window.getSelection().anchorNode;
		var suggestions = [];
		for (var i = allPossible.length - 1; i >= 0; i--) {
			if (allPossible[i].indexOf(node.data.substring(node.data.lastIndexOf(' ') + 1)) === 0) {
				suggestions.push(allPossible[i]);
			}
		}
		if (e.which === 9) {
			e.preventDefault();
			if (suggestions.length === 1) {
				var sel = window.getSelection();
				var range = sel.getRangeAt(0);
				node.data = (node.data.substring(0,node.data.lastIndexOf(' ')) + 
                      ' ' + 
                      suggestions[0]).trim();
				range.setStart(node, node.data.length);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	});

	var today = new Date();
	if ((today.getHours() > 20 || today.getHours() < 3)) {
		$('#about').addClass('night');
		$('.toggle-night').text('It\'s too dark');
	}

	if ($('#overlay').css('pointer-events') === 'none') {
		$('#input').attr('contenteditable', 'false');
	}

	$('#overlay').click(function () {
		if ($('#overlay').css('pointer-events') !== 'none') {
			$('#input').attr('contenteditable', 'true');
		} else {
			$('#input').attr('contenteditable', 'false');
		}
		$('#input').focus();
	});
	$('#input').focus();
	// $('.project-frame').slick({
	// 	dots: true,
	// })

	$('.toggle-night').click(function () {
		$('#about').toggleClass('night');
	});
});



