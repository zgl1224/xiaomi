function move(ele, data, cb){
    clearInterval(ele.t);
    ele.t = setInterval(() => {
        var onoff = true;
        for(var i in data){
            if(i === "opacity"){
                var iNow = getStyle(ele,i) * 100;
            }else{
                var iNow = parseInt(getStyle(ele,i));
            }

            var speed = (data[i] - iNow)/8;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

            if(i === "opacity"){
                ele.style[i] = (iNow + speed)/100;
            }else{
                ele.style[i] = iNow + speed + "px";
            }

            if(iNow != data[i]){
                onoff = false;
            }
        }
        if(onoff){
            clearInterval(ele.t);
            cb && cb();
        }
    }, 30);
}

function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele, false)[attr];
    }
}