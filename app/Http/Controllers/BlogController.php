<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Category;
use Exception;
use Inertia\Inertia;
use function PHPUnit\Framework\isEmpty;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Blog/Index', compact('blogs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        $categories = Category::all();
        return Inertia::render('Blog/Create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request): \Illuminate\Http\RedirectResponse
    {
        try {
            $data = $request->validated();
            $slug = $this->generateUniqueSlug($data['slug']);

            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = uniqid() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('blog_images', $imageName, 'public');
            }

            $blog = Blog::create([
                'title' => $data['title'],
                'slug' => $slug,
                'description' => $data['description'],
                'image' => $imagePath,
                'user_id' => auth()->user()->id,
                'status' => 'draft',
                'category_id' => $data['category_id'],
            ]);

            return redirect()->route('blog')->with('message', 'Blog created successfully!');

        } catch (\Exception $e) {
            return redirect()->route('blog')->with('message', 'Blog failed to create!');
        }
    }


    /**
     * Generate a unique slug based on the initial slug.
     *
     * @param string $initialSlug The initial slug to start with
     * @return string The unique slug generated
     */
    private function generateUniqueSlug(string $initialSlug): string
    {
        $slug = $initialSlug;
        $counter = 1;

        while (Blog::where('slug', $slug)->exists()) {
            $slug = $initialSlug . '-' . $counter++;
        }

        return $slug;
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($slug)
    {
        $blog = Blog::where('slug', $slug)->first();
        return Inertia::render('Blog/Edit', compact('blog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, $slug)
    {
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        try {
            $blog = Blog::where('slug', $slug)->first();
            $blog->delete();
            return to_route('blog')->with('message', 'Blog deleted successfully');
        } catch (Exception $e) {
            return to_route('blog')->with('message', 'Blog not deleted successfully');
        }
    }
}
