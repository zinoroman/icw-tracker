"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var basic_service_1 = require('./basic.service');
var WashingDataService = (function (_super) {
    __extends(WashingDataService, _super);
    function WashingDataService(http) {
        _super.call(this);
        this.http = http;
        this.apiURL = 'http://localhost/washingData.php';
        this.data = [];
        this.getWashingData();
    }
    WashingDataService.prototype.getWashingData = function () {
        var _this = this;
        var getWashingDataRequest = this.http.get(this.apiURL)
            .map(this.extractData)
            .catch(this.catchError);
        getWashingDataRequest.subscribe(function (res) {
            console.log(res);
            if (res.status === 'success') {
                _this.data = res.data;
            }
        }, function (err) {
            console.error(err);
        });
    };
    WashingDataService.prototype.addWashingData = function (washingData) {
        var body = "carID=" + washingData.carID + "&boxID=" + washingData.boxID + "&prices=" + JSON.stringify(washingData.prices) + "&totalPrice=" + washingData.totalPrice;
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        return this.http.post(this.apiURL, body, options)
            .map(this.extractData)
            .catch(this.catchError);
    };
    WashingDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_2.Http])
    ], WashingDataService);
    return WashingDataService;
}(basic_service_1.BasicService));
exports.WashingDataService = WashingDataService;
