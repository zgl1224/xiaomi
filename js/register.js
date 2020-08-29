class regist{
  constructor(){
    this.count = document.getElementById('count');
    this.pass = document.getElementById('pass');
    this.goto = document.getElementById('goto');
    this.span = document.querySelector('.span1');
    this.pass1 = document.getElementById('passCopy');
    console.log(this.pass1);
    this.count.addEventListener('blur',this.counT.bind(this));
    this.pass.addEventListener('blur',this.passW.bind(this));
    this.goto.addEventListener('click',this.goTo.bind(this))
    this.d;
    this.e;
    this.f;
    this.a = 0;
    this.b = 0;
    this.c = 0;

  }
  counT(){
    // console.log(this);
    var val1 = this.count.value;
    // console.log(val1);
    var reg1 = /^[a-zA-Z]+\d{3,8}$/;
    if(!(reg1.test(val1))){
      this.count.style.border = "2px solid red";
      this.d = 0;
    }else{
      this.count.style.border = "";
      this.d = 1;
    }
  }
  passW(){
      
      var val2 = this.pass.value;
      console.log(val2);
      // var a = 0;
      // var b = 0;
      // var c = 0;
      // var e = 0;
      var str = '';
      if(val2.length >= 6 && val2.length <= 12){
          // this.b = true;
          var reg2 = /\d+/;
          if(reg2.test(val2)){
              this.a = 1;
          }else{
              this.a = 0;
          }
          var reg3 = /[a-zA-Z]+/;
          if(reg3.test(val2)){
              this.b = 1;
          }else{
              this.b = 0;
          }
          var reg3 = /[^a-zA-Z0-9]+/;
          if(reg3.test(val2)){
              this.c = 1;
          }else{
              this.c = 0;
          }
          this.e = this.a+this.b+this.c;
          switch(this.e){
              case 1:
              str = "安全性弱";
              break;
              case 2:
              str = "安全性中";
              break;
              case 3:
              str = "安全性强";
              break;
          }
          this.span.innerHTML = str;
          
      }else{
          this.span.innerHTML = "密码长度不够";
      }

  
  }

  goTo(){
    console.log(this.d,this.e);
    var pass1 = this.pass1.value;
    if(pass1!=this.pass.value){
      // return;
      this.f = 0;
      // console.log(23423);
      alert('两次密码不一致')
      return;
    }else{
      this.f = 1;
    }

    console.log(this.f);
    if(this.d && this.e&&this.f){
      console.log(34324);
      var val3 = this.count.value;
      var passWW = this.pass.value;
      // console.log(val3);
      var a = true;
      ajax.get('./php/register.php',{fn:'lst'}).then(res=>{
        let{stateCode,data}=JSON.parse(res);
        // console.log(data);
        if(stateCode == 200){
          data.forEach(ele => {
            if(ele.user == val3){
              alert('账号已存在');
              a = false;
              return;
            };
          });
          // console.log(a);
          if(a){
            console.log(a);
            ajax.post('./php/register.php?fn=adduser',{user:val3,password:passWW}).then(res=>{
              console.log(res);
                alert('注册成功');
                location.href='./login.html';
            }); 
          }
        };
      });
    }else{
      alert('请规范输入账号和密码');
    };
   
    
  };



}


new regist();