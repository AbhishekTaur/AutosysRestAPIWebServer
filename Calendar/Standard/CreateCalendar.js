var sql = require('mssql');

var CreateCalendar=function(req,res){
    var cal_id=0;
    var name=req.body.name;
    var dates =req.body.dates;
    var description=req.body.desc;
    if(name==undefined){
        console.log('calendar name is not provided');
        res.json({'message':'calendar name is mandatory'});
        return;
    }
    if(dates==undefined || dates.length == 0 ){
    console.log('calendar date is not provided');
            res.json({'message':'calendar date is mandatory'});
            return;
    }

    sql.connect(config).then(function() {
            new sql.Request().query("select name from ujo_calendar where name='" +name+ "'").then(function(recordsets){
                if(!recordsets.length){
                    for(day in dates){
                    console.log('inserting a new record in calendar table ...');
                    new sql.Request()
                        .input('cal_id', sql.Int, cal_id)
                        .input('name', sql.VarChar(64), name)
                        .input('day',sql.VarChar(80),dates[day].date)
                        .query('insert into ujo_calendar values (@cal_id,@day,@name)')
                        .then(function(recordsets) {
                            new sql.Request()
                                                .input('cal_id', sql.Int, cal_id)
                                                .input('name', sql.VarChar(64), name)
                                                .input('description',sql.VarChar(1024),description)
                                                .query('insert into ujo_calendar_desc values (@cal_id,@name,@description)')
                                                .then(function(){
                                                      //res.json({ 'message': 'description for '+name+' is successfuly inside ujo_calendar_desc.' });
                                                 });
                            res.json({ 'message': 'Insert Successful for Calendar: '+name+' ' });
                        });
                    }
                }
                else{
                    res.json({ 'message': 'Standard Calendar '+name+' already exists' });
                    return;
                }

            })
                 /*new sql.Request()
                    .input('cal_id', sql.Int, cal_id)
                    .input('name', sql.VarChar(64), name)
                    .input('description',sql.VarChar(1024),description)
                    .query('insert into ujo_calendar_desc values (@cal_id,@name,@description)')
                    .then(function(){
                          //res.json({ 'message': 'description for '+name+' is successfuly inside ujo_calendar_desc.' });
                     });*/

        });

 }

module.exports = CreateCalendar;



