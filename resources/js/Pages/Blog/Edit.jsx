import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import {useEffect} from "react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";


export default function Create({auth, blog, categories}) {

    const {data, setData, processing, progress} = useForm({
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        category_id: blog.category_id,
    });

    const {errors} = usePage().props

    useEffect(() => {
        const generateSlug = (title) => {
            return title.toLowerCase().replace(/ /g, '-');
        };

        setData('slug', generateSlug(data.title));
    }, [data.title]);


    const submit = (e) => {
        e.preventDefault();
        router.post('/blog/edit/' + blog.slug, data);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Edit</h2>}
        >
            <Head title="Blog"/>


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form onSubmit={submit}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="col-span-6">
                                                <InputLabel htmlFor="title" value="Title"/>
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="title"
                                                        type="text"
                                                        name="title"
                                                        value={data.title}
                                                        className="mt-1 block w-full"
                                                        autoComplete="title"
                                                        isFocused={true}
                                                        onChange={(e) => setData('title', e.target.value)}
                                                    />
                                                    <InputError message={errors.title} className="mt-2"/>
                                                </div>
                                            </div>

                                            <div className="col-span-6">
                                                <InputLabel htmlFor="slug" value="Slug"/>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                                        <span
                                                            className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">slug/</span>
                                                        <input type="text" name="slug" id="slug"
                                                               autoComplete="slug"
                                                               className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                               readOnly={true} value={data.slug}
                                                        />
                                                    </div>
                                                    <InputError message={errors.slug} className="mt-2"/>
                                                </div>
                                            </div>

                                            <div className="col-span-6">
                                                <InputLabel htmlFor="category" value="Category"/>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <select
                                                            onChange={(e) => setData('category_id', e.target.value)}
                                                            id="countries"
                                                            className="block w-full border-gray-300 rounded-md bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        >
                                                            {categories &&
                                                                categories.map((category) => (
                                                                    <option key={category.id} value={category.id} selected={category.id === blog.category_id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <InputError message={errors.category_id} className="mt-2"/>
                                                </div>
                                            </div>


                                            <div className="col-span-full">
                                                <InputLabel htmlFor="image" value="Image"/>
                                                <div className="mt-2">
                                                    {data.image || blog.image ? (
                                                        <div>
                                                            <img
                                                                src={data.image ? URL.createObjectURL(data.image) : blog.image}
                                                                className="w-32 h-32 rounded object-cover"
                                                                alt="Selected Image"
                                                            />
                                                        </div>
                                                    ) : null}

                                                    <div className={data.image ? 'col-span-6' : 'col-span-full'}>
                                                        <input
                                                            className="block w-full text-sm mt-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                            id="image"
                                                            name="image"
                                                            type="file"
                                                            onChange={(e) => setData('image', e.target.files[0])}
                                                        />
                                                        {progress && (
                                                            <progress value={progress.percentage} max="100">
                                                                {progress.percentage}%
                                                            </progress>
                                                        )}
                                                        <InputError message={errors.image} className="mt-2"/>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-span-full">
                                                <InputLabel htmlFor="description" value="Description"/>
                                                <div className="mt-2">
                                                    <textarea id="description" name="description" rows="5"
                                                              value={data.description}
                                                              onChange={(e) => setData('description', e.target.value)}
                                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                                </div>
                                                <p className="mt-3 text-sm leading-6 text-gray-600">Write about the
                                                    blog</p>
                                                <InputError message={errors.description} className="mt-2"/>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <a href='/blog' type="button"
                                       className="text-sm font-semibold leading-6 text-gray-900">Cancel
                                    </a>
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Update
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
