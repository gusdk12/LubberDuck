$(document).ready(function () {
    $("#menunav").show();

    // 사이드바 메뉴 클릭시 css 변경
    $('.chart').eq(1).css({
        'background-color': '#F9F2E8',
        'border-radius': "10px 0 0 10px",
        'color': '#54320f',
        'font-weight': 'bold'
    });
}); // end ready()

// 연령별 최대 판매량과 메뉴 정보를 저장할 객체
let maxSalesByAgeGroup = {};

// 연령별 최대 판매량과 메뉴 정보 찾기
orderAgeList.forEach(function (item) {
    let ageGroup = item.ageGroup;
    let totalQuantity = item.totalQuantity;
    let menuName = item.menuName;
    let menuImage = item.menuImage;

    // 해당 연령대의 최대 판매량 기록 확인
    if (!maxSalesByAgeGroup[ageGroup] || totalQuantity > maxSalesByAgeGroup[ageGroup].totalQuantity) {
        maxSalesByAgeGroup[ageGroup] = {
            ageGroup: ageGroup,
            totalQuantity: totalQuantity,
            menuName: menuName,
            menuImage: menuImage,
        };
    }
});

// maxSalesByAgeGroup 객체에서 데이터셋 생성
let labels = [];
let data = [];
let backgrounds = [];
let imgUrl = [];
Object.keys(maxSalesByAgeGroup).forEach(function (ageGroup) {
    let maxSalesData = maxSalesByAgeGroup[ageGroup];
    labels.push(maxSalesData.ageGroup + '대 : ' + maxSalesData.menuName);
    data.push(maxSalesData.totalQuantity);
    backgrounds.push(getRandomRGBA(0.2));
    imgUrl.push(maxSalesData.menuImage);
});

// 이미지 객체 배열 생성
const images = imgUrl.map(url => {
    const img = new Image();
    img.src = url;
    return img;
});

// 이미지 플러그인 정의
const imagePlugin = {
    id: 'imagePlugin',
    afterDatasetDraw: (chart, args, options) => {
        const {ctx, chartArea: {left}, scales: {y}} = chart;
        const imgWidth = 60 // 이미지 너비 조절
        const imgHeight = 80; // 이미지 높이 조절
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
const ctx = $('#ageChart').get(0).getContext('2d');
const ageChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '             인기 메뉴 판매량',
            data: data,
            backgroundColor: backgrounds,
            borderColor: getRandomRGBA(1.0),
            borderWidth: 1,
            borderRadius: 40
        }]
    },
    options: {
        responsive: true, // 반응형 차트 설정
        maintainAspectRatio: false, // 비율 유지 설정
        height: 680, // 차트의 높이  설정
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
                right: 80 // 오른쪽 여백을 늘려 이미지가 잘리지 않도록 설정
            }
        },
        barThickness: 60, // 막대 두께 설정
    },
    plugins: [imagePlugin]
});

const $container = $('.chart_containerBody');
const totalLabels = ageChart.data.labels.length;
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