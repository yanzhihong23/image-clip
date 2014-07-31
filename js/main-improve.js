$(function () {
    document.onselectstart = new Function('event.returnValue=false;');

    var isMouseDown = false;//判断鼠标是否按下
    var contact = '';//当前拖动的触点

    var $main = $('#main');
    var $box = $('#box');

    /*
     事件区
     */
    $main.draggable({ containment: 'parent', drag: setChoice});

    $('.minDiv').on('mousedown', function (e) {
        contact = '';
        switch (e.target.id) {
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

        if (contact) {
            e.preventDefault();
            e.stopPropagation();
            isMouseDown = true;

            startX = e.clientX;
            startY = e.clientY;
            startLeft = $main.position().left;
            startTop = $main.position().top;
            startWidth = $main.width();
            startHeight = $main.height();

            minX = $box.offset().left;
            maxX = startX + startWidth;

            minY = $box.offset().top;
            maxY = startY + startHeight;
        }

    });


    //拖动
    window.onmousemove = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isMouseDown) {
            switch (contact) {
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
            }

            setChoice();
        }
    };
    //鼠标松开
    window.onmouseup = function (e) {
        isMouseDown = false;
        contact = "";
    };

    setChoice();//初始化选择区域可见


    //左边拖动
    function leftMove(e) {
        var x = e.clientX;//鼠标横坐标

        if (x < minX) {
            x = minX;
        } else if (x > maxX) {
            x = maxX;
        }

        var len = startX - x;
        $main.css({'width': startWidth + len, 'left': startLeft - len});
    }

    //上边拖动
    function upMove(e) {
        var y = e.clientY;//鼠标纵坐标
        if (y < minY) {
            y = minY;
        } else if (y > maxY) {
            y = maxY;
        }

        var len = startY - y;
        $main.css({'height': startHeight + len, 'top': startTop - len});
    }

    //下边拖动
    function downMove(e) {
        var y = e.clientY;//鼠标纵坐标
        var dMaxY = $box.offset().top + $box.height();
        if (y > dMaxY) {
            y = dMaxY;
        }

        var len = startY - y;
        $main.css({'height': startHeight - len});
    }

    //右边拖动
    function rightMove(e) {
        var x = e.clientX;//鼠标横坐标
        var rMaxX = $box.offset().left + $box.width();
        if (x > rMaxX) {
            x = rMaxX;
        }
        var len = startX - x;
        $main.css({'width': startWidth - len});
    }

    //设置选择区域可见
    function setChoice() {
        var top = $main.position().top;
        var left = $main.position().left;
        var right = left + $main.width();
        var bottom = top + $main.height();

        var clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
        $('#img2').css({'clip': clip});
        /*$('#img3').css({
            'top': -top,
            'left': -left,
            'clip': clip
        })*/
        preview({"top":top,"right":right,"bottom":bottom,"left":left});
    }

	//预览
	function preview(view){
		var previewImg = document.getElementById("img3");
		previewImg.style.top = -view.top + "px";
		previewImg.style.left = -view.left + "px";
		previewImg.style.clip = "rect("+view.top+"px,"+view.right+"px,"+view.bottom+"px,"+view.left+"px)";

	}
});

