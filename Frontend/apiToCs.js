
fetch("https://localhost:44334/hello",{
method: "GET",
headers: {
    "Content-Type": "application/json",
},
mode:"cors",
// body: JSON.stringify(payload),
})
.then(response=>{
    console.log(response.text());
})
.catch(err=>{
    console.log("error: ",err)
});
