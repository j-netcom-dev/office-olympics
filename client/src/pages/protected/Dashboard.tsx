import { useEffect, useState } from "react";
import  { fetch } from '../../api/competitions-api'
import { PlayerDetails } from "../../utils/types";
import { predict } from "../../api/predictions-api";
import { read_from_storage } from "../../storage";
import { useNavigate } from "react-router-dom";
import { Loader, SelectField } from "../../components";

const Dashboard = () => {
  const navigate =useNavigate();
  const [serverMsg, setServerMsg] =useState('');
  const [isLoading, setIsLoading] =useState(false);
  const [currentUser, setCurrentUser] =useState<any>(null)
  const [competitions, setCompetitions] =useState<any>([]);
  const [resetCompetion, setResetCompetition] =useState(false);
  const [selectedPlayer, setSelectedPlayer] =useState<any>(null);
  const [resetSelectedPlayer, setResetSelectedPlayer] =useState(false);
  const [selectedCompetition, setSelectedCompetition] =useState<any>(null);


  const selectCompetition =(id:string) =>{
    const result =competitions.find((competition:any) =>competition?._id ===id);
    if(result) setSelectedCompetition(result);
  }
  const onPredict =async () =>{
    setIsLoading(true)
    try {
      
        const {status, message} =await predict({user: currentUser, winner: selectedPlayer, competition: selectedCompetition?._id});
        if (status ==201) {
            setServerMsg(`Prediction recorded successfully`);
            setResetCompetition(true);
            setResetSelectedPlayer(true)
            return
        }
        setServerMsg(message || '')
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
    const {userid} =read_from_storage('user');
    if(!userid){ navigate('/register', {replace: true});}
    setCurrentUser(userid);
    (async() =>{
        try {
            const {message, payload, status} =(await fetch());
            if(status !==200) return console.log(message);
            
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
    <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-8">
      <section className="flex flex-col gap-8">
        <h3 className="font-semibold text-xl uppercase">Join the competition</h3>
        {serverMsg && <p className="flex-1 rounded text-sm p-4 text-left lg:w-[500px] bg-blue-200 text-blue-600">{serverMsg}</p>}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333]">Select competition</label>
            <SelectField reset ={resetCompetion} placeholder="select an option" onChange={selectCompetition} data={competitions.map((competition: any) =>({value: competition._id, label: competition.name}))} />
            
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333]">Predict winner</label>
            <SelectField reset ={resetSelectedPlayer} placeholder="select an option"  onChange={setSelectedPlayer} data={selectedCompetition?.participants?.map((participant:PlayerDetails) =>({value: participant._id, label: `${participant.first_name} ${participant.last_name} - ${participant.nationality}`}))} />
          </div>
          <div className="flex flex-col gap-2">
            {isLoading? <Loader />:<button onClick={onPredict} disabled ={!selectedPlayer} className="block text-white transition bg-blue-500 disabled:bg-blue-300 rounded  w-1/2 px-4 py-2 hover:bg-blue-700">Predict</button>}
          </div>
      </section>
    </div>
  )
}

export default Dashboard
