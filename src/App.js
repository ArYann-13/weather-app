import Weather from "./components/Weather";


function App() {
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-700 px-4">
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-2xl shadow-gray-900/50">
      <Weather />
      
    </div>
  </div>
  );
}

export default App;
