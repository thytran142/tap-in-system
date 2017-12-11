export class ProjectService{
    constructor($rootScope,$window,$http){
        'ngInject';
        this.$rootScope = $rootScope 
        this.$window = $window 
        this.http = $http 
        var token = "Bearer "+$window.localStorage.satellizer_token 
        var headers = {
            "Content-Type": 'application/json',
            "Accept": 'application/x.laravel.v1+json'
        };
        if(token){
            headers.Authorization = "Bearer "+token 
        };
        this.headers = headers 
    }
    getProjectList(data,cb,err){
        this.http({
            method: 'GET',
            url: '/api/projects/get',
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    deleteProject(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/projects/delete',
            data:data,
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    putProject(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/projects/put',
        data: data,
            headers: this.headers
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    showProject(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/projects/show',
            data: data , 
            headers: this.headers 
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
    updateProject(data,cb,err){
        this.http({
            method: 'POST',
            url: '/api/projects/update',
            data: data,
            headers: this.headers 
        }).then(function(response){
            if(cb){
                cb(response.data)
            }
        });
    }
}

