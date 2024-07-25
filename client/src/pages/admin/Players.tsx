import { useEffect, useState } from "react";
import NOT_FOUND from '../../assets/nf.png'
import { Loader } from "../../components"

const Players = () => {
  const [gender, setGender] =useState('');
  const [lastName, setLastName] =useState('');
  const [firstName, setFirstName] =useState('');
  const [isLoading, setIsLoading] =useState(false);
  const [nationality, setNationality] =useState('');
  const [serverMsg, setServerMsg] =useState<string>();

  const onSubmit =async () =>{

  }
  return (
    <div className="bg-zinc-100 min-h-[100svh] p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
            <h2 className="text-xl uppercase font-bold">New Player</h2>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-8 w-[600px]">
                  <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333]">First name</label>
                      <input className="border outline-none block px-4 py-2 rounded-md" value={firstName} onChange={e =>setFirstName(e.target.value)} placeholder="Enter first name" disabled ={isLoading}/>
                  </div>
                  <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333]">Last name</label>
                      <input className="border outline-none block px-4 py-2 rounded-md" value={lastName} onChange={e =>setLastName(e.target.value)} placeholder="Enter last name" disabled ={isLoading}/>
                  </div>
                  <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333]">Nationality</label>
                      <input className="border outline-none block px-4 py-2 rounded-md" value={nationality} onChange={e =>setNationality(e.target.value)} placeholder="Enter player nationality" disabled ={isLoading}/>
                  </div>
                  <div className="flex flex-col gap-4">
                      <label className="text-sm font-medium text-[#333]">Gender</label>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <label>Male</label>
                          <input type="radio" value='female' name="gender" onChange={e =>setGender(e.target.value)}/>
                        </div>
                        <div className="flex items-center gap-4">
                          <label>Female</label>
                          <input type="radio" value='female' name="gender" onChange={e =>setGender(e.target.value)}/>
                        </div>
                        <div className="flex items-center gap-4">
                          <label>Other</label>
                          <input type="radio" value='other' name="gender" onChange={e =>setGender(e.target.value)}/>
                        </div>
                      </div>
                      
                </div>
                </div>
                <div>
          {isLoading?  <Loader />: <button onClick={onSubmit} disabled ={!(firstName && lastName && gender && nationality)} className="block text-white transition bg-blue-500 disabled:bg-blue-300 rounded px-4 py-2 hover:bg-blue-700">Save</button>}
        </div>
            </div>
            {serverMsg && <p className="rounded text-sm p-4 text-left w-[500px] bg-blue-100 text-blue-500">{serverMsg}</p>}
            <h2 className="text-xl uppercase font-bold pt-8">Players</h2>
        </div>
    </div>
  )
}

export default Players;
