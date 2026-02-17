import React, { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

/* --- 3D Crystal/Algorithm Background --- */
function Crystal({ position, color }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color={color} wireframe opacity={0.6} transparent />
      </mesh>
    </Float>
  )
}

function CrystalField() {
  const crystals = useMemo(() => [
    { pos: [-4, 2, -8], color: '#aa44ff' },
    { pos: [4, -1, -6], color: '#ff44aa' },
    { pos: [-2, -2, -5], color: '#44aaff' },
    { pos: [3, 3, -7], color: '#aa44ff' },
    { pos: [0, 1, -4], color: '#ff44aa' }
  ], [])
  
  return (
    <group>
      {crystals.map((c, i) => <Crystal key={i} position={c.pos} color={c.color} />)}
    </group>
  )
}

function AlgorithmBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={2000} factor={2} fade />
        <CrystalField />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  )
}

const QuantumLogic = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const focusAreas = [
    'Data Structures & Algorithms',
    'Dynamic Programming',
    'Graph Theory',
    'Number Theory & Math',
    'Greedy Algorithms',
    'Binary Search & Optimization'
  ]

  const objectives = [
    'Solve algorithmic challenges under time pressure',
    'Demonstrate mastery of fundamental CS concepts',
    'Optimize solutions for time and space complexity',
    'Apply mathematical reasoning to complex problems'
  ]

  const schedule = [
    { time: 'Phase 1', event: 'Warm-up Round', desc: 'Easy to Medium problems' },
    { time: 'Phase 2', event: 'Main Contest', desc: 'Progressive difficulty challenges' },
    { time: 'Phase 3', event: 'Lightning Round', desc: 'Speed-based problem solving' },
    { time: 'Final', event: 'Championship', desc: 'Expert-level algorithms' }
  ]

  const evaluation = [
    { name: 'Correctness', value: 40 },
    { name: 'Time Complexity', value: 25 },
    { name: 'Space Efficiency', value: 20 },
    { name: 'Speed of Submission', value: 15 }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-32 relative overflow-hidden">
      <AlgorithmBackground />
      
      <div className="relative z-10">
        {/* Hero Section - IDE Style */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 text-xs font-mono tracking-widest text-white/40">
              <Link to="/" className="hover:text-[#aa44ff] transition-colors">HOME</Link>
              <span className="text-[#aa44ff]">/</span>
              <span className="text-[#aa44ff]">QUANTUM LOGIC</span>
            </div>

            <div className="bg-[#121218] border border-[#aa44ff]/20 rounded-lg shadow-2xl overflow-hidden">
              {/* Window Controls */}
              <div className="bg-[#1a1a20] px-4 py-2 flex items-center justify-between border-b border-[#aa44ff]/10">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5555]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa55]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#55ff55]" />
                </div>
                <div className="text-[10px] text-[#555] font-mono">quantum_logic.cpp</div>
              </div>
              
              <div className="p-8 md:p-12 font-mono text-sm">
                <div className="text-[#888] mb-6">
                  <span className="text-[#aa44ff]">#include</span> &lt;algorithm&gt;<br/>
                  <span className="text-[#aa44ff]">using namespace</span> competitive;<br/><br/>
                  <span className="text-[#aa44ff]">int</span> main() {'{'}
                </div>
                
                <div className="pl-6 border-l border-[#333] mb-6">
                  <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 tracking-tight font-heading">
                    QUANTUM_LOGIC<span className="animate-pulse text-[#aa44ff]">_</span>
                  </h1>
                  <p className="text-[#aa88ff] mb-8 opacity-80 max-w-2xl">
                    // A high-intensity competitive programming competition designed to 
                    challenge algorithmic thinking and problem-solving skills.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-6 text-xs font-bold text-[#555]">
                    <div>
                      <div>// DIFFICULTY</div>
                      <div className="text-[#ff5555] text-lg mt-1 font-heading">EXPERT</div>
                    </div>
                    <div>
                      <div>// DURATION</div>
                      <div className="text-[#55ff55] text-lg mt-1 font-heading">3-5 HRS</div>
                    </div>
                    <div>
                      <div>// MODE</div>
                      <div className="text-[#55aaff] text-lg mt-1 font-heading">SOLO</div>
                    </div>
                  </div>
                </div>

                <div className="text-[#888]">
                  <span className="text-[#aa44ff] pl-6">return</span> EXIT_SUCCESS;<br/>
                  {'}'}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                className="inline-block bg-[#aa44ff] text-white font-heading text-sm tracking-widest px-10 py-4 hover:bg-white hover:text-black transition-all shadow-[0_0_30px_-5px_#aa44ff80]">
                ./START_COMPETITION
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-16">
                <div>
                  <h2 className="text-[#aa44ff] mb-8 text-lg font-bold border-b border-[#aa44ff]/20 pb-4 font-mono">
                    &lt;OBJECTIVES /&gt;
                  </h2>
                  <ul className="space-y-4 text-base text-white/80">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex gap-4 group">
                        <span className="text-[#555] group-hover:text-[#aa44ff] transition-colors font-mono">[{i}]</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-[#aa44ff] mb-8 text-lg font-bold border-b border-[#aa44ff]/20 pb-4 font-mono">
                    &lt;FOCUS_AREAS /&gt;
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map((area, i) => (
                      <span key={i} className="bg-[#aa44ff]/10 text-[#aa88ff] px-4 py-2 text-sm hover:bg-[#aa44ff] hover:text-white transition-colors cursor-default border border-[#aa44ff]/20">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Terminal */}
                <div className="bg-black border border-[#333] p-6">
                  <div className="flex justify-between text-[#555] text-xs mb-6 border-b border-[#333] pb-2 font-mono">
                    <span>TERMINAL</span>
                    <span>-bash</span>
                  </div>

                  <div className="text-[#55ff55] mb-2 font-bold text-xs font-mono">$ cat schedule.txt</div>
                  <ul className="space-y-3 text-sm text-white/70 pl-2 font-mono">
                    {schedule.map((slot, i) => (
                      <li key={i} className="flex justify-between hover:bg-[#111] px-2 -mx-2 transition-colors">
                        <span>{slot.event}</span>
                        <span className="text-[#555]">{slot.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#15151a] border border-[#aa44ff]/20 p-8">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#aa44ff] mb-6 border-b border-white/10 pb-4">EVALUATION CRITERIA</h3>
                  <div className="space-y-4">
                    {evaluation.map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/80">{metric.name}</span>
                          <span className="text-[#aa44ff]">{metric.value}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#aa44ff] to-[#ff44aa] rounded-full" style={{ width: `${metric.value * 2.5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-32 text-center">
              <div className="inline-block p-12 border border-[#aa44ff]/20 bg-black/50">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Compile Your Skills?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Join the ultimate algorithmic showdown.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#aa44ff] text-white font-heading text-sm tracking-widest px-12 py-4 hover:bg-white hover:text-black transition-all">
                  EXECUTE
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default QuantumLogic
