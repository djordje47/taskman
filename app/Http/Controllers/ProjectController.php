<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
  /**
   * @return mixed
   */
  public function index()
  {
    $projects = Project::where('is_completed', false)->orderBy('created_at', 'desc')
      ->withCount(['tasks' => function ($query) {
        $query->where('is_completed', false);
      }])->get();

    return $projects->toJson();
  }

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'required|string|max:4000',
    ]);
    $project = Project::create($request->all());
    return response()->json("Project $project->name created!");
  }

  /**
   * @param int $id
   * @return string
   */
  public function show(int $id)
  {
    $project = Project::with(['tasks' => function ($query) {
      $query->where('is_completed', false);
    }])->find($id);

    return $project->toJson();
  }

  /**
   * @param Project $project
   * @return JsonResponse
   */
  public function markAsCompleted(Project $project)
  {
    $project->is_completed = true;
    $project->update();

    return response()->json("Project $project->name mark as completed!");
  }
}
