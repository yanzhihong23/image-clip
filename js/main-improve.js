
document.onselectstart=new Function('event.returnValue=false;');
window.onload = function(){
	var boxDiv = document.getElementById('box');//外层容器
	var mainDiv = document.getElementById('main');//选择层
	var leftUpDiv = document.getElementById('left-up');//坐上角触点
	var leftDiv = document.getElementById('left');//左中间触点
	var leftDownDiv = document.getElementById('left-down');//左下角触点
	var upDiv = document.getElementById('up');//上中间触点
	var downDiv = document.getElementById('down');//下中间触点
	var rightUpDiv = document.getElementById('right-up');//右上角触点
	var rightDiv = document.getElementById('right');//右中间触点
	var rightDownDiv = document.getElementById('right-down');//右下角触点


	var isMouseDown = false;//判断鼠标是否按下
	var contact = "";//当前拖动的触点

/*
		事件区
*/
	$( "#main" ).draggable({ containment: 'parent' ,drag: setChoice});

	$('.minDiv').on('mousedown', function(e) {
		contact = '';
		switch(e.target.id) {
			case 'left-up': 
				contact = 'leftUp';
				break;
			case 'left': 
				contact = 'left';
				break;
			case 'left-down':
				contact = 'leftDown';
				break;
			case 'up':
				contact = 'up';
				break;
			case 'down':
				contact = 'down';
				break;
			case 'right-up':
				contact = 'rightUp';
				break;
			case 'right':
				contact = 'right';
				break;
			case 'right-down':
				contact = 'rightDown';
				break;
		}

		if(contact) {
			e.preventDefault();
			e.stopPropagation();
			isMouseDown = true;

			startX = e.clientX;
			startY = e.clientY;
			startLeft = $('#main').position().left;
			startTop = $('#main').position().top;
			startWidth = $('#main').width();
			startHeight = $('#main').height();

			box = $('#box');
			minX = box.offset().left;
			maxX = startX + startWidth;

			minY = box.offset().top;
			maxY = startY + startHeight;
		}
		
	});

	
	//拖动
	window.onmousemove = function(e){
		e.preventDefault();
		e.stopPropagation();
		if(isMouseDown){
			switch(contact){
				case "leftUp":
					leftMove(e);
					upMove(e);
					break;
				case "left":
					leftMove(e);
					break;
				case "leftDown":
					leftMove(e);
					downMove(e);
					break;
				case "up":
					upMove(e);
					break;
				case "down":
					downMove(e);
					break;
				case "rightUp":
					rightMove(e);
					upMove(e);
					break;
				case "right":
					rightMove(e);
					break;
				case "rightDown":
					rightMove(e);
					downMove(e);
					break;
				// default:alert("操作错误！");
			}

			setChoice();
		}
	};
	//鼠标松开
	window.onmouseup = function(e){
		isMouseDown = false;
		contact = "";
	};

	setChoice();//初始化选择区域可见


	//左边拖动
	function leftMove(e){
		var x = e.clientX;//鼠标横坐标

		if(x < minX) {
			x = minX;
		} else if(x > maxX) {
			x = maxX;
		}

		var len = startX - x;
		$('#main').css({'width': startWidth + len, 'left': startLeft - len});
	}
	//上边拖动
	function upMove(e){
		var y = e.clientY;//鼠标纵坐标
		if(y < minY){
			y = minY;
		} else if(y > maxY) {
			y = maxY;
		}

		var len = startY - y;
		$('#main').css({'height': startHeight + len, 'top': startTop - len});
	}
	//下边拖动
	function downMove(e){
		var y = e.clientY;//鼠标纵坐标
		if(y > maxY){
			y = maxY;
		}

		var len = startY - y;
		$('#main').css({'height': startHeight - len});
	}
	//右边拖动
	function rightMove(e){
		var x = e.clientX;//鼠标横坐标
		if(x > maxX){
			x = maxX;
		}
		var len = startX - x;
		$('#main').css({'width': startWidth - len});
	}
	//设置选择区域可见
	function setChoice(){
		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
		var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;
		document.getElementById("img2").style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
		preview({"top":top,"right":right,"bottom":bottom,"left":left});

	}
	//获取元素的绝对位置
	function getPosition(node){
		var left = node.offsetLeft;
		var top = node.offsetTop;
		current = node.offsetParent; // 取得元素的offsetParent
		　// 一直循环直到根元素
	　　while (current != null) {
		　　left += current.offsetLeft;
		　　top += current.offsetTop;
		　　current = current.offsetParent;
	　　}
		return {"left":left,"top":top};
	}

	//预览
	function preview(view){
		var previewImg = document.getElementById("img3");
		previewImg.style.top = -view.top + "px";
		previewImg.style.left = -view.left + "px";
		previewImg.style.clip = "rect("+view.top+"px,"+view.right+"px,"+view.bottom+"px,"+view.left+"px)";
	}
}
