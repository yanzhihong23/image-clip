$(function () {
    document.onselectstart = new Function('event.returnValue=false;');

    var isMouseDown = false;
    var contact = '';

    var $main = $('#main');
    var $box = $('#box');

    var startX,
        startY,
        startLeft,
        startTop,
        startWidth,
        startHeight,
        minX,
        maxX,
        minY,
        maxY;

    $main.draggable({ containment: 'parent', drag: clip});

    $('.minDiv').on('mousedown', function (e) {
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

            clip();
        }
    };

    window.onmouseup = function (e) {
        isMouseDown = false;
        contact = '';
    };

    // init
    clip();

    function leftMove(e) {
        var x = e.clientX;

        if (x < minX) {
            x = minX;
        } else if (x > maxX) {
            x = maxX;
        }

        var len = startX - x;
        $main.css({'width': startWidth + len, 'left': startLeft - len});
    }

    function upMove(e) {
        var y = e.clientY;
        if (y < minY) {
            y = minY;
        } else if (y > maxY) {
            y = maxY;
        }

        var len = startY - y;
        $main.css({'height': startHeight + len, 'top': startTop - len});
    }

    function downMove(e) {
        var y = e.clientY;
        var dMaxY = $box.offset().top + $box.height();
        if (y > dMaxY) {
            y = dMaxY;
        }

        var len = startY - y;
        $main.css({'height': startHeight - len});
    }

    function rightMove(e) {
        var x = e.clientX;
        var rMaxX = $box.offset().left + $box.width();
        if (x > rMaxX) {
            x = rMaxX;
        }
        var len = startX - x;
        $main.css({'width': startWidth - len});
    }

    function clip() {
        var top = $main.position().top;
        var left = $main.position().left;
        var right = left + $main.width();
        var bottom = top + $main.height();

        var clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
        // selected area
        $('#img2').css({'clip': clip});

        // preview
        $('#img3').css({
            'top': -top,
            'left': -left,
            'clip': clip
        });
    }
	
});

