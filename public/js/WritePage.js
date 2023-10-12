
$(function () {
	var agent = navigator.userAgent;
	var PC = 0;

	if (agent.search(/iPhone/) == -1 && agent.search(/iPad/) == -1 && agent.search(/iPod/) == -1 && agent.search(/Android/) == -1) {
		PC = 1;
	} else {
		$("#footer").hide();
		$("#top").hide();
		$(".adsbygoogle").hide();
	}

	var n = DataReceive();
	//n = "ʿ����Ȭǯ "+n.replace(/name=/g,"");
	n = n.replace(/name=/g, "");

	$(window).load(function () {
		$('Canvas').myPaint(n);
	});

	$("#SmartNaviCover").click(function () {
		if ($("#SmartNavi").is(":hidden") == false) {
			$("#SmartNavi").fadeOut(500, function () {
				$("#SmartNavi").hide();
				$("#SmartNaviCover").hide();
			});
		}
	});

	$("#Bunchin").click(function () {
		if (PC == 0) {
			$("#SmartMenu").slideToggle();
		}
	});
	/*
		$(".Complete").click(function () {
			var cvs = document.getElementById("Canvas");
			var png = cvs.toDataURL('image/png');
			postForm('./Complete.php', {'img':png});
		});
		*/

	$(".NewPaper").click(function () {
		$('Canvas').myPaint(n);
		if (PC == 0) {
			$("#SmartMenu").slideToggle();
		}
	});
	$(".TopPage").click(function () {
		location.href = "./";
	});

	var postForm = function (url, data) {
		var $form = $('<form/>', { 'action': url, 'method': 'post' });
		for (var key in data) {
			$form.append($('<input/>', { 'type': 'hidden', 'name': key, 'value': data[key] }));
		}
		$form.appendTo("#footer");
		$form.submit();
	};
});