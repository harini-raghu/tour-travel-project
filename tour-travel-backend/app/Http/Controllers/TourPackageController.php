<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TourPackageController extends Controller
{
    // GET all tour packages
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => TourPackage::all()
        ]);
    }

    // POST create new tour package
    public function store(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'duration_days' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $tour = TourPackage::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Tour package created successfully',
            'data' => $tour
        ], 201);
    }

    // PUT update tour package
    public function update(Request $request, $id)
    {
        $tour = TourPackage::find($id);

        if (!$tour) {
            return response()->json([
                'success' => false,
                'message' => 'Tour package not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'duration_days' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $tour->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Tour package updated successfully',
            'data' => $tour
        ]);
    }

    // DELETE tour package
    public function destroy($id)
    {
        $tour = TourPackage::find($id);

        if (!$tour) {
            return response()->json([
                'success' => false,
                'message' => 'Tour package not found'
            ], 404);
        }

        $tour->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tour package deleted successfully'
        ]);
    }
}
