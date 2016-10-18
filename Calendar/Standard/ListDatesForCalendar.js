var sql = require('mssql');

var ListDatesForCalendar = function (req, res) {
    //read jobname from request body
    var name = req.body.name;
	 var y = 1;
    //do actual create operation here to create the job
    
    sql.connect(config).then(function() {
		// Query
		new sql.Request().query("select format(day,'MM/dd/yyyy hh:mm:ss') as date from ujo_calendar where name='"+name+"'").then(function(recordset) {

		   var string1 = "Date "+ 1 +" : "

			for(record in recordset)
			{
				y++;
				 var string2 = "Date "+ y +" : "

				if(record==recordset.length-1)
				{   string2="";
				}
				var record1 = recordset[record];
				var string1 = string1 + record1['date']+"\n"+ string2;
			}

			if(recordset.length==0){
			 res.json({Error : 'Calendar Not Found'});
			}
			 else{
            		res.json(string1)
            	}

			
		}).catch(function(err) {
			console.log(err);
			// ... query error checks
		});

	});
    //send the response to rest client	
};

module.exports = ListDatesForCalendar;


