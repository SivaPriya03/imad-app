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
var submit=document.getElementById('submitbtn2');
submit.onclick=function()
{
    var request =new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState ===  XMLHttpRequest.DONE)
        {
            if(request.status === 200){
              var names=request.responseText;
              //Console.log(request.onreadystatechange);
              names=JSON.parse(names);
                var list='';
                for (var i=0;i<names.length;i++)
                {
                    list+='<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById('list');
                ul.innerHTML=list;
            
            }
        }
    };
var nameip=document.getElementById('name');
var myname=nameip.value;
request.open('GET','http://sivapriya1700.imad.hasura-app.io/submit-name?name=' + myname,true);
request.send(null);
};

//Module P11: maintaining session
submit=document.getElementById('submitbtn');
submit.onclick=function()
{
    var request =new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState ===  XMLHttpRequest.DONE)
        {
            if(request.status === 200){
              console.log("User logged in");
              alert("Login Success");
            }
            else if(request.status===403){
               console.log("Invalid login");
               alert("Login fails");
            }  
            else
               alert("Somethong went wrong");
        }
    };
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);

request.open('POST','http://sivapriya1700.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password}));
};

    