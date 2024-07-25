const LeaderBoard = () => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
            <tr>
                <th>RNK</th>
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>N. Developer</td>
                <td>24</td>
            </tr>
            <tr>
                <td>2</td>
                <td>S. User</td>
                <td>21</td>
            </tr>
            <tr>
                <td>3</td>
                <td>D. Netcom</td>
                <td>18</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard;
