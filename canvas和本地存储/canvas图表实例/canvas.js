  var data = {
        width:900,
        height:500,
        maxValue:30, //y轴最大值
        xAxis:["苹果","梨","香蕉","西瓜","葡萄","橙子"], //占比分布
        starRate:[28,14,18,6,10,12], //柱状图占比值
        rectColor:["#c74b54","#ffd118","#bcb01d","#386924","#900a0b","#d56902"],//柱状图颜色 
    };
    var canvas,ctx;
    var x_scale = 0,y_scale = 0,heightVal=0,stepWidth=0,stepHeight=0;
    var stepYArr = [],stepXArr = [];
    var arrowWidth = 4,arrowHeight = 6;
    var stepNum = 3;
    var str1 = "百分比";
    var str2 = "(%)";
    
    var init = function(data){

        canvas = document.getElementById("canvas");
        canvas.width = data.width;
        canvas.height = data.height;
        x_scale = data.width/10; //x轴刻度
        y_scale = data.height/10; //y轴刻度
        ctx = canvas.getContext("2d");

        drawXAxis(data.xAxis);//画X轴
        drawYaxis(data.maxValue,stepNum);//画Y轴
        drawBg();//画背景    
        drawRect(data.starRate,data.rectColor);//画柱形
		
    }
     
    /*画x轴*/
    var drawXAxis = function(xAxis){
        ctx.beginPath();//清除之前的路径，开始一条新的路径
        //画x轴横线
        ctx.moveTo(x_scale,canvas.height-y_scale); //以距左90，距底50的点作为起始点
        ctx.lineTo(canvas.width-x_scale,canvas.height-y_scale); //确定终点
        //加标签
        var len = xAxis.length;
        stepWidth = (canvas.width - 2*x_scale)/len; // 一个类型所占的宽度  (总宽度-2个刻度)/份数 720/6 = 120
        for(var i=0; i<len; i++){
            //画标签，默认字体为12个像素
            ctx.font = "normal normal bold 14px 微软雅黑";
            ctx.fillStyle = "#285ea6";
            //字体居中            
            //x_scale+(i+0.5)*stepWidth-xAxis[i].length*14/2  起始点+i+0.5个一个类型所占的宽度 - (字数*字号)/2

            ctx.fillText(xAxis[i],x_scale+(i+0.5)*stepWidth-xAxis[i].length*14/2,canvas.height-y_scale + 24);

            stepXArr.push(x_scale+(i+1)*stepWidth);  //x坐标
        }
        ctx.stroke();
        //加箭头
        drawArrow(canvas.width-x_scale,canvas.height-y_scale,false);   //x轴方向的箭头
    }

    //画y轴
    var drawYaxis = function(maxValue,step){
        ctx.beginPath();
        //画Y轴线
        ctx.moveTo(x_scale,y_scale);
        ctx.lineTo(x_scale,canvas.height-y_scale);
        //加标签
      
        stepHeight = (canvas.height - 3*y_scale)/step; 
        heightVal = (canvas.height - 3*y_scale )/maxValue;   // 1%等于多少刻度值

        for(var i=1; i<=step; i++){
            ctx.font = "normal normal bold 14px 微软雅黑";
            //字体居中
            //x值 = 初始坐标位置，往回挪20的地方，放比例值  x_scale-20 
            //y值 = y轴总长-起始长度-（刻度*个数）- 字体一半的高度
            ctx.fillText(maxValue/step*i,x_scale-30,canvas.height-y_scale-stepHeight*i+7);  
            stepYArr.push(canvas.height-y_scale-stepHeight*i); //y轴的坐标

        }
        ctx.stroke();
        //加箭头
        drawArrow(x_scale,y_scale,true);
        //加Y轴顶部字体
        ctx.fillText(str1,x_scale-50,y_scale-8);
        ctx.fillText(str2,x_scale-40,y_scale+12);
    }

    //画柱形图
    var drawRect = function(starRate,colorArr){
        var rectWidth = stepWidth/2;
        for(var i=0,len=starRate.length;i<len;i++){
            ctx.beginPath();
            ctx.fillStyle = colorArr[i];
                
                //console.log(stepXArr[i]);

            ctx.fillRect(stepXArr[i]-stepWidth/2-rectWidth/2,canvas.height-y_scale-starRate[i]*heightVal,rectWidth,starRate[i]*heightVal);
            ctx.fill();
        }
    }

    //画箭头
    var drawArrow = function(left,top,flag){
        ctx.beginPath();
        ctx.moveTo(left,top); //起始点
        if(flag){  //flag用于确定画哪个方向的箭头，为true画y轴

            ctx.lineTo(left+arrowWidth,top);  
            ctx.lineTo(left,top-arrowHeight); 
            ctx.lineTo(left-arrowWidth,top);  
        }else{
            ctx.lineTo(left,top-arrowWidth); 
            ctx.lineTo(left+arrowHeight,top);
            ctx.lineTo(left,top+arrowWidth);
        }
        
        ctx.fillStyle = "#666";
        ctx.fill();
    }

    //画背景矩形
    var drawBg = function(){
        for(var i=0;i<stepYArr.length;i++){
            ctx.beginPath();
            ctx.fillStyle = "#f2f2f2";
            if(i%2 == 0){                
                ctx.fillRect(x_scale+1,stepYArr[i],canvas.width-2*x_scale-stepWidth/4,stepHeight);
                ctx.fill();
            }
        }
    }
    init(data);//初始化
   

