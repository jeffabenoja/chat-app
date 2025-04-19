import SideBar from "../components/sidebar/index"
import MessageContainer from "../components/messages/MessageContainer"

const Home = () => {
  return (
    <div className='flex lg:h-[80vh] h-full w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg'>
      {/* Your content goes here */}
      <SideBar />
      <MessageContainer />
    </div>
  )
}

export default Home
