<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\UpdateCandidateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Candidate::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->byStatus($request->status);
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $candidates = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $candidates->items(),
            'pagination' => [
                'current_page' => $candidates->currentPage(),
                'last_page' => $candidates->lastPage(),
                'per_page' => $candidates->perPage(),
                'total' => $candidates->total(),
            ]
        ]);
    }

    /**
     * Search candidates using database search.
     */
    public function search(Request $request): JsonResponse
    {
        $search = $request->get('q', '');
        $perPage = $request->get('per_page', 10);

        if (empty($search)) {
            return response()->json([
                'success' => true,
                'data' => [],
                'pagination' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => $perPage,
                    'total' => 0,
                ]
            ]);
        }

        // Use database search instead of Scout
        $candidates = Candidate::where(function ($query) use ($search) {
            $query->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('position_applied', 'like', "%{$search}%")
                  ->orWhere('current_company', 'like', "%{$search}%");
        })->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $candidates->items(),
            'pagination' => [
                'current_page' => $candidates->currentPage(),
                'last_page' => $candidates->lastPage(),
                'per_page' => $candidates->perPage(),
                'total' => $candidates->total(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCandidateRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            
            // Handle resume upload
            if ($request->hasFile('resume')) {
                $resumePath = $request->file('resume')->store('resumes', 'resumes');
                $data['resume_path'] = $resumePath;
            }

            $candidate = Candidate::create($data);

            return response()->json([
                'success' => true,
                'data' => $candidate,
                'message' => 'Candidate created successfully.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create candidate: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $candidate
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCandidateRequest $request, Candidate $candidate): JsonResponse
    {
        try {
            $data = $request->validated();
            
            // Handle resume upload
            if ($request->hasFile('resume')) {
                // Delete old resume if exists
                if ($candidate->resume_path) {
                    Storage::disk('resumes')->delete($candidate->resume_path);
                }
                
                $resumePath = $request->file('resume')->store('resumes', 'resumes');
                $data['resume_path'] = $resumePath;
            }

            $candidate->update($data);

            return response()->json([
                'success' => true,
                'data' => $candidate->fresh(),
                'message' => 'Candidate updated successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update candidate: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate): JsonResponse
    {
        try {
            // Delete resume file if exists
            if ($candidate->resume_path) {
                Storage::disk('resumes')->delete($candidate->resume_path);
            }

            $candidate->delete();

            return response()->json([
                'success' => true,
                'message' => 'Candidate deleted successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete candidate: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get candidate statistics.
     */
    public function statistics(): JsonResponse
    {
        $total = Candidate::count();
        $byStatus = Candidate::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
        
        $recent = Candidate::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'by_status' => $byStatus,
                'recent' => $recent,
            ]
        ]);
    }
}
