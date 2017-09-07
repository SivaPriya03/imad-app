var button=document.getElementById('button');
var counter=0;
button.onclick=function()
{
    
    var request =new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readystate --- XMLHttpRequest.DONE)
        {
            if(request.status --- 200){
              var counter=request.responseText;
              counter+=1;
              var span=document.getElementById('counter');
              span.innerHTML=counter.toString();
            }
        }
    };

request.open('GET','http://sivapriya1700.imad.hasura-app.io/counter',true);
request.send(null);
};