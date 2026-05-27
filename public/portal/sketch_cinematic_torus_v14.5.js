// Cinematic Orange Torus V14.3 - Mobile layout fixes, reduced padding, white text
// Bitcoin Rabbit Hole Portal - Cinematic Version v7.5
// Smooth angleX progression eliminates disorienting flips between stages

class CinematicCameraController {
    constructor() {
        // V7.5 CINEMATIC: Stage system with sub-stages for Approach
        this.cinematicStages = [
            {
                name: "Overview",
                description: "Perfect overview - torus fills left 2/3 of screen optimally",
                angleX: -1.400, angleY: 2.100, zoom: 320,
                lookAt: [0, 0, 0], fov: 60,
                narrative: "The full scope of the portal is revealed..."
            },
            {
                name: "Approach",
                description: "Medium approach - establishing shot with balcony sub-stages",
                angleX: -1.070, angleY: 3.563, zoom: 120, // Default to Media balcony (120° from base)
                lookAt: [0, 0, 0], fov: 84.609375,
                narrative: "Choose your approach to the rabbit hole...",
                subStages: {
                    media: {
                        name: "Media Balcony",
                        description: "Media approach - where signal cuts through noise",
                        angleX: -1.070, angleY: 3.563, zoom: 120, // 120° position (default)
                        lookAt: [0, 0, 0], fov: 84.609375,
                        narrative: "Where narratives are dissected and truth emerges..."
                    },
                    mental: {
                        name: "Mental Balcony",
                        description: "Mental approach - where minds are rewired",
                        angleX: -1.070, angleY: 1.470, zoom: 120, // 0° position (120° counter-clockwise)
                        lookAt: [0, 0, 0], fov: 84.609375,
                        narrative: "Where cognitive dissonance becomes clarity..."
                    },
                    money: {
                        name: "Money Balcony",
                        description: "Money approach - where fiat illusions dissolve",
                        angleX: -1.070, angleY: 5.656, zoom: 120, // 240° position (120° clockwise)
                        lookAt: [0, 0, 0], fov: 84.609375,
                        narrative: "Where hard money is reborn and sovereignty returns..."
                    }
                }
            },
            {
                name: "Orbit",
                description: "Circular orbit around the torus perimeter",
                angleX: -0.250, angleY: -1.750, zoom: 180, // Reduced from 271 for better fit
                lookAt: [0, 0, 0], fov: 65,
                narrative: "Circling the structure, revealing its true form..."
            },
            {
                name: "Dive",
                description: "High angle dive toward the portal entrance",
                angleX: -2.250, angleY: -1.250, zoom: 140, // Reduced from 210 for better proportions
                lookAt: [0, 0, 0], fov: 69.99967849794238,
                narrative: "Beginning the descent into the rabbit hole..."
            },
            {
                name: "Inside",
                description: "Interior view looking through the wormhole tunnel",
                angleX: -4.580, angleY: -1.130, zoom: 60, // Reduced from 90 for proportions
                lookAt: [0, 0, 0], fov: 69.99967849794238,
                narrative: "Inside the tunnel - reality bends around you..."
            },
            {
                name: "Emerge",
                description: "Emerging from tunnel, looking back at the journey",
                angleX: -6.580, angleY: -0.890, zoom: 35, // Reduced from 50 for proportions
                lookAt: [0, 0, 0], fov: 69.99967849794238,
                narrative: "Emerging from the other side, transformed..."
            },
            {
                name: "Whole",
                description: "Dramatic side angle showing the complete whole",
                angleX: -8.430, angleY: -0.240, zoom: 420, // Reduced from 629 for better 2/3 fit
                lookAt: [0, 0, 0], fov: 69.99967849794238,
                narrative: "The whole stands complete, all perspectives unified..."
            },
            {
                name: "Wealth",
                description: "Financial perspective - zooming toward wealth building potential",
                angleX: -6.200, angleY: 1.570, zoom: 280, // Focused position for wealth content
                lookAt: [0, 0, 0], fov: 75,
                narrative: "Where financial wisdom transforms into generational wealth..."
            },
            {
                name: "Community",
                description: "Final sphere view - the complete community ecosystem",
                angleX: -4.500, angleY: 3.14159, zoom: 500, // Pull back for complete view
                lookAt: [0, 0, 0], fov: 85,
                narrative: "The full ecosystem revealed - where individual growth becomes collective strength..."
            }
        ];

        // Current state - START WITH OVERVIEW (now stage 0)
        this.currentStage = 0;
        this.currentSubStage = 'media'; // Default sub-stage for Approach
        this.angleX = this.cinematicStages[0].angleX;
        this.angleY = this.cinematicStages[0].angleY;
        this.zoom = this.cinematicStages[0].zoom;
        this.fov = this.cinematicStages[0].fov;

        // V7.1 KEYFRAME SYSTEM: Advanced transition control - ULTRA SMOOTH
        this.isTransitioning = false;
        this.transitionStartTime = 0;
        this.transitionDuration = 6000; // 6 seconds for ultra-smooth transitions
        this.fromStage = null;
        this.toStage = null;
        this.transitionProgress = 0;

        // V7.1 ARC TRANSITIONS: Keyframe interpolation points
        this.keyframes = [];
        this.currentKeyframe = 0;

        // Manual override system
        this.manualMode = false;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.sensitivity = 0.01;
        this.zoomSensitivity = 20;

        // Sequence playback - EXTENDED TIMING
        this.playingSequence = false;
        this.sequenceStage = 0;
        this.sequenceStartTime = 0;
        this.stageHoldDuration = 4000; // Hold each stage for 4 seconds

        // INTRO SEQUENCE: Automatic spin on load
        this.playingIntro = true;
        this.introStartTime = 0;
        this.introDuration = 6000; // 6 second intro spin
        this.introSpinSpeed = -0.003; // Clockwise atmospheric spin (negative = clockwise)
        this.introCompleted = false;

        // Start intro from a position where torus is partially hidden
        this.introStartAngleY = this.cinematicStages[0].angleY - 1.5; // Start 1.5 radians before overview
        this.angleY = this.introStartAngleY;
    }

    // V7.1 KEYFRAME GENERATION: Create smooth arc transitions between ANY stages
    generateTransitionKeyframes(fromStage, toStage) {
        const from = this.cinematicStages[fromStage];
        const to = this.cinematicStages[toStage];

        this.keyframes = [];

        // V7.1 ARC MATHEMATICS: Create curved path instead of linear - ULTRA SMOOTH
        const numKeyframes = 24; // Higher resolution for ultra-smooth transitions

        for (let i = 0; i <= numKeyframes; i++) {
            const t = i / numKeyframes;

            // V7.1 CINEMATIC EASING: Ultra-smooth acceleration/deceleration
            let easedT;
            // Smoother quintic easing for buttery transitions
            if (t < 0.5) {
                easedT = 16 * t * t * t * t * t; // Ease in quintic
            } else {
                easedT = 1 - 16 * Math.pow(1 - t, 5); // Ease out quintic
            }

            // V7.1 ARC INTERPOLATION: Create curved camera paths for ANY transition
            let arcAngleX, arcAngleY, arcZoom, arcFov;

            // V7.1 UNIVERSAL TRANSITIONS: Handle any stage to any stage smoothly
            if (fromStage === 3 && toStage === 4) {
                // Dive → Inside: Smooth spiral into center with gradual angle change
                const spiralFactor = Math.sin(easedT * Math.PI * 2) * 0.1 * (1 - easedT);
                arcAngleX = this.lerp(from.angleX, to.angleX, this.easeInOutQuad(easedT));
                arcAngleY = this.lerp(from.angleY, to.angleY, this.easeInOutQuad(easedT)) + spiralFactor;
                arcZoom = this.lerp(from.zoom, to.zoom, this.easeInOutQuart(easedT));
            } else if (fromStage === 4 && toStage === 5) {
                // Inside → Emerge: Smooth exit with slight curve
                const exitCurve = Math.sin(easedT * Math.PI) * 0.2;
                arcAngleX = this.lerp(from.angleX, to.angleX, this.easeInOutQuad(easedT)) + exitCurve;
                arcAngleY = this.lerp(from.angleY, to.angleY, this.easeInOutQuad(easedT));
                arcZoom = this.lerp(from.zoom, to.zoom, this.easeInOutQuad(easedT));
            } else if (fromStage === 1 && toStage === 2) {
                // Approach → Orbit: Wide sweeping arc
                const sweepArc = Math.sin(easedT * Math.PI) * 0.3;
                arcAngleX = this.lerp(from.angleX, to.angleX, easedT);
                arcAngleY = this.lerp(from.angleY, to.angleY, easedT) + sweepArc;
                arcZoom = this.lerp(from.zoom, to.zoom, this.easeInOutQuad(easedT));
            } else if (Math.abs(fromStage - toStage) > 3) {
                // Large stage jumps: Add gentle arc for dramatic transitions
                const arcFactor = Math.sin(easedT * Math.PI) * 0.15;
                arcAngleX = this.lerp(from.angleX, to.angleX, this.easeInOutQuad(easedT)) + arcFactor;
                arcAngleY = this.lerp(from.angleY, to.angleY, this.easeInOutQuad(easedT));
                arcZoom = this.lerp(from.zoom, to.zoom, this.easeInOutQuint(easedT));
            } else {
                // Standard smooth interpolation for all other transitions
                arcAngleX = this.lerp(from.angleX, to.angleX, this.easeInOutQuad(easedT));
                arcAngleY = this.lerp(from.angleY, to.angleY, this.easeInOutQuad(easedT));
                arcZoom = this.lerp(from.zoom, to.zoom, this.easeInOutQuad(easedT));
            }

            arcFov = this.lerp(from.fov, to.fov, easedT);

            this.keyframes.push({
                angleX: arcAngleX,
                angleY: arcAngleY,
                zoom: arcZoom,
                fov: arcFov,
                progress: easedT
            });
        }
    }

    // V7.1 EASING FUNCTIONS: Cinematic motion curves
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    // V7.1 STAGE TRANSITIONS: Initiate smooth camera moves
    setStage(stageIndex, subStage = null) {
        if (stageIndex >= 0 && stageIndex < this.cinematicStages.length) {
            const fromStage = this.currentStage;
            const toStage = stageIndex;

            // Handle sub-stage for Approach stage
            if (toStage === 1 && subStage) { // Approach stage has sub-stages
                this.currentSubStage = subStage;
            } else if (toStage === 1 && !subStage) {
                // Default to media sub-stage for Approach
                this.currentSubStage = 'media';
            }

            if (fromStage !== toStage) {
                this.generateTransitionKeyframes(fromStage, toStage);
                this.startTransition(fromStage, toStage);
            }

            this.currentStage = stageIndex;
            this.manualMode = false;
            this.playingSequence = false;
        }
    }

    // SUB-STAGE TRANSITIONS: Handle balcony rotation within Approach stage
    setSubStage(subStage) {
        if (this.currentStage === 1 && this.cinematicStages[1].subStages[subStage]) {
            const fromSubStage = this.currentSubStage;
            const toSubStage = subStage;

            if (fromSubStage !== toSubStage) {
                this.generateSubStageTransitionKeyframes(fromSubStage, toSubStage);
                this.startSubStageTransition(fromSubStage, toSubStage);
            }

            this.currentSubStage = subStage;
        }
    }

    generateSubStageTransitionKeyframes(fromSubStage, toSubStage) {
        const approachStage = this.cinematicStages[1];
        const from = approachStage.subStages[fromSubStage];
        const to = approachStage.subStages[toSubStage];

        this.keyframes = [];
        const numKeyframes = 120; // Ultra-smooth with 120 keyframes

        for (let i = 0; i <= numKeyframes; i++) {
            const t = i / numKeyframes;

            // Smooth easing for 120° rotation
            let easedT;
            if (t < 0.5) {
                easedT = 2 * t * t; // Ease in quadratic
            } else {
                easedT = 1 - 2 * Math.pow(1 - t, 2); // Ease out quadratic
            }

            // Smoother arc with less dramatic movement
            // Peak at 30 degrees vertical for smoother transition
            const arcProgress = Math.sin(t * Math.PI);
            const arcAngleX = this.lerp(from.angleX, to.angleX, easedT) + (arcProgress * 0.5236); // 30 degrees in radians
            const arcAngleY = this.lerp(from.angleY, to.angleY, easedT);

            // Gentler zoom during transition
            const baseZoom = this.lerp(from.zoom, to.zoom, easedT);
            const zoomArc = baseZoom * (1 - arcProgress * 0.15); // Zoom out only 15% at peak

            const arcFov = this.lerp(from.fov, to.fov, easedT);

            this.keyframes.push({
                angleX: arcAngleX,
                angleY: arcAngleY,
                zoom: zoomArc,
                fov: arcFov,
                progress: easedT
            });
        }
    }

    startSubStageTransition(fromSubStage, toSubStage) {
        this.isTransitioning = true;
        this.transitionStartTime = millis();
        this.currentKeyframe = 0;
        this.transitionProgress = 0;
        // Store original transition duration and use shorter one for sub-stages
        this.originalTransitionDuration = this.transitionDuration;
        this.transitionDuration = 2500; // 2.5 seconds for very smooth sub-stage transitions
        this.isSubStageTransition = true;

        console.log(`🎬 Sub-stage transition: ${fromSubStage} → ${toSubStage} (120° rotation with arc)`);
    }

    // Get current effective stage (including sub-stage info)
    getCurrentStageInfo() {
        const baseStage = this.cinematicStages[this.currentStage];

        if (this.currentStage === 1 && baseStage.subStages) {
            // Return sub-stage info for Approach stage
            return {
                ...baseStage.subStages[this.currentSubStage],
                stageName: baseStage.name,
                stageIndex: this.currentStage,
                subStageName: this.currentSubStage
            };
        }

        return {
            ...baseStage,
            stageIndex: this.currentStage
        };
    }

    startTransition(fromStage, toStage) {
        this.isTransitioning = true;
        this.transitionStartTime = millis();
        this.fromStage = fromStage;
        this.toStage = toStage;
        this.currentKeyframe = 0;
        this.transitionProgress = 0;

        console.log(`🎬 V7.1 Transitioning: ${this.cinematicStages[fromStage].name} → ${this.cinematicStages[toStage].name}`);
    }

    updateTransition() {
        if (!this.isTransitioning) return;

        const elapsed = millis() - this.transitionStartTime;
        this.transitionProgress = Math.min(elapsed / this.transitionDuration, 1.0);

        // V7.1 KEYFRAME PLAYBACK: Smooth interpolation through keyframes
        const keyframeIndex = Math.floor(this.transitionProgress * (this.keyframes.length - 1));
        const keyframe = this.keyframes[Math.min(keyframeIndex, this.keyframes.length - 1)];

        if (keyframe) {
            this.angleX = keyframe.angleX;
            this.angleY = keyframe.angleY;
            this.zoom = keyframe.zoom;
            this.fov = keyframe.fov;
        }

        // Complete transition
        if (this.transitionProgress >= 1.0) {
            this.isTransitioning = false;

            // Handle sub-stage vs main stage transitions differently
            if (this.isSubStageTransition) {
                // Restore original duration for main transitions
                this.transitionDuration = this.originalTransitionDuration || 6000;
                this.isSubStageTransition = false;
                // For sub-stage, use the current sub-stage settings
                const currentStageInfo = this.getCurrentStageInfo();
                this.angleX = currentStageInfo.angleX;
                this.angleY = currentStageInfo.angleY;
                this.zoom = currentStageInfo.zoom;
                this.fov = currentStageInfo.fov;
                console.log(`🎬 Sub-stage transition complete`);
            } else {
                const finalStage = this.cinematicStages[this.toStage];
                this.angleX = finalStage.angleX;
                this.angleY = finalStage.angleY;
                this.zoom = finalStage.zoom;
                this.fov = finalStage.fov;
                console.log(`🎬 V7.1 Transition complete: ${finalStage.name}`);
            }
        }
    }

    // V7.1 SEQUENCE PLAYBACK: Automatic progression through all stages
    playFullSequence() {
        this.playingSequence = true;
        this.sequenceStage = 0;
        this.sequenceStartTime = millis();
        this.setStage(0);
    }

    updateSequence() {
        if (!this.playingSequence) return;

        const elapsed = millis() - this.sequenceStartTime;
        const stageTime = this.transitionDuration + this.stageHoldDuration;

        if (elapsed > stageTime && !this.isTransitioning) {
            this.sequenceStage++;
            if (this.sequenceStage < this.cinematicStages.length) {
                this.setStage(this.sequenceStage);
                this.sequenceStartTime = millis();
                this.playingSequence = true; // Re-enable since setStage disables it
            } else {
                this.playingSequence = false;
                console.log("🎬 V7.1 Full sequence complete");
            }
        }
    }

    stopTransition() {
        this.isTransitioning = false;
        this.playingSequence = false;
    }

    previewTransition(fromStage, toStage) {
        this.currentStage = fromStage;
        this.setStage(toStage);
    }

    // Manual control overrides
    handleMousePressed() {
        this.stopTransition();
        this.isDragging = true;
        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
        this.manualMode = true;
    }

    handleMouseReleased() {
        this.isDragging = false;
    }

    handleMouseDragged() {
        if (this.isDragging) {
            const deltaX = mouseX - this.lastMouseX;
            const deltaY = mouseY - this.lastMouseY;

            this.angleY += deltaX * this.sensitivity;
            this.angleX += deltaY * this.sensitivity;

            this.lastMouseX = mouseX;
            this.lastMouseY = mouseY;
        }
    }

    handleMouseWheel(event) {
        this.stopTransition();
        this.zoom += event.delta * this.zoomSensitivity;
        this.zoom = Math.max(50, Math.min(2500, this.zoom));
        this.manualMode = true;
    }

    applyCamera() {
        // V7.1 CINEMATIC CAMERA: Apply current position and FOV

        // Set perspective FIRST for proper clipping
        perspective(radians(this.fov), width / height, 10, 10000);

        const camX = this.zoom * cos(this.angleX) * cos(this.angleY);
        const camY = this.zoom * sin(this.angleX);
        const camZ = this.zoom * cos(this.angleX) * sin(this.angleY);

        camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
    }

    getCurrentInfo() {
        const currentStageData = this.cinematicStages[this.currentStage];
        return {
            version: "7.1",
            currentStage: this.currentStage,
            stageName: currentStageData.name,
            stageDescription: currentStageData.description,
            narrative: currentStageData.narrative,
            angleX: this.angleX,
            angleY: this.angleY,
            zoom: this.zoom,
            fov: this.fov,
            isTransitioning: this.isTransitioning,
            transitionProgress: this.transitionProgress,
            playingSequence: this.playingSequence,
            manualMode: this.manualMode
        };
    }

    update() {
        this.updateIntro();
        this.updateTransition();
        this.updateSequence();
    }

    // INTRO SEQUENCE: Automatic atmospheric spin on load
    updateIntro() {
        if (!this.playingIntro) return;

        // Initialize intro timer
        if (this.introStartTime === 0) {
            this.introStartTime = millis();
        }

        const elapsed = millis() - this.introStartTime;

        // Continue intro spin - clockwise rotation gradually revealing torus
        if (elapsed < this.introDuration) {
            // Clockwise rotation from hidden position to overview position
            const progress = elapsed / this.introDuration;

            // Smooth easing for gradual reveal
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

            // Interpolate from hidden start position to overview position
            this.angleY = this.introStartAngleY + (this.cinematicStages[0].angleY - this.introStartAngleY) * easedProgress;

            // Slight breathing motion on zoom for atmosphere
            const breathFactor = Math.sin(elapsed * 0.001) * 0.02;
            this.zoom = this.cinematicStages[0].zoom + (this.cinematicStages[0].zoom * breathFactor);
        } else {
            // Intro complete - snap to exact overview position
            this.playingIntro = false;
            this.introCompleted = true;
            this.angleX = this.cinematicStages[0].angleX;
            this.angleY = this.cinematicStages[0].angleY;
            this.zoom = this.cinematicStages[0].zoom;
            this.fov = this.cinematicStages[0].fov;

            console.log('🌀 Clockwise intro complete - Torus revealed, portal ready for entry');

            // Notify UI that intro is complete
            if (typeof window !== 'undefined' && window.onIntroComplete) {
                window.onIntroComplete();
            }
        }
    }

    // Check if intro is still playing
    isIntroPlaying() {
        return this.playingIntro;
    }
}

// Use the refined torus from V6.6 as the base
class RefinedTorusController {
    constructor() {
        this.majorRadius = 120;
        this.minorRadius = 100;
        this.centerHoleRadius = 2;
        this.orangeColor = [255, 140, 0];
        this.orangeAlpha = 220;
        this.totalSpirals = 24; // Good density without overdoing it
        this.spiralSet1 = [];
        this.spiralSet2 = [];
        this.rotationOffset = 0; // Smooth rotation offset
        this.generateAllSpirals();
    }

    generateAllSpirals() {
        const time = this.rotationOffset; // Use smooth rotation offset
        this.spiralSet1 = [];
        this.spiralSet2 = [];

        // Create evenly distributed spirals
        for (let i = 0; i < this.totalSpirals; i++) {
            const spiral = [];

            // Even distribution around the torus
            const baseAngle = (i / this.totalSpirals) * TWO_PI;

            // Alternate direction for every other spiral
            const isClockwise = i % 2 === 0;
            const timeOffset = isClockwise ? time : -time;
            const startAngle = baseAngle + timeOffset;

            // Optimized for ultra-smooth appearance
            const totalRotations = 3.5; // Good spiral coverage
            const numPoints = 300; // Very smooth curves
            const maxT = 1.2; // Proper wrapping

            for (let j = 0; j <= numPoints; j++) {
                const t = (j / numPoints) * maxT;

                // Simple linear progression for clean lines
                const smoothT = t; // Linear for clean wireframe

                const spiralProgress = smoothT * TWO_PI * totalRotations;
                const u = isClockwise ?
                    startAngle + spiralProgress :
                    startAngle - spiralProgress;

                // Clean vertical progression
                const v = smoothT * TWO_PI * 1.5;

                // No radius variation for clean wireframe look
                const adjustedMinor = this.minorRadius;

                // Calculate position with smooth interpolation
                const x = (this.majorRadius + adjustedMinor * cos(v)) * cos(u);
                const y = adjustedMinor * sin(v);
                const z = (this.majorRadius + adjustedMinor * cos(v)) * sin(u);

                spiral.push(createVector(x, y, z));
            }

            // Add to appropriate set
            if (isClockwise) {
                this.spiralSet1.push(spiral);
            } else {
                this.spiralSet2.push(spiral);
            }
        }
    }

    drawAllSpirals() {
        noFill();
        strokeCap(ROUND);
        strokeJoin(ROUND);

        // Balanced line thickness for smooth appearance
        stroke(this.orangeColor[0], this.orangeColor[1], this.orangeColor[2], this.orangeAlpha);
        strokeWeight(8.0); // Thicker for better visibility

        // Draw with standard vertices for better performance
        this.spiralSet1.forEach(spiral => {
            beginShape();
            spiral.forEach(point => {
                vertex(point.x, point.y, point.z);
            });
            endShape();
        });

        this.spiralSet2.forEach(spiral => {
            beginShape();
            spiral.forEach(point => {
                vertex(point.x, point.y, point.z);
            });
            endShape();
        });
    }

    updateAnimation() {
        // Increment rotation smoothly
        this.rotationOffset += 0.003; // Small, consistent increment
        this.generateAllSpirals();
    }

    draw() {
        this.drawAllSpirals();
    }
}

class CinematicTorusController {
    constructor() {
        this.cameraController = new CinematicCameraController();
        this.torusController = new RefinedTorusController();
        this.animateSpirals = true;
    }

    update() {
        this.cameraController.update();

        if (this.animateSpirals) {
            // Update every frame for smoothest animation
            this.torusController.updateAnimation();
        }
    }

    draw() {
        background(0);
        this.update();
        this.cameraController.applyCamera();
        this.torusController.draw();
    }

    setStage(stageIndex) {
        this.cameraController.setStage(stageIndex);
    }

    previewTransition(fromStage, toStage) {
        this.cameraController.previewTransition(fromStage, toStage);
    }

    playFullSequence() {
        this.cameraController.playFullSequence();
    }

    stopTransition() {
        this.cameraController.stopTransition();
    }

    getCurrentInfo() {
        return this.cameraController.getCurrentInfo();
    }
}

// Global variables
let cinematicController;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cinematicController = new CinematicTorusController();
    window.cinematicController = cinematicController; // Expose to global scope
}

function draw() {
    cinematicController.draw();
    displayInfo();
}

function displayInfo() {
    camera();
    fill(255, 140, 0, 200);
    textAlign(LEFT);
    textSize(14);

    const info = cinematicController.getCurrentInfo();
    text(`🎬 Cinematic V${info.version} - Stage ${info.currentStage + 1}: ${info.stageName}`, -width/2 + 20, -height/2 + 30);

    textSize(11);
    text(info.stageDescription, -width/2 + 20, -height/2 + 50);
    text(`Camera: Zoom=${Math.round(info.zoom)} | Tilt=${info.angleX.toFixed(2)} | Pan=${info.angleY.toFixed(2)} | FOV=${Math.round(info.fov)}°`, -width/2 + 20, -height/2 + 70);

    let statusText = info.manualMode ? 'Manual' :
                     info.isTransitioning ? `Transitioning... ${Math.round(info.transitionProgress * 100)}%` :
                     info.playingSequence ? 'Playing Sequence' : 'Stage Set';

    text(`Status: ${statusText}`, -width/2 + 20, -height/2 + 90);

    // Narrative text
    textSize(10);
    fill(255, 140, 0, 150);
    text(`"${info.narrative}"`, -width/2 + 20, -height/2 + 110);

    textSize(9);
    fill(255, 140, 0, 100);
    text(`Keys: 1-7 stages | P: play sequence | S: stop | Mouse: manual control`, -width/2 + 20, -height/2 + 130);
    text(`V7.1 Features: Overview first, any→any transitions, top-down preserved`, -width/2 + 20, -height/2 + 150);
}

// Event handlers
function mousePressed() {
    cinematicController.cameraController.handleMousePressed();
}

function mouseReleased() {
    cinematicController.cameraController.handleMouseReleased();
}

function mouseDragged() {
    cinematicController.cameraController.handleMouseDragged();
}

function mouseWheel(event) {
    cinematicController.cameraController.handleMouseWheel(event);
    return false;
}

function keyPressed() {
    if (key >= '1' && key <= '7') {
        const stageIndex = parseInt(key) - 1;
        cinematicController.setStage(stageIndex);
    } else {
        switch(key.toLowerCase()) {
            case 'p':
                cinematicController.playFullSequence();
                break;
            case 's':
                cinematicController.stopTransition();
                break;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}