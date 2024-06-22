import {Link, Head} from '@inertiajs/react';


export default function Welcome({auth, laravelVersion, phpVersion, blogs}) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome"/>

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />

                <div
                    className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <img src="https://upload.wikimedia.org/wikipedia/en/0/02/DotBlog_domain_logo.png" className='h-16 w-auto object-cover' alt=""/>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid z-10 gap-8 lg:grid-cols-2">
                                {
                                    blogs.map((blog) => (
                                        <article
                                            className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                              <span
                                                  className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                                  <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                                                       xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                                                                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                                                                                clip-rule="evenodd"></path><path
                                                      d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                                  Article
                                              </span>
                                                <span className="text-sm">{blog.published}</span>
                                            </div>
                                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                <Link href={`/blog/show/${blog.slug}`} className="front-end-title">{blog.title}</Link>
                                            </h2>
                                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400 front-end-description">
                                                {blog.introDescription}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <img className="w-7 h-7 rounded-full"
                                                         src="https://avatar.iran.liara.run/public/47"
                                                         alt="Jese Leos avatar"/>
                                                    <span className="font-medium dark:text-white">
                          {blog.author}
                      </span>
                                                </div>
                                                <Link href={`/blog/show/${blog.slug}`}
                                                      className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                                    Read more
                                                    <svg className="ml-2 w-4 h-4" fill="currentColor"
                                                         viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                              clip-rule="evenodd"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </article>
                                    ))
                                }
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Created By: Bhupendra Kathayat
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
