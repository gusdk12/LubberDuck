//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

let scene = null;
let camera = null;
let renderer = null;

window.addEventListener('load', () => {

    // 3D 씬 빌드
    build3DScene();
    // 렌더링 시작
    start3DRender();
});

function build3DScene(){
    scene = new THREE.Scene();
    // 카메라
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 카메라 배경색깔
    scene.background = new THREE.Color(0x0D6965);

    // 오리 모델
    let object;
    let objToRender = 'duck-duck';

    // GLTF 로더
    const loader = new GLTFLoader();

    // 모델 로드
    loader.load(
        `models/${objToRender}/scene.gltf`,
        function (gltf) {
            //If the file is loaded, add it to the scene
            object = gltf.scene;
            scene.add(object);

            $('#loadingsection').css('opacity', '0');
            $('#loadingsection').css('pointer-events', 'none');

        }
    );

    // renderer 세팅
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //Alpha: 배경 투명
    renderer.setSize(window.innerWidth, window.innerHeight);

    // renderer를 html에 추가
    document.getElementById("container3D").appendChild(renderer.domElement);

    // 카메라를 오리 기준으로 맞추기.
    camera.position.z = 3;
    camera.position.y = -1;
    camera.lookAt(scene.position);

    // 씬에 빛 추가
    const topLight = new THREE.DirectionalLight(0xffffff, 1000); // (color, intensity)
    topLight.position.set(500, 500, 500) //top-left-ish
    topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
    scene.add(ambientLight);

    let light = new THREE.PointLight(0xffffff,10000);
    light.position.set(0, 0, 0);
    scene.add(light);
}

// 오리 기준 카메라 회전
let angle = -1.2;
const radius = 3;  // Distance from the object
let targetAngle = -1.2;

document.onwheel = (e) => {
    if(targetAngle <= -1.2 && e.deltaY < 0) return;
    if(targetAngle > 1.6 && e.deltaY > 0) return;
    targetAngle += e.deltaY * 0.0005;
};

const messages = ["안녕하세요, 저희는 팀 러버덕입니다!"
                        , "저희 홈페이지에서는, 비대면으로 칵테일을 주문할 수 있습니다."
                        , "주문한 칵테일들의 목록을 확인할 수 있고, 리뷰를 작성할 수도 있습니다!"
                        , "좋아하시는 칵테일이 있다면, 즐겨찾기를 하셔도 좋죠."
                        , "AI 바텐더에게 칵테일 추천을 받아보는건 어떨까요?"
                        , "칵테일 바 관리자시라면, 판매 차트를 보실 수 있고, 메뉴와 캘린더 관리를 하실 수 있습니다!"
                        , "저희 홈페이지로 출발해볼까요?"];

function updateMessage() {
    const messagesDiv = document.getElementById("card");
    const goto = document.getElementById("goto");

    if (angle < -1.2) {
        messagesDiv.textContent = "";
    } else if (angle >= -1.2 && angle < -1.0) {
        const message = messages[0];
        const progress = (angle + 1.2) / 0.2; // Normalize angle from -1 to -0.7 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
    } else if (angle >= -1.0 && angle < -0.8) {
        messagesDiv.textContent = messages[0]; // Ensure the final message is fully shown at -0.5
    } else if (angle >= -0.8 && angle < -0.6) {
        const message = messages[1];
        const progress = (angle + 0.8) / 0.2; // Normalize angle from -0.7 to -0.5 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
    } else if (angle >= -0.6 && angle < -0.4) {
        messagesDiv.textContent = messages[1]; // Ensure the final message is fully shown at -0.5
    } else if (angle >= -0.4 && angle < -0.2) {
        const message = messages[2];
        const progress = (angle + 0.4) / 0.2; // Normalize angle from -0.7 to -0.5 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
    } else if (angle >= -0.2 && angle < 0.0) {
        messagesDiv.textContent = messages[2]; // Ensure the final message is fully shown at -0.5
    } else if (angle >= 0.0 && angle < 0.2) {
        const message = messages[3];
        const progress = (angle - 0.0) / 0.2; // Normalize angle from -0.7 to -0.5 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
    } else if (angle >= 0.2 && angle < 0.4) {
        messagesDiv.textContent = messages[3]; // Ensure the final message is fully shown at -0.5
    } else if (angle >= 0.4 && angle < 0.6) {
        const message = messages[4];
        const progress = (angle - 0.4) / 0.2; // Normalize angle from -0.7 to -0.5 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
    } else if (angle >= 0.6 && angle < 0.8) {
        messagesDiv.textContent = messages[4]; // Ensure the final message is fully shown at -0.5
    } else if (angle >= 0.8 && angle < 1.0) {
        const message = messages[5];
        const progress = (angle - 0.8) / 0.2; // Normalize angle from -0.7 to -0.5 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
    } else if (angle >= 1.0 && angle < 1.2) {
        messagesDiv.textContent = messages[5]; // Ensure the final message is fully shown at -0.5
    } else if (angle >= 1.2 && angle < 1.4) {
        const message = messages[6];
        const progress = (angle - 1.2) / 0.2; // Normalize angle from -0.7 to -0.5 to 0 to 1
        const charsToShow = Math.min(Math.floor(message.length * progress), message.length);
        messagesDiv.textContent = message.substring(0, charsToShow);
        $('#goto').css('opacity', '0');
        $('#goto').css('pointer-events', 'none');
    } else if (angle >= 1.4 && angle < 1.6) {
        messagesDiv.textContent = messages[6]; // Ensure the final message is fully shown at -0.5
        $('#goto').css('opacity', '1');
        $('#goto').css('pointer-events', 'visible');
    }
}
function start3DRender() {
    requestAnimationFrame(start3DRender);

    // 카메라 회전이 부드럽도록
    angle += (targetAngle - angle) * 0.05;

    // 카메라 위치 업데이트
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(scene.position);

    updateMessage();

    // controls.update();
    renderer.render(scene, camera);
}

// 윈도우 사이즈가 변경되었을 때 맞추기 위함
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
