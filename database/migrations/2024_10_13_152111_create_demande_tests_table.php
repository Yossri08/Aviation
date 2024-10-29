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
        Schema::create('demande_tests', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->date('date');
            $table->time('heure');
            $table->enum('statut', ['en attente','validé','refusé'])->default('en attente');

            $table->foreignId('balise_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demande_tests');
    }
};
