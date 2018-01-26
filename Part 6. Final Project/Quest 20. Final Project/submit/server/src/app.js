const { driver, process, structure } = require('gremlin-javascript');

let connection = new driver.RemoteConnection('ws://nv-lcn-green-u.knowreinc.com:8182/gremlin')

const g = new structure.Graph().traversal().withRemote(connection);

( async () => {
  try {
    let result = await g.V().count().toList()
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  
})();