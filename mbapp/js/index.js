
function fnLoad(){
	var welcome = id('welcome');
	var index = id('index');
	var arr = ['img/tree.jpg','img/title.png','img/title2.png','img/logo.png','img/cloud.png'];
	var num = 0;
	var Imageonoff = false;
	var Dateonoff = false;
	var timer = 0;
	var oldTime = new Date().getTime();
	addClass(index, "show");
	
	
	
	for(var i=0;i<arr.length;i++){
		var oImg = new Image();
		oImg.src = arr[i];
		oImg.onload = function(){
			num++;	
			if(num == arr.length){
				Imageonoff = true;
			}
		}
		
	}
	
	timer = setInterval(function(){
		var nowTime = new Date().getTime();
		var now = nowTime-oldTime;
		if(now>=5000){
			Dateonoff = true;
		}
		
		
		if(Imageonoff&&Dateonoff){
			clearInterval(timer);
			welcome.style.opacity = 0;
		}
	},100)
	
	
	bind(welcome,"transitionEnd",end);
	bind(welcome,"webkitTransitionEnd",end);
	function end(){
		removeClass(welcome,'show');
		fnIndex();
	}
	
}

//bind(document,'touchend',function(ev){
//	ev.preventDefault();
//})

function fnIndex(){
	var index = id('index');
	var pic = index.getElementsByClassName('picture')[0];
	var list = pic.getElementsByClassName('picture_list')[0];
	var lis = pic.getElementsByTagName('li');
	var As = pic.getElementsByTagName('a');
	var timer = 0;
	var num = 0;
	var w = view().w;
	var now = 0;
	
	
	var startx = 0;
	var x = 0;
	
	fnData()  // 调用获取数据的函数
	auto() //轮播图定时器
	function auto(){
		timer = setInterval(function(){
			num++;
			num = num%lis.length;
			tab()
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
		auto()
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

function fnData(){
	var index = id('index');
	var btn = index.getElementsByClassName('btn')[0];
	var info = index.getElementsByClassName('info')[0];
	var score = index.getElementsByClassName('score')[0];
	var tag = index.getElementsByClassName('tag')[0];
	var arr = ['非常失望','一般','没有想象中的好','良好','非常好']
	var lis = score.getElementsByTagName('li');
	
	for(var i=0;i<lis.length;i++){
		(function(index){
			var As = lis[index].getElementsByTagName('a');
			var oInput = lis[index].getElementsByTagName('input')[0];
			for(var k=0;k<As.length;k++){
				As[k].bg = k;
				bind(As[k],'touchstart',function(){
					this.style.background = "url(img/star.png)no-repeat 0px 0px";	
					for(var j=0;j<As.length;j++){
						if(this.bg<j){
							As[j].style.background = "url(img/star.png)no-repeat -38px 0px";	
						}else{
							As[j].style.background = "url(img/star.png)no-repeat -0px 0px";	
						}
						
						
					}
					oInput.value = arr[this.bg];
					addClass(btn,"submit");
				})
			}
			
		})(i)
	}
	
	
	
	
	bind(btn,"touchstart",fnBtn);
	
	function fnBtn(){
		if(getValue()){//评分已经评完
			if(getCheck()){//标签评价完成
				fnMask();
			}else{
				setInfo(info,"给景区添加标签");
			}
		}else{
			setInfo(info,"给景区评分");
		}
	}
	
	function setInfo(obj,value){
		obj.innerHTML = value;
		obj.style.opacity = 1;
		obj.style.transform = obj.style.webkitTransform="scale(1)";
		
		setTimeout(function(){
			obj.style.opacity = 0;
			obj.style.transform = obj.style.webkitTransform="scale(0)";
		},2000)
	}
	
	function getCheck(){
		var oInput = tag.getElementsByTagName('input');
		for(var i=0;i<oInput.length;i++){
			if(oInput[i].checked){
				return true;
			}
		}
		return false;
	}
	
	function getValue(){
		var inputs = score.getElementsByTagName('input');
		for(var i=0;i<inputs.length;i++){
			if(!inputs[i].value){
				return false;
			}
		}
		return true;
	}
	
}



function fnMask(){
	var mask = id('mask');
	var index = id('index');
	var News = id('News');
	addClass(mask,'show');
	mask.style.zIndex = 11;
	setTimeout(function(){
		index.style.filter = index.style.webkitFilter = "blur(5px)";
		mask.style.opacity = 1;
	},15)
	
	setTimeout(function(){
		removeClass(mask,'show');
		removeClass(index,'show');
		mask.style.zIndex = 5;
		mask.style.opacity = 0;
		index.style.filter = index.style.webkitFilter = "blur(0px)";
		addClass(News,'show');
		upload();
		
	},3000)
}

function upload(){
	var News = id('News');
	var aInput = News.getElementsByTagName('input');
	var btn = News.getElementsByClassName('btn')[0];
	var onoff = false;
	
	bind(aInput[0],'change',function(){
		var val = this.files[0].type.split('/')[0];
		if(val=="video"){
			addClass(btn,'submit');
			onoff = true;
			if(!val);
		}else{
			alert('请上传正确的文件')
		}
	})
	
	bind(aInput[1],'change',function(){
		var val = this.files[0].type.split('/')[0];
		if(val=="image"){
			addClass(btn,'submit');
			onoff = true;
			if(!val);
		}else{
			alert('请上传正确的文件')
		}
	})
	bind(btn,"touchstart",function(){
		if(onoff){
			removeClass(News,'show');
			fnLast();
		}
	})
	
}

function fnLast(){
	var comment = id('comment');
	var addTag = comment.getElementsByClassName('addTag')[0];
	var btn = comment.getElementsByClassName('btn')[0];
	var label = addTag.getElementsByTagName('label');
	var onoff = false;
	addClass(comment,'show');
	
	for(var i=0;i<label.length;i++){
		bind(label[i],'touchstart',function(){
			addClass(btn,'submit');
			onoff = true;
		})
	}
	
	
	bind(btn,'touchstart',function(){
		if(onoff){
			removeClass(comment,'show');
			fnReset();
		}
	})
}

function fnReset(){
	var reset = id('reset');
	var index = id('index');
	var btn = reset.getElementsByClassName('btn')[0];
	addClass(reset,'show');
	
	bind(btn,'touchstart',function(){
		removeClass(reset,'show');
		addClass(index,'show');
	})
}

