var sql = require('mssql');

var AddDatesToCalendar=function (req, res) {
//communicate with database and get the job details here
                        var dates=req.body.dates;
                		if(dates==undefined || dates.length==0)
                		{
                		    res.json({'message':'Not correct date format'});
                		    return;
                		}
                		console.log('inserting a new record in calendar table 22222...');

                		var name = req.body.name;
                		if(name==undefined)
                        {
                                res.json({'message':'Not correct table name'});
                                return;
                        }


	sql.connect(config).then(function() {
    		console.log('inserting a new record in calendar table ...');



    		console.log(name);
    		new sql.Request().query("select * from ujo_calendar where name='" +name+ "' ").then(function(recordset) {
    		        //console.log('inserting a new record in calendar table 11111...');
                     if(recordset.length!=0)
                     {       var count=0;
                            console.log('inserting a new record in calendar table 44444...');
                            for(day in dates)
                            {

                            var id=0;
                            var date=dates[day].date;
                            console.log(date);
                            //new sql.Request().query("select * from ujo_calendar where day='" +dates[day].date+ "' and name='"+name+ "'").then(function(readset) {
                            new sql.Request().query("select * from ujo_calendar where day='" +date+ "' and name='"+name+ "'").then(function(readset) {
                            //console.log('inserting a new record in calendar table 333333...');
                            console.log(name);
                            if(!readset.length)
                            {

                                console.log('inserting a new record in calendar table finally');
                                console.log('inserted a new record in calendar table ...'+date);
                                new sql.Request()
                                .input('cal_id', sql.Int,id)
                                .input('name', sql.VarChar(80),name)
                                .input('day', sql.VarChar(80), date)
                                //.input('day', sql.VarChar(80), dates[day].date)
                                //
                                .query('insert into ujo_calendar values (@cal_id,@day, @name)')
                                .then(function(recordsets) {//name of stored procedure put_machine,recordset is return value
                             //console.dir(recordsets);
                                //console.log('inserted a new record in calendar table ...'+date);
                                res.json({ 'message': 'New date is added successfully.' });
                                });
                            }
                            else
                            {
                                console.log('This date already exist');
                                res.json({ 'message': 'This date already exist.' });
                            }
                            console.log('I am coming here');
                     });
                     }
                    }
                      else
                      {
                         console.log('This calendar does not exist');
                         res.json({ 'message': 'This calendar name does not exist.' });
                      }
                     });


            });
};

module.exports =AddDatesToCalendar;


