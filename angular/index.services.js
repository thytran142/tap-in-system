import {TaskService} from './services/Task.service';
import {RecordService} from './services/Record.service';
import {ProjectService} from './services/Project.service';
import {SettingService} from './services/Setting.service';
import { ContextService } from './services/context.service'
import { APIService } from './services/API.service'

angular.module('app.services')
	.service('TaskService', TaskService)
	.service('RecordService', RecordService)
	.service('ProjectService', ProjectService)
	.service('SettingService', SettingService)
  .service('ContextService', ContextService)
  .service('API', APIService)
