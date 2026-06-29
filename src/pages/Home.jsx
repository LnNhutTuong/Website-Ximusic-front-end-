import LibrarySidebar from "@/components/Home/LibrarySidebar";
import HomeContent from "@/components/Home/HomeContent";
import NowPlayingSidebar from "@/components/Home/NowPlayingSidebar";
const Home = (prop) => {
  return (
    <>
      <div className="flex gap-7 px-5 mt-5 h-full overflow-hidden">
        <LibrarySidebar />
        <HomeContent />
        <NowPlayingSidebar />
      </div>
    </>
  );
};

export default Home;
