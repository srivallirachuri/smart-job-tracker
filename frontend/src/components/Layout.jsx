import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}

export default Layout;
