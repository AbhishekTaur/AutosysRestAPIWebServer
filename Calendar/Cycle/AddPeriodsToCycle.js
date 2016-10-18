var sql = require('mssql');

var existPeriod = [];
var record1 = new Array();

var AddPeriodsToCycle = function (req, res) {
    var cyclename = req.body.Name;//getting user input from raw payload in json format
    var cycperiod = req.body.cycleperiod;//getting user input as json array from raw payload

    if (!cyclename.trim().localeCompare(""))
        res.status(500).send('cycperiod must contain cyclename');

    else if (cycperiod.length < 1)
        res.status(500).send('cycperiod must contain atleast one element');

    else {
        var connection = new sql.Connection(config, function (err) {
            var cycleFound = 0;
//checking whether cycle exists or not
            var ps = new sql.PreparedStatement(connection);
            ps.input('name', sql.VarChar(64));
            ps.prepare("select count(1) count from ujo_cycle where cycname=@name", function (err) {
                // ... error checks
                if (err != null)
                {
                    console.log(err);
                }
                var params = {name: cyclename};
                ps.execute(params, function (err, recordset) {
                    // ... error checks
                    if (err != null)
                        console.log(err);
                    console.log(recordset[0]['count']);
                    var records = recordset[0]['count'];
                    ps.unprepare(function (err) {
                        // ... error checks
                        if (err != null)
                            console.log(err);

                    });

                    //cycle name is not found
                    if (records === 0)
                    {
                        cycleFound = 1;
                        res.status(500).send('cycle name not found');
                        return -1;
                    }
                    if (cycleFound === 0) {
                        //checking if record already exists using map
                        var ps1 = new sql.PreparedStatement(connection);
                        ps1.input('name', sql.VarChar(64));
                        ps1.prepare("select CONVERT(VARCHAR,cycperen,120) cycperen,CONVERT(VARCHAR,cycperst,120) cycperst from ujo_cycle where cycname=@name", function (err) {
                            var map = {};
                            var flag = 0;
                            // ... error checks
                            if (err != null)
                            {
                                console.log(err);
                            }
                            var params = {name: cyclename};
                            ps1.execute(params, function (err, recordset) {
                                // ... error checks
                                if (err != null)
                                    console.log(err);

                                record1.push.apply(record1, recordset);//pushing already database existing records into list

                                for (record in recordset)
                                {
                                    var rec = recordset[record];
                                    map[rec["cycperst"]] = rec["cycperst"];
                                }
                                for (record in cycperiod)
                                {
                                    var rec = cycperiod[record];
                                    if (!(rec["startperiod"].localeCompare(map[rec["startperiod"]])))
                                    {
                                        flag = 1;
                                        existPeriod.push(rec["startperiod"]);
                                        console.log('record with startperiod' + rec["startperiod"] + 'already exists');
                                    } else
                                    {
                                        var newObj = new Object();
                                        newObj.cycperen = rec["endperiod"];
                                        newObj.cycperst = rec["startperiod"];
                                        var newObj1 = [newObj];
                                        // console.log(recordset);
                                        // console.log(record1);
                                        record1.push.apply(record1, newObj1);
                                        //console.log(record1);
                                    }
                                }
                                ps1.unprepare(function (err) {
                                    // ... error checks
                                    if (err != null)
                                        console.log(err);

                                });

                                //deleting periods from ujo_cycle
                                deletePeriods(cyclename, connection);
                                //sorting obtained list of dates in ascending order based on cycperst
                                record1.sort(function (a, b) {
                                    return new Date(a.cycperst) - new Date(b.cycperst);
                                });
                                console.log(record1);
                                var count = 0;
                                // console.log(record1);
                                //inserting values from prepared list into database table
                                var ps3 = new sql.PreparedStatement(connection);

                                ps3.input('name2', sql.VarChar(64));
                                ps3.input('cycperen', sql.VarChar(50));
                                ps3.input('cycperst', sql.VarChar(50));
                                ps3.input('counts', sql.Int);
                                ps3.prepare("insert into ujo_cycle(cycname,cycperen,cycperiod,cycperst) values (@name2,@cycperen,@counts,@cycperst)", function (err) {
                                    if (err != null)
                                    {
                                        console.log(err);
                                    }
                                    for (records in record1) {
                                        //console.log(records);
                                        var rec = record1[records];
                                        count = count + 1;
                                        //console.log(rec);
                                        //console.log(cyclename);
                                        var params = {name2: cyclename, cycperen: rec["cycperen"], counts: count, cycperst: rec["cycperst"]};
                                        //    var params = {name:cyclename,cycperen:cycperend,counts:count, cycperst:cycperst};
                                        console.log(params);
                                        ps3.execute(params, function (err, recordset) {
                                            // ... error checks
                                            if (err != null)
                                            {
                                                console.log(count + "execution error" + err);
                                                console.log(err);
                                                res.status(500).send('failed to enter records');
                                            }

                                        });
                                    }

                                    ps3.unprepare(function (err) {
                                        // ... error checks
                                        if (err != null)
                                            console.log("unpreparation error" + err);
                                        if (flag === 1)
                                        {
                                            res.status(200).send('record with cycperst' + existPeriod.toString() + 'already exists');
                                        }
                                        if (flag === 0) {
                                            res.status(200).send('records entered successfully');
                                        }
                                    });


                                });

                            });
                        });
                    }
                });
            });

            //console.log(record1);

        });
    }
}

function deletePeriods(cyclename, connection) {
    var ps2 = new sql.PreparedStatement(connection);
    ps2.input('name1', sql.VarChar(64));
    ps2.prepare("delete from ujo_cycle where cycname=@name1", function (err) {
        if (err != null)
        {
            console.log(err);
        }
        var params = {name1: cyclename};
        ps2.execute(params, function (err, recordset) {
            if (err != null)
                console.log(err);
            ps2.unprepare(function (err) {
                // ... error checks
                if (err != null)
                    console.log(err);

            });
        });
    });
}

module.exports = AddPeriodsToCycle;