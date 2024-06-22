<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogResource;
use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Exception;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use function PHPUnit\Framework\isEmpty;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        $blogs = BlogResource::collection(Blog::where('user_id', auth()->user()->id)->with('user')->latest()->paginate(10));
        return Inertia::render('Blog/Index', compact('blogs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request): \Illuminate\Http\RedirectResponse
    {
        try {
            $data = $request->validated();
            $slug = $this->generateUniqueSlug($data['slug']);


            Blog::create([
                'title' => $data['title'],
                'slug' => $slug,
                'description' => $data['description'],
                'user_id' => auth()->user()->id,
                'status' => 'draft',
                'introDescription' => $data['introDescription'],
            ]);

            return redirect()->route('blog')->with('message', 'Blog created successfully!');

        } catch (\Exception $e) {
            dd($e);
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
    public function show($slug): \Inertia\Response
    {
        $blog = new BlogResource(Blog::where('slug', $slug)->with('user')->first());
        return Inertia::render('Blog/Show', compact('blog'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($slug): \Inertia\Response
    {
        $blog = Blog::where('slug', $slug)->first();
        return Inertia::render('Blog/Edit', compact('blog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, $slug): \Illuminate\Http\RedirectResponse
    {
        try {
            $blog = Blog::where('slug', $slug)->first();
            $data = $request->validated();

            if($data['slug']){
                $data['slug'] = $this->generateUniqueSlug($data['slug']);
            }


            $blog->update([
                'title' => $data['title'],
                'slug' => $slug,
                'description' => $data['description'],
                'introDescription' => $data['introDescription'],
            ]);

            return redirect()->route('blog')->with('message', 'Blog updated successfully!');

        } catch (\Exception $e) {
            return redirect()->route('blog')->with('message', 'Blog failed to update!');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug): \Illuminate\Http\RedirectResponse
    {
        try {
            $blog = Blog::where('slug', $slug)->first();
            $blog->delete();
            return to_route('blog')->with('message', 'Blog deleted successfully!');
        } catch (Exception $e) {
            return to_route('blog')->with('message', 'Blog not deleted successfully!');
        }
    }

    public function changeStatus($slug): \Illuminate\Http\RedirectResponse
    {
        try {
            $blog = Blog::where('slug', $slug)->first();
            if ($blog->status == 'draft') {
                $blog->status = 'published';
            } else {
                $blog->status = 'draft';
            }
            $blog->save();
            return to_route('blog')->with('message', 'Blog status changed successfully!');
        } catch (Exception $e) {
            return to_route('blog')->with('message', 'Blog status failed to change!');
        }
    }
}
