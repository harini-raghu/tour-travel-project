<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookingRequestController;
use App\Http\Controllers\EnquiryController;

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
