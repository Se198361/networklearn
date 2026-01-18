/**
 * ============================================================================
 * CIRCUIT BACKGROUND COMPONENT
 * ============================================================================
 * 
 * Renders an animated canvas background with a circuit board aesthetic.
 * Creates a cyber/tech atmosphere with:
 * - Animated nodes representing circuit connection points
 * - Connecting lines between nearby nodes
 * - Pulsing glow effects on nodes
 * - Moving "data packets" along connection lines
 * - Subtle grid overlay
 * 
 * TECHNICAL DETAILS:
 * - Uses HTML5 Canvas for performant animations
 * - requestAnimationFrame for smooth 60fps rendering
 * - Automatically resizes with window
 * - Non-interactive (pointer-events: none)
 * 
 * USAGE:
 * Simply include <CircuitBackground /> in any page to add the effect.
 * Position it at z-index 0 and place content above it.
 * ============================================================================
 */

import { useEffect, useRef } from 'react';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * CircuitBackground Component
 * 
 * Creates a fullscreen canvas with animated circuit-style graphics.
 * The animation runs continuously using requestAnimationFrame.
 */
export const CircuitBackground = () => {
  // ---------------------------------------------------------------------------
  // REFS
  // ---------------------------------------------------------------------------
  
  /** Reference to the canvas DOM element for direct manipulation */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ---------------------------------------------------------------------------
  // ANIMATION SETUP AND LOOP
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // Get canvas and 2D rendering context
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // -------------------------------------------------------------------------
    // CANVAS SIZING
    // -------------------------------------------------------------------------
    
    /**
     * Resize handler: Makes canvas fill the entire window
     * Called on mount and when window is resized
     */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();  // Initial size
    window.addEventListener('resize', resize);

    // -------------------------------------------------------------------------
    // NODE GENERATION
    // -------------------------------------------------------------------------

    /**
     * Node interface for circuit connection points
     * @property x, y - Position coordinates
     * @property connections - Indices of connected nodes
     * @property pulse - Phase offset for pulsing animation (creates variety)
     */
    const nodes: { x: number; y: number; connections: number[]; pulse: number }[] = [];
    const nodeCount = 30;  // Number of circuit nodes to generate

    // Generate random node positions
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulse: Math.random() * Math.PI * 2  // Random starting phase
      });
    }

    // -------------------------------------------------------------------------
    // CONNECTION GENERATION
    // -------------------------------------------------------------------------

    /**
     * Connect each node to its 2 nearest neighbors (within 300px)
     * Creates a network of connected nodes
     */
    nodes.forEach((node, i) => {
      const nearest = nodes
        // Calculate distance to all other nodes
        .map((n, j) => ({ index: j, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
        // Exclude self and nodes too far away
        .filter(n => n.index !== i && n.dist < 300)
        // Sort by distance (closest first)
        .sort((a, b) => a.dist - b.dist)
        // Take 2 closest
        .slice(0, 2)
        // Extract just the indices
        .map(n => n.index);
      node.connections = nearest;
    });

    // -------------------------------------------------------------------------
    // ANIMATION LOOP
    // -------------------------------------------------------------------------

    let frame = 0;  // Frame counter for animation timing
    
    /**
     * Main animation function - runs every frame (~60fps)
     * Draws the grid, connections, nodes, and moving pulses
     */
    const animate = () => {
      // -----------------------------------------------------------------------
      // BACKGROUND FADE
      // -----------------------------------------------------------------------
      // Semi-transparent fill creates motion blur/trail effect
      ctx.fillStyle = 'rgba(10, 15, 28, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // -----------------------------------------------------------------------
      // GRID LINES
      // -----------------------------------------------------------------------
      // Draw subtle vertical and horizontal grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';  // Very faint cyan
      ctx.lineWidth = 1;
      const gridSize = 50;  // 50px grid spacing
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // -----------------------------------------------------------------------
      // CONNECTION LINES AND DATA PULSES
      // -----------------------------------------------------------------------
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          const target = nodes[j];
          
          // Calculate pulse intensity (0.0 to 1.0) using sine wave
          const pulse = Math.sin(frame * 0.02 + node.pulse) * 0.5 + 0.5;
          
          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.05 + pulse * 0.1})`;  // Pulsing opacity
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw moving "data packet" along the line
          // pulsePos cycles 0→1 continuously
          const pulsePos = (frame * 0.005 + i * 0.1) % 1;
          // Calculate position along the line
          const px = node.x + (target.x - node.x) * pulsePos;
          const py = node.y + (target.y - node.y) * pulsePos;
          
          // Draw the data packet as a small glowing circle
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${pulse * 0.5})`;
          ctx.fill();
        });
      });

      // -----------------------------------------------------------------------
      // NODE POINTS WITH GLOW
      // -----------------------------------------------------------------------
      nodes.forEach((node, i) => {
        // Calculate this node's pulse intensity
        const pulse = Math.sin(frame * 0.03 + node.pulse) * 0.5 + 0.5;
        
        // Draw node center (pulsing size)
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.2 + pulse * 0.3})`;
        ctx.fill();

        // Draw glow effect (radial gradient)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${0.1 + pulse * 0.1})`);  // Bright center
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');  // Fade to transparent
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fill();
      });

      // Increment frame counter and schedule next frame
      frame++;
      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // -------------------------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------------------------
    
    /**
     * Cleanup function: Remove resize listener when component unmounts
     * Note: requestAnimationFrame will automatically stop when canvas is removed
     */
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"  // Fullscreen, non-interactive
      style={{ zIndex: 0 }}  // Behind all other content
    />
  );
};
