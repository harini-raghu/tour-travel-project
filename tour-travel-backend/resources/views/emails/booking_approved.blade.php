<h2>Booking Approved</h2>

<p>Hello {{ $booking->customer_name }},</p>

<p>Your booking for <strong>{{ $booking->tourPackage->title }}</strong> has been <b>APPROVED</b>.</p>

<p>
Travel Date: {{ $booking->travel_date }} <br>
Number of People: {{ $booking->number_of_people }}
</p>

<p>Our team will contact you shortly with further details.</p>

<p>Thank you for choosing Coorg Shree Tours & Travels.</p>

<p>Regards,<br>
Coorg Shree Tours & Travels</p>