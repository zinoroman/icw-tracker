"use strict";
var Observable_1 = require('rxjs/Observable');
var BasicService = (function () {
    function BasicService() {
    }
    BasicService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    BasicService.prototype.catchError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return BasicService;
}());
exports.BasicService = BasicService;
