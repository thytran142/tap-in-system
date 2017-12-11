<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Auth;
use App\Project;
use Illuminate\Http\Request;
use Input;
use Validator;
use Log;
use App\Task;

class ProjectController extends Controller
{
    public function getProjectList(){
        $projects = Project::all();
        return response()->success($projects);
    }
    public function deleteProject(Request $request){
        $id = $request->input("id");
        $project = Project::find($id);
        $tasks = Task::where('project_id',$id)->get();
        if(count($tasks)>0){
            return response()->error("Please remove tasks related to the project first",401);
        }else{
             $project->delete();
            return response()->success("success");
        }
    }
    public function putProject(Request $request){
        $project = new Project();
        $project->name = $request->input("name");
        $project->save();
        return response()->success("success");
    }
    public function showProject(Request $request){
        $project = Project::find($request->input("id"));
        return response()->success($project);
    }
    public function updateProject(Request $request){
        $project = Project::find($request->input("id"));
        $project->name = $request->input("name");
        $project->save();
        return response()->success("success");
    }
}
