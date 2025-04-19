import LogoutButton from "./LogoutButton"
import Conversations from "./Conversations"

const SideBar = () => {
  return (
    <div className='border-r border-gray-700 p-4 flex flex-col w-44 sm:w-64 md:w-1/2 bg-gray-700 text-white '>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default SideBar
