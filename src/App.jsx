import React, { useEffect, useState } from 'react'
import axios from 'axios'



const App = () => {

  const [userData, setUserData] = useState([]);
const [index,setIndex]=useState(1);

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=12`)

    setUserData(response.data);
    
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className='text-lg text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      
      return <div key={idx}>
        <a href={elem.url} target='_blank' rel='noopener nooreferrer'>
        <div className='h-40 w-45 rounded-xl overflow-hidden'>

        <img className='h-full w-full object-cover' src={elem.download_url} alt="" />

      </div>
      <h2 className='font-bold '>{elem.author}</h2>
      </a>
      </div>

    })
  }




  return (
    <div className='bg-black overflow-auto h-screen text-white p-4'>
      
      <div className='flex h-[82%] flex-wrap p-2 gap-4'>
      {printUserData}
      </div>
      <div className='flex justify-center items-center gap-8 p-4'>
        <button style={{opacity:index==1? 0.5:1}} onClick={()=>{
          if(index>1){
            setIndex(index-1)
            setUserData([])
        }
        }} className='bg-amber-400 text-black rounded font-semibold px-4 py-2 text-sm cursor-pointer active:scale-95'>Prev</button>
<h3 className='font-bold'>{index}</h3>
        <button onClick={()=>{
          setUserData([])
          setIndex(index+1)
        }} className='bg-amber-400 text-black rounded font-semibold px-4 py-2 text-sm cursor-pointer active:scale-95'>Next</button>
      </div>

    </div>
  )
}

export default App
