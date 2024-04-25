import Link from "next/link";

export default function NotFoundScene() {
    return (
        <div className=" text-white text-[40vw] h-screen w-screen bg-kilalascene bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative flex flex-col justify-center items-center">
            <Link href="/" className=" opacity-80">404</Link>
        </div>
    )
}