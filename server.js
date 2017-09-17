var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var app = express();
var session=require('express-session');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'arandmvalue',
    cookie:{maxAge:1000*60*60*24*30}
}));
var config =
{
    user:'sivapriya1700',
    database:'sivapriya1700',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new Pool(config);
var articles=
{

    'articleOne' :
    {
    title: 'Article one | Siva Priya',
    h1: 'Article One',
    date : 'Sep 9 2017 :(',
    content:`
            <p>
                The first article describes 
             Non Programmer description to Git 
            Here is the link !!
        </p>
                <a href="https://blog.scottlowe.org/2015/01/14/non-programmer-git-intro/"> Click here</a>
             But i can summarise!!!..<br><br>
                  <h2>Creating Git repository</h2>
            
                        <br>
        <div>To create a new repository, simply create the directory where you want the repository to be housed, then open a command prompt(or terminal window) and navigate to that directory. Once in the directory, use git init to initialize the directory as a Git repository.
            <br> Cloning a Git repository is super simple: just use the git clone command with a URL<br>
        </div> `
    } ,
    'articleTwo' :
    {
        title: 'Article two | Siva Priya',
        h1: 'Article two',
        date : 'Sep 10 2017 :(',
        content:`
        <p>
        The second article describes 
        Non Programmer description to Git 
        Here is the link !!
        </p>
        <a href="https://blog.scottlowe.org/2015/01/14/non-programmer-git-intro/"> Click here</a>
        But i can summarise!!!..<br><br>
        <h2>Creating Git repository</h2>
        
        <br>
            <div>To create a new repository, simply create the directory where you want the repository to be housed, then open a command prompt(or terminal window) and navigate to that directory. Once in the directory, use git init to initialize the directory as a Git repository.
            <br> Cloning a Git repository is super simple: just use the git clone command with a URL<br>
            </div> `
        
    },
    'articleThree' :
    {
            title: 'Article three | Siva Priya',
            h1: 'Article three',
            date : 'Sep 11 2017',
            content:`
            <p>
            The third article describes 
            Non Programmer description to Git 
            Here is the link !!
            </p>
            <a href="https://blog.scottlowe.org/2015/01/14/non-programmer-git-intro/"> Click here</a>
            But i can summarise!!!..<br><br>
            <h2>Creating Git repository</h2>
            
            <br>
            <div>To create a new repository, simply create the directory where you want the repository to be housed, then open a command prompt(or terminal window) and navigate to that directory. Once in the directory, use git init to initialize the directory as a Git repository.
            <br> Cloning a Git repository is super simple: just use the git clone command with a URL<br>
            </div> `
        
    }
};
function createTemplate(data)
{
    var title=data.title;
    var h1=data.h1;
    var date=data.date;
    var content=data.content;
    var Template=
            `<html>
            <head>
                <title>
                   ${title}
                </title>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="full">
                <div>
                    <a href="/" >Go back to home</a>
                </div>
                <hr>
                <h1>
                    <i>
                    ${h1}
                    </i>
                </h1>
                <div>
                    ${date.toDateString()}        </div>
                <div>
                ${content}
                </div>
            </body>
        </html>`;
return Template;

} 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input,salt)
{
   var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512'); 
   return ["pbkdf2Sync","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res)
{
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});
app.post('/create-user',function(req,res)
{
    var username=req.body.username;
    var password=req.body.password;
    //JSON requests
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    var output={};
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)' ,[username,dbString],function(err,result)
    {
        if(err){
          output['error']='Username already Taken. Select another name' ;
          res.status(500).send(JSON.stringify(output));
        }
        else{
         output['message']="User Successfully created "+username;
          res.status(200).send(JSON.stringify(output));
        }
    });
})
app.post('/login',function(req,res)
{
    var output={};
    var username=req.body.username;
    var password=req.body.password;
    //JSON requests
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result)
    {
        if(err){
          output['error']=err.toString();
          res.status(500).send(JSON.stringify(output));
        }
        else{
        if(result.rows.length === 0)//When we tried to access a article not in database
        {
               output['error']='Invalid Login'
               res.status(404).send(JSON.stringify(output));
        }
        else
        
        {
            var dbString=result.rows[0].password;
            var salt=dbString.split('$')[2];
            var hashedPassword=hash(password,salt);
            if(hashedPassword=== dbString){
                req.session.auth={userId:result.rows[0].id};
                output['message']='User logged in successully'
              //Create a Session
              
              res.status(200).send(JSON.stringify(output)); 
            }
            else
            {
              output['error']=  'Login failed';  
              res.status(403).send(JSON.stringify(output));
            }

        }
        }
    });
})
app.get('/check-login',function(req,res){
   if(req.session&&req.session.auth&&req.session.auth.userId)
   {
       res.status(200).send('You are logged in'+req.session.auth.userId.toString());
   }
   else
     res.send("Not logged in");
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/test-db',function(req,res)
{
    pool.query('SELECT * from test',function(err,result)
    {
        if(err)
          res.status(500).send(err.toString());
        else
          res.send(JSON.stringify(result.rows));
    });
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/logout',function(req,res){
    delete(req.session.auth);
    res.send('Logged out');
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});
var submittednames=[];
app.get('/submit-name', function (req, res) {
   var requestname= req.query.name;
   submittednames.push(requestname);
   res.send(JSON.stringify(submittednames));
});

app.get('/:articleName',function(req,res)
{

    var articleName=req.params.articleName;
        //console.log(articleName)
    var articleObj=[];
    var index=0;
    pool.query("SELECT * from article " ,function(err,result)
    {
        
        /*if(err){
            var errorMsg={};
            errorMsg['error']="Error:Something Wrong";
            articleObj[index]=errorMsg;
            index++;
            res.status(500).send(JSON.stringify(articleObj));
        }
        else
        {
            if(result.rows.length === 0)//When we tried to access a article not in database
            {
                var errorMsg={};
                errorMsg['error']='Requested Article not found';
                articleObj[index]=errorMsg;
                index++; 
                res.status(404).send(JSON.stringify(articleObj));
            }*/
            //var articleData=result.rows[0];
            //res.send(createTemplate(articleData));
            result.forEach(function(row)
            {
            var articleData={};
            /*var articleId=result.rows[0].id;
            var articleTitle=result.rows[0].title;
            var articleHead=result.rows[0].h1;
            var articleDate=result.rows[0].date;
            var articleContent=result.rows[0].content;*/
            articleData['id']=row['id'];
            articleData['title']=row['title'];
            articleData['h1']=row['h1'];
            articleData['date']=row['date'];
            articleData['content']=row['content'];
            index++;
            });
            articleObj[index]=articleData;
            res.status(200).send(JSON.stringify(articleObj));
            
        }
    });//end of request processing
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
//Old article
app.get('/articles/:articleName',function(req,res)
{
    var articlename=req.params.articleName;
    res.send(createTemplates(articleData));
});
