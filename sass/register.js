class regist{
  constructor(){
    this.count = document.getElementById('count');
    this.pass = document.getElementById('pass');
    this.goto = document.getElementById('goto');
    this.count.addEventListener('blur',this.counT.bind(this));
    this.pass.addEventListener('blur',this.passW.bind(this));
    this.goto.addEventListener('click',this.goTo.bind(this))
    this.a;
    this.b;
    
  }
  counT(){
    // console.log(this);
    var val1 = this.count.value;
    // console.log(val1);
    var reg1 = /^[a-zA-Z0-9_-]{4,16}$/;
    if(!(reg1.test(val1))){
      this.count.style.border = "2px solid red";
      this.a = 0;
    }else{
      this.count.style.border = "";
      this.a = 1;
    }
  }
  passW(){
    // this.b = 0;
    var val2 = this.pass.value;
    var reg2 = /^[a-zA-Z0-9_-]{4,16}$/;
    if(!(reg2.test(val2))){
      this.pass.style.border = "2px solid red";
      this.b = 0;
    }else{
      this.pass.style.border = "";
      this.b = 1;
    }
  }

  goTo(){
    if(!this.a || !this.b){
      alert('请规范输入账号和密码');
    }else{
      var val3 = this.count.value;
      var passWW = this.pass.value;
      // console.log(val3);
      var a = false;
      ajax.get('./php/register.php',{fn:'lst'}).then(res=>{
        let{stateCode,data}=JSON.parse(res);
        // console.log(data);
        if(stateCode == 200){
          data.forEach(ele => {
            if(ele.user == val3){
              alert('账号已存在');
              a = true;
              return;
            };
          });
          // console.log(a);
          if(!a){
            ajax.post('./php/register.php?fn=adduser',{user:val3,password:passWW}).then(res=>{
              console.log(res);
                alert('注册成功');
                location.href='./login.html';
            }); 
          }
        };
      });
    };
    
  };



}


new regist();