import React from 'react'
import Loading from "../components/loader/Loading";

export default function  Home() {

  const [load ,setLoad] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {load && <Loading />}
    <div>
        <h1 className="font-black text-3xl text-start text-black">Home</h1>
    </div>
    </>
  )
}
