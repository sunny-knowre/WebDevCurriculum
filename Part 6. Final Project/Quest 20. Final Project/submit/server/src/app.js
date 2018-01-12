
const { createClient, statics } = require("gremlin");

const client = createClient(8182, "nv-lcn-green-u.knowreinc.com", {
  accept: "application/vnd.gremlin-v2.0+json"
});


//without bindings:
const fetchByName2 = name => {
  // let query = "g.V().has('name','Alice').out('knows').has('name','Sunny123').hasNext()";
  // let query = "g.V().has('name', 'Alice').as('a').has('name', 'Sunny123').as('s').addE('knows').from('a').to('s')";
  // let query = "g.V().has('name', 'Alice').outE('knows').values('name').fold()";
  // let query = "g.V().has('name', 'Alice').as('a').has('name','Sunny123').as('b').addE('knows').from('a').to('b')";
   //let query = "g.V().has('name', 'Alice').fold().coalesce(unfold(),addV().property('name','Alice'))";
  // let query = "g.V().hasLabel('name').values().toList()";
//  let query = "g.V('d6b06ccc-4f64-700c-7d08-0d3a0a7de1c2').values()";
  //let query = "g.V().has('name','Alice').id()";
  let query = "g.V()";
  
client.execute(query, {}, (err, results) => {
    if (err){
      return console.error(err);
    }
    console.log(results);
  
    
  });

};


fetchByName2("lee");

