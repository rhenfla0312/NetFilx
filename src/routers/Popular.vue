<script>
import axios from 'axios';
export default {
  data() {
    return {
      // 개봉예정 URL
      POPULAR_MOVIE_URL : 'https://api.themoviedb.org/3/movie/popular', 
      POPULAR_TV_URL : 'https://api.themoviedb.org/3/tv/popular',

      // 관련 영화 및 티비
      POPULAR_INFO_URL : 'https://api.themoviedb.org/3/movie',

      // KEY
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',
      
      // IMG_URL
      POPULAR_IMG : 'https://image.tmdb.org/t/p/original',

      // DATA
      POPULAR_DATA : [],
      CHECK_DATA : "movie",

      skeleton : true,
      
      movie_page : 2,
      tv_page : 2,

      genres_start : false,

      genres__check : false,
      genres__item__check_one : false,
      genres__item__check_two : false,
      genres__item__check_three : false,
      genres__item__check_four : false,
      genres__item__check_five : false,
      genres__item__check_six : false,
      genres__item__check_seven : false,
      genres__item__check_eight : false,

      genres_url : 0,

    }
  },
  methods: {
    async movie() {
      this.skeleton = true;
      this.genres_start = false;
      this.genres__item__check_one = false;
      this.genres__item__check_two = false;
      this.genres__item__check_three = false;
      this.genres__item__check_four = false;
      this.genres__item__check_five = false;
      this.genres__item__check_six = false;
      this.genres__item__check_seven = false;
      this.genres__item__check_eight = false;
      await axios.get(`${this.POPULAR_MOVIE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res);
        this.skeleton = false;
        this.POPULAR_DATA = res.data.results;
      }).catch((error) => {
        console.log(error)
      })
      this.CHECK_DATA = "movie";
    },
    async tv() {
      this.skeleton = true;
      this.genres_start = false;
      this.genres__item__check_one = false;
      this.genres__item__check_two = false;
      this.genres__item__check_three = false;
      this.genres__item__check_four = false;
      this.genres__item__check_five = false;
      this.genres__item__check_six = false;
      this.genres__item__check_seven = false;
      this.genres__item__check_eight = false;
      await axios.get(`${this.POPULAR_TV_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res);
        this.skeleton = false;
        this.POPULAR_DATA = res.data.results;
      }).catch((error) => {
        console.log(error)
      })
      this.CHECK_DATA = "tv";
    },
    // detail page
    detail(id) {
      this.$router.push({
        name: "DetailInfo",
        params: {
          id,
          CHECK_DATA : this.CHECK_DATA
        }
      })
    },
    genres() {
      this.genres__check = !this.genres__check
    },
    async genresd(item) {
      this.genres_start = true;
      try {
        if(this.CHECK_DATA == "movie") {
          switch(item) {
            case "one":
              this.genres_url = 28;
              this.genres__item__check_one = true;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break;
            case "two":
              this.genres_url = 35;
              this.genres__item__check_one = false;
              this.genres__item__check_two = true;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "three":
              this.genres_url = 10752;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = true;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "four":
              this.genres_url = 16;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = true;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "five":
              this.genres_url = 36;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = true;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "six":
              this.genres_url = 10749;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = true;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "seven":
              this.genres_url = 53;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = true;
              this.genres__item__check_eight = false;
              break
            case "eight":
              this.genres_url = 27;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = true;
              break
            default:
              alert("오류");
              break
          }
            await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&language=ko&with_genres=${this.genres_url}`).
              then(res => {
                console.log(res);
                this.POPULAR_DATA = res.data.results;
              }).catch(e => {
                console.log(e)
              })
        } else {
          switch(item) {
            case "one":
              this.genres_url = 10759;
              this.genres__item__check_one = true;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break;
            case "two":
              this.genres_url = 35;
              this.genres__item__check_one = false;
              this.genres__item__check_two = true;
              this.genres__item__check_three = false;
              this.genres__item__check_four = false;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "three":
              alert("TV프로그램은 애니메이션 & 코미디만 선택할 수 있습니다")
              break
            case "four":
              this.genres_url = 16;
              this.genres__item__check_one = false;
              this.genres__item__check_two = false;
              this.genres__item__check_three = false;
              this.genres__item__check_four = true;
              this.genres__item__check_five = false;
              this.genres__item__check_six = false;
              this.genres__item__check_seven = false;
              this.genres__item__check_eight = false;
              break
            case "five":
              alert("TV프로그램은 액션 & 애니메이션 & 코미디만 선택할 수 있습니다")
              break
            case "six":
              alert("TV프로그램은 액션 & 애니메이션 & 코미디만 선택할 수 있습니다")
              break
            case "seven":
              alert("TV프로그램은 액션 & 애니메이션 & 코미디만 선택할 수 있습니다")
              break
            case "eight":
              alert("TV프로그램은 액션 & 애니메이션 & 코미디만 선택할 수 있습니다")
              break
            default:
              alert("TV프로그램은 액션 & 애니메이션 & 코미디만 선택할 수 있습니다")
              break
          }

        await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.API_KEY}&language=ko&with_genres=${this.genres_url}`).
          then(res => {
            console.log(res);
            this.POPULAR_DATA = res.data.results;
          }).catch(e => {
            console.log(e)
          })
        }
        
      } catch(e) {
        console.error(e)
      }
    },
  },
  async mounted() {
    try {
      // default -> movie
      await axios.get(`${this.POPULAR_MOVIE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.POPULAR_DATA = res.data.results;
        setTimeout(() => {
          this.skeleton = false;
        },1000)
      }).catch((error) => {
        console.log(error)
      }) 
    } catch(e) {
      console.error(e);
    }
  },
  updated() {
    // 문제 - 상세정보 들어갔다가 뒤로가기하면 초기화 -> store에 상태 저장하기
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { // 감지대상이 교차영역에 진입 할 경우
          // axios
          if(this.CHECK_DATA == "movie") {
            this.skeleton = true;
            if(this.genres_start) {
              axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&language=ko&with_genres=${this.genres_url}&page=${this.movie_page}`).
              then(res => {
                console.log(res);
                this.POPULAR_DATA = this.POPULAR_DATA.concat(res.data.results);
                this.genres_start = false;
                setTimeout(() => {
                  this.skeleton = false;
                },1000)
              }).catch(e => {
                console.log(e)
              })
            } else {
              axios.get(`${this.POPULAR_MOVIE_URL}?api_key=${this.API_KEY}&language=ko&page=${this.movie_page}`)
              .then((res) => {
                this.POPULAR_DATA = this.POPULAR_DATA.concat(res.data.results)
                setTimeout(() => {
                  this.skeleton = false;
                },1000)
              }).catch((error) => {
                console.log(error)
              })
            }
            this.movie_page++;
          } else {
            this.skeleton = false;
            if(this.genres_start) {
              axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.API_KEY}&language=ko&with_genres=${this.genres_url}&page=${this.tv_page}`).
                then(res => {
                  console.log(res);
                  this.POPULAR_DATA = this.POPULAR_DATA.concat(res.data.results);
                  setTimeout(() => {
                    this.skeleton = false;
                    this.genres_start = false;
                  },1000)
                }).catch(e => {
                  console.log(e)
                })
            } else {
              axios.get(`${this.POPULAR_TV_URL}?api_key=${this.API_KEY}&language=ko&page=${this.tv_page}`)
              .then((res) => {
                this.POPULAR_DATA = this.POPULAR_DATA.concat(res.data.results)
                setTimeout(() => {
                  this.skeleton = false;
                },1000)
              }).catch((error) => {
                console.log(error);
              })
            }
            this.tv_page++;
          }
          observer.unobserve(entry.target); // 이미지 로딩 이후론 관찰할 필요 x
        }
      })
    })
    const images = document.querySelector('.popular__item__plus');
    io.observe(images)
  }
}
</script>


<template>
  <div class="popular">
    <div class="popular__list">
      <div class="__header">
        <div class="__title">
          <div class="__movie" @click="movie()">영화</div>
          <div class="__tv" @click="tv()">TV프로그램</div>
          <div class="__genres">
            <div class="__genres__name" @click="genres()">
              <div class="genres__title">장르</div>
              <div class="genres__arrow"><span class="material-symbols-outlined">expand_more</span></div>
            </div>
            <div class="genres__item" :class="{ genres__check }">
              <div class="genres__left">
                <div class="__item" @click="genresd('one')" :class="{ genres__item__check_one }">액션</div>
                <div class="__item" @click="genresd('two')" :class="{ genres__item__check_two }">코미디</div>
                <div class="__item" @click="genresd('three')" :class="{ genres__item__check_three }">전쟁</div>
                <div class="__item" @click="genresd('four')" :class="{ genres__item__check_four }">애니메이션</div>
              </div>
              <div class="genres__right">
                <div class="__item" @click="genresd('five')" :class="{ genres__item__check_five }">역사</div>
                <div class="__item" @click="genresd('six')" :class="{ genres__item__check_six }">로맨스</div>
                <div class="__item" @click="genresd('seven')" :class="{ genres__item__check_seven }">스릴러</div>
                <div class="__item" @click="genresd('eight')" :class="{ genres__item__check_eight }">공포</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="popular__item">
        <div class="__item" v-for="item in POPULAR_DATA" :key="item" @click="detail(item.id)">
          <div v-if="skeleton" class="__skeleton"></div>
          <img v-else :src="`${POPULAR_IMG}/${item.poster_path}`" />
        </div>
        <div class="popular__item__plus"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');

  .popular {
    padding-top: 4.1rem;
    // height: 100vh;
    background: #060d17;
    .popular__list {
      width: 70vw;
      margin: auto;
      .__header {
        height: 10vh;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 22px;
        .__title {
          font-family: 'IBM Plex Sans KR', sans-serif;
          display: flex;
          .__movie {
            margin-left: 1rem;
            transition: .2s;
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
              transition: .2s;
            }
          }
          .__tv {
            margin-left: 5rem;
            transition: .2s;
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
              transition: .2s;
            }
          }
          .__genres {
            position: relative;
            margin-left: 5rem;
            transition: .2s;
            .__genres__name {
              display: flex;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
              .genres__arrow {
                display: flex;
                align-items: center;
              }
            }
            .genres__item {
              display: flex;
              position: absolute;
              top: 3rem;
              width: 15vw;
              background: rgba(0,0,0,.9);
              box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
              border-radius: 10px;
              padding: 2rem;
              font-size: 17px;
              opacity: 0;
              .genres__left {
                cursor: pointer;
                .__item {
                  margin-top: 1rem;
                  &:first-child {
                    margin-top: auto;
                  }
                  &:hover {
                    transform: scale(1.1);
                  }
                  &::before {
                    content: "\2713";
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_one {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_two {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_three {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_four {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
              }
              .genres__right {
                margin-left: 3rem;
                .__item {
                  cursor: pointer;
                  margin-top: 1rem;
                  &:first-child {
                    margin-top: auto;
                  }
                  &:hover {
                    transform: scale(1.1);
                  }
                  &::before {
                    content: "\2713";
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_five {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_six {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_seven {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
                .__item.genres__item__check_eight {
                  &::before {
                    content: "\2713";
                    color: green;
                    margin-right: 0.5rem;
                  }
                }
              }
            }
            .genres__item.genres__check {
              opacity: 1;
            }
          }
        }
      }
      .popular__item {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(6, 1fr);
        justify-items: center;
        .__item {
          .__skeleton {
            width: 11vw;
            height: 14vw;
            border-radius: 10px;
            background-color: #ddd;
            animation: pulse-bg 1s infinite;
            @keyframes pulse-bg {
              0% {
                background-color: #ddd;
              }
              50% {
                background-color: #d0d0d0;
              }
              100% {
                background-color: #ddd;
              }
            }
          }
          img {
            width: 11vw;
            height: 14vw;
            border-radius: 10px;
            transition: .2s;
            &:hover {
              cursor: pointer;
              transform: scale(1.1);
              transition: .2s;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .popular {
      padding-top: 4.1rem;
      // height: 100vh;
      background: #060d17;
      .popular__list {
        width: 70vw;
        margin: auto;
        .__header {
          height: 10vh;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 22px;
          .__title {
            font-family: 'IBM Plex Sans KR', sans-serif;
            display: flex;
            .__movie {
              font-size: 20px;
              margin-left: 1rem;
              transition: .2s;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
            }
            .__tv {
              font-size: 20px;
              margin-left: 5rem;
              transition: .2s;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
            }
            .__genres {
              font-size: 20px;
              position: relative;
              margin-left: 5rem;
              transition: .2s;
              .__genres__name {
                display: flex;
                cursor: pointer;
                &:hover {
                  transform: scale(1.1);
                  transition: .2s;
                }
                .genres__arrow {
                  display: flex;
                  align-items: center;
                }
              }
              .genres__item {
                display: flex;
                position: absolute;
                top: 3rem;
                width: 30vw;
                background: rgba(0,0,0,.9);
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                border-radius: 10px;
                padding: 2rem;
                font-size: 15px;
                opacity: 0;
                .genres__left {
                  cursor: pointer;
                  .__item {
                    margin-top: 1rem;
                    &:first-child {
                      margin-top: auto;
                    }
                    &:hover {
                      transform: scale(1.1);
                    }
                    &::before {
                      content: "\2713";
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_one {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_two {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_three {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_four {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                }
                .genres__right {
                  margin-left: 3rem;
                  .__item {
                    cursor: pointer;
                    margin-top: 1rem;
                    &:first-child {
                      margin-top: auto;
                    }
                    &:hover {
                      transform: scale(1.1);
                    }
                    &::before {
                      content: "\2713";
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_five {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_six {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_seven {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                  .__item.genres__item__check_eight {
                    &::before {
                      content: "\2713";
                      color: green;
                      margin-right: 0.5rem;
                    }
                  }
                }
              }
              .genres__item.genres__check {
                opacity: 1;
              }
            }
          }
        }
        .popular__item {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(4, 1fr);
          justify-items: center;
          .__item {
            .__skeleton {
              width: 17vw;
              height: 20vw;
              border-radius: 10px;
              background-color: #ddd;
              animation: pulse-bg 1s infinite;
              @keyframes pulse-bg {
                0% {
                  background-color: #ddd;
                }
                50% {
                  background-color: #d0d0d0;
                }
                100% {
                  background-color: #ddd;
                }
              }
            }
            img {
              width: 17vw;
              height: 20vw;
              border-radius: 10px;
              transition: .2s;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: .2s;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .popular {
      padding-top: 2.9rem !important;
      .popular__list {
        width: 90vw;
        margin: auto;
        .__header {
          position: relative !important;
          justify-content: center;
          .__genres {
            font-size: 20px;
            // static - 초기값으로 위치지정 하지않은거와 같기 때문에 사용할일이 없지만 미디어쿼리에서 무시하는걸로 사용할 수 있다
            position: static !important;
            margin-left: 5rem;
            transition: .2s;
            .__genres__name {
              display: flex;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
              .genres__arrow {
                display: flex;
                align-items: center;
              }
            }
            .genres__item {
              display: flex;
              position: absolute !important;
              top: 5rem !important;
              border-radius: 0 !important;
              width: 100% !important;
              left: 0;
              justify-content: center;
              font-size: 18px;
              align-items: center;
              .genres__left {
                width: 50%;
                text-align: center;
              }
              .genres__right {
                width: 50%;
                text-align: center;
              }
            }
          }
        }
        .popular__item {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;
          .__item {
            .__skeleton {
              width: 28vw !important;
              height: 35vw !important;
            }
            img {
              width: 28vw !important;
              height: 35vw !important;
              border-radius: 10px;
              transition: .2s;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: .2s;
              }
            }
          }
        }
      }
    }
  }
</style>