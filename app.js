const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const pinCode=req.body.pinCode;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)
  {
      dd='0'+dd;
  }
  if(mm<10)
  {
      mm='0'+mm;
  }
today = dd+'-'+mm+'-'+yyyy;

  //const apiKey="7942bffe45ae7b970a33d7d8d9aead02";
  //const unit="metric";
  //const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;


  const url="http://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pinCode+"&date="+today;

  http.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const centerData=JSON.parse(data);

res.render("index",{pinCode:pinCode,centerData:centerData});

//       res.write("<h1>Details of Vaccine centers in "+pinCode+" are</h1><br>")
//       for(var i=0;i<(centerData.centers.length);i++){
//         res.write("<h3>"+(i+1)+".)&nbsp&nbsp"+centerData.centers[i].name+
//         "&nbsp&nbsp----&nbsp&nbsp </h3> <h4>Address:&nbsp"+centerData.centers[i].address+"</h4>");
//
//         for(var j=0;j<(centerData.centers[i].sessions.length);j++){
//         res.write("<strong><em>Date:&nbsp</strong></em>"+ centerData.centers[i].sessions[j].date+
//         "&nbsp&nbsp-----&nbsp&nbsp <strong><em>Vaccine Type:&nbsp</strong></em>"
//         +centerData.centers[i].sessions[j].vaccine+
//         "&nbsp&nbsp-----&nbsp&nbsp <strong><em>Available Capacity:&nbsp</strong></em>"
//         +centerData.centers[i].sessions[j].available_capacity+"<br>");
//       }
// res.write("<br><br><br>")
//       }

//      res.send();
   })
  })
})


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})
