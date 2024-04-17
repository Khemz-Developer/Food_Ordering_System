import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/payment/${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //const res = await fetch(`http://localhost:3000/cart?email=${user?.email}`);
      return res.json();
    },
  });

  const formatedDate = (createdAt)=>{
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString();
  }
  console.log(orders);
  return (
    <div>
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <div className="flex flex-col items-center justify-center py-28">
              <div className="text-center">
                <h2 className="text-4xl font-bold md:text-4xl">
                  Track All Your <span className="text-green">Orders!</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*table*/}
      <div className="container mx-auto">
        <div>
          {orders.length > 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="table mb-2">
                  {/* head */}
                  <thead className="text-white rounded-sm bg-green">
                    <tr>
                      <th># </th>
                      <th>Order Date </th>
                      <th>TransitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatedDate(item.createdAt)}</td>
                        <td className="font-medium">{item.transitionId}</td>
                        <td>${item.price}</td>
                        <td>{item.status}</td>
                        <th>
                          <Link to="/contact">
                            <button className="mt-3 text-green btn-sm ">
                              Contact
                            </button>
                          </Link>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-20 text-center">
              <p>Cart is empty. Please add products.</p>
              <Link to="/menu">
                <button className="mt-3 text-white btn bg-green">
                  Back to Menu
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
