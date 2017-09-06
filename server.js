var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleOne =
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
        
            
};
var articleTwo =
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
        
            
};
var articleThree =
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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/article-one',function(req,res)
{
   res.send(createTemplate(articleOne));
});
app.get('/article-two',function(req,res)
{
   res.send(createTemplate(articleTwo));
});
app.get('/article-three',function(req,res)
{
   res.send(createTemplate(articleThree));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
