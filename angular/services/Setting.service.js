export class SettingService{
    constructor($rootScope,$window,$http){
        'ngInject';
        this.$rootScope = $rootScope 
        this.$window = $window 
        this.http = $http 
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.laravel.v1+json'
        }
        var token = $window.localStorage.satellizer_token 
        if(token){
            headers.Authorization = 'Bearer '+token 
        }
        this.headers= headers 
    }
    getSettingValue(data,cb,err){
        this.http({
            method: 'GET',
            url: '/api/setting/get',
            headers: this.headers 
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
}

