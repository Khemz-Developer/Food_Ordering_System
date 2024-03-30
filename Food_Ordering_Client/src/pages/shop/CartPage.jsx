import { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  //handle decrease quantity function
  const handleDecrease = async (item) => {
    console.log(item._id);
    if(item.quantity > 1) {
      fetch(`http://localhost:3000/cart/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then(res => res.json())
        .then(data => {
          
          console.log(data);
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setCartItems(updatedCart);
        });
    }else{
      alert("Quantity can't be zero");
    }
    
    
  };

  //handle increase quantity function
  const handleIncrease = async (item) => {
    console.log(item._id);
    fetch(`http://localhost:3000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then(res => res.json())
      .then(data => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };

            
          }
          return cartItem;
          
        });
        refetch();
        setCartItems(updatedCart);
      });
  };

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  }

  //calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + calculatePrice(item);
    }, 0);
  }

  //handle delete
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(item._id);
        fetch(`http://localhost:3000/cart/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        {/*  banner */}
        <div className=" bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="flex flex-col items-center justify-center gap-8 py-24 ">
            {/*test*/}
            <div className="px-4 space-y-6 ">
              <h2 className="text-4xl font-bold leading-snug md:leading-snug md:text-5xl">
                Items Added to the <span className="text-green">Cart</span>
              </h2>
            </div>
          </div>
        </div>

        {/*  tables */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="text-white rounded-sm bg-green">
                <tr>
                  <th># </th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-squircle">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => {
                          console.log(item.quantity);
                        }}
                        className="w-10 mx-2 overflow-hidden text-center appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${calculatePrice(item).toFixed(2)}</td>
                    <th>
                      <button
                        className="btn btn-ghost text-red btn-xs"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  customer details */}
        <div className="flex flex-col items-start justify-between py-4 my-12 md:flex-row">
          <div className="space-y-3 md:w-1/2">
            <h3 className="font-medium">Customer Details</h3>
            <p>Name :{user.displayName}</p>
            <p>Email :{user.email}</p>
            <p>Customer Id : {user.uid}</p>
          </div>
          <div className="space-y-3 md:w-1/2">
            <h3 className="font-medium">Shopping Details</h3>
            <p>Total Items :{cart.length}</p>
            <p>Total Price :${calculateTotalPrice().toFixed(2)}</p>
            <button className="text-white btn bg-green">
              Proceed Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
