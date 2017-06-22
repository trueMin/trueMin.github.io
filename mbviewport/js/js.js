$(function(){
	 $(".gotop").hide();
    //滚动
  	$(window).scroll(function(){
		var t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//兼容获取高度 
	    if (t <= 240) {
	        $(".gotop").hide();
	    } else {
	        $(".gotop").show();
	    }
	});
    //自动设置高度
	function setH(){
		var img_height = $('.good-wapper .img').eq(0).height();
		if (img_height > 0) {
			$('.good-wapper .img').height(img_height);
		}
	}
    setH();
    //返回顶部
	$('.gotop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    //无缝轮播
	fnIndex();
	function fnIndex(){
		
		var pic = document.getElementsByClassName('picture')[0];
		var list = pic.getElementsByClassName('picture_list')[0];
		var lis = pic.getElementsByTagName('li');
		var As = pic.getElementsByTagName('a');
		var timer = 0;
		var num = 0;
		var w = view().w;
		var now = 0;
		
		
		var startx = 0;
		var x = 0;
		
		
		auto(); //轮播图定时器
		function auto(){
			timer = setInterval(function(){
				num++;
				num = num%lis.length;
				tab();
			},2000)
		}
		
		
		
		bind(list,'touchstart',start);
		bind(list,'touchmove',move);
		bind(list,'touchend',end);
		
		function start(ev){
			clearInterval(timer);
			ev = ev.changedTouches[0];
			list.style.transition = 'none'
			startx = ev.pageX;
			x = now;
		}
		function move(ev){
			ev = ev.changedTouches[0];
			var disx = ev.pageX - startx;
			now = x + disx;
			list.style.transform = list.style.webkitTransform ="translateX("+now+"px)"; 
		}
		function end(){
			
			num = -Math.round(now/w);
			now = -num*w;
			list.style.transition = '.5s';
			list.style.transform = list.style.webkitTransform ="translateX("+now+"px)"; 
			if(num>=lis.length){
				num = lis.length-1;
			}
			if(num<=0){
				num=0;
			}
			tab();
			auto();
		}
		
		function tab(){
			now = -num*w;
			list.style.transition = '.5s';
			list.style.transform = list.style.webkitTransform ="translateX("+now+"px)"; 
			
			for(var i=0;i<As.length;i++){
				removeClass(As[i],"active");
			}
			addClass(As[num],'active');
		}
	}
	
	
	
})