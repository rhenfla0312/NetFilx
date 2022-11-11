<script>
export default {

}
</script>


<template>
  <div class="list">
    <div class="list__box">
      <div class="list__info">
        <div class="__info">
          <div class="left__item">
            <div class="__leftBox">
              <div class="__bg"></div>
            </div>
          </div>
          <div class="right__item">
            <div class="__item"></div>
            <div class="__item"></div>
            <div class="__item"></div>
            <div class="__item"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .list {
    overflow: hidden;
    touch-action: none;
    padding-top: 25rem;
    background: #060d17;
    .list__box {
      position: relative;
      .list__info {
        position: relative;
        background: #060d17;
        box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
        z-index: 10;
        width: 80vw;
        min-height: 80vh;
        margin: -30vh auto 0;
        .__info {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 80vh;
          display: flex;
          border-radius: 30px 30px 0 0;
          background: linear-gradient(to bottom, rgba(93,93,93,0.800) 0%, rgba(93,93,93,0.298) 33%, rgba(15,15,15,1.000) 100%);
          .left__item {
            width: 30%;
            min-height: 80vh;
            padding: 1rem;
            .__leftBox {
              background: linear-gradient(to bottom, rgba(93,93,93,0.800) 0%, rgba(93,93,93,0.298) 33%, rgba(15,15,15,1.000) 100%);
              box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
              border-radius: 20px;
              min-height: 80vh;
              padding: 1rem;
              .__bg {
                position: relative;
                height: 220px;
                border-radius: 20px;
                transition: .3s;
                background-color: rgba(165, 165, 165, 0.1);
                animation: pulse-bg 1s infinite;
                @keyframes pulse-bg {
                  0% {
                  background-color: rgba(165, 165, 165, 0.1);
                  }
                  50% {
                      background-color: rgba(165, 165, 165, 0.3);
                  }
                  100% {
                      background-color: rgba(165, 165, 165, 0.1);
                  }
                }
              }
            }
          }
          .right__item {
            width: 70%;
            min-height: 80vh;
            // background: blue;
            .__item {
              width: 95%;
              height: 30%;
              transition: .3s;
              // 요소 가운대 정렬에 유용한 margin auto도 잘 사용해라 - 위요소는 그대로고 양옆만할경우 margin 0 auto할수있지만 안먹힐경우 left, right 각각주면 먹힌다
              margin-left: auto;
              margin-right: auto;
              padding: 2rem;
              border-radius: 20px;
              // 기록 - width, height은 걸지않으면 요소에 맞춰 늘어나기때문에 건다면 그 이상으론 안늘어나서 디자인이 이상해진다 - 걸거면 최소로 하여 min-height를 걸고 그 이상부턴 자연스럽게 늘어나게 한다(여기서의 자연스러움은 %가 아닌 자연이다)
              min-height: 15vh;
              background: #060d17;
              box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
              // 요소 밖 늘리는건 - margin, 요소 안 늘리는건 - padding이다
              margin-top: 1rem;

              background-color: rgba(165, 165, 165, 0.1);
              animation: pulse-bg 1s infinite;
              @keyframes pulse-bg {
                0% {
                background-color: rgba(165, 165, 165, 0.1);
                }
                50% {
                    background-color: rgba(165, 165, 165, 0.3);
                }
                100% {
                    background-color: rgba(165, 165, 165, 0.1);
                }
              }
              .__itemBox {
                display: flex;
                .__imgBox {
                  img {
                    // 기록 - vw, vh, rem, em, px, % - 구분해서 잘써라 한 요소에서 밖으로 나오면 안되고(그러면 해상도마다 지정해야 한다) 이렇게 박스안에 맞게끔 줄어들면서 자동으로 줄어들게 하고싶을 땐 %이다
                    // 예외 - 사진은 px로하자 - 10%먹이니까 보이기엔 잘보이는데 flex먹일때 요소 맨끝까지 늘어난다
                    width: 130px;
                    border-radius: 10px;
                  }
                }
                .__textBox {
                  // 기록 - vw, vh 루트기준이라 반응형엔 좋지만 반응형으로 가면서 루트기준에 맞춰서 줄어들므로 고정으로 되야할땐 까다로울수가 있다) - 고정은 px, 루트기준 반응형은 vw vh다
                  // - 요소 안에서 레이아웃에 맞게 위치 조절할땐 간단하게는 margin이나 padding으로 하자 - 부모요소안에서 자식요소가 margin쓰면 부모요소 안에서 쓰는거라 padding같은 느낌을 느낀다(부모요소에서쓰면 margin은 그만큼 떨어지고 padding은 그만큼 부모요소 안이 줄어든다)
                  margin-left: 50px;
                  color: #fff;
                  font-size: 15px;
                  padding: 1rem;
                  // .__titleBox {

                  // }
                  .__desBox {
                    // 기록 - 자식요소한테 크기를 떨어뜨릴땐 개인적으론 margin보단 padding을 즐겨쓰지만 단순히 띄는 용도라면 margin이 적합하다
                    padding-top: 1rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-word;
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                  }
                }
              }
              &:last-child {
                margin-bottom: 1rem;
              }
            }
          }
        }
      }
    }
  }

  // @media screen and (max-width: 1024px) {

  // }

  @media screen and (max-width: 768px) {
    .list {
      .__info {
        display: block !important;
        .left__item {
          width: 100% !important;
          min-height: auto !important;
          .__leftBox {
            min-height: auto !important;
            .__bg {
              height: 180px !important;
            }
          }
        }
        .right__item {
          width: 100% !important;
        }
      }
    }
  }
</style>