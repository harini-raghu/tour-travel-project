<h2>Booking Update</h2>

<p>Hello {{ $booking->customer_name }},</p>

<p>We regret to inform you that your booking for 
<strong>{{ $booking->tourPackage->title }}</strong> has been <b>REJECTED</b>.</p>

<p>
Travel Date: {{ $booking->travel_date }} <br>
Number of People: {{ $booking->number_of_people }}
</p>

<p>Please contact us for alternative packages or further assistance.</p>

<p>Regards,<br>
Coorg Shree Tours & Travels</p>