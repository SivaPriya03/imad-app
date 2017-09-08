var button=document.getElementById('button');
var counter=0;
button.onclick=function()
{
    
    var request =new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState ===  XMLHttpRequest.DONE)
        {
            if(request.status === 200){
              var counter=request.responseText;
              //counter+=1;
              var span=document.getElementById('counter');
              span.innerHTML=counter.toString();
            }
        }
    };

request.open('GET','http://sivapriya1700.imad.hasura-app.io/counter',true);
request.send(null);
};
var nameip=document.getElementById('name');
var name=nameip.value;
var submit=document.getElementById('submitbtn');
submit.onclick=function()
{
    var names=['name1','name2','name3','name4'];
    var list='';
    for (var i=0;i<names.length;i++)
    {
        list+='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('list');
    ul.innerHTML=list;
};