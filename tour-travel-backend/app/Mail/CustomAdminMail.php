<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class CustomAdminMail extends Mailable
{
    public $booking;
    public $messageText;

    public function __construct($booking, $messageText)
    {
        $this->booking = $booking;
        $this->messageText = $messageText;
    }

    public function build()
    {
        return $this->subject('Message from Coorg Shree Tours')
            ->view('emails.custom_admin');
    }
}