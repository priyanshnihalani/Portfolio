// src/components/MissionLog.jsx
function MissionLog() {
    const missions = [
      {
        icon: "🚀",
        title: "Launched College",
        year: "2022",
        desc: "Started my Computer Science journey, diving into tech and creativity.",
      },
      {
        icon: "🛠️",
        title: "First Project Deployed",
        year: "2023",
        desc: "Built 'Apna Bazar' using React & Firebase, an e-commerce prototype.",
      },
      {
        icon: "🌐",
        title: "Exploring Web Technologies",
        year: "2024",
        desc: "Worked with REST APIs, MERN stack, and real-time apps.",
      },
      {
        icon: "🪐",
        title: "Mastering 3D Web",
        year: "2025",
        desc: "Building immersive experiences using Three.js and WebGL.",
      },
    ];
  
    return (
      <section className="min-h-screen text-white px-6 md:px-24 py-20 bg-black/90 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-orbitron text-yellow-400 drop-shadow-glow">
          Mission Log
        </h2>
        <div className="relative border-l border-yellow-500 pl-6 space-y-10">
          {missions.map((mission, index) => (
            <div key={index} className="relative group">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-yellow-400 shadow-yellow-400 shadow-md animate-pulse">
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-semibold">
                  {mission.icon}
                </span>
              </div>
              <div className="ml-2">
                <h3 className="text-xl font-semibold text-yellow-300">
                  {mission.title} <span className="text-white">({mission.year})</span>
                </h3>
                <p className="text-gray-300 mt-1">{mission.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default MissionLog;
  