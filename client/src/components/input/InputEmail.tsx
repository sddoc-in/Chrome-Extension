// import React from 'react'


export default function InputEmail(props: {
  onChangeHandler?: (type: string, value: string) => void;
  defValue: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onChangeHandler) {
      props.onChangeHandler("email", e.target.value);
    }
    if(props.onChange){
      props.onChange(e)
    }
  }

  return (
    <div className="text-start my-4">
      <input
        type="email"
        name={props.name}
        defaultValue={props.defValue}
        placeholder={`Enter Email`}
        onChange={(e) => onChange(e)}
        className="input w-full text-[14px] text-black font-[900] placeholder:font-[900] placeholder:text-[black] bg-white"
        style={{ borderColor: 'rgb(189, 189, 189)' }}
      />
    </div>
  );
}
