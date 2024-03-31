import { Link, Outlet } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BiSolidShoppingBag } from "react-icons/bi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { TbSitemap } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col sm:justify-start sm:items-start drawer-content">
          {/* Page content here */}
          <div className="flex items-center justify-between m-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button sm:hidden"
            >
              <RxDashboard />
            </label>
            <button className="flex items-center gap-2 text-white rounded-full btn bg-green sm:hidden"><AiOutlineUser />Logout</button>
          </div>
          <div className="mx-4 mt-4 md:mt-2">
          <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="flex justify-start mb-3">
              <li>
                <Link to="/dashboard">
                  <p className="text-xl text-bold" style={{ width: "170px" }}>
                    <span className="text-xl text-bold text-green">Khemz</span>
                    Kitchen
                  </p>
                  <span className=" badge badge-secondary badge-outline">
                    admin
                  </span>
                </Link>
              </li>
            </div>
            <hr className="border-2 border-blue-100" />
            <li>
              <Link to="/dashboard">
                <BiSolidDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <BiSolidShoppingBag />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <BiSolidFoodMenu />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <TbSitemap />
                Manage Items
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                <FiUsers />
                All Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;



