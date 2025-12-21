import { User } from "@/lib/schemas/schema";
import axios from "axios";
import { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";

const useCreateUser = (data: Session | null) => {
  const [user, setUser] = useState<User | null>(null);

  const createUser = useCallback(async () => {
    try{

      if (!data) return;
      
      const response = await axios.post(`/api/user/create`, {
        name: data.user?.name,
      email: data.user?.email,
    });

    const { user } = await response.data;
    setUser(user);
  } catch(e){
    console.log(e);
  }
  }, [data?.user?.name, data?.user?.email]);

  useEffect(() => {
    if (!data || !data.user || !data.user.email) return;
    createUser();
  }, [data?.user?.email]);

  return user;
};

export default useCreateUser;
