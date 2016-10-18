var sql = require('mssql');

var ListAllStandardCalendars = function (req, res) {
   //communicate with database and get the job details here
	sql.connect(config).then(function() {
		// Query
		new sql.Request().query('select distinct ujo_calendar.name as "Calendar Name", \'Standard Calendar\' as "Calendar Type", ujo_calendar_desc.description as "Description" FROM ujo_calendar JOIN ujo_calendar_desc ON ujo_calendar.name=ujo_calendar_desc.cal_name and ujo_calendar_desc.cal_type = 1 ORDER BY name').then(function(recordset) {
		var i=1;
			for(recordIdx in recordset)
			{
				var record = recordset[recordIdx];
 			console.log(i++ +"\t"+record["Calendar Name"]+"\t"+record["Description"]);
			}
           res.json(recordset);
			//console.dir(recordset);
		}).catch(function(err) {
			res.jason(err);
			// ... query error checks
		});

	});
};

module.exports = ListAllStandardCalendars;


