import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
const SidebarAdmin = () => {
  return (
    <div className="bg-white/20 rounded-xl">
      <Sidebar
        rootStyles={{
          backgroundColor: "transparent",
          border: "none",
          height: "100%",
          overflow: "hidden",
          "& .ps-sidebar-container": {
            backgroundColor: "transparent !important",
            display: "flex !important",
            flexDirection: "column !important",
            height: "100% !important",
          },
        }}
      >
        <div className="flex flex-col h-full overflow-hidden w-full text-white">
          {/* header: co lap, open, create new*/}
          <div className="shrink-0">
            <Menu
              menuItemStyles={{
                button: {
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  },
                },
              }}
              rootStyles={{ border: "none" }}
            >
              <div className="flex items-center justify-between p-4 text-white">
                <div
                  style={{ fontWeight: 700, fontSize: 18 }}
                  className="w-full"
                >
                  <div className="w-full flex items-center justify-between px-1 border-b">
                    <p>XimenT</p>
                  </div>
                </div>
              </div>
            </Menu>
          </div>

          <div className="flex-1 overflow-y-auto mt-4">
            <Menu
              menuItemStyles={{
                button: {
                  backgroundColor: "transparent",
                  borderRadius: "12px",
                  margin: "4px 12px",
                  padding: "0 16px",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    color: "#ffffff !important",
                  },
                },
              }}
            >
              <MenuItem
                component={<NavLink to="/admin" end />}
                className="font-medium"
                rootStyles={{
                  "& .ps-active": {
                    backgroundColor: "rgba(255, 255, 255, 0.2) !important",
                    color: "#ffffff !important",
                    fontWeight: "600",
                  },
                }}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                component={<NavLink to="/admin/users" />}
                className="font-medium"
                rootStyles={{
                  "& .ps-active": {
                    backgroundColor: "rgba(255, 255, 255, 0.2) !important",
                    color: "#ffffff !important",
                    fontWeight: "600",
                  },
                }}
              >
                Manager Users
              </MenuItem>

              <MenuItem
                component={<NavLink to="/admin/project" />}
                className="font-medium"
                rootStyles={{
                  "& .ps-active": {
                    backgroundColor: "rgba(255, 255, 255, 0.2) !important",
                    color: "#ffffff !important",
                    fontWeight: "600",
                  },
                }}
              >
                Manager Music
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarAdmin;
