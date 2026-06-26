import Footer from "@/components/Home/Footer";

const NowPlayingSidebar = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-86 h-[calc(100%-226px)] bg-white/20 rounded-xl  overflow-hidden">
        Now playing
      </div>
      <Footer />
    </div>
  );
};

export default NowPlayingSidebar;
