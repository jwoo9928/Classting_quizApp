# Classting_quizApp


## React native - typecript로 제작한 퀴즈앱입니다.

실행 방법

1. **android**
    - yarn install
    - yarn run android
2. **ios**
    - yarn install
    - cd ios / pod install
    - yarn run ios

<img src = "https://user-images.githubusercontent.com/51700184/136694401-8b3d361c-b10f-4cd3-a0a7-016510ab6e7a.png" width="400">





### **퀴즈 풀기**

play 버튼을 클릭하면 10개의 퀴즈가 출제된다.문제 카테고리, 문제, 보기를 확인할 수 있고, 문제 보기를 선택하면 toast 메시지로 정답 여부가 표시된다.

우측 하단에 Next 버튼을 누르면 다음 문제로 이동할 수 있다.

10 문제를 풀 동안의 시간이 측정된다.
<img src = "https://user-images.githubusercontent.com/51700184/136694405-d3abf543-8a32-4c1f-8e60-a6955c747c73.png" width="400">
<img src = "https://user-images.githubusercontent.com/51700184/136694406-2ae6d752-ec88-4124-b885-caf35d9e1d76.png" width="400">





### **결과**

10문제에 대한 정오답 개수와 그에 따른 그래프가 표시된다.

아래에는 전체문항 수, 정답 개수, 오답 개수, 소요시간이 표시된다.

하단의 다시풀기를 누를 경우 다시 풀 수 있지만 오답노트에는 반영되지 않는다.
<img src = "https://user-images.githubusercontent.com/51700184/136694407-1415f36e-1b29-41c7-812a-26e4f5c6a2e4.png" width="400">





### **오답노트**

틀린 문제들을 확인 할 수 있으며 문제를 클릭할 경우 문제를 다시 풀 수 있다.
<img src = "https://user-images.githubusercontent.com/51700184/136694613-cdb7bf20-5814-4a6c-ae30-8bf1c9e20678.png" width="400">
<img src = "https://user-images.githubusercontent.com/51700184/136694405-d3abf543-8a32-4c1f-8e60-a6955c747c73.png" width="400">
