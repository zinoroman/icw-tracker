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
require('rxjs/Rx');
var SettingsCarsService = (function (_super) {
    __extends(SettingsCarsService, _super);
    function SettingsCarsService(http) {
        _super.call(this);
        this.http = http;
        this.apiURL = 'http://localhost/test.php';
        this.data = [];
        this.init();
    }
    SettingsCarsService.prototype.init = function () {
        this.getCars();
    };
    SettingsCarsService.prototype.getCars = function () {
        var _this = this;
        var getCarsRequest = this.http.get(this.apiURL)
            .map(this.extractData)
            .catch(this.catchError);
        getCarsRequest.subscribe(function (res) {
            if (res.status === 'success') {
                _this.data = res.data;
            }
        }, function (err) {
            console.error(err);
        });
    };
    SettingsCarsService.prototype.addCar = function (car) {
        var _this = this;
        var body = "brand=" + car.brand;
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        var postCarRequest = this.http.post(this.apiURL, body, options)
            .map(this.extractData)
            .catch(this.catchError);
        postCarRequest.subscribe(function (res) {
            if (res.status === 'success') {
                _this.data.unshift(res.data);
            }
            else if (res.status === 'error') {
                console.log(res);
            }
        }, function (err) {
            console.error(err);
        });
    };
    SettingsCarsService.prototype.removeCar = function (car) {
        var _this = this;
        var deleteCarRequest = this.http.delete(this.apiURL + "?id=" + car.id)
            .map(this.extractData)
            .catch(this.catchError);
        deleteCarRequest.subscribe(function (res) {
            if (res.status === 'success') {
                _this.data.splice(_this.data.indexOf(car), 1);
            }
        }, function (err) {
            console.error(err);
        });
    };
    SettingsCarsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_2.Http])
    ], SettingsCarsService);
    return SettingsCarsService;
}(basic_service_1.BasicService));
exports.SettingsCarsService = SettingsCarsService;
