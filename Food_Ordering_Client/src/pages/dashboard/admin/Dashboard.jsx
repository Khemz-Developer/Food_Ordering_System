import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  // Total Users  count
  const { refetch, data: userscount } = useQuery({
    queryKey: ["userscount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/user-count`);
      return res.data;
      
    },
  });

  // Total Admin count
  const {  data: admincount } = useQuery({
    queryKey: ["admincount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin-count`);
      return res.data;
      
    },
  });

  // Total Earnings
  const { data: earnings } = useQuery({
    queryKey: ["earnings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin-earnings`);
      return res.data;
    },
  });

  //Total Pending Clearence
  const { data: pendingclearence } = useQuery({ 
    queryKey: ["pendingclearence"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin-pending-earnings`);
      return res.data;
    },
  });  
  

  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col w-full lg:flex-row ">
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            {/* Total Users : {users} */}
            Total Users : {userscount}
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            {/* Total Admin : {admin} */}
            Total Admin : {admincount}
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            Earnings : $ {earnings}
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            Pending Clearence : $ {pendingclearence}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
