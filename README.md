# 🌟 Rubber Bar란?
<p align="right">
  <a href="https://www.youtube.com/watch?v=yM-aERb-wBk&list=PLedGoSru7949vE2KofRZ2Vg4aINCrD_jQ&index=3">‘🔗Rubber Bar 발표 영상’</a> / 
  <a href="https://www.youtube.com/watch?v=Ob8DiW1jE_0&list=PLedGoSru7949vE2KofRZ2Vg4aINCrD_jQ&index=7">‘🔗Rubber Bar 발표 화면’</a>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/6fb04655-6f1f-4fc1-aa28-d0ea09062d60" width="700" height="400">
</p>
<p align="center">‘Rubber Bar 메인 페이지 화면’</p>

## 🔍 프로젝트 특징 및 기능
- 손님들이 편리하게 주문할 수 있는 칵테일 비대면 주문과 칵테일바 사장님에게 관리자 시스템을 제공하여<br/>효율적으로 관리할 수 있는 웹사이트
- 회원/비회원 운영 시스템으로, 권한은 사용자 / 관리자 권한으로 페이지 구분을 통해<br/>손님은 비대면 주문과 마이페이지로 활동을 기록/확인하고, 관리자는 컨텐츠를 전체적으로 관리할 수 있도록 기획
- 주요 개발 기능
    - 회원가입(손님/관리자), 로그인
    - 권한별 사이트 이용
        - 비회원 - 칵테일 메뉴 조회 및 방명록 조회
        - 사용자 - 칵테일 메뉴 조회 및 주문/결제, AI 바텐더와의 채팅, 즐겨찾기 관리, 리뷰 등록 및 수정, 삭제,
          <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;방명록 작성 및 삭제(본인 것만), 위치 이동 가능
        - 관리자 - 메뉴 관리(메뉴판 추가 및 순서 변경, 삭제 / 메뉴 정보 조회 및 수정), <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;차트 관리(메뉴별 / 연령별 인기 메뉴 파악),
          캘린더 관리(오늘의 메뉴, 일정 작성), 방명록 관리(작성 및 모든 방명록 삭제 가능, 위치 이동 가능)
- **‘Cohere API’** 활용으로 AI 바텐더 챗봇 제작으로 사용자 간의 채팅 가능(칵테일 추천 및 정보 제공)

### [진행 기간]
2024년 6월 13일 ~ 2024년 7월 9일

### [기획 순서]
브레인스토밍 →  ERD 및 흐름도, 스토리보드 작성 → 개발 일정 계획 → 각 페이지 개발 시작 
<br/>→ 각 페이지 QA 진행 및  수정 → AWS 배포 → 시연 및 발표

### [역할]
<table>
  <thead align="center">
    <td>팀원명</td>
    <td>맡은 역할</td>
    <td>내용</td>
  </thead>
  <tr>
    <td align="center">송유신&nbsp; &nbsp; (팀장)</td>
    <td>- 메인 페이지<br/>- About Us 페이지<br/>- AI 바텐더 챗봇<br/>- 장바구니<br/>- 결제<br/>- Project Manager 및 개발 QA</td>
    <td>- 일정 조율, 개발QA<br/>- 3D 모델링을 활용한 About Us 페이지 제작<br/>- 메인 페이지 CSS 전담 및 구현<br/>- Cohere에서 제공하는 Command R+ AI 모델을 활용한 <br/>&nbsp; 바텐더 챗봇 구현
      <br/>- AJAX를 활용한 AI 챗봇 채팅 CRUD 구현<br/>- 장바구니 CRUD 및 프론트 구현<br/>- 카카오페이 API를 활용한 결제 기능 구현</td>
  </tr>
  <tr>
    <td align="center">신현아</td>
    <td>- 메뉴 관리 페이지<br/>- 차트 관리 페이지<br/>- 방명록 페이지</td>
    <td>- Thymeleaf와 AJAX를 활용해 메뉴 RU 및 프론트 구현<br/>- Chart.js 라이브러리를 활용해 ‘메뉴별/연령별 인기 메뉴’ 확인할 수 <br/>&nbsp; 있게 차트 페이지 구현
      <br/>- AJAX를 활용해 사용자들이 자유롭게 작성할 수 있는 방명록 CRUD <br/>&nbsp; 및 프론트 구현</td>
  </tr>
  <td align="center">유인아</td>
    <td>- 사용자 CRUD<br/>&nbsp; (OAuth2 활용)<br/>- 리뷰 목록 페이지<br/>&nbsp; (메뉴 상세 페이지)</td>
    <td>- OAuth2(네이버, 카카오)를 활용하여 사용자 CRUD 및 프론트 구현<br/>- 메뉴 상세페이지에 들어갔을 때 메뉴에 대한 리뷰 목록 확인할 수 <br/>&nbsp; 있도록 페이지 구현
      <br/>- AJAX를 이용해 페이징 구현<br/>- QA로 페이지 오류 확인</td>
  </tr>
  <td align="center">홍가연</td>
    <td>- 즐겨찾기 페이지<br/>- 최근 본 품목<br/>- 별점 평균 구현</td>
    <td>- 칵테일을 즐겨찾기로 관리할 수 있는 CRUD 및 프론트 구현<br/>- 최근 본 품목으로 최신순으로 4개까지 확인할 수 있게 보여주는 <br/>&nbsp; 프론트와 CRUD 구현
      <br/>- AJAX를 이용한 별점 평균 및 CSS 구현<br/>- EC2 RDS를 활용해 AWS에 배포</td>
  </tr>
  <td align="center">이다혜</td>
    <td>- 리뷰 페이지(마이페이지)<br/>- 주문 목록 페이지</td>
    <td>- AJAX를 통한 리뷰 CRUD 및 프론트 구현<br/>- MyBatis와 XML 데이터를 활용해 데이터 조인을 통한 주문 목록 <br/>&nbsp; 페이지 프론트 구현
      <br/>- 주문 목록 및 리뷰 내역 속 ‘최신순/별점순’ 정렬 기능 및 페이징 <br/>&nbsp; 구현</td>
  </tr>
  <td align="center">김다현</td>
    <td>- 오늘의 메뉴 페이지<br/>- 일정(캘린더) 페이지</td>
    <td>- AJAX를 활용한 오늘의 메뉴 CRUD와 일정(캘린더)를 관리할 수 <br/>&nbsp; 있는 CRUD 및 프론트 구현<br/>- 일정(캘린더)에는 메모, 오늘의 메뉴 추가하여 관리할 수 있도록 <br/>&nbsp; 구현</td>
  </tr>
</table>

# 🍸 Rubber Bar 개발
## 🛠️ 개발 기술
<p align="center">
  <img src="https://github.com/user-attachments/assets/381331a4-ba35-410a-b242-caebb4eb598c" width="800" height="400">
</p>

## 👩‍💻 내가 개발한 부분
### <메뉴 관리 페이지>
- 제작 페이지
    - 메뉴판 관리 페이지
    <p align="center">
      <img src="https://github.com/user-attachments/assets/2e7c2311-327d-47b5-bd8b-87790c57dace" width="700" height="500">
    </p>  
    
    - 메뉴 상세 정보 및 수정 페이지
    <p align="center">
      <img src="https://github.com/user-attachments/assets/dd56d307-dae2-4712-a142-15a06bf0651e" width="700" height="500">
    </p> 

- 기술 구현
<p align="center">
  <img src="https://github.com/user-attachments/assets/d7afe5a3-ba9c-4489-9b69-770999aab4d9" width="400" height="350">
  <p align="center">‘클라이언트와 서버(Menu) 간의 데이터 전송 과정’</p>
</p>

&nbsp; 메뉴 관리 페이지 중 메인 페이지에서 손님들에게 보여지는 메뉴판을 관리하는 기능을 가지고 있습니다. Thymeleaf 기능을 활용해 서버의 <br/>저장된 데이터들을 화면으로 확인할 수 있도록 구현했습니다.

&nbsp; Rubber Bar의 칵테일 메뉴들은 서버에 저장된 칵테일 목록들 중에서 계절이나 재료 등의 상황에 맞게 메뉴를 선택해 손님용 메뉴판에 구성할 수 있도록 기획하였습니다. 이를 위해 판매 메뉴들을 지정하는 방법으로 테이블 컬럼 중 ‘sequence’ 를 활용하는 방법이었습니다. 

&nbsp; sequence는 기본 -1로 설정하고, 손님용 메뉴판에 보이기 위해서는 1 이상의 숫자부터 변경하여 추가하는 방법으로 설정하였습니다. <br/>또한, 메뉴들의 순서를 변경하거나 삭제된 메뉴들은 메뉴의 고유 id, 변경된 sequence 값을 배열에 담아 저장 버튼을 눌렀을 때 한번에 Update를 할 수 있게 구현했습니다. 

<p align="center">
  <img src="https://github.com/user-attachments/assets/7ec22e08-f742-4341-a7a1-d6e4f4051990" width="600" height="400">
  <p align="center">‘변경된 sequence 값을 해당 id와 함께 서버로 전송하는 코드’</p>
</p>

 &nbsp; 이때 서버로 데이터를 전송하기 위해 JS의 큰 무기인 비동기 방식 AJAX를 활용해 관리자가 기다리지 않고 원활하게 사이트를 이용할 수 있도록 제작했습니다.

### <차트 관리 페이지>
- 제작 페이지
 <p align="center">
  <img src="https://github.com/user-attachments/assets/cdfb46dc-2977-4594-a0d7-7bbfd73ba85f" width="700" height="400">
</p> 

- 기술 구현
<p align="center">
  <img src="https://github.com/user-attachments/assets/5aa8ed55-d1e2-4e96-afec-41825ee8f005">
  <p align="center">‘데이터의 시각적 확인을 위해 “Chart.js” 라이브러리를 활용’</p>
</p>
  
&nbsp; 관리자가 시각적으로 데이터를 확인할 수 있게 실시간으로 반영할 수 있는 ‘Chart.js’ 라이브러리를 활용하여 메뉴별 판매량과 연령별 인기 <br/>칵테일을 쉽게 파악할 수 있도록 제작했습니다. 

&nbsp; 주문이 완료될 때마다 데이터를 반영하기 위해 데이터 조인이 필요하였는데, MyBatis를 사용하고 있어서 메뉴별 판매량 차트는 밑의 사진처럼 XML파일에 데이터 조인을 위한 SQL문을 작성하여 
메뉴 테이블, 주문 아이템 테이블을 조인하여 바로 화면으로 확인할 수 있습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/2b059cd5-6b1c-4fe2-8f6d-38a66fa6ffe4" width="500" height="350">
  <p align="center">‘메뉴별 판매량 데이터 조회를 위한 SQL문 작성으로 데이터 조인’</p>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/213cae6d-032d-4a2b-9213-e5fa6b1bf513" widht="600" height="300">
  <p align="center">‘연령별 인기 메뉴 데이터 조회를 위한 SQL문 작성으로 데이터 조인’</p>
</p>

&nbsp; 또한 연령별 인기 메뉴 데이터를 반영하기 위해 SQL문을 작성하여 메뉴 테이블, 주문 아이템 테이블, 주문 히스토리 테이블, 유저 테이블의 <br/>데이터 조인을 통해 연령대별로 제일 많이 판매된 메뉴를 찾아 차트에 반영하도록 작성하였습니다.

### <방명록 페이지>
&nbsp;  방명록 페이지는 기획에 포함되지 않았었지만 위의 메뉴 관리, 차트 관리 페이지들의 개발이 예상 시간보다 일찍 완성되어 새롭게 도전하고 <br/>싶은 마음과 웹사이트의 완성도를 위해 추가적으로 제작하게 되었습니다.

- 제작 페이지
<p align="center">
      <img src="https://github.com/user-attachments/assets/bbdc1d38-65ab-42c8-852a-85db30189f67" width="700" height="400">
    </p> 

- 기술 구현
<p align="center">
  <img src="https://github.com/user-attachments/assets/f579a380-04a5-4e46-ab53-481a8bd29292" width="400" height="350">
  <p align="center">‘클라이언트와 서버(Guestbook) 간의 데이터 전송 과정’</p>
</p>

&nbsp; 위의 그림처럼 페이지가 로딩되면 사용자가 지정했던 위치에 작성한 닉네임과 내용을 조회할 수 있습니다. 또, 사용자가 방명록을 추가/수정/<br/>삭제를 하게 되면 그 데이터를 전송해 서버에 반영되고, 그 데이터를 service와 restcontroller를 통해 바로 재구성하여 사용자가 확인할 수 있도록 했습니다.

&nbsp; 이를 구현하기 위해서 중요했던 점이 Z-Index 값으로, 새롭게 추가되거나 클릭했을 때 순서가 맨 위로 올라올 수 있도록 하기 위하여 서버에서 최대값을 찾아 호출하여 그 값에 1씩 더해 맨 위로 올라올 수 있도록 설정하였습니다.

### 💡 문제 상황 발생 및 해결
&nbsp; 이렇게 구현된 페이지를 실행하다가 발생된 문제가 있었는데, 데이터 전송을 하는 AJAX의 비동기로 인해 예측할 수 없는 순간에 Z-Index 값이 결정되는 것이었습니다. 

&nbsp; 이를 해결하기 위해 비동기 방식의 AJAX를 동기 방식으로 호출해 순차적으로 데이터 전송이 이루어질 수 있도록 밑의 코드처럼 변경하여 <br/>Z-Index의 문제를 해결하였습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/158e993a-9106-4141-a7c6-e1af55dabdb4" width="600" height="350">
  <p align="center">‘비동기 방식을 동기 방식으로 변경 → async / await 활용’</p>
</p>

&nbsp; 또, 포스트잇의 갯수가 적어도 추가하거나 클릭할 때마다 Z-Index값이 계속 증가 되기 때문에 테이블에 설정한 int 타입의 Z-Index의 허용 <br/>범위를 넘는 상황이 생길 수도 있다고 판단되었습니다. 

&nbsp; 이를 방지하기 위해 밑의 사진처럼 임의의 값을 설정해 그 값 이상이 전송되었을 경우, 오름차순의 Z-Index 값을 순서대로 1부터 다시 update<br/>하여 Z-Index를 포스트잇 갯수만큼으로 변경하는 방법을 
통해 이러한 상황을 방지하였습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/158e993a-9106-4141-a7c6-e1af55dabdb4" width="600" height="350">
  <p align="center">‘서비스 클래스에서 임의의 값 이상이 전송되었을 경우 실행되도록 설정’</p>
</p>

# 🌈 소감
&nbsp; 처음 진행한 팀 프로젝트인 만큼 잘 할 수 있을지 걱정이 되었지만 훈훈한 팀 분위기 속에서 서로 격려해주고 어려운 부분이 있으면 같이 <br/>의견을 나누어 해결해 나가는 과정을 경험해나가며 이전의 
개인 프로젝트를 할 때와는 다르게 협업의 중요성을 많이 느낄 수 있었습니다. <br/>이번 경험을 통해 서로에게 도움이 되고 함께 나아가는데 도움이 될 것이라고 생각됩니다.

&nbsp; 또, 여태까지 배워온 기술들을 활용하여 직접 제가 코드를 작성하여 반영된 결과물들을 보았을 때 해냈다는 뿌듯함과 이전보다 성장한 저의 <br/>모습을 발견할 수 있었습니다. 
프로젝트를 진행하면서 어렵기도 했지만 재밌게 했던 시간이 더 많았었고, 스스로 자료들을 찾아보면서 부족한 <br/>부분을 더 채워나가는 시간이기도 했습니다.

&nbsp; 이러한 즐거웠던 경험을 바탕으로 배웠던 기술들을 계속 복습하고, 다른 새로운 기술들도 배워서 더 성장하고 앞으로 나아가는 저의 모습을 <br/>이루고 싶습니다.
