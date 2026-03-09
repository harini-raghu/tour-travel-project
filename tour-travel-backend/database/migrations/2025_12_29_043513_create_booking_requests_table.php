<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('booking_requests', function (Blueprint $table) {
        $table->id();

        $table->foreignId('tour_package_id')
              ->constrained('tour_packages')
              ->onDelete('cascade');

        $table->string('customer_name');
        $table->string('customer_email');
        $table->string('customer_phone', 20);

        $table->date('travel_date');
        $table->integer('number_of_people');

        $table->text('special_request')->nullable();

        $table->enum('status', ['pending', 'approved', 'rejected'])
              ->default('pending');

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_requests');
    }
};
