import { BiLoader } from "react-icons/bi";

export const LoaderSm = () => {
  return (
    <div className="flex items-center justify-center">
      <BiLoader size={80} className="animate-spin" />
    </div>
  );
};

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <BiLoader size={80} className="animate-spin" />
    </div>
  );
};

export default Loader;
