import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

import userImg from '../assets/profile.jpg';
import { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';

const SideBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo href="/" img={user?.photoURL} imgAlt={userImg} className='w-16 h-16'>
        <p>
          {
            user?.displayName || "Admin"
          }
        </p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard/upload" icon={HiViewBoards}>
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </Sidebar.Item>
          {/* <Sidebar.Item href="/admin/dashboard/orders" icon={HiArrowSmRight}>
            Orders
          </Sidebar.Item> */}
          <Sidebar.Item href="/" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBar