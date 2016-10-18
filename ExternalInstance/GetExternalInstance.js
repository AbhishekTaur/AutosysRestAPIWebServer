/* global config */

var sql = require('mssql');

var GetExternalInstance = function (req, res) {

    var Instance_Name = req.body.external_instance;
    var Initial_Name = Instance_Name;
    
    //check whether user has entered the external_instance
    if (Instance_Name === undefined) {
        res.json({Message: "external_instance is required"});
        return;
    }
    
    //Check whether the length of external instance is not greater than 3
    if (Instance_Name.length > 3) {
        res.json({Message: "External Instance Name cannot exceed 3 characters"});
    } else {
        for(i in Instance_Name){
            if(Instance_Name[i]=='*'){
                 Instance_Name = Instance_Name.replace('*', '%');
            }else if(Instance_Name[i]=='?'){
                Instance_Name = Instance_Name.replace('?', '_');
            }
        }
        
        //connect to the database
        sql.connect(config).then(function () {
            //Execute the query to get the details of external_instance
            new sql
                    .Request()
                    .query("select asext_autoserv as Name,\n\
                            asext_instance_type as Type, \n\
                            asext_nod_name as Server, asext_port as Port \n\
                            from ujo_asext_config where asext_autoserv like '"
                            + Instance_Name + "'")
                    .then(function (recordset) {
                        if (recordset.length != 0) {
                            res.json(recordset);
                        } else {
                            res.json({Message: "Invalid External Instance Name: "
                                        + Initial_Name});
                        }
                    }).catch(function (err) {//Catch error if there is problem in the execution of the query
                res.json({Message: err});
            });
        }).catch(function (err) {//
            res.json({Message: err});
        });
    }
};
module.exports = GetExternalInstance;