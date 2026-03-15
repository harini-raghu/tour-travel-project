<h2>Booking Request Received</h2>

<p>Hello {{ $booking->customer_name }},</p>

<p>Thank you for booking <strong>{{ $booking->tourPackage->title }}</strong>.</p>

<p>
Travel Date: {{ $booking->travel_date }} <br>
Number of People: {{ $booking->number_of_people }}
</p>

<p>Your booking status is currently: <b>PENDING</b>.</p>

<p>Our team will review your request shortly.</p>

<p>Regards,<br>
Coorg Shree Tours & Travels</p>