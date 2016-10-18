/* global config */

var sql = require('mssql');                 //call mssql

var ModifyStandardCalendarDescription = function (req, res) {
    //read cal_name from request body
    var cal_name = req.body.CalendarName;
    if (cal_name === undefined) {
        res.json({Message: 'CalendarName is mandatory.'});
        return;
    }

    //read description provided by the user
    var desc = req.body.Description;
    if (desc === undefined) {
        res.json({Message: 'Description is mandatory.'});
        return;
    }

    sql.connect(config).then(function () {
        //Check whether it is present in the ujo_calendar
        new sql.Request()
                .query("select COUNT(*) AS CNT from ujo_calendar where name = '"
                        + cal_name + "'")
                .then(function (recordset) {
                    if (recordset[0]["CNT"] !== 0) {
                        new sql.Request()
                                .query("UPDATE ujo_calendar_desc \n\
                                        SET description = '" +
                                        desc + "' where cal_name = '"
                                        + cal_name + "'")
                                .then(function (recordset) {
                                    res.json({Message: 'The description is modified successfully for calendar: '
                                                + cal_name});
                                }).catch(function (err) {
                            res.json({Message: err});
                        });
                    } else {
                        res.json({Message: 'Standard calender '
                                    + cal_name + ' does not exist'});
                    }
                }).catch(function (err) {
            res.json({Message: err});
        });
    }).catch(function (err) {
        res.json({Message: err});
    });
};

module.exports = ModifyStandardCalendarDescription;