var sql = require('mssql');
var ListAllCycles = function(req,res){

      sql.connect(config).then(function(){
        new sql.Request().query('select distinct \'Cycle\' as \'Calendar Type\',cycname as \'Calendar Name\',description as Description from ujo_cycle c join ujo_calendar_desc d on c.cycname = d.cal_name and cal_type = 3 ').then(function(recordset){
         res.json(recordset);
        })
        .catch(function(err){
          console.log(err);
        });
      })
      .catch(function(err){
        console.log(err);
      });

     };

 module.exports = ListAllCycles;