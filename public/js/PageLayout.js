
$(function(){
	var agent = navigator.userAgent;
	var PC = 0;
	if(agent.search(/iPhone/) == -1 && agent.search(/iPad/) == -1 && agent.search(/iPod/) == -1 && agent.search(/Android/) == -1){
		PC = 1;
	}else{
		$("#image").attr("src","/img/Stop.png");
	}

	$("#image").click(function () {
		location.href = "./";
	});

	$("#comment").bind("keyup",function(){
	    var thisValueLength = $(this).val().length;
	    $("#count").html(thisValueLength);
	});
});
