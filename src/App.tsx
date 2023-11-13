import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterLinks } from "./types/routerLinks.ts";

import MainAdminPage from "./pages/MainAdminPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ItemsPage from "./pages/adminPages/ItemsPage.tsx";
import OrdersPage from "./pages/adminPages/OrdersPage.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: RouterLinks.EMPTY_PATH,
    Component: MainAdminPage,
    children: [
      {
        path: RouterLinks.ITEMS_PATH,
        Component: ItemsPage,
      },
      {
        path: RouterLinks.ORDERS_PATH,
        Component: OrdersPage,
      },
    ],
  },
  {
    path: RouterLinks.SIGN_IN_PATH,
    Component: SignInPage,
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  );
}
