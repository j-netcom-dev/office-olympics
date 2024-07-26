import { useEffect } from "react"

const Competition = () => {
    useEffect(() =>{

    })
    return (
        <div className="px-8 flex flex-col gap-8 pb-8">
            <section className="flex h-[200px] w-full items-center justify-center bg-white rounded-md">
                <h2 className="uppercase font-bold text-2xl">Competition name</h2>
            </section>
            <section className="flex items-start justify-between gap-12 cursor-pointer">
                <div className="flex-1 flex gap-4 flex-col">
                    <h2 className="font-semibold uppercase">Add Participant(s)</h2>
                    <div className="flex flex-col gap-6">
                        <select multiple size={1} className="border block w-full px-4 py-2 bg-white rounded cursor-pointer">
                        </select>
                        <button className="block text-white w-1/2 transition bg-slate-700 disabled:bg-slate-300 rounded px-8 py-2 hover:bg-slate-900">Add</button>
                    </div>
                </div>
                <div className="flex-1 flex gap-4 flex-col">
                    <h2 className="font-semibold uppercase">Set winner</h2>
                    <div className="flex flex-col gap-6">
                        <select className="border block w-full px-4 py-2 bg-white rounded cursor-pointer">
                            <option value={''} selected disabled>Select competition winner</option>
                        </select>
                        <button className="block text-white w-1/2 transition bg-slate-700 disabled:bg-slate-300 rounded  py-2 hover:bg-slate-900">Set</button>
                    </div>
                </div>
            </section>
            <h2 className="text-xl uppercase font-bold pt-8">Participants</h2>
            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
            <tr className="text-white bg-blue-500">
                <th className="text-left py-4 ps-4">RNK</th>
                <th className="text-left py-4">Competitions</th>
                <th className="text-left py-4">First name</th>
                <th className="text-left py-4">Last name</th>
                <th className="text-left py-4">Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="text-left py-4 ps-4">1</td>
                <td className="text-left py-4">3</td>
                <td className="text-left py-4">Netcom</td>
                <td className="text-left py-4">Developer</td>
                <td className="text-left py-4">24</td>
            </tr>
            <tr>
                <td className="text-left py-4 ps-4">2</td>
                <td className="text-left py-4">4</td>
                <td className="text-left py-4">Sample</td>
                <td className="text-left py-4">User</td>
                <td className="text-left py-4">21</td>
            </tr>
            <tr>
                <td className="text-left py-4 ps-4">3</td>
                <td className="text-left py-4">5</td>
                <td className="text-left py-4">Developer</td>
                <td className="text-left py-4">Netcom</td>
                <td className="text-left py-4">18</td>
            </tr>
        </tbody>
      </table>
    </div>
        </div>
    )
}

export default Competition
