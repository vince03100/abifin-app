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
    Schema::create('pratiche', function (Blueprint $table) {
        $table->id();
        $table->foreignId('cliente_id')->constrained('clienti')->onDelete('cascade');
        $table->string('titolo');
        $table->text('descrizione')->nullable();
        $table->enum('stato', ['Aperta', 'In Lavorazione', 'Chiusa'])->default('Aperta');
        $table->timestamp('data_apertura')->useCurrent();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pratiche');
    }
};
