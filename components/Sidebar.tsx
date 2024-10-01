import { Avatar, Button } from "@nextui-org/react";
import { UserCircleIcon, ClockIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    // Hide sidebar on small screens, show on large screens (lg and up)
    <div className="hidden lg:block w-[312px] h-screen p-6 flex flex-col items-start">
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        className="w-20 h-20"
      />

      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Button
              variant="light"
              startContent={<UserCircleIcon className="h-5 w-5 text-[#667085]" />} 
              className="flex items-center gap-2 text-[#344054] w-full justify-start text-[14px] font-semibold"
              onClick={() => window.open("#", "_blank")}
            >
              Account Details
            </Button>
          </li>
          <li>
            <Button
              variant="light"
              startContent={<ClockIcon className="h-5 w-5 text-[#667085]" />} 
              className="flex items-center gap-2 text-[#344054] w-full justify-start text-[14px] font-semibold"
              onClick={() => window.open("#", "_blank")}
            >
              Order History
            </Button>
          </li>
          <li>
            <Button
              variant="light"
              startContent={<ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-[#667085]" />}
              className="flex items-center gap-2 text-[#344054] w-full justify-start text-[14px] font-semibold"
              onClick={() => window.open("#", "_blank")}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
