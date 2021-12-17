







// const express = require('express');
// const app = express();

// app.get('/',(req,res) => {
//     res.status(200).send('Home Page');
// });

// app.get('/banana',(req,res) => {
//     res.status(200).send('Banana on the dish');
// });

// app.all('*',(req,res) => {
//     res.status(404).send('<h2 style="color:red"> Apple tell you that the page not found! </h2>');
// })

// app.listen(5000, ()=> {
//     console.log('server is listening on port 5000../');
// });




// // const http = require('http');
// // const {readFileSync} = require('fs');

// // // get all file
// // const homePage = readFileSync('index.html');

// // // server site
// // const server = http.createServer((req, res)=>{
// //     //console.log("Hello user")
// //     const url = req.url;
// //     if(url === '/'){
// //         res.writeHead(200,{'content-type':'text/html'});
// //         res.write(homePage);
// //         res.end();
// //     } else if (url === '/banana'){
// //         res.writeHead(200,{'content-type':'text/html'})
// //         res.write('<h1>I love banana</h1>')
// //         res.end();
// //     } else {
// //         res.writeHead(404,{'content-type':'text/html'});
// //         res.write("<h1 style='color:red'>I cant not found your page !</h1>");
// //         res.end();
// //     }
    
// // });

// // server.listen(5000);