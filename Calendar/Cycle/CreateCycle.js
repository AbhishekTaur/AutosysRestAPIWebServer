var sql=require('mssql');

var record1=new Array();
var CreateCycle=function(req,res){
var cyclename=req.body.cycle_name;
//var cycperst=req.body.cycperst;
//var cycperend=req.body.cycperend;
var cycperiod=req.body.cycperiod;

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
            if(records > 0)
            {
                cycleFound=1;
                res.send(500,'cycle name already exists');
                return -1;
            }
            if(cycleFound===0){
                       var count=0;
                    var ps3=new sql.PreparedStatement(connection);

                                                              ps3.input('name2', sql.VarChar(64));
                                                              ps3.input('cycperen',sql.VarChar(50));
                                                              ps3.input('cycperst',sql.VarChar(50));
                                                              ps3.input('counts',sql.Int);
                                                              ps3.prepare("insert into ujo_cycle(cycname,cycperen,cycperiod,cycperst) values (@name2,@cycperen,@counts,@cycperst)",function(err){
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
																		  
                                                                         var params = {name2:cyclename,cycperen:rec["cycperen"],counts:count, cycperst:rec["cycperst"]};
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
                                                                             /* else
                                                                              {
                                                                                  console.log("Hi"+count);
                                                                                  console.dir(recordset);

                                                                              }*/
                                                                            });
                                                                            }
																			
                                                                              ps3.unprepare(function(err) {
                                                                                  // ... error checks
                                                                                  if(err != null)
                                                                                      console.log(count+"unpreparation error"+err);
                                                                                res.status(200).send('success');
                                                                              });//


                                                              });
                             }



                            });
        });
    });

                //console.log(record1);

}
};
module.exports=CreateCycle;