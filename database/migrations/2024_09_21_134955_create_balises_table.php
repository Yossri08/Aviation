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
        Schema::create('balises', function (Blueprint $table) {
            $table->id();
        $table->string('code_hexa')->unique();
        $table->string('type');
        $table->string('modele');
        $table->string('fabriquant');
        $table->string('certificat');
        $table->enum('statut', ['actif', 'inactif'])->default('inactif');
        $table->date('enregistrement');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balises');
    }
};
