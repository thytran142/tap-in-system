class TaskListController{
    constructor($state,$scope,DTOptionsBuilder,DTColumnBuilder,TaskService,$compile,$filter){
        'ngInject';
        this.TaskService =  TaskService
        this.DTOptionsBuilder = DTOptionsBuilder
        this.DTColumnBuilder = DTColumnBuilder
        this.displayTable = false 
        this.$state = $state 
        //Retrieve data for table list 
        var self = this 
        var option = {};
    
        this.TaskService.getTaskList(option,function(data){
            
      var dataSet = data.data 
      //************Create table *************
            self.dtOptions = self.DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()
             self.dtColumns = [
          self.DTColumnBuilder.newColumn('id').withTitle('ID'),
         self.DTColumnBuilder.newColumn('project').withTitle('Project'),
         self.DTColumnBuilder.newColumn('name').withTitle('Name'),
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
   }

    $onInit(){
    }
    delete(id){
     var option = {
        "id": id
      };
      var self = this
      this.TaskService.deleteTask(option,function(data){
          self.$state.reload()
        });
     
    }
}

export const TaskListComponent = {
    templateUrl: './views/app/components/task-list/task-list.component.html',
    controller: TaskListController,
    controllerAs: 'vm',
    bindings: {}
}
