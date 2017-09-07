console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='I am client side javascript';
var img=document.getElementById('image');
var marginleft=0;
function moveRight()
{
    marginleft+=10;
    img.style.marginLeft=marginleft+"px";
}
img. onclick=function(){
    var interval=intInterval(moveRight,100);
};