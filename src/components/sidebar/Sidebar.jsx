import EditorsPic from "./EditorsPic";
import SidebarCategories from "./SidebarCategories";
import TrendingPosts from "./TrendingPosts";

const Sidebar = ({ categories }) => {
  return (
    <div className="ring-1 ring-zinc-800 p-4 text-white">
      <TrendingPosts />
      <SidebarCategories categories={categories} />
      <EditorsPic />
    </div>
  );
};

export default Sidebar;
