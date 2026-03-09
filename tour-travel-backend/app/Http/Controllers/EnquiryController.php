<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EnquiryController extends Controller
{
    // POST: Submit enquiry (User)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string',
            'tour_package_id' => 'nullable|exists:tour_packages,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $enquiry = Enquiry::create([
            ...$validator->validated(),
            'status' => 'new'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Enquiry submitted successfully',
            'data' => $enquiry
        ], 201);
    }
    // GET: View all enquiries (Admin)
public function index()
{
    $enquiries = Enquiry::with('tourPackage')->get();

    return response()->json([
        'success' => true,
        'data' => $enquiries
    ]);
}

}
