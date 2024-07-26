import { useEffect, useState } from "react";
import { getLeaderBoard } from "../../api/predictions-api";
import { LeaderDetails } from "../../utils/types";

const LeaderBoard = () => {
  const [leaders, setLeaders] =useState<LeaderDetails[]>([])
  useEffect(() =>{
    (async() =>{
        try {
          const {status, payload, message} =await getLeaderBoard()
            if(status !==200) return console.log(message);
            setLeaders(payload!)

        } catch (error: any) {
          let message =null;
            if(error.response) message =error.response.data.message
            else message =error?.message
          console.log(message);
        }
    })();
  }, []);
  return (
    <div className="w-[90%] mx-auto bg-white rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
            <tr className="text-white bg-blue-500">
                <th className="text-left py-4 ps-4">RNK</th>
                <th className="text-left py-4">First name</th>
                <th className="text-left py-4">Last name</th>
                <th className="text-left py-4">Competitions</th>
                <th className="text-left py-4">Points</th>
            </tr>
        </thead>
        <tbody>
          {leaders.map(({first_name, last_name, competitions, points}, index:number) =>(
            <tr key={index}>
              <td className="text-left py-4 ps-4">{index+1}</td>
              <td className="text-left py-4">{first_name}</td>
              <td className="text-left py-4">{last_name}</td>
              <td className="text-left py-4">{competitions}</td>
              <td className="text-left py-4">{points}</td>
        </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard;
