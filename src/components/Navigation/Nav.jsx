import { NavLink } from "react-router-dom"

const Nav = (props) => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="flex items-center justify-between">
            
                <h1 className="text-xl font-bold">
                    MyApp
                </h1>

                <ul className="flex gap-6">
                    <li>
                        <NavLink to="/" end className={({ isActive}) => isActive ? "text-blue-500" : "text-gray-300 hover:text-gray-300"}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" className={({ isActive}) => isActive ? "text-blue-500" : "text-gray-300 hover:text-gray-300"}>
                            About
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" className={({ isActive}) => isActive ? "text-blue-500" : "text-gray-300 hover:text-gray-300"}>
                            Contact
                        </NavLink>
                    </li>

                     <li>
                        <NavLink to="/login" className={({ isActive}) => isActive ? "text-blue-500" : "text-gray-300 hover:text-gray-300"}>
                            Login
                        </NavLink>
                    </li>

                     <li>
                        <NavLink to="/register" className={({ isActive}) => isActive ? "text-blue-500" : "text-gray-300 hover:text-gray-300"}>
                            Register
                        </NavLink>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default Nav