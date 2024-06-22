import {Head} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";

function BlogContent({content}) {
    return (
        <div dangerouslySetInnerHTML={{__html: content}}/>
    );
}


export default function Create({blog}) {

    return (
        <>
            <Head title="Blog"/>
            <div className="py-12">
                <div className="max-w-screen mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <header className="mb-4 lg:mb-6">
                                    <address className="flex items-center mb-6 not-italic">
                                        <div
                                            className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <img className="mr-4 w-16 h-16 rounded-full"
                                                 src="https://avatar.iran.liara.run/public/47"
                                                 alt="Jese Leos"/>
                                            <div>
                                                <a href="#" rel="author"
                                                   className="text-xl font-bold text-gray-900 dark:text-white">{blog.author}</a>
                                                <p className="text-base text-gray-500 dark:text-gray-400">
                                                    Author
                                                </p>
                                                <p className="text-base text-gray-500 dark:text-gray-400">
                                                    <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
                                                        {blog.published}
                                                    </time>
                                                </p>
                                            </div>
                                        </div>
                                    </address>
                                    <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                        {blog.title}
                                    </h1>
                                </header>

                                <BlogContent content={blog.description}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}
