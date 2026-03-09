<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    use HasFactory;

    protected $table = 'booking_requests';

    protected $fillable = [
        'tour_package_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'travel_date',
        'number_of_people',
        'special_request',
        'status',
    ];

    // Relationship: booking belongs to a tour package
    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }
}
