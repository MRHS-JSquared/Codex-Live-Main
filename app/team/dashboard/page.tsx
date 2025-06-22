// import { useTeam } from "@/lib/TeamContext";
// import { useAuth } from "@/lib/AuthContext";
// import Navbar from "@/components/ui/navbar";
// import { Button } from "@/components/ui/button";
// import { Copy } from "lucide-react";
// import { useState } from "react";

// export default function TeamDashboard() {
//   const { user } = useAuth();
//   const { team } = useTeam();
//   const [copied, setCopied] = useState(false);

//   if (!user || !team) return null;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(team.code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <main className="bg-black text-white min-h-screen">
//       <Navbar />

//       <section className="max-w-5xl mx-auto px-4 py-12">
//         <h1 className="text-3xl font-bold mb-2">Team Dashboard</h1>
//         <p className="text-zinc-400 mb-6">
//           Manage your team and track progress
//         </p>

//         <div className="bg-green-900 text-green-200 px-4 py-2 rounded mb-6">
//           Team created successfully! Team code: <span className="font-semibold">{team.code}</span>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Left Panel */}
//           <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
//             <h2 className="text-2xl font-semibold mb-1">{team.name}</h2>
//             <span className="text-xs bg-zinc-700 text-white px-3 py-1 rounded-full inline-block mb-4">
//               {team.difficulty === "beginner" ? "Beginner Division" : "Advanced Division"}
//             </span>

//             <div className="mb-4">
//               <p className="text-zinc-400 text-sm mb-1">Team Code</p>
//               <div className="flex items-center bg-zinc-800 p-3 rounded justify-between">
//                 <span className="text-lg tracking-widest font-mono">{team.code}</span>
//                 <button
//                   onClick={handleCopy}
//                   className="flex items-center gap-1 text-blue-400 hover:text-white text-sm"
//                 >
//                   <Copy className="w-4 h-4" />
//                   {copied ? "Copied!" : "Copy"}
//                 </button>
//               </div>
//             </div>

//             <p className="text-xl font-semibold mt-6">0 <span className="text-sm font-normal text-zinc-400">Total Points</span></p>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//             <div className="space-y-4">
//               <Button className="w-full bg-blue-600 hover:bg-blue-700">&lt;/&gt; Solve Problems</Button>
//               <Button className="w-full bg-purple-600 hover:bg-purple-700">🏆 Submit Hackathon</Button>
//               <Button className="w-full bg-yellow-600 hover:bg-yellow-700">👑 View Leaderboard</Button>
//             </div>
//           </div>
//         </div>

//         {/* Team Members */}
//         <div className="bg-zinc-900 p-6 rounded-xl shadow-lg mt-8">
//           <h2 className="text-xl font-semibold mb-4">👥 Team Members (1)</h2>
//           <ul className="list-disc pl-6 text-sm text-zinc-300">
//             <li>{user.username} (You)</li>
//             {/* Later: Map over other members if team.users or similar is implemented */}
//           </ul>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Navbar from "@/components/ui/navbar";
import { motion } from "framer-motion";

export default function TeamDashboard() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            Team Dashboard
          </h1>
          <p className="text-zinc-400 text-lg">Coming Soon...</p>
        </motion.div>
      </section>
    </main>
  );
}
