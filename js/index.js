  // --------------
    let box = document.getElementById("banner");
    let imgbox = document.getElementById("imgbox");
    let ul = imgbox.firstElementChild;
    let lis = ul.children;
    let ol = document.querySelector("ol");
    let btnbox = document.getElementById("btnbox");
    let left = btnbox.firstElementChild;
    let right = btnbox.lastElementChild;
    var time = "";
    // console.log(box,imgbox,ul,lis,ol,btnbox,left,right);

    for(var i=0;i<lis.length;i++){
        let olli = document.createElement("li");
        if(i==0) olli.className = "current";
        olli.innerHTML = i + 1;
        olli.setAttribute("index",i);
        ol.appendChild(olli);
        olli.onclick = banner;
    }
    let imgindex = 0;
    function banner(){
        imgindex = this.getAttribute("index");
        let boxW = imgbox.offsetWidth;
        let target = - boxW * imgindex;
        move(ul,{left:target});
        setActive();
    }
    box.onmouseover = function(){
        btnbox.style.display = "block";
        clearInterval(time);
    }
    box.onmouseout = function(){
        btnbox.style.display = "none";
        autoPlay();
    }
    let newimg = ul.firstElementChild.cloneNode(true);
    ul.appendChild(newimg);
    var isClick = true;
    left.onclick = function(){
        if(!isClick){
            return;
        }
        isClick = false;
        if(imgindex == 0){
            ul.style.left = -(ul.children.length-1)*imgbox.offsetWidth + "px";
            imgindex = ul.children.length-1-1;
            var target = -imgindex*imgbox.offsetWidth;
        }else{
            imgindex--;
            let boxW = imgbox.offsetWidth;
            var target = -imgindex * boxW;
        }
        move(ul,{left:target},function(){
            isClick = true;
        });
        setActive();
    }
    right.onclick = function(){
        if(!isClick){
            return;
        }
        isClick = false;
        if(imgindex == ol.children.length-1){

            let boxW = imgbox.offsetWidth;
            var target = -(ul.children.length-1) * boxW;
            move(ul,{left:target},function(){
                ul.style.left = 0;
                isClick = true;
            });
            
            imgindex = 0;
        }else{
            imgindex++;
            let boxW = imgbox.offsetWidth;
            var target = -imgindex * boxW;
            move(ul,{left:target},function(){
                isClick = true;
            });
        }
        setActive();
    }
    function autoPlay(){
        time = setInterval(() => {
            right.onclick();
        }, 2000);
    }
    autoPlay();
    function setActive(){
        for(var i = 0;i<ol.children.length;i++){
            ol.children[i].className = "";
        }
        ol.children[imgindex].className = "current";
    }
// ----------------------------以上是轮播图

    let userId = localStorage.getItem('userId');
    if(userId){
    $('.idid').innerHTML = userId;
    $('.idid').setAttribute('class','idstyle')
    }

    $('.update').onmouseover = function(){
        
        ajax.get('./php/index.php',{fn:'get'}).then(res=>{
            console.log(res);
            let{stateCode,data}=JSON.parse(res);
            if(stateCode == 200){
                console.log(data[0].num);
                $('.BBB').innerHTML = '商品：' + data[0].num;
            }
        });
    }

    // 懒加载
      
      window.onscroll = function(){
        var imgs = document.querySelectorAll('.lazyImg');
        lazy(imgs);
      };





