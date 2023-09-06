// // server.js

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Check authentication logic
//   if (username === 'admin' && password === 'password') {
//     res.sendStatus(200); // Authentication successful
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// });

// // Home page
// app.get('/home', (req, res) => {
//   res.send('Welcome to the home page!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


async function timer(i){
  // console.log("yes",i)
  // setTimeout(() => {
  //     console.log("hello",i) 
  // }, 2000);
  // console.log("no",i)
  return i*3;
}

// async function fun(){
//   console.log("after")
//   timer(1)
//   .then((result)=>{
//     // console.log(result)
//     console.log("1")
//   })
//   // console.log(result)
//   console.log("before")
// }
// fun();
let arr=[1,2,3,4,5,6,7,8]
 async function loop(){
  // arr.forEach(async(i)=>{
  //   console.log("ii")
  //   let r= await timer(i);
  //   console.log(r)
  // })
  for(let i=0;i<arr.length;i++)
  {
    console.log("ii")
    let r=await timer(i);
    console.log(r)
  }
  console.log("jj")
}
loop()
console.log("k")