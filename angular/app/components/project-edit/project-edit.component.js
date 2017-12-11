class ProjectEditController{
    constructor($stateParams,$state,ProjectService){
        'ngInject';

        this.$state = $state 
        this.formSubmitted = false 
        this.alerts = []
        this.ProjectService = ProjectService 
        if($stateParams.alerts){
            this.alerts.push($stateParams.alerts)
        }
        //Retrieve Project 
        var self = this 
        this.projectId = $stateParams.projectId 
        var option = {
            "id": this.projectId
        }
        this.ProjectService.showProject(option,function(data){
            var data = data.data 
            self.name = data.name
        });
    }
    save(isValid){
        if(isValid){
            let $state = this.$state 
            let self = this 
            var option = {
                "id": this.projectId,
                "name": this.name 
            }
            this.ProjectService.updateProject(option, function(data){
                if(data.data == "success"){
                    let alert = { type: "success", "title": "Success!", msg: "Successfully update!"}
                    self.alerts.push(alert)
                }
            });
            this.formSubmitted = true
        }else{
            this.formSubmitted = true 
        }
    }
    $onInit(){
    }
}

export const ProjectEditComponent = {
    templateUrl: './views/app/components/project-edit/project-edit.component.html',
    controller: ProjectEditController,
    controllerAs: 'vm',
    bindings: {}
}
