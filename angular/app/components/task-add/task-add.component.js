class TaskAddController{
    constructor($state,$scope,TaskService,$stateParams,ProjectService){
        'ngInject';
        this.TaskService = TaskService 
        this.ProjectService = ProjectService
        this.formSubmitted = false 
        this.alerts = []
        this.$state = $state 
        if($stateParams.alerts){
            this.alerts.push($stateParams.alerts)
        }
        this.lsProject = []
        var option = {}
        var self = this
        // Retrieve projects 
        this.ProjectService.getProjectList(option,function(data){
             var data = data.data 
             self.lsProject = data
        });
    }

    $onInit(){
    }
    save(isValid){
        if(isValid){
            let $state = this.$state 
            let self = this 
            var requestData = {
                "name": this.name,
                "project_id": this.project_id
            };
            this.TaskService.putTask(requestData, function(response){
                if(response.data == "success"){
                    let alert = { type: 'success', 'title': "Success!", msg: "Successfully add!"};
                    self.alerts.push(alert)
                }else{
                    let alert = { type: 'error','title': 'Error', msg: response.data.message}
                }
            });
            this.formSubmitted = true
        }else{
            this.formSubmitted = true
        }
    }
}

export const TaskAddComponent = {
    templateUrl: './views/app/components/task-add/task-add.component.html',
    controller: TaskAddController,
    controllerAs: 'vm',
    bindings: {}
}
