import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Girl } from './Girl.js';
import { Collectible } from './Collectible.js';
import * as YUKA from "yuka";

export function MyRender(scene, callback) {
    // let entityManager, time;
    // game setup

    let entityManager = new YUKA.EntityManager();
    let time = new YUKA.Time();
    
    // const planeGeometry = new THREE.PlaneGeometry(50, 50);
    // const plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
    // plane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    // scene.add(plane);



    const groundGeometry = new THREE.PlaneGeometry( 10, 10 );
    const groundMaterial = new THREE.MeshPhongMaterial( { color: 0x999999 } );

    const groundMesh = new THREE.Mesh( groundGeometry, groundMaterial );
    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.matrixAutoUpdate = false;
    groundMesh.receiveShadow = true;
    groundMesh.updateMatrix();
    scene.add( groundMesh );


    const glTFLoader = new GLTFLoader(new THREE.LoadingManager(callback));
    glTFLoader.load( 'yuka.glb', ( gltf ) => {
        				// add object to scene

				const avatar = gltf.scene;
				avatar.matrixAutoUpdate = false;
				avatar.animations = gltf.animations;

				avatar.traverse( ( object ) => {

					if ( object.isMesh ) {

						object.material.transparent = true;
						object.material.opacity = 1;
						object.material.alphaTest = 0.7;
						object.material.side = THREE.DoubleSide;
						object.castShadow = true;

					}

				} );

				scene.add( avatar );

				const mixer = new THREE.AnimationMixer( avatar );
				const animations = new Map();

				animations.set( 'IDLE', createAnimationAction( mixer, 'Character_Idle' ) );
				animations.set( 'WALK', createAnimationAction( mixer, 'Character_Walk' ) );
				animations.set( 'GATHER', createAnimationAction( mixer, 'Character_Gather' ) );
				animations.set( 'RIGHT_TURN', createAnimationAction( mixer, 'Character_RightTurn' ) );
				animations.set( 'LEFT_TURN', createAnimationAction( mixer, 'Character_LeftTurn' ) );

				const girl = new Girl( mixer, animations );
				girl.setRenderComponent( avatar, sync );

				scene.add( avatar );
				entityManager.add( girl );

				const collectibleGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
				collectibleGeometry.translate( 0, 0.1, 0 );
                
				const collectibleMaterial = new THREE.MeshBasicMaterial( { color: 0x040404 } );

				for ( let i = 0; i < 5; i ++ ) {
					const collectibleMesh = new THREE.Mesh( collectibleGeometry, collectibleMaterial );
					collectibleMesh.matrixAutoUpdate = false;
					collectibleMesh.castShadow = true;

					const collectible = new Collectible();
					collectible.setRenderComponent( collectibleMesh, sync );
					collectible.spawn();

					scene.add( collectibleMesh );
					entityManager.add( collectible );
				}
    });

    return [ entityManager, time ];
}

function createAnimationAction( mixer, clip ) {
    let action = mixer.clipAction( clip );
    action.play();
    action.enabled = false;
    return action;
}

function sync( entity, renderComponent ) {
    renderComponent.matrix.copy( entity.worldMatrix );
	renderComponent.matrixAutoUpdate = false;
	renderComponent.updateMatrixWorld(true);	
}



