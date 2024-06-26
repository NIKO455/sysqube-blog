import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';



export default function Index({auth, blogs}) {

    const currentPage = parseInt(new URLSearchParams(window.location.search).get('page') || '1');

    const pages = [];
    for (let key in blogs.links) {
        if (blogs.links[key] && blogs.links[key].includes('page=')) {
            const pageNum = parseInt(new URL(blogs.links[key]).searchParams.get('page'));
            if (!isNaN(pageNum) && !pages.includes(pageNum)) {
                pages.push(pageNum);
            }
        }
    }
    pages.sort((a, b) => a - b);


    const {post, get} = useForm({});

    /**
     * Delete a blog post.
     *
     * @param {string} slug - The slug of the blog post to be deleted.
     * @return {void}
     */
    function deleteBlog(slug) {
        if (window.confirm(`Are you sure you want to delete the blog post ?`)) {
            post(`/blog/delete/${slug}`);
        }
    }

    /**
     * Edit a blog post.
     *
     * @param {string} slug - The slug of the blog post to be edited.
     * @return {void}
     */
    function editBlog(slug) {
        get(`/blog/edit/${slug}`);
    }

    /**
     * Change the status of a blog post.
     *
     * @param {string} slug - The slug of the blog post.
     * @return {void}
     */
    function changeStatus(slug) {
        post(`/blog/change-status/${slug}`);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Index</h2>}
        >
            <Head title="Blog"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className='flex justify-end'>
                                <Link href={route('blog.create')}
                                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                      type="button">
                                    New Blog
                                </Link>
                            </div>


                            <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            S.N
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Intro Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        blogs.data.length > 0 ? blogs.data.map((blog, index) => (
                                            <tr key={blog.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {(currentPage - 1) * 10 + index + 1}
                                                </th>
                                                <td className="px-6 py-4 ">
                                                    <a href={`/blog/show/${blog.slug}`} target={'_blank'} className="front-end-title">{blog.title}</a>
                                                </td>
                                                <td className="px-6 py-4 back-end-description">
                                                    {blog.introDescription}
                                                </td>
                                                <td className="px-6 py-4 capitalize">
                                                    {
                                                        blog.status === 'draft' ?
                                                            <span onClick={() => changeStatus(blog.slug)}
                                                                  className='bg-red-400 py-1 px-2 rounded cursor-pointer text-red-600'>Draft</span> :
                                                            <span onClick={() => changeStatus(blog.slug)}
                                                                  className='bg-green-400 py-1 px-2 rounded cursor-pointer  text-green-600'>Published</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-between gap-3">
                                                        <a onClick={() => editBlog(blog.slug)}
                                                           className="flex text-blue-600 hover:text-blue-800 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                            </svg>
                                                        </a>
                                                        <a onClick={() => deleteBlog(blog.slug)}
                                                           className="flex text-red-600 hover:text-red-800 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>

                                            </tr>
                                        )) : <th colSpan={6} className='p-5 text-center'>No Data Found</th>
                                    }
                                    </tbody>
                                </table>
                            </div>

                            <div className='mt-5 flex items-center justify-center'>
                                <div>
                                    {
                                        blogs.links &&
                                        blogs.links  ?
                                            <nav aria-label="Page navigation example">
                                                <ul className="inline-flex -space-x-px text-sm">
                                                    {blogs.links.prev && (
                                                        <li>
                                                            <a
                                                                href={blogs.links.prev}
                                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                            >
                                                                Previous
                                                            </a>
                                                        </li>
                                                    )}

                                                    {pages.map((page) => (
                                                        <li key={page}>
                                                            <a
                                                                href={`http://127.0.0.1:8000/blog?page=${page}`}
                                                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                                                    currentPage === page
                                                                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                                                        : ''
                                                                }`}
                                                                aria-current={currentPage === page ? 'page' : undefined}
                                                            >
                                                                {page}
                                                            </a>
                                                        </li>
                                                    ))}

                                                    {blogs.links.next && (
                                                        <li>
                                                            <a
                                                                href={blogs.links.next}
                                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                            >
                                                                Next
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </nav> : ''
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
