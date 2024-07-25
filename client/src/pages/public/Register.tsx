const Register = () => {
  return (
    <div className="h-[100svh] flex justify-center items-center bg-slate-100">
      <form className="shadow-md p-8 rounded-md bg-white flex flex-col gap-4 w-[500px]">
        <h2 className="text-xl font-semibold uppercase">Creat account</h2>
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333]">First name</label>
            <input className="border outline-none block px-4 py-2 rounded-md" placeholder="Enter first name"/>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#333]">Last name</label>
            <input className="border outline-none block px-4 py-2 rounded-md" placeholder="Enter last name"/>
        </div>
        <div>
            <button className="block text-white bg-blue-500 rounded px-4 py-2">Register</button>
        </div>
        <small className="text-gray-600"><i>Powered by office olympics</i></small>
      </form>
    </div>
  )
}

export default Register;
