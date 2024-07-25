const Loader = ({message ='Please wait'}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="border-2 border-blue-500 border-l-transparent animate-spin w-[20px] h-[20px] rounded-full"></div>
      <p className="text-sm text-gray-500 animate-pulse">{message}</p>
    </div>
  )
}

export default Loader;
