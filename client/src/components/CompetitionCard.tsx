import { NavLink } from "react-router-dom"

const CompetitionCard = ({id, name}: {name: string, id: string}) => {
  return (
    <div className="shadow bg-white flex flex-col gap-8 h-max px-4 py-8 rounded-xl border">
      <h2 className="font-semibold text-xl">{name}</h2>
      <NavLink className={'block bg-blue-500 text-white text-center py-2 px-4 rounded'} to={`/participants/${id}`}>Open</NavLink>
    </div>
  )
}

export default CompetitionCard
