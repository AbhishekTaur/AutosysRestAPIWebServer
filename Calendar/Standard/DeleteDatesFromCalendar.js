var sql = require('mssql');

var DeleteDatesfromCalendar =  function (req, res) {
    var dates=req.body.Dates;
     if(dates==undefined || dates.length==0)
       { res.json({api:'At least one date should be present'});
        return;
       }
    var calname=req.body.Name;
    if(calname==undefined)
    { res.json({api:'Calendar name is mandatory'});
    return;
    }
    var exists=0;


        sql.connect(config).then(function() {
        sql.query`select * from ujo_calendar where (name=${calname})`.then (function(recordset) {
        if(recordset.length!=0)
                 { exists=1;
        		 console.log("calendar is existing");
               }
         console.log("calendar"+exists);
         if (exists==1)

                {

                   sql.query`select * from ujo_calendar where (day=${dates} and name=${calname})`.then(function(record){
                        console.log("record"+record.length);
                       if(record.length==0)
                       {
                        console.log('Given date does not exist in the calendar ');
                        res.json({ api :'Given date does not exist in the calendar '});
                       }
                       else{
                             sql.query`delete from ujo_calendar where (day=${dates} and name=${calname})`;
                             res.json({api:'Deleting date from calendar is successful' });
                             console.log('deleted');

                           }
                       }).catch(function(err) {
                          console.log(err);
                       });
                 }
          else
          { res.json({ api :'calendar does not exist'});
            return;
          }

        }).catch(function(err) {
   			console.log(err);

   		});

    });
    };
    
module.exports = DeleteDatesfromCalendar;
