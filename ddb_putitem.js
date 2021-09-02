// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'eu-west-1'});

// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// var params = {
//   TableName: 'test',
//   Item: {
//     'date' : {S: '001'},
//     'code' : {S: 'Richard fnreferi'}
//   }
// };

// // Call DynamoDB to add the item to the table
// ddb.putItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
// AWS.config.update({region: 'eu-west-1'});

const ddb = new AWS.DynamoDB.DocumentClient({region:"eu-west-1"});

exports.handler = async(event, context, callback) => {
  const requestID = context.requestID;
  await createMessage(requestID).then(()=>{
    callback(null, {
      statusCode: 201,
      body: '',
      headers: {
        "Access-Control-Allow-Origin" : "*"
      }
    });
    console.log("Success");
  }).catch((err)=>{
    console.error(err);
  });
}

function createMessage(requestID){
  const params = {
    TableName: "test",
    Item: {
      "date":"2021",
      "code":"3048"
    }
  }
  return ddb.put(params).promise();
}
