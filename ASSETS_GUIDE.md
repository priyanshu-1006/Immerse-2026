# INTERSTELLAR Techfest — Asset Collection Guide

## 🎨 3D Models (.glb / .gltf files)

Place all downloaded models in: `public/models/`

### 1. Endurance Ship (Hero Section)
- **Purpose**: Main rotating ship in hero section
- **Where to find**:
  - Sketchfab: Search "Interstellar Endurance spacecraft"
    - https://sketchfab.com/search?q=interstellar+endurance&type=models&licenses=322a749bcfa841b29dff1571c4942a12
  - Sketchfab: Search "space station ring"
    - https://sketchfab.com/search?q=space+station+ring&type=models
  - Poly Pizza: Search "space station"
    - https://poly.pizza/search/space%20station
- **Format**: .glb (preferred) or .gltf
- **Notes**: Look for a ring-shaped station. Currently using procedural geometry as placeholder.

### 2. Black Hole / Gargantua (Wormhole Section)
- **Purpose**: Central black hole in the navigation
- **Where to find**:
  - **RECOMMENDED**: Use a Three.js shader instead (lighter, looks better)
    - GitHub: https://github.com/nicoacarin/black-hole-threejs
    - Shadertoy (port to Three.js): https://www.shadertoy.com/view/tsBXW3
  - Sketchfab: Search "black hole accretion disk"
    - https://sketchfab.com/search?q=black+hole+accretion&type=models
- **Notes**: Currently using procedural torus geometry. A shader would look MUCH better.

### 3. TARS Robot (Helper/Chatbot)
- **Purpose**: Floating helper indicator or chatbot avatar
- **Where to find**:
  - Sketchfab: Search "TARS robot interstellar"
    - https://sketchfab.com/search?q=TARS+interstellar&type=models
  - Sketchfab: Search "monolith robot"
    - https://sketchfab.com/search?q=monolith+robot&type=models
- **Format**: .glb
- **Notes**: Blocky rectangular robot. Small, can be shown in corner.

### 4. Ranger Ship (Event Cards)
- **Purpose**: Small ships near event planet visualizations
- **Where to find**:
  - Sketchfab: Search "sci-fi ranger ship"
    - https://sketchfab.com/search?q=sci+fi+ranger+ship&type=models&licenses=322a749bcfa841b29dff1571c4942a12
  - Poly Pizza: Search "low poly spacecraft"
    - https://poly.pizza/search/spacecraft
  - Poly Pizza: Search "spaceship"
    - https://poly.pizza/search/spaceship
- **Format**: .glb
- **Notes**: Small landing craft look.

### 5. Wormhole Sphere (Transition Effect)
- **Purpose**: Wormhole transition between sections
- **Where to find**:
  - Sketchfab: Search "crystal sphere"
    - https://sketchfab.com/search?q=crystal+sphere&type=models
  - **RECOMMENDED**: Use a refraction shader instead
    - drei `<MeshTransmissionMaterial>` component
    - Example: https://codesandbox.io/s/hmgdjq (mesh transmission)
- **Notes**: A refractive/distortion sphere. Shader approach recommended.

---

## 🔊 Sound Effects

Place all sound files in: `public/sounds/`

### Currently Using (Arwes Built-in - FREE):
These are already wired up in the code:
- `https://arwes.dev/assets/sounds/intro.mp3` — Boot/transition sound
- `https://arwes.dev/assets/sounds/click.mp3` — Button click
- `https://arwes.dev/assets/sounds/type.mp3` — Typing effect
- `https://arwes.dev/assets/sounds/info.mp3` — Info popup

### Additional Sounds to Add:
| Sound | Purpose | Where to Find |
|-------|---------|---------------|
| Ambient space hum | Background loop | [Freesound.org](https://freesound.org/search/?q=space+ambient+hum) |
| Warp/jump sound | Wormhole transition | [Freesound.org](https://freesound.org/search/?q=warp+jump+sci+fi) |
| Heartbeat bass thrum | Preloader | [Freesound.org](https://freesound.org/search/?q=bass+thrum+sci+fi) |
| Scanner beep | Event hover | [Freesound.org](https://freesound.org/search/?q=scanner+beep+sci+fi) |
| Data transmission | Scroll feedback | [Freesound.org](https://freesound.org/search/?q=data+transmission+sci+fi) |
| Communication static | Section transitions | [Freesound.org](https://freesound.org/search/?q=radio+static+space) |

### Best Free Sound Resources:
1. **Freesound.org** (CC0 / CC-BY): https://freesound.org
2. **Mixkit** (Free): https://mixkit.co/free-sound-effects/sci-fi/
3. **Pixabay Music** (Free): https://pixabay.com/sound-effects/search/sci-fi/
4. **NASA Sound Library** (Public Domain): https://www.nasa.gov/audio-and-ringtones/

---

## 🖼️ Textures & Images

Place in: `public/textures/`

| Texture | Purpose | Source |
|---------|---------|--------|
| Earth texture map | Earth sphere | [Solar System Scope](https://www.solarsystemscope.com/textures/) (Free) |
| Star field HDRI | Background | [Polyhaven](https://polyhaven.com/hdris?q=space) (CC0) |
| Noise/grain texture | Overlay effect | Generated procedurally (already done in CSS) |
| Planet surfaces | Event planets | [Solar System Scope](https://www.solarsystemscope.com/textures/) |

---

## 📁 Project File Structure

```
public/
├── models/           ← Put .glb files here
│   ├── endurance.glb
│   ├── tars.glb
│   ├── ranger.glb
│   └── wormhole.glb
├── sounds/           ← Put .mp3/.ogg files here
│   ├── ambient.mp3
│   ├── warp.mp3
│   ├── heartbeat.mp3
│   └── scanner.mp3
├── textures/         ← Put texture images here
│   ├── earth-map.jpg
│   ├── earth-night.jpg
│   └── star-field.hdr
└── vite.svg
```

---

## 🔗 Quick Download Links (Free Models)

### Sketchfab (Free Download, CC Licensed):
1. Go to: https://sketchfab.com
2. Search the terms listed above
3. Filter by: **Downloadable** + **Price: Free**
4. Download as **.glb** format
5. Place in `public/models/`

### Poly Pizza (All Free, CC0):
1. Go to: https://poly.pizza
2. All models are free and CC0
3. Download as **.glb**
4. Place in `public/models/`

### Loading Models in Code:
```jsx
import { useGLTF } from '@react-three/drei'

function EnduranceModel() {
  const { scene } = useGLTF('/models/endurance.glb')
  return <primitive object={scene} scale={0.5} />
}

// Preload for smoother experience
useGLTF.preload('/models/endurance.glb')
```

---

## 🎵 Adding Ambient Sound

```jsx
// In App.jsx or ScrollJourney.jsx
import { useEffect, useRef } from 'react'

function AmbientSound() {
  const audioRef = useRef(null)
  
  useEffect(() => {
    audioRef.current = new Audio('/sounds/ambient.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.15
    
    const play = () => {
      audioRef.current.play()
      document.removeEventListener('click', play)
    }
    document.addEventListener('click', play)
    
    return () => {
      audioRef.current?.pause()
      document.removeEventListener('click', play)
    }
  }, [])
  
  return null
}
```
