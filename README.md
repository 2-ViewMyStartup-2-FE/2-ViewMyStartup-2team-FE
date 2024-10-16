# 풀스텍 2기 2팀

### 팀원 구성

방신철 (https://github.com/bangsinchur)

강명곤 (https://github.com/GGON123)

김태연 (https://github.com/taeyeonkim94)

신지원 (https://github.com/shinji530)

이예린 (https://github.com/annylee0723)

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

<img src="https://github.com/user-attachments/assets/8bddc2a1-bfe3-4b7c-bac3-b64e67623546" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/a979c289-05b9-4765-8331-39da7ac82792" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/f718de1d-eda5-46c2-88cd-d77397343f51" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/07b9b800-c5ce-4573-a98d-2e8042c9ae3f" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/eb3dfd75-cbb2-4c81-8604-62a22c521a65" width="300" height="200"/>
<img src="https://github.com/user-attachments/assets/e81500ff-27eb-4edd-9463-fc79679d2eb9" width="300" height="200"/>

#### 기업 상세 페이지 구현

- 해당 기업 정보
- 기업 투자 정보 리스트
- 기업에 투자하기 기능 구현
- 투자한 투자정보 수정 및 삭제 기능 구현
- 반응형 레이아웃 구현

김태연

<img width="300" height="200" src = "https://github.com/user-attachments/assets/0b4a7c77-bddd-472c-b0aa-9c8880ceb113" />
<img width="300" height="200" src = "https://github.com/user-attachments/assets/7748712e-0366-4f8b-89ca-b33058e17602" />
<img width="300" height="200" src = "https://github.com/user-attachments/assets/7558de05-c1d1-49d7-b57d-04db9c4fd278" />

### 나의 기업 비교 결과 페이지 구현

- 나의 전체 기업 리스트 페이지, 비교 현황 페이지, 투자 현황 페이지, 비교 결과 페이지의 회사 정보를 보여주는 테이블을 공통 컴포넌트화
- 기업 투자하기 모달 구현
- 기업 수정하기 모달을 투자하기 모달과 공통 컴포넌트화
- 투자 성공시 팝업 구현

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

<img width="300" height="200" src="https://github.com/user-attachments/assets/71597f74-9ab2-45aa-8564-8af2943a8f24"/>
<img width="300" height="200" src="https://github.com/user-attachments/assets/b8cd4fa2-940b-4556-a9a2-2957520cc086"/>

### 비교 현황 페이지 구현 및 기업상세 페이지 보조

- StartupList 공통 컴포넌트 초기 단계 보조
- CompanyInvestmentAction 컴포넌트 구현
- 기업 기본 이미지 에셋 제작

### 404 페이지 구현

- NotFoundPage 생성
- 404 이미지 에셋 제작
- 렌더링 로직 작성

### 랜딩 페이지 스타일링

- 랜딩 페이지 에셋 제작 및 css 수정

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
