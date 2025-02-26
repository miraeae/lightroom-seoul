# ✨ Lightroom Seoul <br>인터렉티브 사이트 클론 코딩

GSAP, ScrollTrigger를 사용하여 인터렉션을 중점적으로 구현하였으며, SCSS를 사용하여 클론 코딩한 반응형 사이트입니다.

- 제작기간: 2025.01.22 ~ 2025.01.25 + Refactor
- 사용언어: HTML, SCSS, JavaScript
- 라이브러리: jQuery, GSAP(ScrollTrigger), SplitType
- 유형: 반응형
- [사이트 바로가기](https://miraeae.github.io/lightroom-seoul)

![Image](https://github.com/user-attachments/assets/c476d835-8d44-47eb-8ae7-0d0ab6948029)

## 💡 Point
- [1. 데이터 속성을 사용한 배경, 메뉴 컬러 변경](#1-데이터-속성을-사용한-배경-메뉴-컬러-변경)
- [2. SplitType을 활용한 텍스트 효과](#2-splittype을-활용한-텍스트-효과)
- [3. 스크롤 시 넘어가는 슬라이드](#3-스크롤-시-넘어가는-슬라이드)

***

### 1. 데이터 속성을 사용한 배경, 메뉴 컬러 변경

스크롤을 내릴 때 각 섹션별로 배경색과 메뉴 색상이 자연스럽게 전환되도록 ```data-*``` 속성을 활용하여 구현했습니다. 

#### 📄 HTML
각 섹션에 배경색(data-bgcolor)과 메뉴 색상(data-menucolor) 값을 추가하여 원하는 속성 값을 지정해 주었습니다.

![Image](https://github.com/user-attachments/assets/1aecf510-398c-4a3d-af82-4811f90374e5)

#### 🎨 CSS
body의 data-bgcolor 및 data-menucolor 값을 기준으로 배경색과 메뉴 색상을 동적으로 변경할 수 있도록 스타일링하였습니다.

```
body {
    &[data-bgcolor=black]{
        background-color:$color-black;
        ...
    }

    &[data-bgcolor=darkgray]{
        background-color:$color-darkgray;
        ...
    }

    &[data-bgcolor=warmgray]{
        background-color:$color-warmgray;
        ...
    }    
}
```
```
body[data-menucolor=black]{
    header{
        color:$color-black;
        ...
}
```

### 💻 JavaScript

각 섹션별로 개별적인 ScrollTrigger를 적용하기위해 GSAP의 ```utils.toArray()```를 사용하여 .sec 클래스를 가진 모든 섹션을 배열로 저장했습니다.
섹션이 화면에 나타날 때, 그리고 다시 돌아올 때 현재 활성화된 섹션의 data-bgcolor, data-menucolor 값을 body에 적용하여 스크롤 시 각 섹션의 색상이 자연스럽게 바뀔 수 있도록 하였습니다.

```
        gsap.utils.toArray(".sec").forEach((sec) => {
        ScrollTrigger.create({
            trigger: sec,
            start: "top center",
            end: "bottom center",
            refreshPriority: -1,
            // markers: true,
            // id: `x_${sec.getAttribute('data-menucolor')}`,
            onEnter: () => updateColors(sec),
            onEnterBack: () => updateColors(sec),
        });
    });

    function updateColors(sec) {
        document.body.setAttribute("data-bgcolor", sec.getAttribute("data-bgcolor"));
        document.body.setAttribute("data-menucolor", sec.getAttribute("data-menucolor"));
    }
```
- onEnter: scroll-start ~ scroll-end 사이
- onEnterBack : scroll-start ~ scroll-end 사이로 다시 들어갈 때

***

### 2. SplitType을 활용한 텍스트 효과

SplitType 플러그인을 활용하여 텍스트가 단어별로 자연스럽게 올라오는 애니메이션을 구현했습니다.

![Image](https://github.com/user-attachments/assets/6da874ca-de46-4189-8aff-5a344231d5e3)

#### 📄 HTML
SplitType을 사용하기 위해 CDN을 추가했습니다.
```
<script src="https://unpkg.com/split-type"></script>
```

### 💻 JavaScript
.split 클래스를 가진 요소를 단어(word) 단위로 분리하고, 각 단어를 span 태그로 감싸 애니메이션을 적용할 수 있도록 설정했습니다.
```
    let typeSplit = new SplitType(".split", {
        types: "lines, words",
        tagName: "span",
    });
```

#### 🎨 CSS
span 요소는 기본적으로 ```inline``` 속성을 가지므로, 애니메이션을 적용하기 위해 ```inline-block```으로 변경해 주었습니다. 또한, 안 보였다 나타나는 효과를 위해 .word의 부모 요소인 .line에 ``overflow: hidden``속성을 추가해 주었습니다.
```
.split{
    .line{
        display: inline-block;
        overflow: hidden;
    }
}
```

### 💻 JavaScript
위에서 분리된 .split 내부의 각 단어들을 스크롤 시 아래에서 위로 자연스럽게 등장하도록 설정해 주었습니다. ```stagger``` 옵션을 사용하여 단어별로 순차적인 애니메이션 효과도 적용했습니다.

```
    gsap.from(".hello .split .word", {
        scrollTrigger: {
            trigger: ".hello",
            start: "-=300 center",
            end: "bottom center",
            toggleActions: "restart none none reset",
        },
        yPercent: 100, 
        autoAlpha: 1, 
        duration: 1, 
        ease: 'circ.out', 
        stagger: 0.1,
    });
```
***

### 3. 스크롤 시 넘어가는 슬라이드
스크롤 시 특정 요소들이 단계적으로 사라지고 등장하는 슬라이드 애니메이션을 구현했습니다.

![Image](https://github.com/user-attachments/assets/1907ca47-6f0a-4d16-a820-c4617f113573)

#### 🎨 CSS
같은 위치에서 나타났다 사라지는 구조는 첫 번째 아이템을 제외하고 ``position: absolute``를 사용해 겹쳐 배치했습니다.
```
.fade-in{
    position: relative;

    &__item{
        position: relative;

        &:not(:first-child){
            position: absolute;
            left:50%;
            transform: translateX(-50%);
            top:0;
        }
    }
}
```
타이틀은 아래에서 위로 슬라이드되는 방식이므로, 높이(height)를 지정하고 ``overflow: hidden``을 설정하여 첫 번째 타이틀을 제외한 나머지 타이틀이 가려지도록 했습니다.
```
.space__title-wrap{
    position: relative;
    height: 4.7vw;
    overflow: hidden;
}
```

### 💻 JavaScript
PC, Mobile의 Pagination 애니메이션이 달라서 ```matchMedia```를 사용하여 다르게 적용해 주었습니다. 먼저, 스크롤에 따라. space 섹션을 고정(pin) 하는 공통 트리거 설정했습니다.
```
function createSpaceTl() {
    return gsap.timeline({defaults: {duration: 300},
        scrollTrigger: {
            trigger: ".space",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            pinSpacing: false,
        }
    });
}
```
첫 번째 아이템(i=1)은 나타나는 애니메이션이 없고, 마지막 아이템(i=4)은 사라지는 애니메이션이 없기 때문에 따로 적용하였고, 중간 아이템(i=2~3)은 공통으로 적용하였습니다.
```
ScrollTrigger.matchMedia({
    "(min-width: 1025px)":function(){
        const spaceTl = createSpaceTl();

        for (let i = 1; i <= 4; i++) {
            const fadeItem = `.fade-in__item:nth-child(${i})`;
            const paginationItem = `.space__pagination-item:nth-child(${i})`;
        
            if (i === 1) {
                spaceTl
                .to(fadeItem, { autoAlpha: 0, delay: 600 })
                .to(paginationItem, { autoAlpha: 0.2 }, "<")
                .to(".space__title", { yPercent: -100 }, "<");
            } else if (i === 4) {
                spaceTl
                .from(fadeItem, { autoAlpha: 0 }, "<")
                .from(paginationItem, { autoAlpha: 0.2 }, "<")
                .to(fadeItem, { autoAlpha: 1, duration: 600 })
                .to(paginationItem, { autoAlpha: 1, duration: 600 }, "<");
            } else {
                spaceTl
                .from(fadeItem, { autoAlpha: 0 }, "<")
                .from(paginationItem, { autoAlpha: 0.2 }, "<")
                .to(fadeItem, { autoAlpha: 0, delay: 600 })
                .to(paginationItem, { autoAlpha: 0.2 }, "<")
                .to(".space__title", { yPercent: -100 * i }, "<");
            }
        }
    },
```
모바일에서는 paginationItem의 텍스트 컬러와 Bar의 width 값이 변경되게 해주었습니다.
```
"(max-width: 1024px)":function(){
        const spaceTl = createSpaceTl();
        
        for (let i = 1; i <= 4; i++) {
            const fadeItem = `.fade-in__item:nth-child(${i})`;
            const paginationItem = `.space__pagination-item:nth-child(${i})`;
        
            if (i === 1) {
                spaceTl
                .to(fadeItem, { autoAlpha: 0, delay: 600 })
                .to(paginationItem, { autoAlpha: 0.2, color: "#000", width: "20%" }, "<")
                .to(".space__title", { yPercent: -100 }, "<");
            } else if (i === 4) {
                spaceTl
                .from(fadeItem, { autoAlpha: 0 }, "<")
                .to(paginationItem, { autoAlpha: 1, color: "#fff", width: "40%" }, "<")
                .to(fadeItem, { autoAlpha: 1, duration: 600 }, "<");
            } else {
                spaceTl
                .from(fadeItem, { autoAlpha: 0 }, "<")
                .to(paginationItem, { autoAlpha: 1, color: "#fff", width: "40%" }, "<")
                .to(fadeItem, { autoAlpha: 0, delay: 600 })
                .to(paginationItem, { autoAlpha: 0.2, color: "#000", width: "20%" }, "<")
                .to(".space__title", { yPercent: -100 * i }, "<");
            }
        }
    }
```
