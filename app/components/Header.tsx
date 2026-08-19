"use client"

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BadgeDollarSignIcon, CircleUserRound, EllipsisVertical, PackagePlus, PackageSearchIcon, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function Header() {
    const [isShowNavbar, setIsShowNavbar] = useState<boolean>(false)
    const router = useRouter()
    const action = usePathname()

    return (
        <div>
            <ul className={clsx("fixed w-full", {
                "h-full": isShowNavbar
            })}>

                <div className="flex justify-between bg-[#f8f9f4] pb-1">

                    <button className="ml-1" onClick={() => setIsShowNavbar((prev) => !prev)}>
                        {!isShowNavbar ? <EllipsisVertical /> : <X />}
                    </button>


                    <li>
                        <Link href={"/"} >

                            <Image src={"/Image/ThemeLight.png"} width={62} height={62} alt="Pictur" />

                        </Link>
                    </li>

                </div>

                {isShowNavbar && <div className="min-w-56 bg-[#f8f9f4] flex flex-col justify-between h-full w-1/6">
                    <div className="ml-2 w-full">
                        <li className={clsx(
                            "border-l-2 border-gray-400 pl-2"
                            , {
                                "border-gray-700": action === "/shop/products"
                            })}>
                            <Link href={"/shop/products"}>
                                <div className="flex py-1.5">

                                    <PackageSearchIcon />
                                    Products

                                </div>
                            </Link>
                        </li>

                        <li className={clsx(
                            "border-l-2 border-gray-400 pl-2"
                            , {
                                "border-gray-700": action === "/shop/add-product"
                            })} >
                            <Link href={"/shop/add-product"}>
                                <div className="flex py-1.5">

                                    <PackagePlus />
                                    Add Products

                                </div>
                            </Link>
                        </li>

                        <li className={clsx("border-l-2 border-gray-400 pl-2"
                            , {
                                "border-gray-700": action === "/shop/my-card"
                            })}>
                            <Link href={"/shop/my-card"}>
                                <div className="flex py-1.5">

                                    <ShoppingBasket />
                                    My Cord

                                </div>
                            </Link>
                        </li>

                        <li className={clsx("border-l-2 border-gray-400 pl-2"
                            , {
                                "border-gray-700": action === "/currency-exchange"
                            })}>
                            <Link href={"/currency-exchange"}>
                                <div className="flex py-1.5">

                                    <BadgeDollarSignIcon />
                                    Currency Exchange

                                </div>
                            </Link>
                        </li>

                    </div>

                    <div>
                        <button className="mb-23 ml-1" onClick={() => router.replace("/profile")}>
                            <CircleUserRound size={31} />
                        </button>
                    </div>

                </div>}
            </ul >


        </div>
    )
}