// import { LocationEdit, Mail, Phone } from "lucide-react";

import { CircleUserRound, Home, Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {

    return (


        <div className="w-full min-h-96
        px-10 py-16
        flex flex-col justify-center items-center
        bg-black
        text-white
        ">

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-9 mb-6">
                <div>

                    <p className="font-bold text-2xl py-4">About Shop</p>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolores repudiandae impedit quos modi eum. Voluptates, nostrum repellat explicabo quaerat repudiandae, nemo pariatur quo laboriosam earum similique atque aut neque?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolores repudiandae impedit quos modi eum. Voluptates, nostrum repellat explicabo quaerat repudiandae, nemo pariatur quo laboriosam earum similique atque aut neque?
                    </p>

                </div>

                <div>

                    <p className="font-bold text-2xl py-4">Contact Us</p>

                    <div className="flex items-center p-1.5">
                        <span className="mx-1">
                            <CircleUserRound />
                        </span>
                        Mobin
                    </div>

                    <div className="flex items-center p-1.5">
                        <span className="mx-1">
                            <Phone />
                        </span>
                        0913***3509
                    </div>

                    <div className="flex items-center p-1.5">
                        <span className="mx-1">
                            <Mail />
                        </span>
                        Mr.Mazidi88@gmail.com
                    </div>

                </div>

                <div>
                    <p className="font-bold text-2xl py-4">Address</p>
                    <Image src={"/Image/map.png"} alt="Piture" width={300} height={300} />
                    <p className="flex items-center py-5">
                        <span className="px-1">
                            <Home />
                        </span>
                        Iran , Yazd , Amamshahr
                    </p>

                </div>

            </div>

            <div className="w-11/12 border-b-2 border-gray-400 text-center pb-1 rounded-4xl">1405/05/24</div>
        </div>
    )
}