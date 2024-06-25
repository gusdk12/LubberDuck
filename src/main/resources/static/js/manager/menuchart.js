$(document).ready(function () {
    $("#manunav").show();

    // 사이드바 메뉴 클릭시 css 변경
    $('.chart').eq(0).css({
        'background-color': '#FDF8F1',
        'border-radius': "10px 0 0 10px",
        'color': '#54320f',
        'font-weight': 'bold'
    });
}); // end ready()

// 데이터 수집
const quantities = [];
const labels = [];
const menuIds = [];
const img_urls = [];
const backgroundColors = [];

for (i = 0; i < orderList.length; i++) {
    quantities.push(`${orderList[i].quantity}`);
    labels.push(`${orderList[i].menu.name}`);
    menuIds.push(`${orderList[i].menu.id}`);
    img_urls.push(`${orderList[i].menu.imgUrl}`);

    // 배경색과 선 색상의 투명도 설정
    const backgroundColor = getRandomRGBA(0.2);
    backgroundColors.push(backgroundColor);
}

// 1. labels 배열, 이미지 배열에서 중복된 값 제거하기
const uniqueLabels = [...new Set(labels)];
const uniqueImages = [...new Set(img_urls)]

// 2. 각 고유한 label에 대해 quantities 합산하기
const summedQuantities = uniqueLabels.map(label => {
    const labelQuantities = quantities.filter((_, i) => labels[i] === label);
    return labelQuantities.reduce((sum, q) => sum + Number(q), 0);
});

const ctx = $('#menuChart').get(0).getContext('2d');
// 캔버스 해상도를 높게 설정합니다
const scale = window.devicePixelRatio; // 디바이스 픽셀 비율을 가져옵니다
$('#menuChart').get(0).width = $('#menuChart').get(0).width * scale;
$('#menuChart').get(0).height = $('#menuChart').get(0).height * scale;
ctx.scale(scale, scale);

// 이미지 객체 배열 생성
const images = uniqueImages.map(url => {
    const img = new Image();
    img.src = url;
    return img;
});

// 이미지 플러그인 정의
const imagePlugin = {
    id: 'imagePlugin',
    afterDatasetDraw: (chart, args, options) => {
        const {ctx, chartArea: {left}, scales: {y}} = chart;
        const imgWidth = 40; // 이미지 너비 조절
        const imgHeight = 55; // 이미지 높이 조절
        const padding = 5; // 이미지와 막대 끝 사이의 간격

        args.meta.data.forEach((bar, index) => {
            const img = images[index];
            const x = bar.x + padding; // 막대의 끝에서 일정한 간격을 두고 이미지 배치
            const y = bar.y - (imgHeight / 2); // 막대의 중심에 이미지를 배치

            if (img.complete) {
                ctx.drawImage(img, x, y, imgWidth, imgHeight);
            } else {
                img.onload = () => {
                    ctx.drawImage(img, x, y, imgWidth, imgHeight);
                };
            }
        });
    }
};

// Chart.js 차트 생성
const menuChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: uniqueLabels,
            datasets: [{
                label: '             칵테일 판매량      ',
                data: summedQuantities,
                backgroundColor: backgroundColors, // 각 데이터 포인트에 대한 배경색 배열
                borderColor: getRandomRGBA(1.0), // 선 색상의 투명도 1.0로 설정, // 각 데이터 포인트에 대한 선색 배열
                borderWidth: 1,
                borderRadius: 40
            }]
        },
        options: {
            responsive: true, // 반응형 차트 설정
            maintainAspectRatio: false, // 비율 유지 설정
            height: 680, // 차트의 높이를 400 픽셀로 설정
            indexAxis: 'y', // 세로 방향으로 바 차트 생성
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 // 간격을 1로 설정하여 정수값만 표시
                    }
                },
            },
            layout: {
                padding: {
                    right: 60 // 오른쪽 여백을 늘려 이미지가 잘리지 않도록 설정
                }
            },
            barThickness: 40, // 막대 두께를 30 픽셀로 설정

        },
        plugins: [imagePlugin] // 위에서 정의한 플러그인 추가
    });

const $container = $('.chart_containerBody');
const totalLabels = menuChart.data.labels.length;
if (totalLabels > 10) {
    const newWidth = 1000 + (totalLabels - 10) * 30;
    $container.css('width', `${newWidth}px`);
}

function getRandomRGBA(alpha) {
    // 랜덤한 RGB 값 생성
    var r = Math.floor(Math.random() * 256); // 0부터 255 사이의 랜덤한 값
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // RGBA 문자열로 반환
    var rgbaString = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    return rgbaString;
}