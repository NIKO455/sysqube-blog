import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import {useEffect} from "react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";


export default function Create({auth, blog}) {

    const {data, setData, processing, progress, errors} = useForm({
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
    });

    useEffect(() => {
        const generateSlug = (title) => {
            return title.toLowerCase().replace(/ /g, '-');
        };

        setData('slug', generateSlug(data.title));
    }, [data.title]);


    const submit = (e) => {
        e.preventDefault();
        router.put('/blog/edit/' + blog.slug, data);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Create</h2>}
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
                                            <div className="sm:col-span-4">
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

                                            <div className="sm:col-span-4">
                                                <InputLabel htmlFor="slug" value="Slug"/>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                        <span
                                                            className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">slug/</span>
                                                        <input type="text" name="slug" id="slug"
                                                               autoComplete="slug"
                                                               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                               readOnly={true} value={data.slug}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <InputLabel htmlFor="image" value="Image"/>
                                                <div
                                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                    <input type="file" name="image" id="image"
                                                           onChange={e => setData('image', e.target.files[0])}/>
                                                    {progress && (
                                                        <progress value={progress.percentage} max="100">
                                                            {progress.percentage}%
                                                        </progress>
                                                    )}
                                                    <InputError message={errors.image} className="mt-2"/>
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
                                    <button type="button"
                                            className="text-sm font-semibold leading-6 text-gray-900">Cancel
                                    </button>
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
