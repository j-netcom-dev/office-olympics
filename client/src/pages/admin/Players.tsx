import { useEffect, useState } from "react";
import NOT_FOUND from '../../assets/nf.png'
import { Loader } from "../../components"
import { save, fetch } from "../../api/player-api";
import { PlayerDetails } from "../../utils/types";

const Players = () => {
  const [gender, setGender] =useState('');
  const [lastName, setLastName] =useState('');
  const [firstName, setFirstName] =useState('');
  const [isLoading, setIsLoading] =useState(false);
  const [nationality, setNationality] =useState('');
  const [serverMsg, setServerMsg] =useState<string>();
  const [players, setPlayers] =useState<any>([])

  const onSubmit =async () =>{
    setIsLoading(true)
    try {
        const {status, message, payload} =await save({first_name: firstName, last_name: lastName, gender, nationality});
        if (status ==201) {
          
            setPlayers([...players, payload])
            setServerMsg(`${firstName} ${lastName} registered successfully`)
            setFirstName('')
            setLastName('')
            setGender('');
            setNationality('')
            return
        }
        setServerMsg(message)
    } catch (error: any) {
      let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
      setServerMsg(message)
    }finally{
      setIsLoading(false);
    }
  }
  useEffect(() =>{
    (async() =>{
        try {
            const {message, payload, status} =await fetch();
            if(status !==200) return setServerMsg(message)
            setPlayers(payload)
            
        } catch (error: any) {
          let message =null;
            if(error.response) message =error.response.data.message
            else message =error?.message
          setServerMsg(message)
        }
    })();
  }, [])
  return (
    <div className="bg-zinc-100 min-h-[100svh] p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
            <h2 className="text-xl uppercase font-bold">New Athlete</h2>
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
                          <input type="radio" value='male' name="gender" onChange={e =>setGender(e.target.value)}/>
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
            <h2 className="text-xl uppercase font-bold pt-8">Registered Athletes</h2>
            <div className="w-full bg-white rounded-lg overflow-hidden">
             {players?.length? (<table className="w-full border-collapse">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th className="text-left py-4 ps-4">First name</th>
                        <th className="text-left py-4">Last name</th>
                        <th className="text-left py-4 ps-4">Gender</th>
                        <th className="text-left py-4">Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player:PlayerDetails) =>(
                      <tr>
                          <td className="text-left py-4 ps-4">{player?.first_name}</td>
                          <td className="text-left py-4">{player.last_name}</td>
                          <td className="text-left py-4">{player.gender}</td>
                          <td className="text-left py-4">{player.nationality}</td>
                      </tr>

                    ))}
                </tbody>
              </table>): (<div className="text-sm text-zinc-700 flex flex-col justify-center items-center">
            <img src={NOT_FOUND} alt="not found" className="block w-[400px]"/>
            No athletes registered yet
            </div>)}
            </div>
          
        </div>
        <small className="text-gray-600"><i>Powered by office olympics</i></small>
    </div>
  )
}

export default Players;
