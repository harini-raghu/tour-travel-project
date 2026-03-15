<?php

namespace App\Http\Controllers;

use App\Models\BookingRequest;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingReceivedMail;
use App\Mail\BookingApprovedMail;
use App\Mail\BookingRejectedMail;
use App\Mail\CustomAdminMail;


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

        Mail::to($booking->customer_email)->send(new BookingReceivedMail($booking));

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
    $booking = BookingRequest::with('tourPackage')->findOrFail($id);

    $booking->status = 'approved';
    $booking->save();

    Mail::to($booking->customer_email)->send(new BookingApprovedMail($booking));

    return response()->json([
        'success' => true,
        'message' => 'Booking approved'
    ]);
}

public function reject($id)
{
    $booking = BookingRequest::with('tourPackage')->findOrFail($id);

    $booking->status = 'rejected';
    $booking->save();

    Mail::to($booking->customer_email)->send(new BookingRejectedMail($booking));

    return response()->json([
        'success' => true,
        'message' => 'Booking rejected'
    ]);
}

public function sendEmail(Request $request, $id)
{
    $booking = BookingRequest::with('tourPackage')->find($id);

    if (!$booking) {
        return response()->json([
            'success' => false,
            'message' => 'Booking not found'
        ]);
    }

    Mail::to($booking->customer_email)
        ->send(new CustomAdminMail($booking, $request->message));

    return response()->json([
        'success' => true,
        'message' => 'Email sent successfully'
    ]);
}
}