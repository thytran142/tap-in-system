export class TaskService{
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
     getTaskList(data,cb,err){
       this.http({
            method: 'GET',
            url: '/api/tasks/list',
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    deleteTask(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/tasks/delete',
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    putTask(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/tasks/put',
            data: data,
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    getTaskForProject(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/tasks/getTaskForProject',
            data: data,
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
}

