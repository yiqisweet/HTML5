/**
 * Created by Administrator on 2017/7/31.
 */


(function(){
    var logs = document.getElementById('logs');
    var target = document.getElementById('target')
    touch.on(target,'touchstart',function(ev){
        ev.preventDefault(); //禁用默认触摸事件
        // ev.startRotate();  //开启旋转
    })
    function log(msg){
        logs.innerHTML = "<span>"+msg+"</span>"
    }
    var action = {
        rotate : function (){
            console.log(1);
            var angle = 0;
            touch.on('#target','rotate',function(ev){
                var totalAngle = angle + ev.rotation; // 返回旋转角度
                //当手指旋转后离开屏幕会进入if
                if(ev.fingerStatus === 'end'){
                    angle  =  ev.rotation;
                }
                this.style.webkitTransform = 'rotate('+totalAngle+'deg)'
            })

        },
        scale : function(){
            target.style.webkitTransition = 'all ease 0.5s';
            var initialScale = 1;
            var currentScale;
            touch.on('#target','pinchend',function(ev){
                currentScale = ev.scale - 1;
                currentScale = initialScale + currentScale;
                currentScale = currentScale > 2 ? 2 : currentScale;
                currentScale = currentScale < 1 ? 1 : currentScale;
                this.style.webkitTransform = 'scale('+currentScale+')';
            })
            touch.on('#target','pinchend',function(ev){
                initialScale = currentScale;
            })
        },
        swipe : function(){
            console.log(2);
            //css3 过渡效果
            target.style.webkitTransition = 'all ease 0.5s';
            var w = 200;
            var tw = document.getElementById('wrap').offsetWidth;
            var lf = target.offsetLeft;
            var rt = tw - w - lf;
            console.log(target);
            touch.on(target,'swiperight',function(ev){
                console.log(3);
                this.style.webkitTransform = 'translate3d('+rt+'px,0,0)'
                console.log('向右滑动');
            })
            touch.on(target,'swipeleft',function(ev){
                this.style.webkitTransform = 'translate3d(-'+rt+'px,0,0)'
                console.log('向左滑动')
            })
        },
        tap : function(){
            touch.on(target,'hold tap doubletap',function(ev){
                log('类型为'+ev.type)
                var _this = this;
                this.classList.add('bounce');
                touch.on(this,'webkitAnimationEnd',function(){
                    _this.classList.remove('bounce')
                })
            })
        },
        drag : function(){
            var dx,dy;
            touch.on(target,'drag',function(ev){
                dx = dx || 0;
                dy = dy || 0;

                var offx = dx + ev.x + "px";
                var offy = dy + ev.y + "px";
                this.style.webkitTransform = 'translate3d('+offx+','+offy+',0)'
            })
            touch.on(target,'dragend',function(ev){
                dx += ev.x;
                dy += ev.y;
            })
        }
    }

    function init(act){
        action[act]();
    }
    init('drag');
})();