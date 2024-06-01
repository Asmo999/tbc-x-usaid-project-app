"use client";

import Image from "next/image";
import DefaultImage from "../../public/person.png";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

function UserInformation() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-full flex flex-col border shadow-lg rounded-lg bg-[#FEFEFE] p-8">
            <h2 className="text-2xl font-['mtavruli'] font-semibold mb-[20px] text-center w-full">ჩემი პროფილი</h2>
            <Image src={selectedImage || DefaultImage} id="registrationImage" alt="user" width={120} height={30} className="mx-auto rounded-full border-2 cursor-pointer w-[120px] h-[120px]" />
            <form autoComplete='off' className="flex flex-col space-y-4 mt-[10px]">
                <div className='w-full'>
                    <label htmlFor="image" className="block font-medium text-gray-700">
                        შეცვალე პროფილის სურათი
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            required
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red focus:border-red focus:outline-none focus:red file:border-0 file:bg-red file:text-sm file:font-medium"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <div className="h-[2px] bg-gradient-to-r from-white via-red to-white"> </div>
                <label htmlFor="email" className="block text-md font-medium text-gray-700">ელ. ფოსტა</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red focus:border-red focus:outline-none focus:red"
                />
                <div className="flex items-center justify-between">
                    <div className="relative w-[40%]">
                        <label htmlFor="name" className="block text-md font-medium text-gray-700">სახელი</label>
                        <input
                            type="text"
                            id="name"
                            required
                            readOnly
                            className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red focus:border-red focus:outline-none focus:red"
                        />
                        <EditIcon className="absolute right-2 top-10 text-gray-500 cursor-pointer" />
                    </div>
                    <div className="relative w-[56%]">
                        <label htmlFor="surname" className="block text-md font-medium text-gray-700">გვარი</label>
                        <input
                            type="text"
                            id="surname"
                            required
                            readOnly
                            className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red focus:border-red focus:outline-none focus:red"
                        />
                        <EditIcon className="absolute right-2 top-10 text-gray-500 cursor-pointer" />
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="address" className="block text-md font-medium text-gray-700">მისამართი</label>
                    <input
                        type="text"
                        id="address"
                        required
                        readOnly
                        className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red focus:border-red focus:outline-none focus:red"
                    />
                    <EditIcon className="absolute right-2 top-10 text-gray-500 cursor-pointer" />
                </div>
                <div className="relative">
                    <label htmlFor="phone" className="block text-md font-medium text-gray-700">მობილურის ნომერი</label>
                    <input
                        type="text"
                        id="phone"
                        required
                        readOnly
                        className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red focus:border-red focus:outline-none focus:red"
                    />
                    <EditIcon className="absolute right-2 top-10 text-gray-500 cursor-pointer" />
                </div>

                <button
                    type="submit"
                    className="w-[40%] self-center px-4 py-3 text-md font-medium text-white bg-red rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                    შენახვა
                </button>
            </form>
        </div>
    )
}

export default UserInformation;
