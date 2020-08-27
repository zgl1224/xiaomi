// 范围随机数
function random(min,max){
    if(min > max){
        var ls = min;
        min = max;
        max = ls;
    }
    return Math.floor(Math.random() * (max-min+1) ) + min
}

// 补零(补字符的零)
function createZero(n){
    if(typeof n === "string"){
        if(n.length < 2){
            return "0" + n
        }
        return n;
    }else{
        if(n<10){
            return "0"+n;
        }
        return n;
    }
}

// 随机十六进制的颜色值
function randomColor(){
    var r = random(0,255).toString(16);
    var g = random(0,255).toString(16);
    var b = random(0,255).toString(16);
    return "#" + createZero(r) + createZero(g) + createZero(b);
}

// 下拉菜单高亮显示
function active(){
    for(var i=0;i<lis.length;i++){
        // 暂时存下li的索引，到自定义属性index中
        lis[i].index = i;
        // 绑定鼠标移动事件
        lis[i].onmouseover = function(){
            //将当前的index值绑定在全局变量中 
        index = this.index;
            //调用函数
        setActive();
        }
    }
    // 封装选中的函数，还有输入框显示li的文本
    function setActive(){
        for(var i=0;i<lis.length;i++){
            lis[i].className = "";
        }
        lis[index].className = "active";
    }
}
// 取数组的最大值

// 取数组的最小值
function getMin(myarr) {
    // 一定要把高度数组,重复复制一份,否则在排序过程中,会修改原数组
    var arr = [];
    myarr.forEach((v) => {
        arr.push(v)
    })
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr[0];
}

// 数组去重

// 日期的格式化
function createDate(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var myDate = d.getDate();
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var millS = d.getMilliseconds();
    switch(day){
        case 0:day = "日";break;
        case 1:day = "一";break;
        case 2:day = "二";break;
        case 3:day = "三";break;
        case 4:day = "四";break;
        case 5:day = "五";break;
        case 6:day = "六";break;
    }
    return {
        year:year,
        month:createZero(month),
        date:createZero(myDate),
        day:day,
        hours:createZero(hours),
        minutes:createZero(minutes),
        seconds:createZero(seconds),
        millS:millS
    };
}

// 计算两个日期之间的差值
function dateDiff(d1,d2){
    var date1 = new Date(d1);

    var date2 = d2 ? new Date(d2) : new Date();

    var t = Math.abs(date1.getTime() - date2.getTime());

    var day = parseInt(t/1000/60/60/24);
    var h = parseInt((t - day*24*60*60*1000)/1000/60/60);
    var m = parseInt((t - day*24*60*60*1000 - h*60*60*1000)/1000/60);
    var s = parseInt((t - day*24*60*60*1000 - h*60*60*1000 - m*60*1000)/1000)
    var ms = t - day*24*60*60*1000 - h*60*60*1000 - m*60*1000 - s*1000;
    console.log(day);
    return {
        day:day,
        h:h,
        m:m,
        s:s,
        ms:ms
    }
    
}

// 获取样式的兼容处理
function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele, false)[attr];
    }
}


// 取消事件冒泡，注意别忘记传参
function stopBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

// 阻止右键菜单,默认事件
function stopDefault(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}


// 绑定事件的封装
function addEvent(ele,type,cb){
    if(ele.addEventListener){
        ele.addEventListener(type,cb)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,cb)
    }else{
        ele["on"+type] = cb;
    }
}

// 取消事件绑定
function delEvent(ele,type,cb){
    if(ele.removeEventListener){
        ele.removeEventListener(type,cb);
    }else if(ele.detachEvent){
        ele.detachEvent("on" + type, cb)
    }else{
        ele["on" + type] = null;
    }
}







// 需求：编写一个函数，计算任意个任意数字的和
function add(){
    var sum = 0;
    for(var i=0;i<arguments.length;i++){
        sum += arguments[i];
    }
    console.log(sum);
}

// 缓冲运动
function move(ele,data,cb){
    clearInterval(ele.t);
    ele.t=setInterval(function(){
        var onoff = true;
        for(var i in data){
            var iNow = parseInt(getStyle(ele,i));
            var speed = (data[i] - iNow)/8;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            ele.style[i] = iNow + speed + "px";
            if(iNow != data[i]){
                onoff = false;
            }
        }
        if(onoff){
            clearInterval(ele.t);
            // 判断cb是否存在，不存在就Undefined,存在就给个空函数
            // 用户自己决定
            cb && cb();
        }
    },30)
}