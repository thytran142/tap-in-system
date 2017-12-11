export class RecordService{
    constructor($rootScope,$window,$http){
        'ngInject';

        this.$rootScope = $rootScope
        this.$window = $window 
        this.http = $http 
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.laravel.v1+json'
        };
        var token = $window.localStorage.satellizer_token 
        if(token){
            headers.Authorization = 'Bearer '+token 
        }
        this.headers = headers 
    }
    putRecord(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/records/put',
            data: data, 
            headers: this.headers 
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    getLatestRecord(data,cb,err){
        this.http({
            method: 'GET',
            url: '/api/records/get-latest',
            data: data, 
            headers: this.headers 
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    updateRecord(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/records/update',
            data: data, 
            headers: this.headers 
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    getRecordList(data,cb,err){
       this.http({
            method: 'GET',
            url: '/api/records/list',
            headers: this.headers
        }).then(function(response){
            
            if(cb){
                cb(response.data)
            }
        });
    }
    getReport(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/records/getReport',
            data: data,
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    deleteRecord(data,cb,err){
        this.http({
            method: 'POST',
            data: data,
            url: '/api/records/delete',
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }

}

