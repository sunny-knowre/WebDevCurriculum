const DriverRemoteConnection = require('../node_modules/gremlin-javascript/lib/driver/driver-remote-connection');
const { driver, process, structure } = require('gremlin-javascript');

exports.getConnection = function getConnection(traversalSource) {
  return new DriverRemoteConnection('ws://nv-lcn-green-u.knowreinc.com:8182/gremlin', { traversalSource: traversalSource });
};

var g = new structure.Graph().traversal();

let getOne = async () => {
  
}

console.log(getOne())