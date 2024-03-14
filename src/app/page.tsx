import NavBar from "@/components/Navbar";
import HomeComponent from "@/components/main/HomeComponent";
export default function Home() {
  return (
    <main>
      <div className="flex max-h-screen">
        <div className="w-1/4">
          <NavBar />
        </div>
        <div className="bg-black w-3/4">
          <HomeComponent />
        </div>
      </div>
    </main>
  );
}
