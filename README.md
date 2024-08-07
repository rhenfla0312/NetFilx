# SPMV
<!-- 현 npm 버전 16.3.0 -> 버전적는곳이 없다(일단 17.0.0으로 보류 -> 추후에 현 버전으로 바꾼다) -->
[![npm](https://img.shields.io/npm/v/standard.svg)](https://www.npmjs.com/package/npm-auto-version)
![vite](https://img.shields.io/badge/Vite-646CFF)
![vue](https://img.shields.io/badge/Vue3-4FC08D)
![Node.js](https://img.shields.io/badge/Node.js-339933)
<br />
실시간 영화 및 TV프로그램 검색엔진 웹 프로그램 ([DEMO](https://spmv.netlify.app))

![image](https://user-images.githubusercontent.com/43946794/201836907-70417994-0657-4b41-9d49-d7f34ccc31ca.png)

토이 프로젝트(FrontEnd - 윤영민)

프로젝트 기간 : (2022.10 ~ 2022.11)


## 목차
* <a href="#개발도구">개발도구</a>
* <a href="#프로젝트-소개">프로젝트 소개</a>
  * <a href="#시나리오">시나리오</a>
  * <a href="#프로젝트-목표">프로젝트 목표</a>
  * <a href="#요구사항">요구사항</a>
  * <a href="#기타설정">기타설정</a>
* <a href="#이후의-계획">이후의 계획</a>


## 개발도구
* FrontEnd - Vue3 (vite)

## 프로젝트 소개
> #### 시나리오

영화 검색엔진 API를 이용해서 알맞게 페이지를 구성하여 해당 API 기능들을 axios를 통해 연결해서 웹을 구축한다 (**검색엔진 API - TMDB**)

> #### 프로젝트 목표

반응형 웹(html, css)에 능숙해 지면서 axios를 이용하여 api들을 자유롭게 사용해본다

> #### 요구사항
* 라우터 및 컴포넌트 단위로 페이지를 구성한다
* 반응형으로 (PC, Teblet, Mobile) 구성한다
* axios로 영화엔진 api와 통신해서 데이터를 가져온다
* 데이터베이스 대신 브라우저 로컬 저장소인 LocalStorage를 이용해서 계정 정보들을 관리한다

> #### 기타설정
* 데이터는 vuex를 이용해서 관리한다 -> 진행중


## 이후의 계획
이번에 만든 프로젝트를 통해서 반응형 웹에 대한 이해도가 올라간거 같아서 만족했다
또한 기본적인 API를 가져와서 연동해보고 맞는 데이터에 연결해보고 한것을 통해 접근성이 많이 낮아진거 같아 다행이다
하지만 다른사람들이 봤을땐 그냥 API 가져와서 사용한거잖아라고 볼순있지만 난 이번 프로젝트를 통해 반응형, API통신 등 기본적인 스킬이 올라간게 느껴진다
다음 프로젝트로는 웹소켓을 이용한 채팅프로그램이나, 인스타그램 등을 만들거나 아니면 카카오 API들을 가져와서 새로운 웹을 만들어 볼려고 한다
