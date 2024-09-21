import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useHandleLogOut() {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  return handleLogOut;
}