<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title', 120);
            $table->string('tagline', 200)->nullable();
            $table->date('release_date');
            $table->string('poster_path', 120)->nullable();
            $table->text('overview')->nullable();
            $table->smallInteger('runtime', false, true)->nullable();
            // KN: Without age restriction
            // 6: Not recommended below age of 6.
            // 12: Not recommended below age of 12.
            // 16: Not recommended below age of 16.
            // 18: Not recommended below age of 18.
            // X: Restricted below 18, for adults only
            // null: No rating information
            $table->enum('certification', ['KN', '6', '12', '16', '18', 'X'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
