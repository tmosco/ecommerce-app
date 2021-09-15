import { getSession } from "next-auth/client";
import  { useRouter } from "next/router";
import { useState,useEffect } from "react";

function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
        if(!session){
            // window.location.href='/login'
            router.replace('/login')
        }else{
          setIsLoading(false);

      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border m-5" role="staus">
          <span className="visually-hidden">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>This is the user page</h2>
    </div>
  );
}

export default UserPage;
