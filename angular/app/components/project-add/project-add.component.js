class ProjectAddController{
    constructor($state,$scope,ProjectService, $stateParams){
        'ngInject';
        this.ProjectService = ProjectService 
        this.formSubmitted = false 
        this.alerts = []
        this.$state = $state 
        if($stateParams.alerts){
            this.alerts.push($stateParams.alerts)
        }
        
    }

    $onInit(){
    }
    save(isValid){
        if(isValid){
            let $state = this.$state 
            let self = this 
            var requestData = {
                'name': this.name 
            };
            this.ProjectService.putProject(requestData, function(data){
                if(data.data == "success"){
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Successfully add!'}
                    self.alerts.push(alert)
                }else{
                    let alert = {type: 'error','title': 'Error!', msg: response.data.message }
                    self.alerts.push(alert)
                }
            });
            this.formSubmitted = true 
        }else{
            this.formSubmitted = true 
        }
    }
}

export const ProjectAddComponent = {
    templateUrl: './views/app/components/project-add/project-add.component.html',
    controller: ProjectAddController,
    controllerAs: 'vm',
    bindings: {}
}
