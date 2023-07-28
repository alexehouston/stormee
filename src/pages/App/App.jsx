import TopBar from "../../components/TopBar/TopBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Forecast from "../../components/Forecast/Forecast";
import "./App.css";

export default function App() {
  return (
    <div className="container-fluid vh-100 p-4 m-0 text-white">
      <TopBar />
      <Sidebar />
      <Forecast />
    </div>
  );
}
