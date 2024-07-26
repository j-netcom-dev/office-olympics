import { useEffect, useState } from "react";
import  { fetch } from '../../api/competitions-api'
import { PlayerDetails } from "../../utils/types";

const Dashboard = () => {
  const [competitions, setCompetitions] =useState<any>([]);
  const [selectedCompetition, setSelectedCompetition] =useState<any>();

  const selectCompetition =(id:string) =>{
    const result =competitions.find((competition:any) =>competition?._id ===id);
    if(result) setSelectedCompetition(result);
  }

  useEffect(() =>{
    (async() =>{
        try {
            const {message, payload, status} =(await fetch());
            if(status !==200) return console.log(message);
            console.log(payload);
            
            setCompetitions(payload?.filter((competition:any) =>!competition?.winner && competition.participants.length))
            
        } catch (error: any) {
          let message =null;
            if(error.response) message =error.response.data.message
            else message =error?.message
          console.log(message);
        }
    })();
  }, []);
  return (
    <div className="grid grid-cols-2 px-8">

      <section className="flex flex-col gap-8">
        <h3 className="font-semibold text-xl uppercase">Join the competition</h3>
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333]">Select competition</label>
            <select className="border outline-none block px-4 py-2 rounded-md cursor-pointer bg-white" onChange={e =>selectCompetition(e.target.value)}>
              <option value={''} >Select option</option>
              {competitions.map((competition:any, index:number) =>(<option key={index} value={competition?._id}>{competition.name}</option>))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333]">Predict winner</label>
            <select className="border outline-none block px-4 py-2 rounded-md cursor-pointer bg-white">
              <option value={''} >Select option</option>
              {selectedCompetition?.participants?.map((participant:PlayerDetails, index:number) =>(<option key={index} value={participant._id}>{participant.first_name} {participant.last_name} - {participant.nationality}</option>))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
          <button className="block text-white transition bg-blue-500 disabled:bg-blue-300 rounded  w-1/2 px-4 py-2 hover:bg-blue-700">Predict</button>
          </div>
      </section>
    </div>
  )
}

export default Dashboard
