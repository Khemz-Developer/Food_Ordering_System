const Dashboard = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col w-full lg:flex-row ">
        
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            Total Users
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            Total Orders
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            content
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-32 px-24 card bg-base-300 rounded-box place-items-center">
            content
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
