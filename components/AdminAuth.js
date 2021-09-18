import { getSession, useSession } from "next-auth/client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function AdminAuth() {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // getSession().then((session)=>{
    //   if (session.user.role === 0){
    //     router.replace('/login');
    // }

    // })
    const securePage = async () => {
      const session = await getSession();
      if (session.user.role === 1) {
        setUser(session.user);
      }else{
          router.replace("/");
      }
    };
    securePage();
  }, [router]);
  return user;
}
