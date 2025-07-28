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
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('position_applied')->nullable();
            $table->text('experience_summary')->nullable();
            $table->string('current_company')->nullable();
            $table->string('current_position')->nullable();
            $table->decimal('expected_salary', 10, 2)->nullable();
            $table->string('resume_path')->nullable();
            $table->enum('status', ['new', 'reviewed', 'shortlisted', 'interviewed', 'hired', 'rejected'])->default('new');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['status', 'created_at']);
            $table->index(['email']);
            $table->index(['position_applied']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
