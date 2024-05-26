import React from "react";
import CampaignCard from "../components/common/CampaignCard";
import Loading from "../components/loader/Loading";

export default function Feeds() {
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
        <h1 className="font-black text-3xl text-start text-black">Feeds</h1>
      </div>
      <div className=" flex flex-col md:flex-row">
        <CampaignCard
          title="Upwork"
          link="https://www.google.com"
          image="https://via.placeholder.com/300x200"
          imageAlt="Upwork"
          status="Connected"
        />
        <CampaignCard
          title="Fiverr"
          link="https://www.google.com"
          image="https://via.placeholder.com/300x200"
          imageAlt="Upwork"
          status="Disconnected"
        />
      </div>
    </>
  );
}
