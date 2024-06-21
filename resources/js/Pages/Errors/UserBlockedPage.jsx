import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link} from '@inertiajs/react';
import {Button} from "@headlessui/react";

export default function UserBlockedPage({status}) {
    return (
        <GuestLayout>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='text-center text-red-600'>
                <div>
                    Your Account is Blocked, Due to Many Failed Login Attempts. Please Contact Admin to Unblock Your
                    Account.
                </div>

                <Link href={route('home')}
                      className="hover:underline text-sm text-gray-600 hover:text-gray-900">Home</Link>
            </div>
        </GuestLayout>
    );
}
