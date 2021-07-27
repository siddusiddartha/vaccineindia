const express=require("express");
const app=express();
const https=require("https");
const request=require("request");
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


  const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pinCode+"&date="+today;

//const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pinCode+"&date="+today+"&headers={"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}";
//const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=520012&date=08/05/2021&headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}";
const headers={
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
"accept": "application/json",
"Accept-Language": "en_US",
}


  https.get(url,headers,function(response){
    console.log(response.statusCode);
    //console.log(headers);

    if(response.statusCode===500){
      res.send("500");
    }
    else if(response.statusCode===400){
      res.render("400");
    }
    else{
      response.on("data",function(data){
        const centerData=JSON.parse(data);

        res.render("index",{pinCode:pinCode,centerData:centerData});
  });
    }


});
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running successfully");
})
