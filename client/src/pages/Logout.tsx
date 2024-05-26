import React from 'react'
import Loading from "../components/loader/Loading";

export default function Logout() {
  localStorage.removeItem('Token'); 
  localStorage.removeItem('user'); 
  window.location.href = '/sign-in';

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
    </>
  )
}
