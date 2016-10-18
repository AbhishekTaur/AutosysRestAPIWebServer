var sql = require('mssql');

var DeleteCycle = function (req, res) {
   //communicate with database and delete from table ujo_cycle
   var cyc_name=req.body.Name;
   if(cyc_name==undefined)
   {
	   res.json({ Message: 'Check the input pattern' });
	   console.log("Check the input");
   }
   else
   {
	 sql.connect(config).then(function() {
		
		new sql.Request().query("select * from ujo_cycle where cycname='"+cyc_name+"'").then(function(recordset){
			if(recordset.length!=0)
			{
				new sql.Request().query("delete from ujo_calendar_desc where (cal_type=3 and cal_name='"+cyc_name+"')").then(function() {
			
					}).catch(function(err) {
					console.log(err);
					// ... query error checks
					});
	
		
				new sql.Request().query("delete from ujo_cycle where cycname='"+cyc_name+"'").then(function() {
			
				}).catch(function(err) {
				console.log(err);
				// ... query error checks
				});
				console.log("Delete successful for cycle: "+cyc_name);
				res.json({ Message: 'Delete successful for cycle: '+cyc_name });
			}
			else
				console.log("Cycle "+cyc_name+" doesnot exist");
				res.json({ Message: 'Cycle '+cyc_name+' doesnot exist' });
		});
	});
   }

};

module.exports = DeleteCycle;




