$(function(){
	$.fn.myPaint = function(name)	{
		var	Data = {
			drawFlag : false,
			defX : 0,
			defY : 0,
			defaultColor : 'rgba(0,0,0,1)',
			defaultBrush : 8,
			maxBrush : 15,
			minBrush : 1.5,
			CanvasWidth : 0,
			CanvasHeight:	0,
			settingX : 0,
			settingY : 0
		};
	
		var	selecter = this.selector;
		var	Canvas = document.getElementById(selecter);
		var	context = Canvas.getContext("2d");
		var agent = navigator.userAgent;
		if(agent.search(/iPhone/) == -1 && agent.search(/iPad/) == -1 && agent.search(/iPod/) == -1 && agent.search(/Android/) == -1){
			Canvas.width =  400;
			Canvas.height =  560;
			$("Canvas").css('border', 'solid 10px #006600');
			$("Canvas").css('top', $("top").height()+"px");
			$("#Bunchin").css('top', $("Canvas").css("top")+"px");
			$("#container").css('padding-top', Canvas.height+20);
			Data.settingX = 10;
			Data.settingY = 10;
		}else{
			Canvas.width =  $(window).width();
			Canvas.height =  $(window).height();
			$("Canvas").css('width', '100%');
			$("Canvas").css('height', '100%');
		}
		$("Canvas").css('left', $(window).width()/2-Canvas.width/2+"px");;
		$("#Bunchin").css('width', Canvas.width*2/3+"px");
		$("#Bunchin").css('left', $(window).width()/2-Canvas.width/3+Data.settingX+"px");
		$("#SmartMenu").css('width', Canvas.width-4+"px");
		$("#SmartMenu").css('top', (2/25)*$("#Bunchin").width()+Canvas.height*0.02+"px");
		$("#SmartNavi").css('width', Canvas.width-4+"px");
		
		Data.CanvasWidth = Canvas.width;
		Data.CanvasHeight = Canvas.height;

		context.fillStyle = "rgb(255, 255, 255)";
		context.fillRect(0, 0, Data.CanvasWidth, Data.CanvasHeight);
		context.font = "16px 'メイリオ'";
		tategaki(context, name, Data);
		tategaki(context, name, Data);
		tategaki(context, name, Data);


		Canvas.addEventListener("mouseup",	touchHandler, true);
		Canvas.addEventListener("mousedown", touchHandler, true);
		Canvas.addEventListener("mousemove", touchHandler, true);
		Canvas.addEventListener("mouseout", touchHandler, true);
		Canvas.addEventListener("touchstart", touchHandler, true);
		Canvas.addEventListener("touchend",	touchHandler, true);
		Canvas.addEventListener("touchmove", touchHandler, true);
		Canvas.addEventListener("touchout", touchHandler, true);
		
		$(window).resize(function() {
			var agent = navigator.userAgent;
			if(agent.search(/iPhone/) == -1 && agent.search(/iPad/) == -1 && agent.search(/iPod/) == -1 && agent.search(/Android/) == -1){
				$("#Bunchin").css('top', $("Canvas").css("top")+"px");
			}
			$("Canvas").css('left', $(window).width()/2-Canvas.width/2+"px");;
			$("#Bunchin").css('width', Canvas.width*2/3+"px");
			$("#Bunchin").css('left', $(window).width()/2-Canvas.width/3+Data.settingX+"px");
			$("#SmartMenu").css('width', Canvas.width-4+"px");
			$("#SmartMenu").css('top', (2/25)*$("#Bunchin").width()+Canvas.height*0.02+"px");
		});
		function touchHandler(e){
			e.preventDefault();
			var	supportTouch = 'ontouchend' in document;
			var rect = e.target.getBoundingClientRect();
			if(supportTouch == true){
				var	x = Math.floor(e.touches[0].clientX) - rect.left - Data.settingX;
				var	y = Math.floor(e.touches[0].clientY) - rect.top - Data.settingY;
			}else{
   				var x = e.clientX - rect.left - Data.settingX;
    			var y = e.clientY - rect.top - Data.settingY;
			}
			switch	(e.type)	{
			//線の始点
			case	"mousedown" :
			case	"touchstart" :
				Data.drawFlag	= true;
				Data.defX = x;
				Data.defY = y;
				Data.defaultBrush = 8;
			break;
			//線の終点	
			case "mouseup" :
			case "touchend" :
			case "mouseout" :
			case "touchout" :
				Data.drawFlag = false;
			break;
			//線を引く
			case "mousemove" :
			case "touchmove" :
				if	(!Data.drawFlag)	return;
				mousedowning = 1;
				var	Canvas = document.getElementById(selecter);
				context.strokeStyle = Data.defaultColor;
				context.lineWidth	 = Data.defaultBrush;
				context.lineJoin = "round";
				context.lineCap	 = "round";
				context.beginPath();
				context.moveTo(Data.defX,	Data.defY);
				context.lineTo(x,	y);
				context.stroke();
				context.closePath();
				var len = (Data.defX-x)*(Data.defX-x)+(Data.defY-y)*(Data.defY-y);
				if(len < 5 && Data.defaultBrush < Data.maxBrush){
					Data.defaultBrush = Data.defaultBrush+1.5;
				}
				if(len > 75 && Data.defaultBrush > Data.minBrush){
					Data.defaultBrush = Data.defaultBrush-0.005*len;
				}
				Data.defX = x;
				Data.defY = y;
			break;
			}
		}
	};
	var tategaki = function(context, text, Data) {
		context.fillStyle = "rgb(0, 0, 0)";
		var size = Data.CanvasHeight/20;
		context.font = size+"px 'aoyagi', 'HG行書体', 'HGP行書体', 'HG正楷書体-PRO', 'ヒラギノ明朝 ProN W3', 'HiraMinProN-W3', 'HG明朝E', 'ＭＳ Ｐ明朝', 'MS PMincho', 'MS 明朝',  serif";
		var x = Data.CanvasWidth*0.01;
		var y = Data.CanvasHeight-(text.length+1.5)*size;
		var textList = text.split('\n');
		var lineHeight = context.measureText("あ").width;
		var bx=0;
		var by=0;
		textList.forEach(function(elm, i) {
			Array.prototype.forEach.call(elm, function(ch, j) {
         	if("{}()[]「」『』（）【】［］｛｝〜…─━ー=＝～｜|".indexOf(ch) > -1){
           	context.rotate(Math.PI/2);
				context.fillText(ch, by+lineHeight/5, x-lineHeight/3);
				by = by+lineHeight;
           	context.rotate(-Math.PI/2);
			}else{
         	    		if("ぁぃぅぇぉゃゅょゎっァィゥェォャュョヮッ".indexOf(ch) > -1){
					context.fillText(ch, x+((lineHeight)*1.3-context.measureText(ch).width)/2, y+lineHeight*(j+4/5));
				}else if("、。".indexOf(ch) > -1){
					context.fillText(ch, x+((lineHeight)*2-context.measureText(ch).width)/2, y+lineHeight*(j+1/2));
				}else{
					context.fillText(ch, x+(lineHeight-context.measureText(ch).width)/2, y+lineHeight*(j+1));
				}
				by = y+lineHeight*(j+1);
			}
			});
	  	});
	};
});
function DataReceive(){
	var data = location.search.substring(1, location.search.length);
	data = decodeURIComponent(data);
	return data;
}