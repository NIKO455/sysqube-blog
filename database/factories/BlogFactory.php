<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'image' => 'blog_images/667562d5e1280_shampoo.jpg',
            'user_id' => 1,
            'status' => 'published',
            'category_id' => rand(1, 5),
        ];
    }
}
