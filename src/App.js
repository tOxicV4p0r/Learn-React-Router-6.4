import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { BlogDetail, BlogDetailLoading, Home } from "./components/BlogsDetail";
import Root, { actionContact, loader as rootLoader } from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import Contact from "./components/Contact";

const router = createBrowserRouter(

  createRoutesFromElements(
    <>
      <Route
        path="/" element={<Root />}
        errorElement={<ErrorPage />}
        loader={rootLoader}
        action={actionContact}
      >
        {/* <Route path=":id" element={<BlogDetail />} loader={BlogDetailLoading} /> */}
        <Route path="contacts/:contactId" element={<Contact />} loader={rootLoader} />
      </Route >
    </>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;