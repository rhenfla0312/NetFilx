<script>
import axios from 'axios';
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [
        Pagination,
      ]
    }
  },
  data() {
    return {
      // URL
      MOVIE_INFO_URL : 'https://api.themoviedb.org/3/movie',

      TV_INFO_URL : 'https://api.themoviedb.org/3/tv',

      // KEY -> env로 관리하기
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',

      // IMG_URL
      MOVIE_IMG : 'https://image.tmdb.org/t/p/original',

      ID : this.$route.params.id,
      CHECK_DATA : this.$route.params.CHECK_DATA,

      detail_data: {},
      detail_similar_Data : [],
      detail_cast : [],
      detail_reviews : [],
      detail_video: "",
      detail_data_genres : "",
      createlist : "",

      instagram_url: [],
      facebook_url: [],
      twitter_url: [],
      rated_id : [],
      list_item : [],
      listBoxData : [],

      list__save : false,
      favorites__save : false,
      watchlist__save : false,
      like__save : false,
      like__open : false,
      list__open : false,
      create__list : false,
      error_createlist : false,
      item_present : false,

      like__one : false,
      like__two : false,
      like__three : false,
      like__four : false,

      skeleton : true,

      video_check: false,
      displaySize : 0

    }
  },
  computed: {
    displayWidthSize() {
      return window.onresize  = ((e) => {
        return this.displaySize = window.innerWidth;
      })
    },
  },
  watch: {
    displayWidthSize(e) {
      e = window.innerWidth;
    },
  },
  methods: {
    detail__video__play() {
      this.video_check = true;
    },
    // detail page
    detail(id) {
      this.$router.push({
        name: "DetailInfo",
        params: {
          id: id,
          CHECK_DATA : this.CHECK_DATA
        }
      })
      // 기록 -> 실시간으로 같은페이지에서 새로운걸 변화할거면 -> 같은페이지에서 새로운게 들어오면 감지해서 변화하는 -> watch로 바꾸자
      setTimeout(() => {
        this.$router.go();
      },1000) 
    },
    like_number_one() {
      this.like__one = true;
    },
    like_number_two() {
      this.like__one = true;
      this.like__two = true;
    },
    like_number_three() {
      this.like__one = true;
      this.like__two = true;
      this.like__three = true;
    },
    like_number_four() {
      this.like__one = true;
      this.like__two = true;
      this.like__three = true;
      this.like__four = true;
    },
    like_number_one_out() {
      if(this.like__two === false && this.like__three == false && this.like__four == true || this.like__four == false) {
        this.like__one = false;
      }
    },
    like_number_two_out() {
      if(this.like__three == false && this.like__four == true || this.like__four == false) {
        this.like__two = false;
      }
    
    },
    like_number_three_out() {
      if(this.like__four == true || this.like__four == false) {
        this.like__three = false;
        this.like__four = false;
      }
    },
    like_number_four_out() {
      this.like__four == false;
    },
    // 재생목록 창 열기
    listOpenBtn() {
      // 기록 - and조건이면 하나의 조건에 하는게 효율적이지만 and조건이지만 그거에 따라 else의 내용이 다르다면 따로 적어줘야한다
      if(localStorage.getItem('session_id')) {
        if(this.CHECK_DATA === "movie") {
          this.list__open = true;
        } else {
          this.$swal.fire({
            position: 'center',
            icon: 'info',
            title: '영화만 추가 가능합니다',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } else if(localStorage.getItem('guest_session_id')) {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '재생목록 추가는 게스트 아이디로는 불가능합니다',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '로그인이 필요합니다',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    list_close() {
      this.list__open = false;
    },
    create__listBtn() {
      this.create__list = true;
    },
    createClose() {
      this.create__list = false;
      this.error_createlist = false;
    },
    // 재생목록 추가
    async createList() {
      console.log(this.createlist.length)
      if(this.createlist.length > 0) {
        this.error_createlist = false;
        // 타이머
        let timerInterval
        this.$swal.fire({
          title: 'Auto close alert!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {  
            this.$swal.showLoading()
            const b = this.$swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            // 
          }
        })
        await axios({
          method: "POST",
          url: `https://api.themoviedb.org/3/list?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
          data: {
            name : this.createlist,
            description : "test",
            language: "ko"
          }
        }).then((res) => {
          console.log('list item')
          console.log(res);
          console.log(res.data.list_id);
          this.create__list = false;

          
          // localstorage는 set, get, remove 3가지밖에 없다 배열추가같은 concat, push는 사용못한다
          // axios로 데이터를 불러올떄마다 새로고침으로인한 휘발성데이터를 로컬스토리지에 배열형식으로 한번 axios요청마다 추가하여 이어붙일려고한다
          // localstorage는 문자형태로 되어있어서 저장할땐 json.stringify, 불러올땐 json.parse로 불러와야 배열/객체 형태로 가져올 수 있다
          // 휘발성을 -> localstorage에 넣을려면 get으로 기존껄 불러와서 다시 set으로 넣어주면 된다
          // 기록 - 로컬스토리지에 배열데이터 추가하는 방법 - getItem에다 push같은걸로 데이터를 추가할수가 있다? -> getItem에 추가한걸 setItem으로 다시 넣는다
          this.list_item = this.list_item.concat(res.data.list_id);
          if(localStorage.getItem('list_id')) {
            // res.data.list_id 를 바로 넣으면 문자열이기때문에 배열에 넣어야해서 오류가 걸린다 -> 배열데이터를 선언후 배열데이터에 넣은걸 다시 할당해야한다
            // JSON.parse(localStorage.getItem('list_id')).concat(this.list_item);
            // 위에서 데이터추가후 넣으니까 안들어간다 바로 추가부분에 넣어라
            localStorage.setItem('list_id', JSON.stringify( JSON.parse(localStorage.getItem('list_id')).concat(this.list_item)));        
          } else {
            console.log('데이터가 하나도 없음');
            localStorage.setItem('list_id', JSON.stringify(this.list_item));
          }

          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '재생목록을 생성하였습니다',
            showConfirmButton: false,
            timer: 2000,
          })
          // 요청이 끝난다음 넣게되면 setTimeout같은건 필요없지만 끝난다음이란게 없다면 바로하게되면 실행되기도전에 새로고침될수있어서 1초를 임의로 건다
          setTimeout(() => {
            this.$router.go()
          },1000)
        }).catch((e) => {
          console.log(e)
        })
      } else {
        this.error_createlist = true;
      }
    },
    // 재생목록 -> 영화 추가
    async list_checkbox(id) {
      // 해당 영화가 추가되었는지 확인
      await axios.get(`https://api.themoviedb.org/3/list/${id}/item_status?api_key=${this.API_KEY}&movie_id=${this.ID}`)
      .then((res) => {
        console.log(res);
        this.item_present = res.data.item_present;
      }).catch((e) => {
        console.log(e)
      })

      // 타이머
      let timerInterval
      this.$swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {  
          this.$swal.showLoading()
          const b = this.$swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = this.$swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === this.$swal.DismissReason.timer) {
          // 
        }
      })
      // if else하면 뭔가 안될때도 있다 불안하다 -> else말고 확실한 조건으로 else if로 걸고 연산자도 ===로 확실하게 하자
      if(this.item_present === false) {
        // await 했는데도 불과하고 axios 한번할때마다 안붙여도될 then, catch로 코드가 엄청 늘어간다 -> 다음부턴 async await쓸거면 then catch빼고 변수로 받고(then), 함수 전체를 try, catch로 묶어서 한꺼번에 사용해라
        // 현재 디비가 아니라 로컬스토리지에 임의로 저장하고있기 때문에 -> 본인 아이디로 로그인한거에 대해서만 만든 재생목록에 목록들을 추가할수있다 -> 로그아웃할때 삭제해야 안전하다 vs 하나의 아이디로 한다는 가정하에 로그아웃후 다시 로그인해도 만들어져있는게 그대로다
        await axios({
          method: "POST",
          url: `https://api.themoviedb.org/3/list/${id}/add_item?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
          data: {
            media_id : this.ID
          }
        }).then((res) => {
          console.log(res);
          this.list__save = true;
          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '재생목록에 추가되었습니다',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(() => {
            this.$router.go()
          },1000)
        }).catch((e) => {
          console.log(e)
        })
      } else if(this.item_present === true) {
        await axios({
          method: "POST",
          url: `https://api.themoviedb.org/3/list/${id}/remove_item?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
          data: {
            media_id : this.ID
          }
        }).then((res) => {
          console.log(res);
          this.list__save = false;

          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '재생목록에서 삭제되었습니다',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(() => {
            this.$router.go()
          },1000)
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    list_checkbox_close(id) {
      this.$swal.fire({
        position: 'center',
        icon: 'info',
        title: '준비중입니다',
        showConfirmButton: false,
        timer: 2000
      })
    },
    // 즐겨찾기 추가
    async favoritesBtn() {
      if(this.favorites__save == false) {
        if(localStorage.getItem('session_id')) {
          // 타이머
          let timerInterval
          this.$swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {  
              this.$swal.showLoading()
              const b = this.$swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = this.$swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === this.$swal.DismissReason.timer) {
              // 
            }
          })
          await axios({
            method: "POST",
            url: `https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/favorite?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
            data: {
              "media_type": this.CHECK_DATA,
              "media_id": this.ID,
              "favorite": true
            }
          }).then((res) => {
            console.log(res);
            this.favorites__save = true;

            this.$swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '즐겨찾기에 담겼습니다',
              showConfirmButton: false,
              timer: 2000
            })
          }).catch((e) => {
            console.log(e)
          })
        } else if(localStorage.getItem('guest_session_id')) {
          this.$swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: '즐겨찾기 추가는 게스트 아이디로는 불가능합니다',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          this.$swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: '로그인이 필요합니다',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } else {
        // 즐겨찾기 삭제
        // 타이머
        let timerInterval
        this.$swal.fire({
          title: 'Auto close alert!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {  
            this.$swal.showLoading()
            const b = this.$swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            // 
          }
        })
        await axios({
          method: "POST",
          url: `https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/favorite?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
          data: {
            "media_type": this.CHECK_DATA,
            "media_id": this.ID,
            "favorite": false
          }
        }).then((res) => {
          console.log(res);
          this.favorites__save = false;

          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '즐겨찾기에서 삭제되었습니다',
            showConfirmButton: false,
            timer: 2000
          })
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    async watchlistBtn() {
      // 관심목록 추가 대기 -> 401로 -> 토큰쪽 문제있는거같음
      if(this.watchlist__save == false) {
        if(localStorage.getItem('session_id')) {
          // 타이머
          let timerInterval
          this.$swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {  
              this.$swal.showLoading()
              const b = this.$swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = this.$swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === this.$swal.DismissReason.timer) {
              // 
            }
          })
          await axios({
            method: "POST",
            url: `https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/watchlist?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
            data: {
              "media_type": this.CHECK_DATA,
              "media_id": this.ID,
              "watchlist": true
            }
          }).then((res) => {
            console.log(res);
            this.watchlist__save = true;

            this.$swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '관심목록에 담겼습니다',
              showConfirmButton: false,
              timer: 2000
            })
          }).catch((e) => {
            console.log(e)
          })
        } else if(localStorage.getItem('guest_session_id')) {
          this.$swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: '관심목록 추가는 게스트 아이디로는 불가능합니다',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          this.$swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: '로그인이 필요합니다',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } else {
        // 관심목록 삭제
        // 타이머
        let timerInterval
        this.$swal.fire({
          title: 'Auto close alert!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {  
            this.$swal.showLoading()
            const b = this.$swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            // 
          }
        })

        await axios({
          method: "POST",
          url: `https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/watchlist?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`,
          data: {
            "media_type": this.CHECK_DATA,
            "media_id": this.ID,
            "watchlist": false
          }
        }).then((res) => {
          console.log(res);
          this.watchlist__save = false;

          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '관심목록에서 삭제되었습니다',
            showConfirmButton: false,
            timer: 2000
          })
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    likeOpenBtn() {
      this.like__open = !this.like__open;
      this.rated_id.forEach((e) => {
        if(this.ID === String(e.id)) {
          // 같은 값이 맞지않다면 타입이 다른거다 -> 맞춰줘라
          this.like__save = true;
          if(e.rating === 2.5) {
            this.like__one = true;
          } else if(e.rating === 5) {
            this.like__one = true;
            this.like__two = true;
          } else if(e.rating === 7.5) {
            this.like__one = true;
            this.like__two = true;
            this.like__three = true;
          }else if(e.rating === 10) {
            this.like__one = true;
            this.like__two = true;
            this.like__three = true;
            this.like__four = true;
          } else {
            this.like__one = false;
            this.like__two = false;
            this.like__three = false;
            this.like__four = false;
          }
        }
      })
    },
    // 평점
    // ui적으로 평점잡는게 문제가 좀 있다
    async likeBtn(value) {
      // 평점은 1점 이상부터 가능
      // 타이머
      let timerInterval
      this.$swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {  
          this.$swal.showLoading()
          const b = this.$swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = this.$swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === this.$swal.DismissReason.timer) {
          // 
        }
      })

      await axios({
        url: `https://api.themoviedb.org/3/${this.CHECK_DATA === "movie" ? "movie" : "tv"}/${this.ID}/rating?api_key=${this.API_KEY}&${localStorage.getItem('session_id') !== null ? "session_id=" + localStorage.getItem('session_id') : "guest_session_id=" + localStorage.getItem('guest_session_id')}`,
        method: 'POST',
        data: {
          value : value
        }
      }).then((res) => {
        console.log(res);
        this.like__save = true;
        
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '평점을 등록했습니다',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          this.$router.go();
        },1000)
      }).catch((e) => {
        console.log(e)
      })
      // 평점 삭제
      // axios({
      //   url: `https://api.themoviedb.org/3/${this.CHECK_DATA === "movie" ? "movie" : "tv"}/${this.ID}/rating?api_key=${this.API_KEY}&${localStorage.getItem('session_id') !== null ? "session_id=" + localStorage.getItem('session_id') : "guest_session_id=" + localStorage.getItem('guest_session_id')}`,
      //   method: 'DELETE'
      // }).then((res) => {
      //   console.log(res);
      //   this.like__save = false;
      //   this.$swal.fire({
      //     position: 'top-end',
      //     icon: 'success',
      //     title: '평점을 삭제했습니다',
      //     showConfirmButton: false,
      //     timer: 2000
      //   })
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    // -> css before content -> a태그가 아닌 클릭이벤트로 location으로 이동
    instagram() {
      if(this.instagram_url) {
        window.open(`https://www.instagram.com/${this.instagram_url}`)
      } else if(this.CHECK_DATA == "movie") {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '해당 영화는 instagram링크가 걸려있지 않습니다',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '해당 TV 프로그램은 instagram링크가 걸려있지 않습니다',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    facebook() {
      if(this.instagram_url) {
        window.open(`https://www.facebook.com/${this.facebook_url}`)
      } else if(this.CHECK_DATA == "movie") {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '해당 영화는 facebook링크가 걸려있지 않습니다',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '해당 영화는 facebook링크가 걸려있지 않습니다',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    twitter() {
      if(this.twitter_url) {
        window.open(`https://twitter.com/${this.twitter_url}`)
      } else if(this.CHECK_DATA == "movie") {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '해당 영화는 twitter링크가 걸려있지 않습니다',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: '해당 TV 프로그램은 twitter링크가 걸려있지 않습니다',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
  },
  // updated() {

  // },
  // try, catch문은 해당 함수가 async를 가지고있을때 사용이 가능하다 -> await쓰면서 await안에서 then, catch안할거면 async await을 쓰면서 전체를 try, catch 로 묶어라
  async mounted() {
    this.displaySize = window.innerWidth;
    try {
      if(this.CHECK_DATA == "movie") {
        // movie
        // id에 맞는 정보 가져오기
        axios.get(`${this.MOVIE_INFO_URL}/${this.ID}?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          console.log(res)
          this.detail_data = res.data
          this.detail_data_genres = res.data.genres[0].name
        }).catch((error) => {
          console.log(error)
        })
    
        // id에 맞는 영상 가져오기
        axios.get(`${this.MOVIE_INFO_URL}/${this.ID}/videos?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          console.log('영상')
          console.log(res)
          if(res.data.results.length > 0) {
            this.detail_video = res.data.results[0].key
          } 
        }).catch((error) => {
          console.log(error)
        })
  
        // id에 맞는 비슷한 영화 가져오기
        axios.get(`${this.MOVIE_INFO_URL}/${this.ID}/recommendations?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          // console.log(res)
          if(res.data.results.length > 0) {
            this.detail_similar_Data = res.data.results
          }
        }).catch((error) => {
          console.log(error)
        })

        // id에 맞는 출연진
        axios.get(`${this.MOVIE_INFO_URL}/${this.ID}/credits?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          // console.log(res);
          this.detail_cast = res.data.cast
        }).catch((error) => {
          console.log(error)
        })

        // 리뷰 받아오기 -> 영문
        axios.get(`https://api.themoviedb.org/3/movie/${this.ID}/reviews?api_key=${this.API_KEY}&language=en-US`)
        .then((res) => {
          // console.log(res)
          this.detail_reviews = res.data.results;
        }).catch((e) => {
          console.log(e)
        })

        // 외부 아이디 가져오기 (instagram, facebook, twitter)
        axios.get(`https://api.themoviedb.org/3/movie/${this.ID}/external_ids?api_key=${this.API_KEY}`)
        .then((res) => {
          // console.log(res)
          this.instagram_url = res.data.instagram_id;
          this.facebook_url = res.data.facebook_id;
          this.twitter_url = res.data.twitter_id;
        }).catch((e) => {
          console.log(e)
        })
        this.skeleton = false;
      } else {
        // tv
        // id에 맞는 정보 가져오기
        axios.get(`${this.TV_INFO_URL}/${this.ID}?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          // console.log(res)
          this.detail_data = res.data
          this.detail_data_genres = res.data.genres[0].name
        }).catch((error) => {
          console.log(error)
        })
    
        // id에 맞는 영상 가져오기
        axios.get(`${this.TV_INFO_URL}/${this.ID}/videos?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          console.log(res)
          if(res.data.results.length > 0) {
            this.detail_video = res.data.results[0].key
          } 
        }).catch((error) => {
          console.log(error)
        })
  
        // id에 맞는 비슷한 영상 가져오기
        axios.get(`${this.TV_INFO_URL}/${this.ID}/recommendations?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          // console.log(res)
          if(res.data.results.length > 0) {
            this.detail_similar_Data = res.data.results
          }
        }).catch((error) => {
          console.log(error)
        })

        // id에 맞는 출연진
        axios.get(`${this.TV_INFO_URL}/${this.ID}/aggregate_credits?api_key=${this.API_KEY}&language=ko`)
        .then((res) => {
          // console.log(res);
          this.detail_cast = res.data.cast
        }).catch((error) => {
          console.log(error)
        })

        // 리뷰 받아오기 -> 영문
        axios.get(`https://api.themoviedb.org/3/tv/${this.ID}/reviews?api_key=${this.API_KEY}&language=en-US`)
        .then((res) => {
          // console.log(res)
          this.detail_reviews = res.data.results;
        }).catch((e) => {
          console.log(e)
        })

        // 외부 아이디 가져오기 (instagram, facebook, twitter)
        axios.get(`https://api.themoviedb.org/3/tv/${this.ID}/external_ids?api_key=${this.API_KEY}&language=en-US`)
        .then((res) => {
          // console.log(res)
          this.instagram_url = res.data.instagram_id;
          this.facebook_url = res.data.facebook_id;
          this.twitter_url = res.data.twitter_id;
        }).catch((e) => {
          console.log(e)
        })
        this.skeleton = false;
      }

      if(localStorage.getItem('session_id')) {
        // favorite
        axios.get(`https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/favorite/${this.CHECK_DATA === "movie" ? "movies" : "tv" }?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}&language=ko&sort_by=created_at.asc`)
        .then((res) => {
          // 즐겨찾기한 영화 아이디와 -> 상세페이지의 아이디가 같으면 해당 아이템에 색깔 표시해주기 (mounted라 새로고침해도 그때마다 입력이라 안변한다 -> 변하면 안되는걸 mounted로 새로고침마다 부여하면 된다)
          console.log("즐겨찾기")
          console.log(res);
          res.data.results.forEach((e) => {
            if(this.ID === String(e.id)) {
              // 같은 값이 맞지않다면 타입이 다른거다 -> 맞춰줘라
              this.favorites__save = true;
            }
          })
        }).catch((e) => {
          console.log(e);
        })

        // rating
        axios.get(`https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/watchlist/${this.CHECK_DATA === "movie" ? "movies" : "tv" }?api_key=${this.API_KEY}&language=ko&session_id=${localStorage.getItem('session_id')}&sort_by=created_at.asc`)
        .then((res) => {
          // 관심목록에 영화 아이디와 -> 상세페이지의 아이디가 같으면 해당 아이템에 색깔 표시해주기 (mounted라 새로고침해도 그때마다 입력이라 안변한다 -> 변하면 안되는걸 mounted로 새로고침마다 부여하면 된다)
          console.log("관심목록")
          console.log(res);
          res.data.results.forEach((e) => {
            if(this.ID === String(e.id)) {
              // 같은 값이 맞지않다면 타입이 다른거다 -> 맞춰줘라
              this.watchlist__save = true;
            }
          })
        }).catch((e) => {
          console.log(e);
        })
        // 세션 평점
        axios.get(`https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/rated/${this.CHECK_DATA === "movie" ? "movies" : "tv" }?api_key=${this.API_KEY}&language=ko&session_id=${localStorage.getItem('session_id')}&sort_by=created_at.asc`)
        .then((res) => {
          console.log(res);
          this.rated_id = res.data.results;
          res.data.results.forEach((e) => {
            if(this.ID === String(e.id)) {
              // 같은 값이 맞지않다면 타입이 다른거다 -> 맞춰줘라
              this.like__save = true;
              if(e.rating === 2.5) {
                this.like__one = true;
              } else if(e.rating === 5) {
                this.like__one = true;
                this.like__two = true;
              } else if(e.rating === 7.5) {
                this.like__one = true;
                this.like__two = true;
                this.like__three = true;
              }else if(e.rating === 10) {
                this.like__one = true;
                this.like__two = true;
                this.like__three = true;
                this.like__four = true;
              }
            }
          })
        }).catch((e) => {
          console.log(e);
        })

        // 재생목록 불러오기
        // localStorage에 배열을 넣을땐 stringify, localStorage에서 불러올떈 parse를 해야 사용이 가능하다 -> 안하고할경우 넣어지긴하지만 배열형태로 안들어간다(불러올때도)
        // tmdb api에서 현재 재생목록에 넣는걸 유지하는 방법을 못찾고있다 -> 현재 로컬스토리지를 이용해서 일시적으로 가지고있다 -> 그래서 로그아웃할떄도 일단 삭제는 하지않을거지만 그래도 언젠가 삭제되서 맞지않게되겠지 정보랑 -> 목록에 넣을때 id제공하고있던데 그거 받아오는 방법을 구상해보자
        // 기록 - 데이터를 불러와서 할당하는것들은 데이터가 없으면 오류가 나기때문에 항상 예외처리를 해야한다 -> 조건으로 데이터가 있을때만 작동하게 해야 오류가 안난다
        if(localStorage.getItem('list_id')) {          
          JSON.parse(localStorage.getItem('list_id')).forEach(async (e, i) => {
            await axios.get(`https://api.themoviedb.org/3/list/${e}?api_key=${this.API_KEY}&language=ko`)
            .then((res) => {
              console.log(res)
              this.listBoxData = this.listBoxData.concat(res.data);
            }).catch((error) => {
              console.log(error)
            })
  
            // 재생목록에 영화 들어있는지 확인
            await axios.get(`https://api.themoviedb.org/3/list/${e}/item_status?api_key=${this.API_KEY}&movie_id=${this.ID}`)
            .then((res) => {
              console.log('영화 추가목록 확인')
              console.log(res);
              // 하나라도 이영화를 재생목록에 넣었다면 있는걸로 색깔을 바꾼다
              // 이렇게 반복문중에서 true인 것만 안에다 담으면 false인것들은 지나간다 그래서 모든 반복문 요소에 true인 요소에만 변화주고 싶다면 이렇게 true인 요소안에 담긴요소들만 적용하게 할수있다 (foreach로 모든 index값을 줘도 true조건 안에는 true인 index만 담기니 모든요소[i]를 줘도 true인 i만담겨서 걸러낼수 있다)
              if(res.data.item_present === true) {
                this.list__save = true;
                this.$refs.checkbox__list[i].checked = true
              }
              // console.log(e)
              // console.log(this.$refs.checkbox__list[i]._value)
              // if(Number(this.$refs.checkbox__list[i]._value) === e) {
              //   // this.$refs.checkbox__list[i].checked = true;
              // }
  
  
            }).catch((e) => {
              console.log(e)
            })
          })
        }

        // session 바로 else로 하니깐 로그인 안한상태에서도 실행되어 오류가 생긴다 앞으론 else if로 guest session으로 적어주자
      } else if(localStorage.getItem('guest_session_id')) {
        // 게스트 평점
        axios.get(`https://api.themoviedb.org/3/guest_session/${localStorage.getItem('guest_session_id')}/rated/${this.CHECK_DATA === "movie" ? "movies" : "tv" }?api_key=${this.API_KEY}&language=en-US&sort_by=created_at.asc`)
        .then((res) => {
          console.log(res);
          this.rated_id = res.data.results;
          res.data.results.forEach((e) => {
            if(this.ID === String(e.id)) {
              // 같은 값이 맞지않다면 타입이 다른거다 -> 맞춰줘라
              this.like__save = true;
              if(e.rating === 2.5) {
                this.like__one = true;
              } else if(e.rating === 5) {
                this.like__one = true;
                this.like__two = true;
              } else if(e.rating === 7.5) {
                this.like__one = true;
                this.like__two = true;
                this.like__three = true;
              }else if(e.rating === 10) {
                this.like__one = true;
                this.like__two = true;
                this.like__three = true;
                this.like__four = true;
              }
            }
          })
        }).catch((e) => {
          console.log(e);
        })
      }
    } catch(e) {
      console.error(e);
    }
  }
}
</script>


<template>
  <div class="mv__detail">
    <div class="detail__box">
      <div class="skeleton__detail__bg" v-if="skeleton"></div>
      <div class="detail__bg" v-else :style="{ 'backgroundImage' : `url(${MOVIE_IMG}/${detail_data.backdrop_path})` }">
        <span class="material-symbols-outlined mv__play" :class="{ video_check }" @click="detail__video__play()">youtube_activity</span>
        <!-- 버튼 클릭시 유튜브 재생 -->
        <iframe class="detail__video" :class="{ video_check }" :src="`https://www.youtube.com/embed/${detail_video}`"></iframe>
      </div>
      <div class="detail__info">
        <div class="__info">
          <div class="__first">
            <div class="skeleton__poster" v-if="skeleton"></div>
            <div class="__poster" v-else>
              <img :src="`${MOVIE_IMG}/${detail_data.poster_path}`" onerror="this.src='https://previews.123rf.com/images/julynx/julynx1408/julynx140800023/30746516-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EA%B1%B0%EB%82%98-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%AC%EC%A7%84-%EC%97%86%EC%9D%8C.jpg'" >
            </div>
            <div class="__text">
              <div class="skeleton__title" v-if="skeleton"></div>
              <div class="__title" v-else>{{ CHECK_DATA == "movie" ? detail_data.title : detail_data.name }}</div>
              <div class="skeleton__myList" v-if="skeleton"></div>
              <div class="my__list" v-else>
                <div class="__list" :class="{ list__save }" @click="listOpenBtn()" title="재생목록에 추가"></div>
                <div class="__listBox" :class="{ list__open }">
                  <div class="list__header">
                    <div class="list__title">재생목록 추가</div>
                    <div class="list__close"><span class="material-symbols-outlined" @click="list_close()">close</span></div>
                  </div>
                  <!-- 재생목록 -->
                  <div class="list__body">
                    <div class="__body" v-for="listItem in listBoxData" :key="listItem">
                      <!-- label - checkbox -> id, for로 연결하면 checkbox쪽 클릭이벤트가 id로 연결된 label에 도 같이 작동한다 -->
                      <div class="body__checkbox">
                        <input type="checkbox" ref="checkbox__list" class="__checkbox" :value="listItem.id" :id="listItem.id" @click="list_checkbox(listItem.id)" />
                      </div>
                      <label :for="listItem.id" class="body__title">{{ listItem.name }}</label>
                      <span class="material-symbols-outlined body__close" @click="list_checkbox_close(listItem.id)">delete</span>
                    </div>
                  </div>
                  <div class="list__create" @click="create__listBtn()">
                    <div class="create__icon"><span class="material-symbols-outlined">playlist_add</span></div>
                    <div class="create__title">새 재생목록 만들기</div>
                  </div>

                  <!-- 재생목록 추가 -->
                  <div class="__createBox" :class="{ create__list }">
                    <div class="__createText">
                      <input type="text" class="__createContent" v-model="createlist" />
                      <div v-if="error_createlist" class="error__createContent">입력되지 않았습니다</div>
                    </div>
                    <div class="__createBtnBox">
                      <button class="__createClose" @click="createClose()">취소</button>
                      <button class="__createBtn" @click="createList()">추가하기</button>
                    </div>
                  </div>
                </div>
                <div class="__favorites" :class="{ favorites__save }"  @click="favoritesBtn()" title="즐겨찾기에 추가"></div>
                <div class="__watchlist" :class="{ watchlist__save }"  @click="watchlistBtn()" title="관심목록에 추가"></div>
                <div class="__likeBtn">
                  <div class="__like" :class="{ like__save }"  @click="likeOpenBtn()" title="평점 등록"></div>
                  <div class="__likeBox" :class="{ like__open }">
                    <div class="star __one" @mouseover="like_number_one()" @mouseout="like_number_one_out()" @click="likeBtn(2.5)" :class="{ like__one }"></div>
                    <div class="star __two" @mouseover="like_number_two()" @mouseout="like_number_two_out()" @click="likeBtn(5)" :class="{ like__two }"></div>
                    <div class="star __three" @mouseover="like_number_three()" @mouseout="like_number_three_out()" @click="likeBtn(7.5)" :class="{ like__three }"></div>
                    <div class="star __four" @mouseover="like_number_four()" @click="likeBtn(10)" :class="{ like__four }"></div>
                  </div>
                </div>
              </div>
              <div class="skeleton__talineBox" v-if="skeleton"></div>
              <div class="talineBox" v-else>
                <div class="__tagline">{{ detail_data.tagline}}</div>
                <div class="__sns">
                  <div class="__instagram" @click="instagram()"></div>
                  <div class="__facebook" @click="facebook()"></div>
                  <div class="__twitter" @click="twitter()"></div>
                </div>
              </div>
              <div class="skeleton__des" v-if="skeleton"></div>
              <div class="__des" v-else>{{ detail_data.overview}}</div>
            </div>
          </div>
          <div class="__second">
            <div class="__left">
              <hr />
              <div class="skeleton__date" v-if="skeleton"></div>
              <div class="date" v-else>
                <div class="date__text">개봉일 : </div>
                <div class="date__item">{{ CHECK_DATA == "movie" ? detail_data.release_date : detail_data.first_air_date }}</div>
              </div>
              <div class="skeleton__genres" v-if="skeleton"></div>
              <div class="genres" v-else>
                <div class="genres__text">장르 : </div>
                <div class="genres__item">{{ detail_data_genres }}</div>
              </div>
              <div class="skeleton__runtime" v-if="skeleton"></div>
              <div class="runtime" v-else>
                <div class="runtime__text">시간 : </div>
                <div class="runtime__item">{{ CHECK_DATA == "movie" ? detail_data.runtime : "24" }}</div>
              </div>
              <div class="skeleton__like" v-if="skeleton"></div>
              <div class="like" v-else>
                <div class="like__text">평점 : </div>
                <div class="like__item">{{ detail_data.vote_average }}</div>
              </div>
            </div>
            <div class="__right">
              <!-- 관련영상 -->
              <div class="detail__title">관련영상</div>
              <div class="detail__true" v-if="this.detail_similar_Data.length > 0">
                <swiper class="first__swiper swiper-slide" :slides-per-view="(displaySize > 1024) ? 4.2 : 3.2" :space-between="30" :modules="modules" Navigation="false">
                  <swiper-slide v-for="movie in detail_similar_Data" :key="movie" @click="detail(movie.id)">
                    <div class="skeleton__detail__info__box" v-if="skeleton"></div>
                    <div class="detail__info__box" v-else>
                      <img class="detail__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`" onerror="this.src='https://previews.123rf.com/images/julynx/julynx1408/julynx140800023/30746516-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EA%B1%B0%EB%82%98-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%AC%EC%A7%84-%EC%97%86%EC%9D%8C.jpg'"  />
                      <div class="detail__name">{{ movie.title }}</div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
              <div v-else class="detail__false">관련 영상이 없습니다</div>
              <!-- 출연진 -->
              <div class="detail__cast__title">출연진</div>
              <div class="detail__cast__true" v-if="this.detail_similar_Data.length > 0">
                <swiper class="first__swiper swiper-slide" :slides-per-view="(displaySize > 1024) ? 4.2 : 3.2" :space-between="30" :modules="modules" Navigation="false">
                  <swiper-slide v-for="cast in detail_cast" :key="cast">
                    <div class="skeleton__detail__cast__info__box" v-if="skeleton"></div>
                    <div class="detail__cast__info__box" v-else>
                      <img class="detail__cast__poster" :src="`${this.MOVIE_IMG}/${cast.profile_path}`" onerror="this.src='https://previews.123rf.com/images/julynx/julynx1408/julynx140800023/30746516-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EA%B1%B0%EB%82%98-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%AC%EC%A7%84-%EC%97%86%EC%9D%8C.jpg'" >
                      <div class="detail__cast__name">{{ cast.name }}</div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
              <div v-else class="detail__cast__false">관련 출연진이 없습니다</div>
              <!-- 리뷰 -->
              <div class="detail__cast__title">리뷰</div>
              <div class="skeleton__detail__reviews__true" v-if="skeleton"></div>
              <div class="detail__reviews__true" v-else-if="this.detail_reviews.length > 0">
                <div class="detail__reviews__box" v-for="reviews in detail_reviews" :key="reviews">
                  <div class="reviews__content">{{ reviews.content }}</div>
                  <div class="reviews__info">
                    <div class="reviews__name">{{ reviews.author }}가</div>
                    <div class="reviews__date">{{ reviews.created_at.slice(0, 10) }}에 작성함</div>
                  </div>
                </div>
              </div>
              <div v-else class="detail__cast__false">관련 리뷰가 없습니다</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');

  .mv__detail {
    padding-top: 4.1rem;
    .detail__box {
      position: relative;
      .detail__bg {
        position: relative;
        height: 40vh;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        
        .mv__play {
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d50000;
          font-size: 100px;
          transition: .3s;
          cursor: pointer;
          &:hover {
            font-size: 110px;
            transition: .3s;
          }
        }
        .mv__play.video_check {
          display: none;
        }
        .detail__video {
          display: none;
          position: absolute;
          width: 70%;
          height: 100%;
          left: 0;
          right: 0;
          margin: auto;
        }
        .detail__video.video_check {
          display: block;
        }
      }
      .skeleton__detail__bg {
        position: relative;
        height: 40vh;
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
      .detail__info {
        background: #060d17;
        position: relative;
        z-index: 30;
        width: 80vw;
        margin: -5vh auto 0;
        border-radius: 30px 30px 0 0;
        .__info {
          width: 100%;
          height: 100%;
          padding: 5rem;
          .__first {
            display: flex;
            .__poster {
              width: 20vw;
              height: 50vh;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }
            .skeleton__poster {
              width: 20vw;
              height: 50vh;
              border-radius: 10px;
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
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }
            .__text {
              padding-left: 5rem;
              width: 50vw;
              height: 50vh;
              .__title {
                font-family: 'IBM Plex Sans KR', sans-serif;
                font-size: 30px;
                color: #fff;
                font-weight: bold;
              }
              .skeleton__title {
                width: 100%;
                height: 10%;
                border-radius: 10px;
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
              .my__list {
                padding-top: 1rem;
                display: flex;
                .__favorites {
                  margin-left: 2rem;
                }
                .__watchlist {
                  margin-left: 2rem;
                }
                .__likeBtn {
                  margin-left: 2rem;
                }
                .__list {
                  border-radius: 50%;
                  width: 47px;
                  height: 47px;
                  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
                  &::before {
                    font-family: FontAwesome;
                    content: "\f03a";
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  }
                }
                .__list.list__save {
                  &::before {
                    font-family: FontAwesome;
                    content: "\f03a";
                    color: #283593;
                  }
                }
                .__listBox {
                  display: none;
                }
                .__listBox.list__open {
                  display: block;
                  position: fixed;
                  top: 30%;
                  width: 20vw;
                  min-height: 50vh;
                  left: 0;
                  right: 0;
                  margin: auto;
                  border-radius: 15px;
                  z-index: 70;
                  background: #10161d;
                  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                  animation: fadeInUp 1s;
                  @keyframes fadeInUp {
                    0% {
                      opacity: 0;
                      // translate(x, y)
                      transform: translateY(100%);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  .list__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                    padding: 1rem;
                    border-bottom: 1px solid #fff;
                    .list__title {
                      font-size: 20px;
                    }
                    .list__close {
                      display: flex;
                      align-items: center;
                      span {
                        font-size: 25px;
                        cursor: pointer;
                        transform: rotate(0);
                        transition: .2s;
                        &:hover {
                          transform: rotate(180deg);
                          transition: .2s;
                        }
                      }
                    }
                  }
                  .list__body {
                    padding: 1rem;
                    min-height: 38vh;
                    .__body {
                      display: flex;
                      align-items: center;
                      margin-bottom: .5rem;
                      .body__checkbox {
                        display: flex;
                        .__checkbox {
                          width: 1.3rem;
                          height: 1.3rem;
                        }
                      }
                      .body__title {
                        margin-left: 1rem;
                        font-size: 18px;
                        color: #fff;
                      }
                      .body__close {
                        margin-left: auto;
                        color: #fff;
                        font-size: 23px;
                        cursor: pointer;
                      }
                    }
                  }
                  .list__create {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    border-top: 1px solid #fff;
                    color: #fff;
                    cursor: pointer;
                    .create__icon {
                      display: flex;
                      align-items: center;
                      span {
                        font-size: 30px;
                      }
                    }
                    .create__title {
                      margin-left: .3rem;
                    }
                  }
                  .__createBox {
                    display: none;
                  }
                  .__createBox.create__list {
                    display: block;
                    width: 25vw;
                    min-height: 10vh;
                    position: absolute;
                    top: 20%;
                    // bottom: 0;
                    left: -50%;
                    right: -50%;
                    border-radius: 15px;
                    margin: auto;
                    padding: 1rem;
                    background: #10161d;
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                    animation: fadeInUp 1s;
                    @keyframes fadeInUp {
                      0% {
                        opacity: 0;
                        transform: translateY(100%);
                      }
                      100% {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                    .__createText {
                      .__createContent {
                        outline: none;
                        border: none;
                        width: 100%;
                        height: 4vh;
                        background: #797a7b;
                        border-radius: 5px;
                        border: 1px solid #797a7b;
                      }
                      .error__createContent {
                        padding-top: 0.5rem;
                        color: red;
                      }
                    }
                    .__createBtnBox {
                      display: flex;
                      padding-top: 1rem;
                      justify-content: end;
                      .__createClose,
                      .__createBtn {
                        // height, width를 지정하지 않으면 크기에따라 맞게 줄어든다, 지정하고싶으면 크기마다 변경해줘야 한다
                        background: #797a7b;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        // width: 5vw;
                        height: 3vh;
                      }
                      .__createClose {
                        margin-right: 10px;
                      }
                    }
                  }
                }
                .__favorites {
                  border-radius: 50%;
                  width: 47px;
                  height: 47px;
                  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
                  &::before {
                    font-family: FontAwesome;
                    content: "\f004";
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    
                  }
                }
                .__favorites.favorites__save {
                  &::before {
                    font-family: FontAwesome;
                    content: "\f004";
                    color: #d50000;
                  }
                }
                .__watchlist {
                  border-radius: 50%;
                  width: 47px;
                  height: 47px;
                  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
                  &::before {
                    font-family: FontAwesome;
                    content: "\f02e";
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    
                  }
                }
                .__watchlist.watchlist__save {
                  &::before {
                    font-family: FontAwesome;
                    content: "\f02e";
                    color: #558b2f;
                  }
                }
                .__likeBtn {
                  position: relative;
                  .__like {
                    border-radius: 50%;
                    width: 47px;
                    height: 47px;
                    background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
                    &::before {
                      font-family: FontAwesome;
                      content: "\f005";
                      width: 100%;
                      height: 100%;
                      color: #fff;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      cursor: pointer;
                      
                    }
                  }
                  .__like.like__save {
                    &::before {
                      font-family: FontAwesome;
                      content: "\f005";
                      color: yellow;
                    }
                  }
                  .__likeBox {
                    display: none;
                  }
                  .__likeBox.like__open {
                    display: flex;
                    position: absolute;
                    bottom: -80px;
                    z-index: 40;
                    padding: 1rem;
                    right: 0;
                    background: #10161d;
                    border-radius: 10px;

                    .star {
                      margin-left: 1rem;
                      &:first-child {
                        margin-left: 0;
                      }
                      &::before {
                        font-family: FontAwesome;
                        content: "\f005";
                        width: 100%;
                        height: 100%;
                        font-size: 25px;
                        color: #fff;
                        cursor: pointer;
                      }
                      &:hover:before {
                        color: yellow;
                      }
                      &:active:before {
                        color: yellow;
                      }
                    }
                  }
                  .__one.like__one {
                    &::before {
                      color: yellow !important;
                    }
                  }
                  .__two.like__two {
                    &::before {
                      color: yellow !important;
                    }
                  }
                  .__three.like__three {
                    &::before {
                      color: yellow !important;
                    }
                  }
                  .__four.like__four {
                    &::before {
                      color: yellow !important;
                    }
                  }
                }
              }
              .skeleton__myList {
                margin-top: 1rem;
                display: flex;
                width: 100%;
                height: 14%;
                border-radius: 10px;
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
              .talineBox {
                display: flex;
                justify-content: space-between;
                padding-top: 1rem;
                align-items: center;
                .__tagline {
                  font-size: 20px;
                  color: #fff;
                  opacity: 0.7;
                }
                .__sns {
                  display: flex;
                  .__instagram {
                    &::before {
                      font-family: FontAwesome;
                      content: "\f16d";
                      color: #fff;
                      font-size: 25px;
                      transition: .2s;
                      cursor: pointer;
                      padding: 0.5rem;
                      border-radius: 40%;
                    }
                    &:hover::before {
                      background: #833ab4;  /* fallback for old browsers */
                      background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);  /* Chrome 10-25, Safari 5.1-6 */
                      background: linear-gradient(to right, #fcb045, #fd1d1d, #833ab4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    }
                    &:hover {
                      transform: scale(1.1);
                      transition: .2s;
                    }
                  }
                  .__facebook {
                    &::before {
                      font-family: FontAwesome;
                      content: "\f082";
                      color: #fff;
                      font-size: 25px;
                      transition: .2s;
                      cursor: pointer;
                      padding: 0.5rem;
                      border-radius: 40%;
                    }
                    &:hover::before {
                      background: #00c6ff;  /* fallback for old browsers */
                      background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
                      background: linear-gradient(to right, #0072ff, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    }
                    &:hover {
                      transform: scale(1.1);
                      transition: .2s;
                    }
                  }
                  .__twitter {
                    &::before {
                      font-family: FontAwesome;
                      content: "\f081";
                      color: #fff;
                      font-size: 25px;
                      transition: .2s;
                      cursor: pointer;
                      padding: 0.5rem;
                      border-radius: 40%;
                    }
                    &:hover::before {
                      background: #667db6;  /* fallback for old browsers */
                      background: -webkit-linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
                      background: linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    }
                    &:hover {
                      transform: scale(1.1);
                      transition: .2s;
                    }
                  }
                }
              }
              .skeleton__talineBox {
                display: flex;
                justify-content: space-between;
                margin-top: 1rem;
                align-items: center;
                width: 100%;
                height: 11%;
                border-radius: 10px;
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
              .__des {
                font-family: 'IBM Plex Sans KR', sans-serif;
                padding-top: 3rem;
                font-size: 20px;
                color: #fff;
              }
              .skeleton__des {
                margin-top: 3rem;
                width: 100%;
                height: 50%;
                border-radius: 10px;
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
          .__second {
            padding-top: 1rem;
            display: flex;
            width: 100%;
            .__left {
              width: 20vw;
              hr {
                color: red;
              }
              .date {
                font-size: 20px;
                color: #fff;
                display: flex;
                .date__text {
                  width: 50%;
                }
                .date__item {
                  width: 50%;
                }
              }
              .skeleton__date {
                display: flex;
                width: 100%;
                height: 2.2%;
                border-radius: 10px;
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
              .genres {
                font-size: 20px;
                color: #fff;
                display: flex;
                .genres__text {
                  width: 50%;
                }
                .genres__item {
                  width: 50%;
                }
              }
              .skeleton__genres {
                display: flex;
                width: 100%;
                margin-top: .5rem;
                height: 2.2%;
                border-radius: 10px;
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
              .runtime {
                font-size: 20px;
                color: #fff;
                display: flex;
                .runtime__text {
                  width: 50%;
                }
                .runtime__item {
                  width: 50%;
                }
              }
              .skeleton__runtime {
                display: flex;
                width: 100%;
                margin-top: .5rem;
                height: 2.2%;
                border-radius: 10px;
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
              .like {
                font-size: 20px;
                color: #fff;
                display: flex;
                .like__text {
                  width: 50%;
                }
                .like__item {
                  width: 50%;
                  &::after {
                    content: "\2605";
                    color: red;
                    margin-left: 5px;
                  }
                }
              }
              .skeleton__like {
                display: flex;
                width: 100%;
                margin-top: .5rem;
                height: 2.2%;
                border-radius: 10px;
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
            .__right {
              padding-left: 5rem;
              width: 50vw;
              .detail__title {
                padding-top: 1rem;
                font-size: 30px;
                color: #fff;
              }
              .swiper-slide {
                // padding-top: 1rem;
                padding-bottom: 1rem;
                .detail__info__box {
                  width: 10vw;
                  // height: 40vh !important;
                  .detail__poster {
                    width: 10vw;
                    height: 31vh;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: .2s;
                  }
                  &:hover {
                    transform: scale(1.1);
                    transition: .2s;
                  }
                  .detail__name {
                    color: #fff;
                    font-size: 15px;
                    padding-top: 0.5rem;
                    text-align: center;
                  }
                }
                .skeleton__detail__info__box {
                  width: 10vw;
                  height: 31vh;
                  border-radius: 10px;
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
              .detail__cast__title {
                // padding-top: 1rem;
                font-size: 30px;
                color: #fff;
              }
              .swiper-slide {
                // padding-top: 1rem;
                padding-bottom: 1rem;
                .detail__cast__info__box {
                  width: 10vw;
                  // height: 31vh;
                  .detail__cast__poster {
                    width: 10vw;
                    height: 31vh;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: .2s;
                  }
                  &:hover {
                    transform: scale(1.1);
                    transition: .2s;
                  }
                  .detail__cast__name {
                    color: #fff;
                    font-size: 15px;
                    text-align: center;
                    padding-top: 0.5rem
                  }
                }
                .skeleton__detail__cast__info__box {
                  width: 10vw;
                  height: 31vh;
                  border-radius: 10px;
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
              .detail__reviews__true {
                margin-top: 1rem;
                min-height: 30vh;
                max-height: 50vh;
                overflow: overlay;
                background: rgba(0.8, 0.8, 0.8, 0.8);
                border-radius: 10px;
                color: #fff;
                font-size: 25px;
                .detail__reviews__box {
                  padding: 2rem;
                  font-size: 18px;
                  .reviews__info {
                    display: flex;
                    padding-top: 1rem;
                    justify-content: end;
                    font-size: 16px;
                    .reviews__name {
                      margin-right: 1rem;
                    }
                  }
                }
              }
              .skeleton__detail__reviews__true {
                margin-top: 1rem;
                min-height: 30vh;
                max-height: 50vh;
                border-radius: 10px;
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
              .detail__cast__false {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 1rem;
                height: 30vh;
                background: rgba(0.8, 0.8, 0.8, 0.8);
                border-radius: 10px;
                color: #fff;
                font-size: 25px;
              }
              .detail__false {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 1rem;
                height: 30vh;
                background: rgba(0.8, 0.8, 0.8, 0.8);
                border-radius: 10px;
                color: #fff;
                font-size: 25px;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .__des {
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
    .skeleton__des {
      height: 60% !important;
    }
    .my__list {
      justify-content: center;
      .__listBox.list__open {
        width: 40vw !important;
      }
      .__createBox.create__list {
        width: 50vw !important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .mv__detail {
      padding-top: 2.9rem !important;
      .detail__box {
        .detail__bg {
          height: 30vh;
          background-position: center;
          background-size: auto !important;
          .mv__play {
            display: block;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #d50000;
            font-size: 100px;
            transition: .3s;
            cursor: pointer;
            &:hover {
              font-size: 110px;
              transition: .3s;
            }
          }
          .mv__play.video_check {
            display: none;
          }
          .detail__video {
            display: none;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            margin: auto;
          }
          .detail__video.video_check {
            display: block;
          }
        }
        .detail__info {
          width: 90vw !important;
          z-index: 50 !important;
          .__info {
            padding: 2rem !important;
            .__first {
              display: block !important;
              .__poster,
              .skeleton__poster {
                width: 100%;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 10px;
                }
              }
              .__text {
                padding-left: 0 !important;
                padding-top: 1rem;
                width: 100% !important;
                // width: 50vw;
                height: 30vh !important;
                text-align: center;
                .__title {
                  font-size: 30px;
                  color: #fff;
                }
                .my__list,
                .skeleton__myList {
                  justify-content: center;
                  .__listBox.list__open {
                    width: 50vw !important;
                  }
                  .__createBox.create__list {
                    width: 60vw !important;
                  }
                }
                .talineBox,
                .skeleton__talineBox {
                  display: block !important;
                  .__sns {
                    padding-top: 1rem;
                    justify-content: center;
                  }
                }
                .__des {
                  padding-top: 2rem;
                  font-size: 20px;
                  color: #fff;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-word;
                  display: -webkit-box;
                  -webkit-line-clamp: 5; // 원하는 라인수
                  -webkit-box-orient: vertical;
                }
                .skeleton__des {
                  margin-top: 2rem;
                  height: 70%;

                }
              }
            }
            .__second {
              padding-top: 10rem !important;
              display: block;
              width: 100%;
              .__left {
                width: 100% !important;
                hr {
                  color: red;
                }
                .date {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .date__text {
                    width: 50%;
                  }
                  .date__item {
                    width: 50%;
                  }
                }
                .genres {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .genres__text {
                    width: 50%;
                  }
                  .genres__item {
                    width: 50%;
                  }
                }
                .runtime {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .runtime__text {
                    width: 50%;
                  }
                  .runtime__item {
                    width: 50%;
                  }
                }
                .like {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .like__text {
                    width: 50%;
                  }
                  .like__item {
                    width: 50%;
                  }
                }
              }
              .__right {
                padding-top: 3rem;
                padding-left: 0 !important;
                width: 100% !important;
                .detail__title {
                  padding-top: 1rem;
                  font-size: 30px;
                  color: #fff;
                }
                .swiper-slide {
                  // padding-top: 1rem;
                  padding-bottom: 1rem;
                  .detail__info__box {
                    width: 24vw !important;
                    // height: 25vh !important;
                    .detail__poster {
                      width: 24vw !important;
                      height: 25vh !important;
                      border-radius: 10px;
                      cursor: pointer;
                      transition: .2s;
                    }
                    &:hover {
                      transform: scale(1.1);
                      transition: .2s;
                    }
                  }
                  .skeleton__detail__info__box {
                    width: 24vw !important;
                  }
                }
                .detail__cast__title {
                  padding-top: 1rem;
                  font-size: 30px;
                  color: #fff;
                }
                .swiper-slide {
                  // padding-top: 1rem;
                  padding-bottom: 1rem;
                  .detail__cast__info__box {
                    width: 24vw !important;
                    // height: 25vh !important;
                    .detail__cast__poster {
                      width: 24vw !important;
                      height: 25vh !important;
                      border-radius: 10px;
                      cursor: pointer;
                      transition: .2s;
                    }
                    &:hover {
                      transform: scale(1.1);
                      transition: .2s;
                    }
                  }
                  .skeleton__detail__cast__info__box {
                    width: 24vw !important;
                  }
                }
                .detail__cast__false {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 1rem;
                  height: 30vh;
                  background: rgba(0.8, 0.8, 0.8, 0.8);
                  border-radius: 10px;
                  color: #fff;
                  font-size: 25px;
                }
                .detail__false {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 1rem;
                  height: 30vh;
                  background: rgba(0.8, 0.8, 0.8, 0.8);
                  border-radius: 10px;
                  color: #fff;
                  font-size: 20px;
                }
              }
            }
          }
        }
      }

    }
  }
</style>


