import React from 'react'
import Loading from "../components/loader/Loading";

export default function Templates() {
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
    <div>Templates</div>
    </>
  )
}
