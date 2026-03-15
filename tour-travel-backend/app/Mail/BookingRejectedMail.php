<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class BookingRejectedMail extends Mailable
{
    public $booking;

    public function __construct($booking)
    {
        $this->booking = $booking;
    }

    public function build()
    {
        return $this->subject('Booking Update – Coorg Shree Tours')
            ->view('emails.booking_rejected');
    }
}