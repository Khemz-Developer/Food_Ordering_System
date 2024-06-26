import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {

  
  const {user} = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const {refetch,data:cart =[]} = useQuery({
    queryKey:["cart",user?.email],
    queryFn:async ()=>{
      
      const res = await fetch(`http://localhost:3000/cart/${user?.email}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      });
      //const res = await fetch(`http://localhost:3000/cart?email=${user?.email}`);
      return res.json();
    }
  })
  return [cart,refetch]
}

export default useCart
