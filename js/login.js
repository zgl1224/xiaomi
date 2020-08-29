// 正则表达式
// count.onblur = function(){
//   var a;
//   var val = this.value;
//   console.log(val);
//   var reg = /^[a-zA-Z]{5}$/;
//   if(!(reg.test(val))){
//     console.log(123);
//     this.style.border = "2px solid orange";
//   }else{
//     console.log(456);
//     this.style.border = "";
//     a = true;
//   }
// }
class Log{
  constructor(){
    this.count = document.querySelector('#count');
    this.pass = document.querySelector('#pass');
    this.log = document.getElementById('goTo');
    this.log.addEventListener('click',this.goL.bind(this));

  }
  goL(){
    // console.log(this.count.value);
    let countV = this.count.value;
    let passV = this.pass.value;
    ajax.get('./php/login.php',{fn:'look'}).then(res=>{
      let{stateCode,data} = JSON.parse(res);
      
      if(stateCode == 200){

        var a = 0;
        data.forEach(ele => {
          // console.log(ele);
          if(ele.user == countV && ele.password == passV){
            localStorage.setItem('userId',ele.user);
            a = 1;
            // return;
            location.href = './goodsList.html';
          }
        });
        if(!a == 1){
          // console.log(1234);
          alert('用户名或密码错误，请重新输入')
          this.count.value = '';
          this.pass.value='';
          // location.href = './goodsList.html';
        }
      }
      
    })

  }

  static gogister(){
    location.href = './register.html';
  }

}


new Log;


