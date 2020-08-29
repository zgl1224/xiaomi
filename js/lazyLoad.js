function getTop(e){
  var T = e.offsetTop;
  while(e = e.offsetParent){
    T += e.offsetTop;
  }
  return T;
}
function lazy(imgs){

  var H = document.documentElement.clientHeight;
  var S = document.documentElement.scrollTop || document.body.scrollTop;
  for(var i = 0;i<imgs.length;i++){
    if(H+S>getTop(imgs[i])+300){
      imgs[i].src = imgs[i].getAttribute('data-src');
    }
  }
}
// 下面的内容放在主体js文件中，注意节点名称
// window.onscroll = function(){
//   var imgs = document.querySelectorAll('.lazyImg'); 
//   lazy(imgs);
// };