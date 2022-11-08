<script>
import axios from 'axios';
export default {
  data() {
    return {
      // KEY
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',
      
      // IMG_URL
      IMG_URL : 'https://image.tmdb.org/t/p/original',

      // DATA
      CHECK_DATA : "movie",

      list_items: [],
      list_name : "",
      list_created_by : "",
      list_des : "",
      list_bg : "",

      ID : this.$route.params.id,

      movie_page : 2,
      tv_page : 2,
    }
  },
  methods: {
    // detail page
    detail(id) {
      this.$router.push({
        name: "DetailInfo",
        params: {
          id,
          CHECK_DATA : this.CHECK_DATA
        }
      })
    }
  },
  // 기록 - 같은창에서 같은 데이터를 요청하면 덮어씌워지지 않는 문제가있다 -> 값은 가져오지만 ui적으로 안덮어씌워지는 부분을 watch로 실시간탐지하여 변경해줘라 (원래 데이터 변경되면 덮어씌워져야하는데 안되는 부분들만 사용하자)
  watch: {
    // router data감시할땐 문자열로 감싸면서 함수로 만들어야 작동한다 -> 해당 라우터 데이터가 들어있는 변수로 함수선언할땐 왜 작동안하나?
    async "$route.params.id"(value) {
      await axios.get(`https://api.themoviedb.org/3/list/${value}?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          console.log(res);
          this.list_items = res.data.items;
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  async mounted() {
    try {
      // default -> movie
      await axios.get(`https://api.themoviedb.org/3/list/${this.ID}?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          console.log(res);
          this.list_items = res.data.items;
          // 기록 - 리스트형태가 아니라면(몇개 없다면) 하나씩 담아서 데이터 바인딩으로 넘긴다
          this.list_name = res.data.name;
          this.list_created_by = res.data.created_by
          this.list_des = res.data.description;
          // 첫번째 이미지를 배경이미로 하기 (보통 이렇게 한다 - 슬라이드로 하지 않는 경우에)
          this.list_bg = res.data.items[0].backdrop_path;
        }).catch((error) => {
          console.log(error)
        })
    } catch(e) {
      console.error(e);
    }
  },
  // updated() {
  //   // 무한스크롤에선 일단 스켈레톤을 빼자 - 전체가 스켈레톤으로 변함 (새로 가져오는거만 변해야댐)
  //   // 문제 - 상세정보 들어갔다가 뒤로가기하면 초기화 -> store에 상태 저장하기
  //   const io = new IntersectionObserver((entries, observer) => {
  //     entries.forEach(async entry=> {
  //       if (entry.isIntersecting) { // 감지대상이 교차영역에 진입 할 경우
  //         // axios
  //         if(this.CHECK_DATA == "movie") {
  //             await axios.get(`${this.NEW_MOVIE_URL}?api_key=${this.API_KEY}&language=ko&page=${this.movie_page}`)
  //             .then((res) => {
  //               console.log(res);
  //               this.NEW_DATA = this.NEW_DATA.concat(res.data.results)
  //             }).catch((error) => {
  //               console.log(error)
  //             })
  //             this.movie_page++;
  //         } else {
  //           await axios.get(`${this.NEW_TV_URL}?api_key=${this.API_KEY}&language=ko&page=${this.tv_page}`)
  //           .then((res) => {
  //             this.NEW_DATA = this.NEW_DATA.concat(res.data.results)
  //           }).catch((error) => {
  //             console.log(error)
  //           })
  //           this.tv_page++;
  //         }
  //         observer.unobserve(entry.target); // 이미지 로딩 이후론 관찰할 필요 x
  //       }
  //     })
  //   })

  //   const images = document.querySelector('.new__item__plus');
  //   io.observe(images)
  // }
}
</script>


<template>
  <div class="list">
    <div class="list__box">
      <div class="list__info">
        <div class="__info">
          <div class="left__item">
            <div class="__bg"></div>
            <div class="__createUser">{{ list_created_by }}</div>
            <div class="__name">{{ list_name }}</div>
            <div class="__des">{{ list_des !== null ? list_des : "상세설명이 없습니다"}}</div>
            <div class="__btn">
              <!-- 기록 - div로도 버튼처럼 css로 만들순 있지만, 버튼으로 쓸거면 button사용해라 - 괜히 있는게 아니다(누군가 내 코드를 볼때 의미를 모를수도 있다) -->
              <button class="__startBtn">재생</button>
              <button class="__deleteBtn">삭제</button>
            </div>
          </div>
          <div class="right__item">
            <!-- 기록 - 데이터쪽 선언했는지 확인해라 -> 선언깜빡해서 왜 안나오나했다 가끔식 나오는건 mounted 후 한번은 나와서 그런거같다 -->
            <div class="__item" v-for="item in list_items" :key="item" @click="detail(item.id)">
              <div class="__itemBox">
                <div class="__imgBox">
                  <img :src="`${IMG_URL}/${item.poster_path}`" />
                </div>
                <div class="__textBox">
                  <div class="__titleBox">{{ item.title }}</div>
                  <div class="__desBox">{{ item.overview }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new__item__plus"></div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
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
            width: 40%;
            min-height: 80vh;
          }
          .right__item {
            width: 60%;
            min-height: 80vh;
            // background: blue;
            .__item {
              width: 95%;
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
              &:hover {
                cursor: pointer;
                transform: scale(1.02);
                transition: .3s;
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
        }
        .right__item {
          width: 100% !important;
        }
      }
    }
  }
</style>