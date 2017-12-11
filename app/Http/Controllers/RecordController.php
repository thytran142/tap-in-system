<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Auth;
use App\Record;
use App\Setting;
use App\Project;
use Illuminate\Http\Request;
use Input;
use Validator;
use Log;
use App\Task;
class RecordController extends Controller
{
    public function putRecord(Request $request){
        $salary = $request->input("salary");
        $tap_in = $request->input("tap_in");
        $project_id = $request->input("project_id");
        $task_id = $request->input("task_id");
        $project_name = Project::find($project_id)->name;
        $task_name = Task::find($task_id)->name;
        $record = new Record();
        $record->salary = $salary;
        $record->tap_in = $tap_in;
        $record->project_id = $project_id;
        $record->task_id = $task_id;
        $record->tap_out = "";
        $record->project_name = $project_name;
        $record->task_name = $task_name;
        $record->save();
        $setting = Setting::where('key','flag_tap')->first();
        $setting->value=1;
        $setting->save();
        return response()->success("success");
    }
    public function getLatestRecord(){
        $record = Record::where('tap_out',"")->first();
        $project = Project::find($record->project_id);
         return response()->success(compact('record', 'project'));
    }
    public function updateRecord(Request $request){
        $record = Record::find($request->input("id"));
        $record->tap_out = $request->input("tap_out");
        $record->save();
        $setting = Setting::where('key','flag_tap')->first();
        $setting->value = 0;
        $setting->save();
        return response()->success("success");
    }
   
    public function deleteRecord(Request $request){
        $record = Record::find($request->input("id"));
        if($record->tap_out == ""){
            return response()->error("Please tap out before deleting it",401);
        }else{
             $record->delete();
            return response()->success('success');
        }
       
    }
    public function getReport(Request $request){
        $project_id = $request->input("project_id");
        $array = array();
        $tasks = Task::where('project_id',$project_id)->get();
        foreach($tasks as $task){
            $records = Record::where('task_id',$task->id)->get();
            if(count($records)>0){
                $duration = 0;
                $hours = 0;
                $minutes = 0;
                foreach($records as $record){
                $value = $this->dateDifference($record->tap_out, $record->tap_in);
                $hours += $value->format("%h");
                $minutes += $value->format("%i");
                }
                $total_minutes = $hours*60 + $minutes;
                $duration = $total_minutes/60;
            }else{
                $duration = -1;
            }
             $array[] = array(
                    'id'=>$record->id,
                    'task_name'=>$task->name,
                    'duration'=>$duration
                );
        }
        return response()->success($array);
    }
     public function listRecord (Request $request){
       $records = Record::orderBy('id','DESC')->get();
        
        $array = array();
        foreach($records as $record){
            if($record->tap_out != ""){
                $value = $this->dateDifference($record->tap_out,$record->tap_in);
                $hours = $value->format("%h");
                $minutes = $value->format("%i");
                $total_minutes = $hours*60 + $minutes;
                $duration = $total_minutes/60;
            }
            else{
                $duration = "UNDEFINED";
            }
            $array[] = array(
                'id'=>$record->id,
                'salary'=>$record->salary,
                'tap_in'=>$record->tap_in,
                'tap_out'=>$record->tap_out,
                'project_id'=>$record->project_id,
                'project_name'=>$record->project_name,
                'task_name'=>$record->task_name,
                'task_id' => $record->task_id,
                'duration'=>$duration
            );

        }
        return response()->success($array);
    }
    public function dateDifference($date1, $date2){
        $datetime1 = date_create($date1);
        $datetime2 = date_create($date2);
        $interval = date_diff($datetime1,$datetime2);
        return $interval;
    }
}
