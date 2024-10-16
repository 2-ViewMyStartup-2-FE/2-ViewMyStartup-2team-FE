# 풀스텍 2기 2팀

### 팀원 구성
방신철 (https://github.com/bangsinchur)

강명곤 (개인 Github 링크)

김태연 (개인 Github 링크)

신지원 (https://github.com/shinji530)

이예린 (개인 Github 링크)

### 프로젝트 소개

최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다. 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다. 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다.

### 프로젝트 기간
프로젝트 기간 : 2024. 09. 25(수) ~ 2024. 10. 17(목) 2교시까지

### 기술 스택
FrontEnd: React.js
BackEnd: PrismaORM
Database: PostgreSQL
공통 : Github.

### 팀원별 구현 상세기능
방신철

<img src="https://github.com/user-attachments/assets/910c953b-62de-44ea-8330-b2b86bb03c3c" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/eebd355b-7735-48d0-95f6-f9a0a31bffc0" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/ffb83e58-fa77-4d0d-b1e1-bac0b8ca999c" width="100" height="200"/>

#### 나의 기업비교 페이지 구현
 
  - 나의 기업 비교 모달 구현
  - 추가 기업 비교 모달 구현
  - 반응형 레이아웃 구현


강명곤

김태연

신지원

<img src="https://github.com/user-attachments/assets/fa4db476-ee78-4941-8cbe-c4c1d13f1f2a" width="300" height="150" />
<img src="https://github.com/user-attachments/assets/f964e7e8-fff7-43ba-b0e8-2d673987958e" width="300" height="150" />
<img src="https://github.com/user-attachments/assets/06f00b8e-ecbc-415f-badb-4a31b8209997" width="300" height="150" />

#### 랜딩 페이지 구현

 - 기본 와이어프레임 구현

#### 전체 스타트업 목록 페이지 구현

 - 검색, 정렬, 페이지네이션 기능 구현
 - 반응형 레이아웃 구현

#### 투자 현황 페이지 구현

 - 정렬, 페이지네이션 기능 구현
 - 반응형 레이아웃 구현

#### 공통 컴포넌트

 - Nav 바
 - 검색 기능
 - 정렬 기능
 - 페이지네이션 기능
 

이예린


### 파일구조
```
src
 ┣ api
 ┃ ┣ api.js
 ┃ ┣ CompanyDetailAPI.js
 ┃ ┣ CompareAPI.js
 ┃ ┣ CompareResultAPI.js
 ┃ ┣ CompareStatusAPI.js
 ┃ ┣ InvestStatusAPI.js
 ┃ ┗ StartupAPI.js
 ┣ asset
 ┃ ┗ images
 ┃ ┃ ┣ 404.svg
 ┃ ┃ ┣ btn_plus.png
 ┃ ┃ ┣ closed-eyes.png
 ┃ ┃ ┣ ic_arrow_left.png
 ┃ ┃ ┣ ic_arrow_right.png
 ┃ ┃ ┣ ic_check.png
 ┃ ┃ ┣ ic_cloaseCircleSmall.png
 ┃ ┃ ┣ ic_kebab.png
 ┃ ┃ ┣ ic_minus.png
 ┃ ┃ ┣ ic_restart.png
 ┃ ┃ ┣ ic_search.png
 ┃ ┃ ┣ ic_toggle.png
 ┃ ┃ ┣ ic_x.png
 ┃ ┃ ┣ img_company_default_logo.png
 ┃ ┃ ┣ img_logo.png
 ┃ ┃ ┣ open-eyes.png
 ┃ ┃ ┗ p_main_image.svg
 ┣ component
 ┃ ┣ AddCompanyList.js
 ┃ ┣ AddSeachResult.js
 ┃ ┣ App.js
 ┃ ┣ CompanyDetailTable.js
 ┃ ┣ CompanyInfoTable.js
 ┃ ┣ CompanyInvestmentAction.js
 ┃ ┣ DeleteInvestment.js
 ┃ ┣ ErrorModal.js
 ┃ ┣ InvestmentButton.js
 ┃ ┣ InvestmentCompanyBrief.js
 ┃ ┣ InvestmentForm.js
 ┃ ┣ InvestmentInfoList.js
 ┃ ┣ InvestmentPopup.js
 ┃ ┣ InvestModal.js
 ┃ ┣ InvestModalHeader.js
 ┃ ┣ ListSort.js
 ┃ ┣ ManychoiceCompany.js
 ┃ ┣ ModalAddCompany.js
 ┃ ┣ ModalMyCompany.js
 ┃ ┣ MyCompanyCard.js
 ┃ ┣ Nav.js
 ┃ ┣ Pagination.js
 ┃ ┣ PasswordVerifyModal.js
 ┃ ┣ Search.js
 ┃ ┣ SearchResult.js
 ┃ ┗ SortContent.js
 ┣ css
 ┃ ┣ AddCompanyList.module.css
 ┃ ┣ App.css
 ┃ ┣ CompanyDetailPage.module.css
 ┃ ┣ CompanyInfoTable.module.css
 ┃ ┣ CompanyInvestmentAction.module.css
 ┃ ┣ Compare.module.css
 ┃ ┣ CompareResultPage.module.css
 ┃ ┣ DeleteInvestment.module.css
 ┃ ┣ ErrorModal.module.css
 ┃ ┣ InvestmentButton.module.css
 ┃ ┣ InvestmentCompanyBrief.module.css
 ┃ ┣ InvestmentForm.module.css
 ┃ ┣ InvestmentInfoList.module.css
 ┃ ┣ InvestmentPopup.module.css
 ┃ ┣ InvestModal.module.css
 ┃ ┣ InvestModalHeader.module.css
 ┃ ┣ InvestStatusPage.module.css
 ┃ ┣ LandingPage.module.css
 ┃ ┣ ListSort.module.css
 ┃ ┣ ManyChoiceCompany.module.css
 ┃ ┣ ModalAddCompany.module.css
 ┃ ┣ ModalCompany.module.css
 ┃ ┣ MyCompanyCard.module.css
 ┃ ┣ Nav.module.css
 ┃ ┣ NotFoundPage.module.css
 ┃ ┣ Pagination.module.css
 ┃ ┣ PasswordVerifyModal.module.css
 ┃ ┣ Search.module.css
 ┃ ┣ SearchResult.module.css
 ┃ ┗ StartupPage.module.css
 ┣ hooks
 ┃ ┣ useFetchCompanyData.js
 ┃ ┣ useFetchList.js
 ┃ ┗ useModal.js
 ┣ pages
 ┃ ┣ CompanyDetailPage.js
 ┃ ┣ Compare.js
 ┃ ┣ CompareResultPage.js
 ┃ ┣ CompareStatusPage.js
 ┃ ┣ InvestStatusPage.js
 ┃ ┣ LandingPage.js
 ┃ ┣ NotFoundPage.js
 ┃ ┗ StartupPage.js
 ┣ utils
 ┃ ┣ formatAmount.js
 ┃ ┗ sortData.js
 ┣ index.js
 ┣ Main.js
 ┗ reset.css
```

### 구현 홈페이지

https://viewmystartup-teamtwo-develop.netlify.app/

### 제작한 발표자료
