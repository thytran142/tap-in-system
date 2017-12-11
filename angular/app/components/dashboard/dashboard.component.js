class DashboardController {
  constructor ($compile,$scope,SettingService,$state,ProjectService,RecordService,$filter, DTOptionsBuilder,DTColumnBuilder,TaskService) {
    'ngInject'
    this.SettingService = SettingService 
    this.ProjectService = ProjectService
    this.RecordService = RecordService
    this.TaskService = TaskService
    this.$state = $state 
    this.flag_tap = 0;
    this.salary = 0;
    this.alerts = [];
    this.latestRecord = {}
    this.project = {}
    this.$compile = $compile
    this.lsTask = [];
    
   //Retrieve Setting value 
   var self = this 
   var option = {}
   this.DTOptionsBuilder = DTOptionsBuilder
   this.DTColumnBuilder = DTColumnBuilder

   this.displayTable = false 
   this.SettingService.getSettingValue(option,function(data){
      var data = data.data 
      for(var i=0; i<data.length; i++){
        if(data[i].key == "salary"){
          self.salary = data[i].value;
        }
        if(data[i].key == "flag_tap"){
          self.flag_tap = data[i].value;
        }
       
      }
       if(self.flag_tap == 1){//Used to tap in now need to tap out 
          self.RecordService.getLatestRecord(option,function(data){
      var data = data.data 
      self.latestRecord = data.record 
      self.record_tap_in = self.latestRecord.tap_in
      self.record_tap_in = $filter('date')(self.record_tap_in,'dd MMMM, yyyy HH:mm');
      self.project = data.project 
      
     });
      }
   });
   //alert(this.flag_tap);
   this.ProjectService.getProjectList(option,function(data){
    var data = data.data 
    self.lsProject = data
   });
 }
 retrieveTaskList(){
    let self = this 
    var option = {
      "project_id": this.project_id
    };
    this.TaskService.getTaskForProject(option,function(data){
      self.lsTask = data.data 
    });
 }
  saveTapOut(isValid){
    let self = this 
    var myDate = new Date();
    var currentDate = new Date(myDate);
    var option = {
      "id": this.latestRecord.id,
      "tap_out": currentDate 
    };
    this.RecordService.updateRecord(option, function(data){
      if(data.data == "success"){
        self.flag_tap = 0 
        self.$state.reload();
      }else{
        let alert = {type: 'error','title': 'Error!', msg: response.data.message }
        self.alerts.push(alert)
              
      }
    });
   

  }
  save(isValid){
    if(isValid){
      var $state = this.$state 
      let self = this 
      var myDate = new Date();
      var currentDate = new Date(myDate);
      var option = {
        "salary": this.salary,
        "project_id": this.project_id,
        'tap_in': currentDate,
        "task_id":this.task_id
      };
     this.RecordService.putRecord(option,function(data){
        if(data.data == "success"){
            self.flag_tap = 1
           self.$state.reload();
        }else{
               let alert = {type: 'error','title': 'Error!', msg: response.data.message }
                    self.alerts.push(alert)
                }
     }); 
    }

  }

}

export const DashboardComponent = {
  templateUrl: './views/app/components/dashboard/dashboard.component.html',
  controller: DashboardController,
  controllerAs: 'vm',
  bindings: {}
}
