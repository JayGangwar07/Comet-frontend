import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'



const Loader = () => {
  return <div
  className="bg-black w-screen h-screen flex justify-center items-center"
  >
  <Infinity
  size="200"
  stroke="6"
  strokeLength="0.2"
  bgOpacity="0.1"
  speed="1"
  color="green" 
/>
  </div>
}

export default Loader