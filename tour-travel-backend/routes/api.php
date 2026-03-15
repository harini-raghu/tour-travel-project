<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookingRequestController;
use App\Http\Controllers\EnquiryController;
use App\Models\TourPackage;

Route::get('/tour-packages', [TourPackageController::class, 'index']);
Route::post('/tour-packages', [TourPackageController::class, 'store']);
Route::put('/tour-packages/{id}', [TourPackageController::class, 'update']);
Route::delete('/tour-packages/{id}', [TourPackageController::class, 'destroy']);
Route::post('/booking-requests', [BookingRequestController::class, 'store']);
Route::get('/admin/booking-requests', [BookingRequestController::class, 'index']);
Route::patch(
    '/admin/booking-requests/{id}/status',
    [BookingRequestController::class, 'updateStatus']
);
Route::post('/enquiries', [EnquiryController::class, 'store']);
Route::get('/admin/enquiries', [EnquiryController::class, 'index']);

Route::put('/booking-requests/{id}/approve', [BookingRequestController::class, 'approve']);
Route::put('/booking-requests/{id}/reject', [BookingRequestController::class, 'reject']);
Route::get('/booking-requests', [BookingRequestController::class, 'index']);


Route::get('/tour-packages', function () {
    return TourPackage::all();
});
Route::get('/tour-packages/{id}', function ($id) {
    return TourPackage::findOrFail($id);
});
Route::post('/booking-requests/{id}/send-email', [BookingRequestController::class, 'sendEmail']);
Route::post('/booking-requests/{id}/send-email', [BookingRequestController::class, 'sendEmail']);