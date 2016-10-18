var sql = require('mssql');

function send404response(resp)
{
resp.writeHead(400,{"Content-Type":"text/plain"});
resp.write("Message:the cycle is not present");
resp.end();
}

var ListDatesForCycle = function (req, res) {

   var qw=req.body.name;

	sql.connect(config).then(function() {

          new sql.Request().query("select * from ujo_cycle inner join ujo_calendar_desc on ujo_calendar_desc.cal_name=ujo_cycle.cycname and  cycname='"+ qw+"' ").then(function(recordset)
          {
    			if(recordset.length!=0)
                    {
    			         for(record in recordset)
    			                {
    				                var record = recordset[record];
    				                console.log('description of the cycle '+record["cal_type"]+" "+record["cycname"]+" "+record["description"] );
                                    console.log('displaying all periods '+record["cycperiod"]+"  "+record["cycperst"]+"  "+record["cycperen"]);
    			                }

    			         var obj={};
    			         obj.Name=recordset[0].cycname;
    			         obj.Description=recordset[0].description;
    			         obj.Calendertype=recordset[0].cal_type;
    			         obj.cyc=[];
                         var i=0;

                         for(rec in recordset)
                                {
                                        obj.cyc[i]={"CyclePeriod":recordset[i].cycperiod,"StartTime":recordset[i].cycperst,"EndTime":recordset[i].cycperen};
                                        i+=1;
                                }
                         res.writeHead(200,{"Content-Type":"application/json"});
    			         res.write(JSON.stringify(obj));
    			         res.end();
                    }
                else
                    {
                         send404response(res);
                    }
    	  }).catch(function(err)
    	        {
    			    console.log(err);

    		    });

    	});


};

module.exports = ListDatesForCycle;

