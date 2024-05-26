import React from 'react'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function InputPass(props: {
     onChangeHandler?: (type: string, value: string) => void, defValue: string 
     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
     name: string;
    }) {
    const [show, setShow] = React.useState(false)

    function Show() {
        setShow(!show)
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (props.onChangeHandler) {
          props.onChangeHandler("password", e.target.value);
        }
        if(props.onChange){
            props.onChange(e)
          }
      }

    return (
        <div className='w-full h-fit text-start my-4'>
            <div className='relative w-full'>
                <div className='absolute right-4' onClick={Show} style={{top:'13.5px'}}>
                    {
                        show ? <AiFillEyeInvisible className='text-[#777E91] text-[20px] cursor-pointer' /> : <AiFillEye className='text-[#777E91] text-[20px] cursor-pointer' />
                    }
                </div>
                <input type={show?"text":"password"} defaultValue={props.defValue} name='password' onChange={(e) => onChange(e)} placeholder="Password" className="input w-full font-[900] text-[14px] text-black placeholder:font-[900] placeholder:text-[black] bg-white" style={{ borderColor: 'rgb(189, 189, 189)' }} />
            </div>
        </div>
    )
}