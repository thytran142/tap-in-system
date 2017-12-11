class RecordListController{
    constructor($state,$scope,DTOptionsBuilder,DTColumnBuilder,RecordService,$compile,$filter){
        'ngInject';
        this.RecordService =  RecordService
        this.DTOptionsBuilder = DTOptionsBuilder
        this.DTColumnBuilder = DTColumnBuilder
        this.displayTable = false 
        this.$state = $state 
        //Retrieve data for table list 
        var self = this 
        var option = {};
    
        this.RecordService.getRecordList(option,function(data){
            
      var dataSet = data.data 
      //************Create table *************
            self.dtOptions = self.DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()
             self.dtColumns = [
          self.DTColumnBuilder.newColumn('id').withTitle('ID'),
         self.DTColumnBuilder.newColumn('salary').withTitle('Salary'),
         self.DTColumnBuilder.newColumn('project_name').withTitle('Project'),
         self.DTColumnBuilder.newColumn('task_name').withTitle('Task'),
          self.DTColumnBuilder.newColumn('tap_in').withTitle('Tap in at').renderWith(tap_in_html),
          self.DTColumnBuilder.newColumn('tap_out').withTitle('Tap out at').renderWith(tap_out_html),
          self.DTColumnBuilder.newColumn('duration').withTitle('Duration'),
          self.DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ];
            self.displayTable = true 
        });
        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }
        let actionsHtml = (data) => {
            return `
              <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
         }
         let tap_in_html = (data)=>{
             
           return $filter('date')(data,'dd MMMM, yyyy HH:mm');
         }   
         let tap_out_html = (data)=>{
           return $filter('date')(data,'dd MMMM, yyyy HH:mm');
         }
         

    }

    $onInit(){
    }
    delete(id){
     var option = {
        "id": id
      };
      var self = this
      this.RecordService.deleteRecord(option,function(data){
          self.$state.reload()
        });
     
    }
}

export const RecordListComponent = {
    templateUrl: './views/app/components/record-list/record-list.component.html',
    controller: RecordListController,
    controllerAs: 'vm',
    bindings: {}
}
