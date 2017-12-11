class ProjectListsController{
    constructor($state,$scope,DTOptionsBuilder,DTColumnBuilder,ProjectService,$compile){
        'ngInject';
        this.ProjectService = ProjectService 
        this.DTOptionsBuilder = DTOptionsBuilder
        this.DTColumnBuilder = DTColumnBuilder
        this.displayTable = false 
        this.$state = $state 
        //Retrieve project list 
        var self = this
        var option = {}
        this.ProjectService.getProjectList(option, function(data){
            var dataSet = data.data 
            //************Create table *************
            self.dtOptions = self.DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()
             self.dtColumns = [
          DTColumnBuilder.newColumn('id').withTitle('ID'),
          DTColumnBuilder.newColumn('name').withTitle('Name'),
          DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ]
            self.displayTable = true 
        });
        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }
        let actionsHtml = (data) => {
            return `
                <a class="btn btn-xs btn-warning" ui-sref="app.projectedit({projectId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
         }   

    }
    delete(id){
     var option = {
        "id": id
      };
      var self = this
      this.ProjectService.deleteProject(option,function(data){
          self.$state.reload()
        });
    }
    $onInit(){
    }
}

export const ProjectListsComponent = {
    templateUrl: './views/app/components/project-lists/project-lists.component.html',
    controller: ProjectListsController,
    controllerAs: 'vm',
    bindings: {}
}
