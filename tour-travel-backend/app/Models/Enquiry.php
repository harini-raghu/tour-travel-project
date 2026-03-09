<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasFactory;

    protected $table = 'enquiries';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
        'tour_package_id',
        'status',
    ];

    // Optional relationship with tour package
    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }
}
