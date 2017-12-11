class ReportController{
    constructor($state,$scope,DTOptionsBuilder,DTColumnBuilder,RecordService,$compile,$filter,ProjectService){
        'ngInject';
        this.RecordService =  RecordService
        this.ProjectService = ProjectService 
        this.DTOptionsBuilder = DTOptionsBuilder
        this.DTColumnBuilder = DTColumnBuilder
        this.displayTable = false 
        this.$state = $state 
        this.$compile = $compile
        this.lsRecord = []
        //Retrieve data for table list 
        var self = this 
        var option = {};
        
        this.ProjectService.getProjectList(option,function(data){
        var data = data.data 
        self.lsProject = data
        });
        
       
    }
    $onInit(){
    }
    retrieveTaskList(){
        var requestData = {
            "project_id": this.project_id
        };
        let self = this 
        //Manage Table 
         this.RecordService.getReport(requestData,function(data){
          self.lsRecord = data.data 
         });
    }
}

export const ReportComponent = {
    templateUrl: './views/app/components/report/report.component.html',
    controller: ReportController,
    controllerAs: 'vm',
    bindings: {}
}
