import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <BiLoader size={100} className="animate-spin" />
    </div>
  );
};

export default Loader;
