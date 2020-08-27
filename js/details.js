class details {
    constructor() {
        this.id = localStorage.getItem('aaa');
        this.list();
    }
    list() {
        ajax.get('./php/details.php', { fn: 'lst', id: this.id }).then(res => {
            let{stateCode,data} = JSON.parse(res);
            let str = '';
            let str1 = '';
            if(stateCode == 200){
                data.forEach(ele => {
                    str+=` <h2>${ele.goodsN}</h2>
                    <p>
                      <span>[${ele.goodsD}]</span>
                      向往的生活同款 / 骁龙865处理器 / 1亿像素8K电影相机，50倍数字变焦，10倍混合光学变焦 / 双模5G / 新一代LPDDR5内存 / 50W极速闪充+30W无线闪充+10W无线反充 / 对称式立体声 / 90Hz刷新率+180Hz采样率 / UFS 3.0高速存储 / 全面适配WiFi 6 / 超强VC液冷散热 / 4500mAh大电量 / 多功能NFC
                    </p>
                    <h3>小米自营</h3>
                    <h4>${ele.price} 元</h4>
                    <div class="version clear_fix">
                      <span>选择版本</span>
                      <ul>
                        <li><a href="">8GB+256GB</a></li>
                        <li><a href="">12GB+256GB</a></li>
                      </ul>
                    </div>
                    <div class="myChoice clear_fix">
                      <span>${ele.goodsN} 8GB+256GB 星空蓝</span><span>4999元</span>
                      <p>总计：${ele.price}元</p>
                    </div>
                    <div class="addcart">
                      <div class="one" onclick="details.addCart(${ele.id},1)">加入购物车</div>
                      <div class="two">
                        <i class="iconfont icon-xihuan"></i>
                        喜欢
                      </div>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="okok">
                      <ul>
                        <li>
                        <i class="iconfont icon-dagou">小米自营</i>  
                        </li>
                        <li>  
                        <i class="iconfont icon-dagou">小米发货</i>  
                        </li>
                        <li>  
                        <i class="iconfont icon-dagou">7天无理由退货</i>  
                        </li>
                        <li>  
                        <i class="iconfont icon-dagou">运费说明</i>  
                        </li>
                        <li>  
                        <i class="iconfont icon-dagou">企业信息</i>  
                        </li>
                        <li>  
                        <i class="iconfont icon-dagou">售后服务政策</i>  
                        </li>
                        <li>  
                        <i class="iconfont icon-dagou">7天价格保护</i>  
                        </li>
                      </ul>
                    </div>`;
                    str1+=`<img src="${ele.goodsImg}" id="A">`;


                    
                });
                $('.rightTwo').innerHTML = str;
                $('#small').innerHTML = str1;
                
                
                let userId = localStorage.getItem('userId');
                // console.log(userId);
                if(userId){
                    $('.idid').innerHTML = userId;
                    $('.idid').setAttribute('class','idstyle')
                }
            }
        })
    }
    static addCart(gdId,gdNum){
      if(localStorage.getItem('userId')){
        details.setDateBase(gdId,gdNum);
      }else{
        details.setLocal(gdId,gdNum);
      }
    }

    static setDateBase(gdId,gdNum){
      let userId = localStorage.getItem('userId');
      ajax.post('./php/details.php?fn=add',{userId:userId,gdId:gdId,gdNum:gdNum}).then(res=>{
        // console.log(res);
        // alert('成功添加购物车');
        if(confirm('成功添加到购物车')){
          location.href = './cart.html';
        }else{
          location.href = './details.html';
        };

      })
    }

    static setLocal(gdId,gdNum){
      // console.log(2);
      let msg = localStorage.getItem('msg');
      if(msg){
        msg = JSON.parse(msg);
        for(let goodId in msg){
          if(goodId == gdId){
            gdNum = msg[goodId] - 0 + gdNum;
          }
        }
        msg[gdId] = gdNum;
        localStorage.setItem('msg',JSON.stringify(msg));
        if(confirm('成功添加到购物车')){
          location.href = './cart.html';
        }else{
          location.href = './details.html';
        };
        
      }else{
        let gdCar = {[gdId]:gdNum};
        gdCar = JSON.stringify(gdCar);
        localStorage.setItem('msg',gdCar);
        if(confirm('成功添加到购物车')){
          location.href = './cart.html';
        }else{
          location.href = './details.html';
        };
      }
      // if(confirm('成功添加到购物车')){
      //   location.href = './cart.html';
      // }else{
      //   location.href = './details.html';
      // };
    }







}



new details;