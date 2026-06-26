import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaPlus,
  FaExpandAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuListMusic } from "react-icons/lu";

const LibrarySidebar = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const handleScroll = (direction) => {
    const container = document.getElementById("category-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -150 : 150;

      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="w-fit h-[calc(100%-30px)] bg-white/10 rounded-xl overflow-hidden transition-all duration-300">
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          backgroundColor: "transparent",
          border: "none",
          "& .ps-sidebar-container": {
            backgroundColor: "transparent !important",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: "transparent",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1) !important",
              },
            },
            subMenuContent: {
              backgroundColor: "transparent",
            },
          }}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <button
              className="cursor-pointer p-1 hover:bg-slate-500/50 rounded text-white h-full"
              onClick={() => setCollapsed((c) => !c)}
            >
              <LuListMusic size={44} />
            </button>
            <div style={{ fontWeight: 700, fontSize: 18 }} className="w-full">
              {collapsed ? (
                ""
              ) : (
                <>
                  <div className="w-full flex items-center justify-between w-full px-1">
                    <span>Your library</span>
                    <div className="flex gap-1">
                      <button className=" p-2 rounded-2xl bg-white/20 text-white/60 hover:text-white">
                        <FaPlus />
                        {/* <IoClose /> */}
                      </button>
                      <button className=" p-2 rounded-2xl  text-white/60 hover:text-white hover:bg-white/20">
                        <FaExpandAlt />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {!collapsed && (
            <div className="relative group px-4 text-white my-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaChevronLeft size={12} />
              </button>

              <div
                id="category-scroll-container"
                className="overflow-x-auto scrollbar-none scroll-smooth  w-full"
              >
                <div className="flex gap-2 w-max pb-1 text-sm">
                  {[
                    "Playlist",
                    "Albums",
                    "PodCasts",
                    "Artists",
                    "Downloaded",
                  ].map((item) => (
                    <button
                      key={item}
                      className="border border-white/40 hover:border-white rounded-xl px-3 py-1 bg-white/5 whitespace-nowrap"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleScroll("right")}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}
          {!collapsed && (
            <>
              <div className="flex gap-3">
                {/* search bar */}
                <div className="w-full flex-1">
                  <label
                    for="search"
                    class="block mb-2.5 text-sm font-medium text-heading sr-only "
                  >
                    Search
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-body"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="search"
                      class="block w-full p-3 ps-9 bg-neutral-secondary-medium bg-white/30 rounded-xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                      placeholder="Search"
                      required
                    />
                    <button
                      type="button"
                      class="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* filter */}
                <div className="">filter</div>
              </div>
            </>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default LibrarySidebar;
