import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/Header";

export const Layout = () => {
    return(
        <div>
            <Header />
               
                <main>

                    <Outlet />

                </main>

              <footer>

                    <p>© 2025 </p>

              </footer>

        </div>

    )
}