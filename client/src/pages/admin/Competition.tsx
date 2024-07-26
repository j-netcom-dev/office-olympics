import { Loader, SelectField } from "../../components";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { fetch } from "../../api/player-api";
import NOT_FOUND from '../../assets/nf.png'
import { PlayerDetails } from "../../utils/types";
import { addParticipant, get, updateWinner } from "../../api/competitions-api";

const Competition = () => {
    const params =useParams();
    const [competition, setCompetition] =useState<any>({});
    const [serverMsg, setServerMsg] = useState<string>('');
    const [participants, setParticipants] =useState<any>([]);
    const [newParticipants, setNewParticipants] =useState<string[]>([]);
    const [addingParticipant, setAddingParticipant] =useState(false);
    const [winner, setWinner] =useState<string>('');
    const [addingWinner, setAddingWinner] =useState(false);
    const [resetWinner, setResetWinner] =useState(false);
    const [resetPartcipants, setResetParticipants] =useState(false);
    useEffect(() =>{
        (async () =>{
            try {
                const {status, payload, message} =await get(params?.id || '')
                if(status !==200){
                    console.log(message);
                    return
                }
                
                setCompetition(payload)
                
            } catch (error:any) {
                let message =null;
                if(error.response) message =error.response.data.message
                else message =error?.message
                console.log(message);
                
                
            }
        })();

        (async () =>{
            try {
                const {status, payload} =await fetch()
                if(status ===200) setParticipants(payload)
                
                
                
            } catch (error:any) {
                
            }
        })();
    }, [])
    const updateParticipants =async ()=>{
        setAddingParticipant(true)
        try {
            for(let newParticipant of newParticipants){
                const {status, message} =await addParticipant(params?.id || '', newParticipant)
                if(status !==200) setServerMsg(message || 'An error occureed');
            }
            
            setServerMsg(`${newParticipants.length} Participant(s) added successfully`)
            setResetParticipants(true)
            
        } catch (error:any) {
            let message =null;
            if(error.response) message =error.response.data.message
            else message =error?.message;
            setServerMsg(message)
            
        }finally{
            setAddingParticipant(false)
        }
    }
    const declareWinner =async () =>{
        setAddingWinner(true)
        try {
            const {status, message} =await updateWinner(params?.id || '', winner)
            if(status !==200){
                setServerMsg(message || 'An error occureed');
                return
            }
            
            setServerMsg(`Winner set successfully`)
            setResetWinner(true)
            
        } catch (error:any) {
            let message =null;
            if(error.response) message =error.response.data.message
            else message =error?.message;
            setServerMsg(message)
            
        }finally{
            setAddingWinner(false)
        }
    }

    return (
        <div className="px-8 flex flex-col gap-8 pb-8">
            <section className="flex h-[200px] w-full items-center justify-center bg-white rounded-md">
                <div>
                    <h2 className="uppercase text-center font-bold text-2xl">{competition?.name || 'Competition'}</h2>
                    {competition?.winner && <h3 className="text-center uppercase text-xl font-semibold">Winner: {competition?.winner.first_name} {competition?.winner.last_name}</h3>}
                </div>
            </section>
            <section className="flex items-start justify-between gap-12 cursor-pointer relative">
                <div className="flex-1 flex gap-4 flex-col">
                    <h2 className="font-semibold uppercase">Add a Participant</h2>
                    <div className="flex flex-col gap-6">
                        <SelectField reset ={resetPartcipants} disabled ={competition?.winner} multiple onChange={setNewParticipants} placeholder="Select participants" itemsName="participants" data={[...participants.map((participant:PlayerDetails) =>({value: participant._id, label: `${participant.first_name} ${participant.last_name} - ${participant.nationality}`}))]}/>
                        {addingParticipant? <Loader /> :(<button onClick={updateParticipants} disabled ={!newParticipants.length || competition?.winner} className="block text-white w-1/2 transition bg-slate-700 disabled:bg-slate-300 rounded px-8 py-2 hover:bg-slate-900">Add</button>)}
                    </div>
                </div>
                <div className="flex-1 flex gap-4 flex-col">
                    <h2 className="font-semibold uppercase">Set winner</h2>
                    <div className="flex flex-col gap-6">
                    <SelectField reset ={resetWinner} onChange={setWinner} disabled ={competition?.winner} placeholder="Select competition winner" data={competition.participants?[...competition.participants?.map((participant:PlayerDetails) =>({value: participant._id, label: `${participant.first_name} ${participant.last_name} - ${participant.nationality}`}))]: []}/>
                        {addingWinner? <Loader /> :(<button onClick={declareWinner} disabled ={!winner || competition?.winner} className="block text-white w-1/2 transition bg-slate-700 disabled:bg-slate-300 rounded px-8 py-2 hover:bg-slate-900">Save</button>)}
                      
                    </div>
                </div>
                {serverMsg && <p className="rounded -bottom-[42%] left-0 right-0 absolute text-sm px-4 py-3 text-left w-[500px] bg-blue-100 text-blue-500">{serverMsg}</p>}
            </section>
            <h2 className="text-xl uppercase font-bold pt-8">Participants</h2>
            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
            {competition?.participants?.length? (<table className="w-full border-collapse">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th className="text-left py-4 ps-4">First name</th>
                        <th className="text-left py-4">Last name</th>
                        <th className="text-left py-4 ps-4">Gender</th>
                        <th className="text-left py-4">Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    {competition?.participants?.map((player:PlayerDetails, index:number) =>(
                      <tr key={index}>
                          <td className="text-left py-4 ps-4">{player?.first_name}</td>
                          <td className="text-left py-4">{player.last_name}</td>
                          <td className="text-left py-4">{player.gender}</td>
                          <td className="text-left py-4">{player.nationality}</td>
                      </tr>

                    ))}
                </tbody>
              </table>): (<div className="text-sm text-zinc-700 flex flex-col justify-center items-center pb-4">
            <img src={NOT_FOUND} alt="not found" className="block w-[400px]"/>
            No athletes registered yet
            </div>)}
    </div>
        </div>
    )
}

export default Competition
