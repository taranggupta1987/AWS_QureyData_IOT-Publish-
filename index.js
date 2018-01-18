var mysql=require('mysql');
var AWS = require('aws-sdk');

exports.handler=function(event,context,callback){
    
    //if required to get the data as event
    var tags = event['tags'];
    
    //IOT Things Endpoint..
    var iot = new AWS.IotData({endpoint : "IOT Things endpoint"});

    //Parameters to Publish the data..
    var params = {
        topic: 'topic',
        payload: "if required", 
        qos: 0
    };
    
    //Connection string for SQL..
    var conn = mysql.createConnection({
        host: 'hostname',
        user: 'username',
        password: 'password',
        database: 'database_name'
    });

    //connect to DB..
	conn.connect();

    //Query to DB..
	conn.query('statement',["parameteres if required"],function(err, rows, fields){
	if (err) {
               callback(null,{
                   "status":"error",
                   "error":err
               })
            }
            
        params.payload = JSON.stringify("As per requirement");
        
        publish(params);
		
			
	});

    //Close the connection string..
    conn.end();
    
    //function to publish the payload for specific topic..
    function publish(params)
    {
        iot.publish(params, function(err, data) {
            if (err) {
                context.done(err);
            }
        });
    }
}
