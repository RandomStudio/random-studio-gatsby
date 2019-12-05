import React, { useRef, useEffect, useState } from 'react';
import {
  Animation,
  SpotLight,
  HemisphericLight,
  StandardMaterial,
  MirrorTexture,
  Engine,
  MeshBuilder,
  Mesh,
  Scene,
  Vector3,
  SceneLoader,
  Color3,
  ArcRotateCamera,
  Plane,
  ShadowGenerator,
} from 'babylonjs';
import 'babylonjs-loaders';
import styles from './Wonder.module.scss';

// Scenes
import Couch from '../Wonder/scenes/Couch';
import Island from '../Wonder/scenes/Island';
import Lighting from './Lighting/Lighting';

const Wonder = () => {
  const mirrorRef = useRef();
  const canvasRef = useRef();
  const [canvasVisible, setCanvasVisible] = useState(false);
  const {
    camera: cameraVectors,
    filename,
    modelVectors,
    mirrors,
  } = [Couch, Couch][Math.round(Math.random())];
  const [currentScene, setCurrentScene] = useState(null);

  useEffect(() => {
    let engine;
    let world;

    const createEngine = () => {
      engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
    };

    const createScene = () => {
      const scene = new Scene(engine);
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);
      scene.debugLayer.show();
      return scene;
    };

    const addCamera = scene => {
      const camera = new ArcRotateCamera('camera', 0, 0, 0, cameraVectors.target, scene, true);
      camera.setPosition(cameraVectors.rotation);
      camera.setTarget(cameraVectors.target);
      camera.attachControl(canvasRef.current, true);
      camera.minZ = 0;
      return camera;
    };

    const addModel = async scene => {
      SceneLoader.ShowLoadingScreen = false;
      await SceneLoader.AppendAsync('/models/', filename, scene);
      // Cleanup unneeded meshes
      const world = scene.meshes.find(mesh => mesh.id === '__root__');
      console.log(scene.meshes);
      scene.meshes.forEach(m => {
        m.scaling.z = 1;
      });
      // world.position = new Vector3(0, -20, 100);
      world.position = new Vector3(5, -8, 50);
      return world;
    };

    const addMirrors = (model, scene) => {
      mirrors.forEach(mirrorState => {
        const mirror = MeshBuilder.CreatePlane('glass', {
          width: mirrorState.width,
          height: mirrorState.height,
        }, scene);
        mirror.parent = model;
        mirror.position = mirrorState.position;
        mirror.rotation = mirrorState.rotation;
        mirror.computeWorldMatrix(true);
        mirrorRef.current = mirror;
        const mirrorWorldMatrix = mirror.getWorldMatrix();
        const mirrorVertexData = mirror.getVerticesData('normal');
        let mirrorNormal = new Vector3(mirrorVertexData[0], mirrorVertexData[1], mirrorVertexData[2]);
        mirrorNormal = new Vector3.TransformNormal(mirrorNormal, mirrorWorldMatrix);

        const reflector = new Plane.FromPositionAndNormal(mirror.position, mirrorNormal.scale(-1));
        const mirrorMaterial = new StandardMaterial('MirrorMat', scene);
        mirrorMaterial.diffuseColor = new Color3(0.1, 0.1, 0.1);
        mirrorMaterial.reflectionTexture = new MirrorTexture('mirror', 1024, scene, true);
        mirrorMaterial.reflectionTexture.mirrorPlane = reflector;
        console.log(scene.meshes.filter(mesh => mesh.id !== 'glass'))
        mirrorMaterial.reflectionTexture.renderList = scene.meshes.filter(mesh => mesh.id !== 'glass');
        mirror.material = mirrorMaterial;
      });
    };

    const setupRenderLoop = scene => {
      engine.runRenderLoop(() => {
        scene.render();
      });
    };

    const setupModelAnimation = (scene, model) => {
      const rotAnim = new Animation('rotationAnim', 'rotation', 15, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      rotAnim.setKeys(modelVectors);
      model.animations.push(rotAnim);
      scene.beginAnimation(model, 0, 3000, true);
    };

    const onResize = () => engine.resize();

    const onMouseMove = e => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const widthPercentage = (e.pageX - (width / 2)) / width;
      const heightPercentage = (e.pageY - (height / 2)) / height;
      world.rotation = new Vector3(heightPercentage * -0.1, widthPercentage * -0.4, 0);
    };

    const createGLScene = async () => {
      createEngine();
      const scene = createScene();
      const camera = addCamera(scene);
      world = await addModel(scene);
      world.rotation = new Vector3(0, 0, 0);
      addMirrors(world, scene);

      scene.executeWhenReady(() => {
        setupRenderLoop(scene, camera);
        //setupCameraAnimation(scene, camera);
        //setupModelAnimation(scene, model);
        //setupLightAnimation(scene, light);
        setCurrentScene(scene);
        setCanvasVisible(true);
      });

      window.addEventListener('resize', onResize);
      window.addEventListener('mousemove', onMouseMove);
    };

    if (canvasRef.current) {
      createGLScene();
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  }, [canvasRef]);

  return (
    <>
      <canvas ref={canvasRef} className={`${styles.canvas} ${canvasVisible && styles.isVisible}`} />
      <Lighting layout={Couch.light} scene={currentScene} />
      <Lighting layout={Couch.light} scene={currentScene} />
    </>
  );
};

export default Wonder;
