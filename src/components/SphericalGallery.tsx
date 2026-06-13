import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioItem {
  img: string;
  span: string;
  aspect: string;
  partner: string;
  category: string;
  services: string;
  description?: string;
  url?: string;
}

interface SphericalGalleryProps {
  items: PortfolioItem[];
}

// Fallback placeholder images
const LOCAL_PLACEHOLDERS = [
  '/HeroBG1.jpg',
  '/Home BG.png',
  '/DUO Logo.png',
];

const getPlaceholderImage = (index: number) => {
  return LOCAL_PLACEHOLDERS[index % LOCAL_PLACEHOLDERS.length];
};

const MOBILE_BREAKPOINT = 768;

const SphericalGallery: React.FC<SphericalGalleryProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereGroupRef = useRef<THREE.Group | null>(null);
  const texturesRef = useRef<Map<string, THREE.Texture>>(new Map());
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );

  // Track viewport size to switch between sphere (web) and simple gallery (mobile)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Load textures with fallback
  useEffect(() => {
    if (isMobile) return;

    const textureLoader = new THREE.TextureLoader();
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const loadedTextures = new Map<string, THREE.Texture>();

    // Create placeholder texture with gradient
    const createPlaceholderTexture = (index: number) => {
      if (!ctx) return null;
      
      const colors = [
        { bg: '#1a1a2e', accent: '#16213e' },
        { bg: '#0f3460', accent: '#16213e' },
        { bg: '#2d1b00', accent: '#3d2817' },
        { bg: '#1a1a1a', accent: '#2d2d2d' },
        { bg: '#0d0d0d', accent: '#1a1a1a' },
        { bg: '#1b1b2f', accent: '#16213e' },
      ];
      
      const color = colors[index % colors.length];
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, color.bg);
      gradient.addColorStop(1, color.accent);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(items[index]?.partner || 'Project', 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const loadTexture = (url: string, index: number) => {
      return new Promise<THREE.Texture>((resolve) => {
        // Try loading from external URL first
        textureLoader.load(
          url,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            loadedTextures.set(url, texture);
            resolve(texture);
          },
          undefined,
          () => {
            // If external load fails, try local placeholder
            textureLoader.load(
              getPlaceholderImage(index),
              (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                loadedTextures.set(url, texture);
                resolve(texture);
              },
              undefined,
              () => {
                // Last resort: create procedural texture
                const placeholderTexture = createPlaceholderTexture(index);
                if (placeholderTexture) {
                  loadedTextures.set(url, placeholderTexture);
                  resolve(placeholderTexture);
                } else {
                  resolve(new THREE.Texture());
                }
              }
            );
          }
        );
      });
    };

    const loadAllTextures = async () => {
      try {
        await Promise.all(items.map((item, idx) => loadTexture(item.img, idx)));
        texturesRef.current = loadedTextures;
      } catch (err) {
        console.error('Error loading textures:', err);
      }
    };

    loadAllTextures();
  }, [items, isMobile]);

  // Initialize Three.js scene
  useEffect(() => {
    if (isMobile || !containerRef.current || items.length === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.z = 8.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create sphere group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    sphereGroupRef.current = sphereGroup;

    // Position items in a circular line
    const itemCount = items.length;

    items.forEach((item, index) => {
      // Arrange projects in a line (circular band)
      const spacing = (Math.PI * 2) / Math.max(1, itemCount);
      const angle = spacing * index;
      const circleRadius = 9;

      const x = Math.cos(angle) * circleRadius;
      const z = Math.sin(angle) * circleRadius;
      const y = 0;

      // Create card
      const geometry = new THREE.PlaneGeometry(5.2, 6.4);
      
      // Get texture or create fallback
      let material: THREE.MeshPhongMaterial | THREE.MeshBasicMaterial;
      const texture = texturesRef.current.get(item.img);
      
      if (texture && texture.image) {
        // Use BasicMaterial for better image visibility
        material = new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false,
        });
      } else {
        // Fallback material with color
        const colors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0xFFA07A, 0x98D8C8, 0xF7DC6F];
        material = new THREE.MeshBasicMaterial({
          color: colors[index % colors.length],
        });
      }

      const card = new THREE.Mesh(geometry, material);
      card.position.set(x, y, z);

      // Look at center for circular arrangement
      card.lookAt(0, 0, 0);
      card.userData = { item, index };

      sphereGroup.add(card);
    });

    // Mouse tracking
    const onMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;

      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mouseleave', onMouseUp);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCardClick = (event: MouseEvent) => {
      if (isDraggingRef.current && Math.abs(event.clientX - mouseRef.current.x) > 5) return;

      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(sphereGroup.children);

      if (intersects.length > 0) {
        const clickedCard = intersects[0].object as THREE.Mesh<
  THREE.BufferGeometry,
  THREE.Material | THREE.Material[]
>;
        if (clickedCard.userData?.item) {
          setSelectedItem(clickedCard.userData.item);
        }
      }
    };

    renderer.domElement.addEventListener('click', onCardClick);

    // Animation loop
    let animationFrameId: number;

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  rotationRef.current.x +=
    (targetRotationRef.current.x - rotationRef.current.x) * 0.1;

  rotationRef.current.y +=
    (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

  if (sphereGroupRef.current) {
    sphereGroupRef.current.rotation.x = rotationRef.current.x;
    sphereGroupRef.current.rotation.y = rotationRef.current.y;
  }

  renderer.render(scene, camera);
};

animate();

    // Handle window resize
    const onWindowResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
  window.removeEventListener('resize', onWindowResize);

  renderer.domElement.removeEventListener('mousedown', onMouseDown);
  renderer.domElement.removeEventListener('mousemove', onMouseMove);
  renderer.domElement.removeEventListener('mouseup', onMouseUp);
  renderer.domElement.removeEventListener('mouseleave', onMouseUp);
  renderer.domElement.removeEventListener('click', onCardClick);

  cancelAnimationFrame(animationFrameId);

  sphereGroup.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose();

      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });

  texturesRef.current.forEach((texture) => {
    texture.dispose();
  });

  texturesRef.current.clear();

  containerRef.current?.removeChild(renderer.domElement);

  renderer.dispose();
};
  }, [items, isMobile]);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a]">
      {isMobile ? (
        /* Simple mobile gallery */
        <div className="w-full h-full overflow-y-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedItem(item)}
                className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-900 text-left"
              >
                <img
                  src={item.img}
                  alt={item.partner}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = getPlaceholderImage(index);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/60">{item.category}</p>
                  <h3 className="text-lg font-semibold">{item.partner}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-full" />
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 pt-24 md:pt-20"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-0 right-0 z-10 p-2 hover:bg-white/10 rounded-lg transition text-white"
              >
                <X size={24} />
              </button>

              {/* Main Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:items-center">
                {/* Left Column - Content */}
                <div className="text-white flex flex-col justify-center space-y-6 md:pr-8">
                  {/* Title */}
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{selectedItem.partner}</h2>
                  </div>

                  {/* Description */}
                  {selectedItem.description && (
                    <div className="space-y-2">
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
                        {selectedItem.description}
                      </p>
                    </div>
                  )}

                  {/* Keywords/Services */}
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.services.split(',').map((service, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-light border border-white/20 rounded-full text-gray-300 hover:border-white/40 transition magnetic-target"
                          style={{ transitionDuration: '0.2s' }}
                        >
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Category</p>
                    <p className="text-sm font-light text-gray-400">{selectedItem.category}</p>
                  </div>

                  {/* CTA Link */}
                  {selectedItem.url && (
  <div className="pt-4">
    <a
      href={selectedItem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 text-white text-sm uppercase tracking-widest font-bold hover:opacity-70 transition-opacity magnetic-target"
      style={{ transitionDuration: '0.2s' }}
    >
      View Project
      <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
    </a>
  </div>
)}
                </div>

                {/* Right Column - Image */}
                <div className="relative overflow-hidden rounded-lg aspect-video md:aspect-auto md:h-96 bg-gradient-to-br from-gray-800 to-gray-900 group">
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.partner}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      const idx = items.findIndex(
  (item) => item.partner === selectedItem.partner
);

img.src = getPlaceholderImage(idx >= 0 ? idx : 0);
                    }}
                  />
                  {/* Spatial dimension overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions overlay */}
      {!isMobile && (
        <div className="absolute top-36 sm:top-24 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm text-center">
          <p>Drag to rotate • Click to view details</p>
        </div>
      )}
    </div>
  );
};

export default SphericalGallery;