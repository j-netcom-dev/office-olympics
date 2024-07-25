import { useEffect, useState } from "react";
import NOT_FOUND from '../../assets/nf.png'
import { CompetitionCard, Loader } from "../../components"
import { add, fetch } from "../../api/competitions-api";

const Competitions = () => {
  const [isLoading, setIsLoading] =useState(false);
  const [competitionName, setCompetitionName] =useState<string>('');
  const [serverMsg, setServerMsg] =useState<string>();
  const [competitions, setCompetitions] =useState<any>([])
  const onSubmit =async () =>{
    setIsLoading(true)
    try {
        const {status, message, payload} =await add({name: competitionName});
        if (status ==201) {
            setCompetitions([...competitions, payload])
            setServerMsg(`${competitionName} registered successfully`)
            setCompetitionName('')
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
            const {message, payload, status} =(await fetch());
            if(status !==200) return setServerMsg(message)
            setCompetitions(payload)
            
        } catch (error: any) {
          let message =null;
            if(error.response) message =error.response.data.message
            else message =error?.message
          setServerMsg(message)
        }
    })();
  }, [])
  return (
    <div className=" bg-zinc-100 min-h-[100svh] p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
            <h2 className="text-xl uppercase font-bold">Add Competition</h2>
            <div className="flex w-[400px] flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#333]">Name</label>
                    <input className="border outline-none block px-4 py-2 rounded-md" value={competitionName} onChange={e =>setCompetitionName(e.target.value)} placeholder="Enter competition name" disabled ={isLoading}/>
                </div>
                <div>
          {isLoading?  <Loader />: <button onClick={onSubmit} disabled ={!competitionName} className="block text-white transition bg-blue-500 disabled:bg-blue-300 rounded px-4 py-2 hover:bg-blue-700">Add</button>}
        </div>
            </div>
            {serverMsg && <p className="rounded text-sm p-4 text-left w-[500px] bg-blue-100 text-blue-500">{serverMsg}</p>}
            <h2 className="text-xl uppercase font-bold pt-8">Competitions</h2>
        </div>
        {competitions.length?(<div className="grid grid-cols-4 gap-8">
            {competitions.map((data:any, index:any) =><CompetitionCard name={data?.name || ''} id={data?._id || ''} key={index}/>)}
        </div>): (<div className="text-sm text-zinc-700 flex flex-col justify-center items-center">
            <img src={NOT_FOUND} alt="not found" className="block w-[400px]"/>
            No competitions added yet
            </div>)}
        <small className="text-gray-600"><i>Powered by office olympics</i></small>
    </div>
  )
}

export default Competitions;
