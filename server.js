  const express = require("express");
  const faunadb = require("faunadb");

  const app = express();
  const client = new faunadb.Client({ secret: "fnAEOasl01ACC1MU4PEJSlKnPWQnH98XX7__udwM"});

    //console.log(client);
    //console.log(faunadb.query);

    const {Get, Create} = faunadb.query;

    console.log(Get);




  //console.log(faunadb.query);
  app.post("/creatuser", async function(req, res){
    let data = {
      name: "Tony",
      email: "Tony@gmail.com"

    }

    const doc = await client.query(
      Create(
        collection("users"), {data}
      )
    )

    res.send(doc);
  });


//Get request
  app.get("/getuser/:id", async function(req, res) {

    console.log(req.params.id);
    console.log(Get());
   const doc = await client.query(

     Get( Ref (Collection('users'), req.params.id))

   ).catch(err => console.log(err))

   res.send(doc);
 });


//getting goods
 app.get("/getgoods", async function(req, res) {


  const doc = await client.query(
  Get(Ref(Collection('users'), "304464094864343564"))
).catch(err => res.send(err));

  res.send(doc);
});



  app.listen(3000, function(){
    console.log("App is listening on url http://localhost:3000")
  });
