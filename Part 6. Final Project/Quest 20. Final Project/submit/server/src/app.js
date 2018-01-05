const { createClient, makeTemplateTag } = require("gremlin");

const client = createClient(8182, "nv-lcn-green-u.knowreinc.com", {
  accept: "application/vnd.gremlin-v2.0+json"
});
const gremlin = makeTemplateTag(client);



//without bindings:
const fetchByName2 = name => {
  client.execute('g.V().has("name", "'+ name +'")', {}, (err, results) => {
    if (err){
      return console.error(err);
    }
    console.log(JSON.stringify(results[0]['@value']));
  });
};

fetchByName2("lee");