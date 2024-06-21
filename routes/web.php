<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/blog', [BlogController::class, 'index'])->middleware(['auth', 'verified'])->name('blog');
Route::get('/blog/create', [BlogController::class, 'create'])->middleware(['auth', 'verified'])->name('blog.create');
Route::post('/blog/create', [BlogController::class, 'store'])->middleware(['auth', 'verified'])->name('blog.store');
Route::get('/blog/edit/{slug}', [BlogController::class, 'edit'])->middleware(['auth', 'verified'])->name('blog.edit');
Route::put('/blog/edit/{slug}', [BlogController::class, 'update'])->middleware(['auth', 'verified'])->name('blog.update');
Route::post('/blog/delete/{slug}', [BlogController::class, 'destroy'])->middleware(['auth', 'verified'])->name('blog.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
