class Cart{
  constructor(){
    this.list();
    $('.check-all').addEventListener('click',this.checkAll);
    Cart.calc();
    

  }
  list(){
    let cartgdIds = '';
    let userId = localStorage.getItem('userId');
    if(userId){
      ajax.get('./php/cart.php',{fn:'getgdId',userId:userId}).then(res=>{
        let{stateCode,data} = JSON.parse(res);
        if(stateCode ==200){
          // console.log(data);
          let cartgdNum = {};
          data.forEach(ele => {
            cartgdIds += ele.productId + ',';
            cartgdNum[ele.productId] = ele.num;
          });
          Cart.getCartgds(cartgdIds,cartgdNum);
        }
      })
    }else{
      let msg = localStorage.getItem('msg');
      if(!msg)return;
      msg = JSON.parse(msg);
      for(let gdId in msg){
        cartgdIds += gdId + ',';
      }
      Cart.getCartgds(cartgdIds);
    }
  }
  static getCartgds(gdId,cartIds = ''){
    // console.log(gdId);
    cartIds = cartIds || JSON.parse(localStorage.getItem('msg'));
    // console.log(cartIds);
    ajax.post('./php/cart.php?fn=lst',{gdId:gdId}).then(res=>{
      let{stateCode,data} = JSON.parse(res);
      if(stateCode == 200){
        let str = '';
        data.forEach(ele=>{
          str+=`<tr>
          <td><input type="checkbox" class="check-one" onclick="Cart.checkOnes(this)"></td>
          <td><img src="${ele.goodsImg}" onclick="Cart.backD(this,${ele.id})" index="${ele.id}" alt=""><span class="msg">${ele.goodsD}</span></td>
          <td>${ele.price}</td>
          <td>
            <span class="down" onclick="Cart.downGdnum(this,${ele.id})">-</span>
            <input class="Acount" type="text" value="${cartIds[ele.id]}" style="text-align: center;line-height: 10px;">
            <span class="up" onclick="Cart.addGdnum(this,${ele.id})">+</span>
          </td>
          <td class="ZongJ" class="">${(ele.price * cartIds[ele.id]).toFixed(1)}</td>
          <td style="color:grey" gdId="${ele.id}" onclick="Cart.delGd(this,${ele.id})">删除</td>
        </tr>`;
        })
        $('tbody').innerHTML = str;
        Cart.getNum();
      };
    });
    
  }
  static backD(ele){
    var idd = ele.getAttribute('index')
    localStorage.setItem('aaa',idd);
    location.href="./details.html";
  }

  // 全选功能
  checkAll(){
    let state = this.checked;
    let checkones = all('.check-one');
    checkones.forEach(ele=>{
      ele.checked = state;
    })
    Cart.calc();
  }
  // 单选操作
  static checkOnes(ele){
    console.log(ele);
    let state = ele.checked;
    if(!state){
      $('.check-all').checked = false;
    }else{
      let checkOne = all('.check-one');
      let len = checkOne.length;
      let Count = 0;
      checkOne.forEach(ele =>{
        if(ele.checked) Count++;
      })
      if(len == Count){
        $('.check-all').checked = true;
      }
    }
    Cart.calc();
  }
  static addGdnum(ele,gdId){
    let inputNum = ele.previousElementSibling;
    inputNum.value = inputNum.value - 0 + 1;
    if(localStorage.getItem('userId')){
      Cart.updateCart(gdId,inputNum.value);
      
    }else{
      Cart.updateLocal(gdId,inputNum.value);
    }
    let priceObj = ele.parentNode.previousElementSibling;
    ele.parentNode.nextElementSibling.innerHTML = (priceObj.innerHTML * inputNum.value).toFixed(1);
    Cart.calc();
    // Cart.getNum();
  }

  static downGdnum(ele,gdId){
    let inputNum = ele.nextElementSibling;
    inputNum.value = inputNum.value - 1; 
    if(inputNum.value <= 0){
      inputNum.value = 0;
      ele.parentNode.parentNode.remove();
    } 

    if(localStorage.getItem('userId')){
      Cart.updateCart(gdId,inputNum.value);
    }else{
      Cart.updateLocal(gdId,inputNum.value);
    }

    let priceObj = ele.parentNode.previousElementSibling;
    ele.parentNode.nextElementSibling.innerHTML = (priceObj.innerHTML * inputNum.value).toFixed(1);
    Cart.calc();
    // Cart.getNum();
  }

  static updateCart(gdId,gdNum){
    let id = localStorage.getItem('userId');
    ajax.get('./php/cart.php',{fn:'update',gdId1:gdId,gdNum1:gdNum,userId1:id}).then(res=>{
      console.log(res);
    })
    Cart.getNum();
  }


  static updateLocal(gdId,gdNum){
    let cartGoods = JSON.parse(localStorage.getItem('msg'));
    cartGoods[gdId] = gdNum;
    localStorage.setItem('msg',JSON.stringify(cartGoods))
    Cart.getNum();
  }

  static calc(){
    let checkOne = all('.check-one');
    // console.log(checkOne);
    let acounts = 0;
    let XJ = 0;
    checkOne.forEach(ele=>{
      if(ele.checked){
        let checkPP = ele.parentNode.parentNode;
        let acounT = checkPP.getElementsByClassName('Acount')[0].value;
        let xj = checkPP.getElementsByClassName('ZongJ')[0].innerHTML;

        acounts = acounT - 0 + acounts;
        XJ = xj - 0 + XJ;
      }
      console.log(acounts,'AAAA',XJ);
      $('.AA').innerHTML = acounts;
      $('.BB').innerHTML = XJ;
    })
  }
  
  static delGd(ele,gdId){
    let userId = localStorage.getItem('userId');
    if(userId){
      ajax.get('./php/cart.php',{fn:'delGd',gdId:gdId,userId:userId}).then(res=>{
      });
    }else{
      let Msg = JSON.parse(localStorage.getItem('msg'))
      delete Msg[gdId];
      localStorage.setItem('msg',JSON.stringify(Msg));
    }
    ele.parentNode.remove();
    
  }


  // 获取数量
  static getNum(){
    let inputs = all('.Acount');
    let abc = 0;
    inputs.forEach(ele=>{
      abc = ele.value - 0  + abc;

    })
    console.log(abc);
    ajax.get('./php/cart.php',{fn:'Change',NNN:abc}).then(res=>{
      console.log(res);
    })
    // localStorage.setItem('lastN',abc);
  }

}

new Cart();