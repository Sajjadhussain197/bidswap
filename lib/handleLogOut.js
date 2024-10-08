import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


 export default async function HandleLogOut(){
    const router = useRouter();
    await signOut();
    router.push("/")
 }