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
        Schema::create('scout_index', function (Blueprint $table) {
            $table->id();
            $table->string('index');
            $table->string('key');
            $table->longText('value');
            $table->timestamps();

            $table->unique(['index', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scout_index');
    }
};
