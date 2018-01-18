
const { createClient, statics } = require("gremlin");

const client = createClient(8182, "nv-lcn-green-u.knowreinc.com", {
//const client = createClient(8182, "localhost", {
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
// let query = "g.V('d6b06ccc-4f64-700c-7d08-0d3a0a7de1c2').values()";
  //let query = "g.V().has('name','Alice').id().as('a').select('a')";
  //let query = "g.V('0').sideEffect(id().store('a')).out().hasId(within('2','4','5')).as('b').select('a','b')";
  let query = `g.V("KR-PR-0000000002").match(
                      __.as('pr').sideEffect(__.out('has_map').store('map')).id().as('prod_id'),
                      __.as('pr').values('name').as('prod_name'), 
                      __.as('pr').outE('has_curriculum').as('pr-cu').values('seq').as('cu_seq'),
                      __.as('pr-cu').inV().as('cur').values('name').as('cur_name'),
                      __.as('cur').outE().as('cu-ch').values('seq').as('ch_seq'),
                      __.as('cu-ch').inV().as('ch').values('name').as('ch_name')).select('map','ch_name' ,'ch_seq','cur_name','cu_seq','prod_name','prod_id').toList()`
  // let query = `g.addV('product').property('code','AUS').as('aus').
  // addV('curriculum').property('code','DFW').as('dfw').
  // addV('curriculum').property('code','LAX').as('lax').
  // addV('curriculum').property('code','JFK').as('jfk').
  // addV('curriculum').property('code','ATL').as('atl').
  // addE('route').from('aus').to('dfw').
  // addE('route').from('aus').to('lax').
  // addE('route').from('aus').to('jfk').
  // addE('route').from('aus').to('atl')`;
  //let query = "g.V('KR-PR-0000000002').match(__.as('pr').out('has_curriculum').as('cur')).select('pr', 'cur')";
  
client.execute(query, {}, (err, results) => {
    if (err){
      return console.error(err);
    }
    console.log(results);
  
    
  });

};

fetchByName2("lee");

