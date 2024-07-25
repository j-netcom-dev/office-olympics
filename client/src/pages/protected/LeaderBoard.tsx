const LeaderBoard = () => {
  return (
    <div className="w-[90%] mx-auto bg-white rounded-lg overflow-hidden">
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
  )
}

export default LeaderBoard;
