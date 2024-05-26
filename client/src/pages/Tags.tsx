import React, { useState, useEffect, useCallback } from "react";
import Loading from "../components/loader/Loading";

type Record = {
  id: string;
  image: string;
  account: string;
  followers: number;
  following: number;
  tags: string;
  action: string;
};

const Tags: React.FC = () => {
  const [load, setLoad] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRecord, setEditedRecord] = useState<Partial<Record>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const uniqueRecords = generateUniqueRecords();
      setRecords(uniqueRecords);
      setFilteredRecords(uniqueRecords);
      setLoad(false);
    };

    fetchData();
  }, []);

  const generateUniqueRecords = () => {
    const initialRecords: Record[] = [];

    const accountNames = ["Sachin", "Deepak", "Rahman", "Yash", "Vinay"];
    const photos = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];

    for (let i = 1; i <= 22; i++) {
      const id = i.toString();
      const account = accountNames[Math.floor(Math.random() * accountNames.length)];
      const image = photos[Math.floor(Math.random() * photos.length)];
      const followers = Math.floor(Math.random() * 5000) + 1000; 
      const following = Math.floor(Math.random() * 500) + 100; 
            const tags = "tag" + Math.floor(Math.random() * 10); 
      initialRecords.push({
        id,
        image,
        account,
        followers,
        following,
        tags,
        action: " Delete ",
      });
    }

    return initialRecords;
  };

  const handleDelete = (index: number) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords.filter(record => record.account.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedRecord(records[index]);
  };

  const handleSave = (index: number) => {
    const newRecords = records.map((record, i) =>
      i === index ? { ...editedRecord, id: record.id } as Record : record
    );
    setRecords(newRecords);
    setFilteredRecords(newRecords.filter(record => record.account.toLowerCase().includes(searchQuery.toLowerCase())));
    setEditIndex(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Record) => {
    setEditedRecord({
      ...editedRecord,
      [field]: e.target.value,
    });
  };

  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = useCallback(
    debounce((query: string) => {
      const filtered = records.filter(record => record.account.toLowerCase().includes(query.toLowerCase()));
      setFilteredRecords(filtered);
    }, 300),
    [records]
  );

  return (
    <>
      {load && <Loading />}
      <div className="">
        <div className="text-center mt-4 md:mt-0 w-[95%] mx-auto">
          <h1 className="font-black text-3xl text-start text-black">Tags</h1>
        </div>

        <div className="flex justify-between flex-wrap-reverse text-center my-6 text-black">
          <div className="flex justify-between w-full text-sm lg:text-lg lg:mt-6 lg:w-full">
            <div className="mx-2 text-center w-[20%]"><b>Account name</b></div>
            <div className="mx-2 text-center w-[20%]"><b>Followers count</b></div>
            <div className="mx-2 text-center w-[20%]"><b>Following</b></div>
            <div className="mx-2 text-center w-[20%]"><b>Tags</b></div>
            <div className="mx-2 text-center w-[20%]"><b>Action</b></div>
          </div>
          <div className="my-6 cursor-pointer w-full relative">
            <input
              className="py-2 font-bold pl-10 pr-4 w-full lg:w-80 bg-white rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002f53]"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="">
          {filteredRecords && filteredRecords.map((record, index) => (
            <div key={record.id} className="flex justify-between items-center my-4 bg-slate-100 rounded-xl lg:p-4 py-3 px-2 text-black font-black">
              <div className="flex items-center w-[20%]">
                <img className="w-7 h-7 lg:w-10 lg:h-10 rounded-full mr-2" src={record.image} alt="logo" />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedRecord.account || ""}
                    onChange={(e) => handleChange(e, "account")}
                    className="w-[97%] bg-white text-black border text-center"
                  />
                ) : (
                  record.account
                )}
              </div>
              <div className="w-[20%] text-center">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={editedRecord.followers || ""}
                    onChange={(e) => handleChange(e, "followers")}
                    className="w-[97%] bg-white text-black border text-center"
                  />
                ) : (
                  record.followers
                )}
              </div>
              <div className="w-[20%] text-center">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={editedRecord.following || ""}
                    onChange={(e) => handleChange(e, "following")}
                    className="w-[97%] bg-white text-black border text-center"
                  />
                ) : (
                  record.following
                )}
              </div>
              <div className="w-[20%] text-center">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedRecord.tags || ""}
                    onChange={(e) => handleChange(e, "tags")}
                    className="w-[97%] bg-white text-black border text-center"
                  />
                ) : (
                  record.tags
                )}
              </div>
              <div className="w-[20%] flex justify-center">
                {editIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-[#002f53] text-white px-2 lg:px-3 py-1 rounded-3xl font-bold text-sm lg:text-lg mr-2"
                    type="button"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-[#002f53] text-white px-2 lg:px-3 py-1 rounded-3xl font-bold text-sm lg:text-lg mr-2"
                      type="button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => { handleDelete(index); alert(`Deleting data for account: ${record.account}`); }}
                      className="bg-white text-[#002f53] border border-[#002f53] px-2 lg:px-3 py-1 rounded-3xl font-bold text-sm lg:text-lg"
                      type="button"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tags;
