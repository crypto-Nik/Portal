import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "./pages/Details";
import Shell from "./layout/Shell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
  },
  {
    path: "/jobs/:id",
    element: <Details />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
