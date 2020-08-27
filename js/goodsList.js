class Goods{
  constructor(){
    this.list();
    this.goodid = document.getElementsByClassName('aaa');
    
  }
  
  static fnn(ele){
    var idd = ele.getAttribute('index')
    localStorage.setItem('aaa',idd)
    location.href="./details.html";
  }
  
  list(){
    ajax.get('./php/goods.php',{fn:'lst'}).then(res=>{
      let{stateCode,data} = JSON.parse(res);
      let str = '';
      if(stateCode == 200){
        data.forEach(ele => {
          str+=`<ul index=${ele.id} onclick="Goods.fnn(this)">
                  <li >
                    <a href="javascript:void(0)">
                      <img class='lazyImg' src="./images/44.gif" data-src='${ele.goodsImg}' alt="">
                    </a>
                    <h3>${ele.goodsN}</h3>
                    <h4>${ele.goodsD}</h4>
                    <p>${ele.price}<span>元起</span></p>
                  </li>
                </ul>`
        });
        $('#phonesLis').innerHTML = str;
      };
    });

    let userId = localStorage.getItem('userId');
    if(userId){
      $('.idid').innerHTML = userId;
      $('.idid').setAttribute('class','idstyle')
    }
  };
};
new Goods;



// 懒加载


window.onscroll = function(){
  var imgs = document.querySelectorAll('.lazyImg');
  lazy(imgs);
};

