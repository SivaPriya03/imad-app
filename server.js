var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var app = express();
app.use(morgan('combined'));
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
            date : 'Sep 11 2017 :(',
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
                    ${date}        </div>
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var pool=new Pool(config);
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
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function (req, res) {
   var name= req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
    pool.query("SELECT * from article where title='"+articleName +"'",function(err,result)
    {
        if(err)
            res.status(500).send(err.toString());
        else
        {
            if(result.rows.length === 0)//When we tried to access a article not in database
               res.status(404).send("Requested Article not found");
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
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
