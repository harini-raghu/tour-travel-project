<?php

namespace App\Http\Controllers;

use App\Models\BookingRequest;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingRequestController extends Controller
{
    // POST: Create booking request (User)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tour_package_id' => 'required|exists:tour_packages,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'travel_date' => 'required|date|after_or_equal:today',
            'number_of_people' => 'required|integer|min:1',
            'special_request' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $booking = BookingRequest::create([
            ...$validator->validated(),
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking request submitted successfully',
            'data' => $booking
        ], 201);
    }

   // GET: View all booking requests (Admin)
public function index()
{
    $bookings = BookingRequest::with('tourPackage')
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($bookings);
}
// PATCH: Update booking status (Admin)
public function updateStatus(Request $request, $id)
{
    $booking = BookingRequest::find($id);

    if (!$booking) {
        return response()->json([
            'success' => false,
            'message' => 'Booking request not found'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'status' => 'required|in:approved,rejected'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    $booking->update([
        'status' => $request->status
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Booking status updated successfully',
        'data' => $booking
    ]);
}
public function approve($id)
{
    $booking = BookingRequest::findOrFail($id);
    $booking->status = 'Approved';
    $booking->save();

    return response()->json([
        'message' => 'Booking approved successfully'
    ]);
}

public function reject($id)
{
    $booking = BookingRequest::findOrFail($id);
    $booking->status = 'Rejected';
    $booking->save();

    return response()->json([
        'message' => 'Booking rejected successfully'
    ]);
}


}
