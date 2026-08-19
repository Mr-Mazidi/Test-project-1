"use client"

import { DeleteToken } from "@/app/Api/Token";
import AditeProfile from "@/app/components/AditeProfile";
import { LogOut, UserPen, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
    const router = useRouter()
    const [image, setImage] = useState("")
    const [isShowAdite, setIsShowAdite] = useState<boolean>(false)
    const [data, setData] = useState({
        name: "User1",
        fullName: " User Name",
        age: "00",
        phone: "09*********",
        biography: ""
    })

    return (
        <div className="fixed flex justify-center items-center
        bg-gray-300/30 backdrop-blur-md
          w-full h-full
           z-50">


            <p className="bg-gray-300/20 animationProfil text-justify blur-sm">Profile
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, dignissimos. Nobis rerum eligendi dolores accusantium nostrum omnis magni ipsa aliquam natus, vero cum ex reiciendis architecto! Ad dolores quae laboriosam.
                Magni, qui. Et vero non eius. Animi nemo consequuntur laboriosam magni quia, soluta esse voluptatibus eaque iure porro nesciunt deserunt veniam odio sunt nulla in vitae aliquid et velit expedita!
                Blanditiis optio voluptas voluptatem est ad esse, laboriosam recusandae iste in exercitationem nostrum alias porro error, quo modi atque explicabo dolores deleniti maiores! Exercitationem ipsam ipsum beatae dolorem enim quisquam.
                Nulla consectetur enim eum dolorum velit error at et, magni dolor optio impedit porro aliquid vero iusto debitis quo id? Excepturi architecto, laborum nisi numquam voluptatum deserunt nesciunt possimus quidem?
                Ea tenetur odit a commodi animi, tempora debitis quis repellendus nulla quam placeat cumque, cum optio rerum provident blanditiis aspernatur consequatur nisi nihil iste. Neque magni alias quas soluta excepturi.
                Unde assumenda commodi corporis necessitatibus delectus quibusdam distinctio quas, sunt explicabo. Quibusdam dolorum atque quia, accusantium in vel perferendis debitis aliquid? Minima fugit in voluptates ex rerum reiciendis minus esse?
                Odio voluptates quasi unde in fuga. Necessitatibus ipsa possimus laboriosam soluta alias cumque quasi, perferendis, repellat quibusdam animi aliquid veritatis dignissimos, debitis ipsum tempore iste illum asperiores non nam. Enim.
                Voluptatum, sapiente eos maiores exercitationem porro illo corporis doloremque labore enim atque temporibus molestiae fugiat ullam rerum accusantium nemo dignissimos! Eligendi doloremque quasi, assumenda maxime nihil suscipit repudiandae ut enim.
                Praesentium hic sit reiciendis velit similique, harum atque tenetur? Dolorem eos modi numquam ducimus, nobis, eaque provident doloribus possimus esse consectetur facere quidem quo inventore, officia minima suscipit necessitatibus pariatur?
                Officia architecto neque molestias. Ipsum, necessitatibus iste ducimus qui nesciunt non accusamus dolore excepturi similique facilis facere, perspiciatis assumenda blanditiis et sequi aliquam! Aliquam quisquam commodi eum, non quis error.
                Laudantium atque tempora fugiat aliquid. In repellendus eveniet sint ullam dolorum aspernatur saepe inventore placeat recusandae? Reprehenderit, consectetur? Deserunt cupiditate nesciunt laborum veniam molestiae, sequi quidem quia magnam libero! Repellendus.
                Omnis cum reprehenderit eveniet accusantium illo obcaecati atque expedita! Nulla voluptatum quis odio repellat quia nobis. Porro, totam vel unde numquam, quo voluptatum culpa libero quae saepe ratione error dolores.
                Iusto possimus, iste a voluptatem, repudiandae autem adipisci aliquam vitae error aspernatur explicabo aliquid quas id provident ab velit corporis nemo, alias quidem! Velit iure a eum ipsam, architecto modi?
                Eaque debitis aut fuga impedit at sunt repellendus deserunt cupiditate aliquam id exercitationem esse, labore soluta vero neque quam quod accusamus ullam odit, asperiores nulla consequatur! Dolorem aliquid officia omnis!
                Voluptates delectus inventore soluta culpa eveniet aperiam fugiat. Necessitatibus voluptates deleniti, sequi neque sit laborum sunt sapiente repellat? Exercitationem explicabo inventore dolore fuga magni id hic unde consectetur reprehenderit reiciendis?
                Temporibus, molestias! Dolores officia dolorem recusandae facere, harum illum reiciendis omnis ducimus suscipit quasi debitis minus tempore dicta nostrum incidunt necessitatibus culpa tempora maiores molestiae accusamus doloribus eius totam repellat?
                Hic incidunt ad eos molestiae, veritatis temporibus, culpa accusantium laudantium suscipit vel voluptatum! Earum, laborum! Accusantium sint, nemo et placeat, reprehenderit, libero suscipit aliquam fugit optio dolorum vel possimus! Rem.
                Quidem quam itaque quibusdam, magnam, consectetur eos sed debitis aliquid illum vero vitae fugiat nostrum velit omnis maiores asperiores cupiditate, officia veniam molestiae corrupti doloremque laudantium eius. Eum, voluptas a!
                Nam ducimus recusandae vitae praesentium mollitia corporis eveniet dolorem consectetur, eaque, voluptatem doloremque? Atque nemo dignissimos, fuga, voluptatum corrupti ad tempore esse quae pariatur sapiente quas sequi animi sit! Quibusdam?
                Aut accusantium animi error possimus facilis fugiat? Tenetur blanditiis qui consequuntur! Sed laudantium ipsa quo, itaque consectetur, ratione sunt porro, quam animi beatae commodi qui officiis. Sit quia esse nihil?
                Unde, minus, aliquid hic sed libero repudiandae doloribus tempora fuga est ratione numquam asperiores labore optio quia soluta nulla dolorum, voluptatibus obcaecati voluptates quam laboriosam iusto animi a suscipit! Sint.
                Odit sequi temporibus accusamus, eum quidem aliquid delectus, fugit fuga reiciendis commodi nulla id quibusdam at maxime totam ducimus culpa, dolorum corporis minus voluptatibus eos! Reprehenderit fugit maxime similique consequatur.
                Est culpa voluptate perferendis blanditiis provident aliquam non minima error laudantium nisi recusandae eius necessitatibus ea, consequatur maxime reiciendis sit aspernatur ad officiis alias? Repudiandae saepe facere ex adipisci officia!
                Quaerat, fugit quod aut ducimus ipsum at nisi nobis, accusamus dolore dicta autem iure non optio earum odio suscipit, atque nihil? Molestiae deserunt impedit eos accusamus ea fuga quo enim.
                Iusto est qui eveniet nihil! Nesciunt nulla exercitationem, eum aperiam dolores voluptates itaque reiciendis quia. Sapiente, vel. Adipisci maiores placeat harum, magni ad sit animi perspiciatis nihil vel incidunt voluptate.
                Suscipit, sit maiores minus perferendis voluptates at qui nam magnam, debitis temporibus, odio eveniet unde quod est assumenda! Ipsam alias est cupiditate impedit. Itaque eveniet saepe iste corrupti ipsam inventore.
                A accusantium esse mollitia commodi rerum iure blanditiis, veniam asperiores pariatur assumenda nostrum fugit reiciendis quos cupiditate vitae vel voluptatum eaque unde. Quo omnis veritatis illo, doloribus voluptates quisquam delectus.
                Dolorum velit rerum ab id, odio numquam quas asperiores aperiam eligendi non molestias labore ea suscipit maiores magnam delectus cupiditate exercitationem corporis fugiat rem dolorem. Minima quibusdam a iste similique!
                Sequi, veritatis. Quam exercitationem minus esse eligendi, quidem nemo. Quam autem, dolor omnis voluptates fugiat possimus temporibus officia, dolores doloremque, dolorem nulla iure porro illo excepturi natus vel accusamus neque.
                Harum, voluptate. Inventore culpa accusamus explicabo sed harum consequuntur ipsum reiciendis eum vero. Animi accusamus tempora molestiae nobis error autem ab ratione, eveniet rerum asperiores vitae aliquid reiciendis cupiditate dolores.
            </p>

            <div className="w-4/6 h-11/12 fixed
             bg-[#f8f9f4] 
             overflow-y-auto
             rounded-md
             ">

                {!isShowAdite ?

                    <div>
                        <div className="w-full flex justify-between p-2">

                            <button onClick={() => {
                                DeleteToken()
                                router.push("/")
                            }} className="flex justify-enter">
                                <LogOut />
                                <span className="ml-0.5">Log Out</span>
                            </button>

                            <button onClick={() => {
                                router.push("/shop/products")
                            }} >
                                <X />
                            </button>

                        </div>

                        <div className="w-full h--full 
                                flex flex-col items-center
                                pt-2
                                text-sm
                                ">

                            <label htmlFor="InputLable" className="rounded-full overflow-hidden cursor-pointer">

                                <Image src={image || "/Image/Profile.png"} alt="Picture Profile" width={100} height={100} />

                            </label>


                            <input id="InputLable" type="file" accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setImage(URL.createObjectURL(e.target.files?.[0]))
                                    }
                                }}
                            />

                            <p className="mt-0.5 font-bold">{data.name}</p>


                            <div className="flex flex-col w-3/6">

                                <p>
                                    <span className="font-bold"> Name: </span>
                                    {data.fullName}
                                </p>

                                <p>
                                    <span className="font-bold"> Age: </span>
                                    {data.age}
                                </p>

                                <p>
                                    <span className="font-bold"> Number Phone: </span>
                                    {data.phone}
                                </p>

                                <p className="mt-0.5">
                                    <span className="font-bold"> Biography: </span>
                                    {data.biography || "Please write one biography for yourself"}
                                </p>

                            </div>
                            <video src={""} />

                        </div>

                        <button className="w-full flex justify-center items-center p-4"
                            onClick={() => {
                                setIsShowAdite(true)
                            }}>
                            <UserPen />

                            <span className="ml-1">
                                Adite Profile
                            </span>

                        </button>
                    </div>

                    :

                    <AditeProfile setData={setData} setIsShowAdite={setIsShowAdite} data={data} />

                }

            </div>
        </div>
    )
}


















