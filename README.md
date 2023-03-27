## 📖TODO-LIST

## 1. 🗝️실행방법
[해당 프로젝트 file이 없다면 해당 프로젝트를 클론해주세요.]
```
$ git clone https://github.com/KYH9800/TODO-LIST.git
```

## 🖥️[front]
- 프론트 경로로 이동합니다.
- 필요한 패키지들을 `npm instal`을 통해 받아주세요.
- `npm run dev` 명령어를 통해 프로젝트를 실행 합니다.
- 브라우저에서 http://localhost:3060 로 접속해주세요.
```
$ cd front
$ npm install
$ npm run dev
```

```js
let front_stack = {
  SPA: "Next.js",
  State: "Redux, Redux-saga",
  CSS: "Styled-component"
}
```

## 🗄️[back]
- 백엔드의 경우 배포가 되어있습니다. (https가 적용되지는 않았습니다.)
- 로컬 환경에서의 실행을 원할 경우 백엔드 경로로 이동합니다.
- 필요한 패키지들을 `npm install`을 통해 받아주세요.

```
$ cd back
$ npm install
$ npm run dev
```

(nginx 적용, certbot을 통한 인증서 발급중.)

## ‼️[주의]
백엔드의 경우 환경변수 설정으로 인해 로컬환경에서의 실행이 불가능합니다.
원할 경우 개발자에게 문의부탁드립니다.

<br/>

## ❔Question

### Q.01 React Hook의 개념을 설명해주세요.
- React Hook이란, 기존의 class형 컴포넌트가 아닌 함수형 컴포넌트로 작성할 수 있게 해주는데 함수형 안에서 React state를 연동하여 사용할 수 있으며
- useEffect를 활용해 React의 생명주기 기능을 구현 할 수 있습니다.
- 정리하자면 React 16.8버전에 새로 추가된 기능이며, 함수형 컴포넌트 안에서 React state와 생명주기 기능을 연동하여 구현,사용할 수 있게 해줍니다.

### Q.02 Redux를 사용 시 불변성을 유지해야 하는 이유에 대해서 설명해주세요.
- 리덕스는 히스토리가 관리가 됩니다.
- 객체의 경우 참조관계를 통해 값을 꺼내올 수 있는데, 반대로 새로운 객체를 return 하게 되면 참조관계가 아니고 새로운 객체를 반환하기 때문에 서로 다른 객체가 형성됩니다.
- 여기서 만일 원본을 그대로 바꾼다면 리덕스는 바뀐 값을 인지하지 못합니다.
- 때문에 원본의 상태를 유지하고 불변성을 지켜 값이 변화됐는지를 파악하기 위해 불변성을 유지해야 합니다.
- 이것이 redux에서 상태관리 시 state 값이 변경되는데 있어서 불면성을 유지해야 하는이유입니다.
