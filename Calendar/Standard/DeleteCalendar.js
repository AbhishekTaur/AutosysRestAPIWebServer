var sql = require('mssql');

var DeleteCalendar = function (req, res) {
  console.log('inside post function');
    //read jobname from request body
    var cal_name = req.body.cal_name;
	var exist=0;
	var first=0;
	var second=0;
	console.log('further');
	sql.connect(config).then(function(){
		console.log('inside connect');
	new sql.Request()
            .input('cal_name', sql.VarChar(64), cal_name)
			.query('select * from ujo_calendar where name=@cal_name').then(function(record) {
				console.log('before dir');
				console.dir(record);
				
				if(record.length==0){
					exist=1;
					if(exist==1){
		             res.json({ job: 'calendar does not exist ' });
	                  }
                     console.log('Calendar do not exist');
               }else{
				   console.log('before firsst delete');
				    new sql.Request().input('cal_name', sql.VarChar(64), cal_name)
					.query('DELETE  FROM ujo_calendar where name=@cal_name')
					.then(function(record){
						console.log('deleting');
						first=1;
						console.log('first');
					}).catch(function(err) {
			          console.log(err);
			// ... query error checks
		           });
				    new sql.Request().input('cal_name', sql.VarChar(64), cal_name)
					.query('DELETE  FROM ujo_calendar_desc where cal_name=@cal_name')
					.then(function(record) {
                     second=1;
					 console.log('second');
					   if(first==1 && second==1){
		                  res.json({ job: 'success ' });
	                             }
			   }).catch(function(err){
			console.log(err);
			// ... query error checks
			   });
			   
			   }
			}).catch(function(err) {
			console.log(err)
			// ... query error checks
		});
		console.log('ffffff');
		
	});
    //do actual create operation here to create the job
    //TODO
	
	/* if(first==1 ){
		res.json({ job: 'success ' });
	} */ 
};

module.exports = DeleteCalendar;


