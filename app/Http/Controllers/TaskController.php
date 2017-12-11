<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Task;
use App\Project;
use App\Record;
class TaskController extends Controller
{
    public function getTaskList(){
        $tasks = Task::all();
        $array = array();
        foreach($tasks as $task){
            $project = Project::find($task->project_id);
            $array[] = array(
                'id'=>$task->id,
                'project'=>$project->name,
                'name'=>$task->name
            );
        }
        return response()->success($array);
    }
    public function deleteTask(Request $request){
        $id = $request->input("id");
        $task = Task::find($id);
        $records = Record::where('task_id',$task->id)->get();
        if(count($records>0)){
            return response()->error("Please delete working records related to this task first",401);
        }else{
            $task->delete();
            return response()->success("success");
        }
    }
    public function putTask(Request $request){
        $name = $request->input("name");
        $project_id = $request->input("project_id");
        $task = new Task();
        $task->name = $name;
        $task->project_id = $project_id;
        $task->save();
        return response()->success("success");
    }
    public function getTaskForProject(Request $request){
        $project_id = $request->input("project_id");
        $tasks = Task::where('project_id',$project_id)->get();
        return response()->success($tasks);
    }
}
