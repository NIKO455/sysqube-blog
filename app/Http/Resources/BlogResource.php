<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "slug" => $this->slug,
            "title" => $this->title,
            "status" => $this->status,
            "image" => '/storage/'.$this->image,
            "description" => $this->description,
            "category" => $this->category->name
        ];
    }
}
