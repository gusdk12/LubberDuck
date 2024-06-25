$(document).ready(function () {
    $("#manunav").show();

    // 사이드바 메뉴 클릭시 css 변경
    $('.chart').eq(0).css({
        'background-color': '#FDF8F1',
        'border-radius': "10px 0 0 10px",
        'color': '#54320f',
        'font-weight': 'bold'
    });

    // 데이터 수집
    const quantities = [];
    const labels = [];
    const menuIds = [];
    const img_urls = [];
    const backgroundColors = [];

    for (i = 0; i < orderList.length; i++){
        quantities.push(`${orderList[i].quantity}`);
        labels.push(`${orderList[i].menu.name}`);
        menuIds.push(`${orderList[i].menu.id}`);
        img_urls.push(`${orderList[i].menu.imgUrl}`);

        // 배경색과 선 색상의 투명도 설정
        const backgroundColor = getRandomRGBA(0.2);
        backgroundColors.push(backgroundColor);
    }

    // 차트 생성 함수 호출
    // createMenuChart(labels, quantities, img_urls);

// function createMenuChart(labels, quantities, img_urls) {
    const ctx = $('#menuChart').get(0).getContext('2d');
    // $('#menuChart').get(0).width = $('#menuChart').get(0).clientWidth;
    // $('#menuChart').get(0).height = $('#menuChart').get(0).clientHeight;
    // 이미지 객체 배열 생성
    const images = img_urls.map(url => {
        const img = new Image();
        img.src = url;
        return img;
    });

    // // 캔버스 해상도를 높게 설정합니다
    // const scale = window.devicePixelRatio; // 디바이스 픽셀 비율을 가져옵니다
    // $('#menuChart').get(0).width = $('#menuChart').get(0).width * scale;
    // $('#menuChart').get(0).height = $('#menuChart').get(0).height * scale;
    // ctx.scale(scale, scale);

    // Chart.js 플러그인 정의
    const plugin = {
        id: 'customPlugin',
        afterDatasetDraw: (chart, args, options) => {
            const {ctx, chartArea: {left}, scales: {y}} = chart;
            const imgWidth = 60; // 이미지 너비 조절
            const imgHeight = 90; // 이미지 높이 조절
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
            labels: labels,
            datasets: [{
                label: '',
                data: quantities,
                backgroundColor: backgroundColors, // 각 데이터 포인트에 대한 배경색 배열
                borderColor: getRandomRGBA(1.0), // 선 색상의 투명도 1.0로 설정, // 각 데이터 포인트에 대한 선색 배열
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true, // 반응형 차트 설정
            maintainAspectRatio: true, // 비율 유지 설정
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
            plugins: [plugin] // 위에서 정의한 플러그인 추가
        }
    });

}); // end ready()

function getRandomRGBA(alpha) {
    // 랜덤한 RGB 값 생성
    var r = Math.floor(Math.random() * 256); // 0부터 255 사이의 랜덤한 값
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // RGBA 문자열로 반환
    var rgbaString = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    return rgbaString;
}