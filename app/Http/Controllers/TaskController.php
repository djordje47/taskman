<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  /**
   * @param Request $request
   * @return mixed
   */
  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'project_id' => 'required|int|exists:projects,id'
    ]);

    $task = Task::create($request->all());

    return $task->toJson();
  }

  /**
   * @param Task $task
   * @return JsonResponse
   */
  public function markAsCompleted(Task $task)
  {
    $task->is_completed = true;
    $task->update();

    return response()->json("Task updated!");
  }
}
