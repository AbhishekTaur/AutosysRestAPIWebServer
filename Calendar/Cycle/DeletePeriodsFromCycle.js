var sql = require('mssql');

var flag=0;
var record1=new Array();
var DeletePeriodsFromCycle=function(req,res){
var cyclename=req.body.cycle_name;
//var cycperst=req.body.cycperst;
//var cycperend=req.body.cycperend;
var cycperiod=req.body.period;
if (req.body=="")res.status(500).send('asd');
if(cycperiod.length<1)
res.status(500).send('cycperiod must contain atleast one element');
else{
var connection=new sql.Connection(config,function(err){
var cycleFound=0;
var ps = new sql.PreparedStatement(connection);
    ps.input('name', sql.VarChar(64));
    ps.prepare("select count(1) count from ujo_cycle where cycname=@name", function(err) {
        // ... error checks
        if(err != null)
        {
            console.log(err);
        }
        var params = {name:cyclename};
        ps.execute(params, function(err, recordset) {
            // ... error checks
            if(err != null)
                console.log(err);
            console.log(recordset[0]['count']);
            var records = recordset[0]['count'];
            ps.unprepare(function(err) {
                // ... error checks
                if(err != null)
                    console.log(err);

            });

            //cycle name is not found
            if(records === 0)
            {
                cycleFound=1;
                res.send(200,'cycle name not found');
                console.log('cycle name not found');
                return -1;
            }
            if(cycleFound===0){
             var ps1=new sql.PreparedStatement(connection);
                 ps1.input('name', sql.VarChar(64));
                ps1.prepare("select CONVERT(VARCHAR,cycperen,120) cycperen,CONVERT(VARCHAR,cycperst,120) cycperst from ujo_cycle where cycname=@name", function(err) {
                        var map={};
                        // ... error checks
                        if(err != null)
                        {
                            console.log(err);
                        }
                        var params = {name:cyclename};
                        ps1.execute(params, function(err, recordset) {
                            // ... error checks
                            if(err != null)
                                console.log(err);

                                record1.push.apply(record1,recordset);//pushing already database existing records into list

                            for(record in recordset)
                                    {
                                       	var rec = recordset[record];
                                       map[rec["cycperst"]]=rec["cycperst"];
                                    }
                             for(record in cycperiod)
                             {
                                  var rec=cycperiod[record];
                                  if((rec["cycperst"].localeCompare(map[rec["cycperst"]])))
                                  {
                                      flag=1;

                                     console.log('record with cycperst'+rec["cycperst"]+'does not exist');
                                  }

                             }
                            ps1.unprepare(function(err) {
                                // ... error checks
                                if(err != null)
                                    console.log(err);

                            });
                                                if (flag==0 && cycperiod==record1) deleteCycle(cyclename,connection);


                                              console.log(record1);
                                                             var count=0;
                                                            // console.log(record1);
                                                             var ps3=new sql.PreparedStatement(connection);

                                                              ps3.input('name2', sql.VarChar(64));
                                                              ps3.input('cycperen',sql.VarChar(50));



                                                              ps3.prepare("delete from ujo_cycle where cycname =@name2 and cycperen=@cycperen",function(err){
                                                              if(err != null)
                                                                          {
                                                                              console.log(err);
                                                                          }
                                                                       for(records in cycperiod){
                                                                       //console.log(records);
                                                                          var rec=cycperiod[records];
                                                                          count=count+1;
                                                                          //console.log(rec);
                                                                          //console.log(cyclename);
                                                                         var params = {name2:cyclename,cycperen:rec["cycperen"]};
                                                                        //    var params = {name:cyclename,cycperen:cycperend,counts:count, cycperst:cycperst};
                                                                        console.log(params);
                                                                          ps3.execute(params, function(err, recordset) {
                                                                              // ... error checks
                                                                              if(err != null)
                                                                              {
                                                                                  console.log(count+"execution error"+err);
                                                                                  console.log(err);
                                                                                  res.status(500).send('failure');
                                                                              }
                                                                              else
                                                                              {

                                                                                  console.dir(recordset);

                                                                              }
                                                                            });
                                                                            }

                                                                              ps3.unprepare(function(err) {
                                                                                  // ... error checks
                                                                                  if(err != null)
                                                                                      console.log(count+"unpreparation error"+err);
                                                                                res.status(200).send('success');
                                                                              });


                                                              }); //here prepare ends

                            });
                            });
                            }
        });
    });

                //console.log(record1);

});
}
}

     function deleteCycle(calendar_name,connection){
                                  var ps2=new sql.PreparedStatement(connection);
                                  ps2.input('name1', sql.VarChar(64));

                                  ps2.input('start')
                                 ps2.prepare("delete from ujo_calendar_desc where cal_name=@name1",function(err){
                                 if(err != null)
                                             {
                                                 console.log(err);
                                             }
                                             var params = {name1:cyclename};
                                  ps2.execute(params,function(err,recordset){
                                                      if(err != null)
                                                      console.log(err);
                                                       ps2.unprepare(function(err) {
                                                                          // ... error checks
                                                                          if(err != null)
                                                                              console.log(err);

                                                                      });
                                  });
                                 });
};
module.exports=DeletePeriodsFromCycle;