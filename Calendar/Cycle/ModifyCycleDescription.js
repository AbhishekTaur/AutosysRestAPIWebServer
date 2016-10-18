var sql = require('mssql');
var ModifyCycleDescription = function (req, res) {
    //read jobname from request body
    var jobname = req.body.name;
    var des=req.body.des;
    //var x=req.body.cal_type;
    //do actual create operation here to create the job,
//     if(x!="cycle" ){
//          res.json({mess:"sorry only cycle calender is accepted"});
//          exit(1);
//     }

    //TODO
             sql.connect(config).then(function() {


             		// Query
             		new sql.Request().query("select * from ujo_cycle where cycname='"+jobname+"' ").then(function(recordset) {
               			if(recordset.length!=0){
                           var record = recordset[0];
                           console.log('rec '+record["cal_name"]+" "+record["description"]);

             				new sql.Request().query("UPDATE ujo_calendar_desc SET description= '"+des+"' where cal_name='"+jobname+"'").then (function(recordset){

             				res.json({ job: 'Description of  '+jobname  + " is updated"});

             				}).catch (function(err){
             				  console.log(err);
             				});



             			}
             			else{
             			  res.json({ job: jobname  + " calendar does not exit"});
             			}
             			//console.dir(recordset);
             		}).catch(function(err) {
             			console.log(err);
             			// ... query error checks
             		});

             	});
    //send the response to rest client


};

module.exports = ModifyCycleDescription;


