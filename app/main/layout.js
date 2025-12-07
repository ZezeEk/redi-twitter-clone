import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default function MainLayout({ children }) {
  return (
    <main className="flex justify-center bg-white text-black min-h-screen px-4 sm:px-8 lg:px-16">
      <section className="hidden sm:flex flex-col items-end p-2 xl:items-start xl:w-20 border-r border-gray-200">
              <Sidebar />
            </section>


            <section className="grow max-w-2xl border-r border-gray-200 p-4 space-y-4">
              {children}
            </section>


            <section className="hidden lg:flex flex-col items-start p-2 space-y-4 w-[350px]">
              <Widgets />
            </section>
    </main>
  );
}