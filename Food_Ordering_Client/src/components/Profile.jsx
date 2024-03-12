import PropTypes from "prop-types"; // Import PropTypes
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Profile = ({ user }) => {
    const {logOut} = useContext(AuthContext)
   const handleLogout = () => {
       logOut().then(()=>{
         //alert("Logout successfully")
       }).catch(error => console.error(error))
   }
  return (
    <div>
      <div className="z-50 drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? 
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL} // Corrected property name
                />
               : 
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              }
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Define propTypes for the Profile component
Profile.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string.isRequired, // Define shape of the user prop
  }).isRequired,
};

export default Profile;