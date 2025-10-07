import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, Center } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, 
  Heart, 
  Brain, 
  Zap, 
  Info,
  X,
  User,
  Users,
  Eye,
  Hand,
  Footprints,
  BookOpen,
  MousePointer,
  Pointer,
  RefreshCw,
  Sparkles,
  Star,
  Target,
  Shield,
  Leaf,
  Sun,
  Moon,
  Activity
} from 'lucide-react';

// Preload the GLTF models
useGLTF.preload('/male_anatomy_figure/scene.gltf');
useGLTF.preload('/base_body_female_v2/scene.gltf');

// Marma Points Data
const marmaPoints = {
  male: [
    {
      id: 1,
      name: "Adhipati",
      position: [0, 1.8, 0],
      tissue: "Sira",
      dosha: "Vata",
      description: "Crown of the head - controls consciousness and spiritual awakening"
    },
    {
      id: 2,
      name: "Sthapani",
      position: [0, 1.6, 0.3],
      tissue: "Sira",
      dosha: "Pitta",
      description: "Between eyebrows - third eye, intuition and wisdom"
    },
    {
      id: 3,
      name: "Shankha",
      position: [-0.3, 1.5, 0.2],
      tissue: "Sandhi",
      dosha: "Vata",
      description: "Temple region - mental clarity and focus"
    },
    {
      id: 4,
      name: "Apanga",
      position: [-0.4, 1.4, 0.1],
      tissue: "Mamsa",
      dosha: "Kapha",
      description: "Outer corner of eye - vision and eye health"
    },
    {
      id: 5,
      name: "Utkshepa",
      position: [0, 1.3, 0.4],
      tissue: "Sandhi",
      dosha: "Vata",
      description: "Hairline - scalp health and hair growth"
    }
  ],
  female: [
    {
      id: 1,
      name: "Adhipati",
      position: [0, 1.8, 0],
      tissue: "Sira",
      dosha: "Vata",
      description: "Crown of the head - controls consciousness and spiritual awakening"
    },
    {
      id: 2,
      name: "Sthapani",
      position: [0, 1.6, 0.3],
      tissue: "Sira",
      dosha: "Pitta",
      description: "Between eyebrows - third eye, intuition and wisdom"
    },
    {
      id: 3,
      name: "Shankha",
      position: [-0.3, 1.5, 0.2],
      tissue: "Sandhi",
      dosha: "Vata",
      description: "Temple region - mental clarity and focus"
    },
    {
      id: 4,
      name: "Apanga",
      position: [-0.4, 1.4, 0.1],
      tissue: "Mamsa",
      dosha: "Kapha",
      description: "Outer corner of eye - vision and eye health"
    },
    {
      id: 5,
      name: "Utkshepa",
      position: [0, 1.3, 0.4],
      tissue: "Sandhi",
      dosha: "Vata",
      description: "Hairline - scalp health and hair growth"
    }
  ]
};

// Marma Point Component
function MarmaPoint({ point, onClick, isSelected }: any) {
  const meshRef = React.useRef<any>();
  
  const getPointColor = (tissue: string) => {
    switch (tissue.toLowerCase()) {
      case 'sira':
        return '#ef4444';
      case 'mamsa':
        return '#000000';
      case 'sandhi':
        return '#ffffff';
      case 'snayu':
        return '#3b82f6';
      case 'non-physical':
        return '#8b5cf6';
      default:
        return '#ef4444';
    }
  };
  
  const pointColor = getPointColor(point.tissue);
  const selectedColor = '#fbbf24';

  return (
    <group position={point.position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial 
          color={isSelected ? selectedColor : pointColor} 
          emissive={isSelected ? selectedColor : pointColor}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {isSelected && (
        <Html position={[0, 0.05, 0]} center>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fbbf24'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000'
            }}>
              {point.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Human Body Component - Simple and Clean
function HumanBody({ gender, selectedPoint, onPointClick }: any) {
  const femaleScene = useGLTF('/base_body_female_v2/scene.gltf');
  const maleScene = useGLTF('/male_anatomy_figure/scene.gltf');
  
  if (gender === 'female') {
    const points = marmaPoints.female;
    
    return (
      <group>
        <primitive 
          object={femaleScene.scene} 
          scale={[1.1, 1.1, 1.1]}
          position={[0, -0.9, 0]}
          rotation={[0, 0, 0]}
        />
        
        {points.map((point: any) => (
          <MarmaPoint
            key={point.id}
            point={point}
            onClick={() => onPointClick(point)}
            isSelected={selectedPoint?.id === point.id}
          />
        ))}
      </group>
    );
  }
  
  // Male model - different body type, needs different positioning
  const points = marmaPoints.male;
  
  return (
    <group>
      <primitive 
        object={maleScene.scene} 
        scale={[1.1, 1.1, 1.1]}
        position={[0, -0.9, 0]}
        rotation={[0, 0, 0]}
      />
      
      {points.map((point: any) => (
        <MarmaPoint
          key={point.id}
          point={point}
          onClick={() => onPointClick(point)}
          isSelected={selectedPoint?.id === point.id}
        />
      ))}
    </group>
  );
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #10b981',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{
          color: '#374151',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Loading 3D Model...
        </p>
      </div>
    </div>
  );
}

// Marma Point Flashcard Component
function MarmaFlashcard({ point, onClose }: any) {
  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata':
        return '#3b82f6';
      case 'pitta':
        return '#ef4444';
      case 'kapha':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getTissueColor = (tissue: string) => {
    switch (tissue.toLowerCase()) {
      case 'sira':
        return '#ef4444';
      case 'mamsa':
        return '#000000';
      case 'sandhi':
        return '#ffffff';
      case 'snayu':
        return '#3b82f6';
      default:
        return '#ef4444';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <Card style={{
        maxWidth: '500px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <CardHeader style={{
          backgroundColor: '#f0fdf4',
          borderBottom: '1px solid #bbf7d0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <CardTitle style={{
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Zap className="w-5 h-5" />
              {point.name} Marma Point
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <X style={{ height: '16px', width: '16px' }} />
              Close
            </Button>
          </div>
          <p style={{
            color: '#059669',
            margin: '8px 0 0 0',
            fontSize: '14px'
          }}>
            {point.description}
          </p>
        </CardHeader>
        
        <CardContent style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <Badge style={{
                backgroundColor: getDoshaColor(point.dosha),
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Heart className="w-3 h-3" />
                {point.dosha} Dosha
              </Badge>
              <Badge style={{
                backgroundColor: getTissueColor(point.tissue),
                color: point.tissue === 'Sandhi' ? '#000' : 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Shield className="w-3 h-3" />
                {point.tissue} Tissue
              </Badge>
            </div>
            
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                color: '#1e293b',
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Therapeutic Benefits
              </h4>
              <p style={{
                color: '#475569',
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                Gentle stimulation of this Marma point can help balance the {point.dosha.toLowerCase()} dosha, 
                improve {point.tissue.toLowerCase()} function, and promote overall vitality and healing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ThreeDModelPage() {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [testMode, setTestMode] = useState(false);

  const handlePointClick = (point: any) => {
    setSelectedPoint(point);
  };

  const closeFlashcard = () => {
    setSelectedPoint(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            108 Marma Points
            <Sparkles className="w-8 h-8 text-purple-500" />
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-4xl mx-auto">
            Ancient Ayurvedic wisdom reveals 108 vital energy points where consciousness, mind, and body converge. 
            Each point serves as a gateway for healing, vitality, and spiritual awakening.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 max-w-4xl mx-auto border border-blue-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Marma</strong> in Sanskrit means "vital," "secret," or "hidden." These 108 bodily junctures are where prana (life-force) pulses most intensely—at anatomical crossroads of muscle, bone, joint, ligament, nerve, and vessel. Each Marma point is a convergence of 5 elements, 3 doshas, 5 vayus, 7 dhatus, and 72,000 nadis (energy channels).
            </p>
          </div>
          
          {/* Model Controls */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button
              variant={gender === 'female' ? 'default' : 'outline'}
              onClick={() => setGender('female')}
              className="flex items-center gap-2 px-6"
            >
              <Users className="w-4 h-4" />
              Female Model
            </Button>
            <Button
              variant={gender === 'male' ? 'default' : 'outline'}
              onClick={() => setGender('male')}
              className="flex items-center gap-2 px-6"
            >
              <User className="w-4 h-4" />
              Male Model
            </Button>
            <Button
              variant={testMode ? 'default' : 'outline'}
              onClick={() => setTestMode(!testMode)}
              className="flex items-center gap-2 px-6 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Target className="w-4 h-4" />
              {testMode ? 'Full Model' : 'Test Mode'}
            </Button>
          </div>
        </div>

        {/* 3D Model Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 bg-[#e8f4fd] rounded-xl p-6">
          <div className="lg:col-span-2">
            <Card className="min-h-[800px] md:min-h-[900px] lg:min-h-[1000px] relative overflow-hidden border-gray-200 bg-transparent">
              <CardHeader className="pb-3 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Brain className="w-5 h-5" />
                  Interactive 3D Model
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <Suspense fallback={<LoadingSpinner />}>
                  <Canvas
                    camera={{ position: [0, 1.1, 5], fov: 35 }}
                    style={{ height: '100%', background: 'transparent' }}
                  >
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[2, 4, 2]} intensity={0.8} />
                    
                    {testMode ? (
                      <group>
                        <mesh position={[0, 1.2, 0]}>
                          <cylinderGeometry args={[0.3, 0.3, 1.5, 8]} />
                          <meshStandardMaterial color="#FF6B6B" />
                        </mesh>
                        <mesh position={[0, 0.5, 0]}>
                          <sphereGeometry args={[0.4, 16, 16]} />
                          <meshStandardMaterial color="#4ECDC4" />
                        </mesh>
                        <mesh position={[0, -0.2, 0]}>
                          <boxGeometry args={[0.8, 0.8, 0.8]} />
                          <meshStandardMaterial color="#45B7D1" />
                        </mesh>
                        <Html position={[0, 2, 0]} center>
                          <div className="bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-medium text-gray-800">
                            Test Mode Active
                          </div>
                        </Html>
                      </group>
                    ) : (
                      <Center top>
                        <HumanBody 
                          gender={gender}
                          selectedPoint={selectedPoint}
                          onPointClick={handlePointClick}
                        />
                      </Center>
                    )}
                    
                    <OrbitControls 
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={4}
                      maxDistance={20}
                      target={[0, 0.5, 0]}
                    />
                  </Canvas>
                </Suspense>
              </CardContent>
            </Card>
          </div>

          {/* Legend and Info Section */}
          <div className="space-y-6 lg:col-span-1">
            {/* Marma Points Statistics */}
            <Card className="border-gray-200 bg-white/90 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Activity className="w-5 h-5" />
                  Marma Points Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">37</div>
                    <div className="text-sm font-medium text-gray-700">Head & Neck</div>
                    <div className="text-xs text-gray-500">Shiro Marma</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">26</div>
                    <div className="text-sm font-medium text-gray-700">Torso & Back</div>
                    <div className="text-xs text-gray-500">Madhyamanga</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">22</div>
                    <div className="text-sm font-medium text-gray-700">Arms & Hands</div>
                    <div className="text-xs text-gray-500">Shakha</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">22</div>
                    <div className="text-sm font-medium text-gray-700">Legs & Feet</div>
                    <div className="text-xs text-gray-500">Pada</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white/90 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Info className="w-5 h-5" />
                  Tissue Types
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Sira (Blood Vessels)</span>
                    <p className="text-xs text-gray-500">Life force, circulation, vitality</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-black flex-shrink-0"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Mamsa (Muscle)</span>
                    <p className="text-xs text-gray-500">Strength, movement, protection</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-white border border-gray-300 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Sandhi (Joints)</span>
                    <p className="text-xs text-gray-500">Flexibility, connection, mobility</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Snayu (Ligaments)</span>
                    <p className="text-xs text-gray-500">Stability, support, structure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Non-Physical (Mind)</span>
                    <p className="text-xs text-gray-500">Consciousness, spiritual awakening</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white/90 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Heart className="w-5 h-5" />
                  Interactive Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <MousePointer className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Mouse Controls</p>
                    <p className="text-gray-600 text-xs">Click & drag to rotate • Scroll to zoom • Right-click to pan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Pointer className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Point Interaction</p>
                    <p className="text-gray-600 text-xs">Click any colored point to see detailed information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Model Toggle</p>
                    <p className="text-gray-600 text-xs">Switch between male/female anatomy models</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Test Mode</p>
                    <p className="text-gray-600 text-xs">Use if 3D rendering has issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white/90 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <BookOpen className="w-5 h-5" />
                  Ancient Wisdom
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4 pt-4">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                    <Sun className="w-3 h-3" />
                    Historical Origins
                  </p>
                  <p className="text-gray-600 text-xs">Mentioned in Atharvaveda and Rigveda, detailed in Sushruta Samhita (600 BCE) - the world's oldest systematic anatomical map.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                    <Leaf className="w-3 h-3" />
                    Energy Physiology
                  </p>
                  <p className="text-gray-600 text-xs">Convergence points of 5 elements, 3 doshas, 5 vayus, 7 dhatus, and 72,000 nadis (energy channels).</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                    <Heart className="w-3 h-3" />
                    Therapeutic Power
                  </p>
                  <p className="text-gray-600 text-xs">Gentle stimulation clears energetic blockages, resets self-healing circuits, and restores balance.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                    <Star className="w-3 h-3" />
                    Modern Relevance
                  </p>
                  <p className="text-gray-600 text-xs">Validated by modern research showing these points correspond to major nerve plexuses and energy meridians.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Explore the Sacred Science of Marma
            </h3>
            <p className="text-gray-600 mb-4">
              Each of the 108 Marma points represents a sacred intersection where physical anatomy meets subtle energy. 
              Through mindful exploration and gentle touch, we can activate these natural healing centers and restore 
              the body's innate wisdom and vitality.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Interactive Learning
              </span>
              <span className="flex items-center gap-1">
                <Hand className="w-4 h-4" />
                Hands-on Practice
              </span>
              <span className="flex items-center gap-1">
                <Footprints className="w-4 h-4" />
                Ancient Wisdom
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marma Point Flashcard */}
      {selectedPoint && (
        <MarmaFlashcard point={selectedPoint} onClose={closeFlashcard} />
      )}
    </div>
  );
} 