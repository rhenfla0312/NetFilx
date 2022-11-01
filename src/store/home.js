// props -> (부모 -> 자식), 자식 컴포넌트의 요소에다 :item="item" 이런식으로 주면 자식 컴포넌트에선 props로 요소에 들어있던 이름으로 type, default값을 만들어서 데이터 바인딩으로 사용하면 된다


export default {
  // namespaced - 모듈화 명시 (index.js -> modules에 명시함으로써 모듈로 사용할 수 있다)
  namespaced: true,

  // state -> data
  // 다른곳에서 실행할때 - this.$store.state.모듈명.데이터명
  // 팁 - 다른곳에서 실행할떄 vuex에서 갱신된 데이터가 반응성이 유지된채로 사용되어야하기 때문에 computed로 만들어야 한다
  state: () => {
    return {
      window : ''
    }
  },
  // getters -> computed
  // 함수식으로 만들어서 this가 아닌 첫번째 인자로 state값이 들어온다
  getters: {
    test(state) {

    }
  },
  // mutations -> state값을 변경가능한 methods
  // 첫번째 매개변수 - state값, 두번째 매개변수 - 다른곳에서 보내오는 데이터
  // 다른곳에서 실행할때 - this.$store.commit('모듈명/함수명', 보낼데이터) 
  // 꿀팁 - 여러 state를 키값으로 한번에 처리하기 -> Object.keys(받은데이터) -> 객체데이터의 속성의 이름만 가지고 새로운 배열데이터를 만들어준다 -> 이름들만 가지고 배열로 반환이된다 -> foreach로 반복된 배열데이터명(i)을 가지고 state[i] = payload[i] 이런식으로 한번에 바꿔줄 수 있다
  mutations: {
    test(state, payload) {

    }
  },
  // actions -> mutations이외의 methods (비동기로 동작한다 -> async, await을 안붙여도 붙여지는 효과를 가진다)
  // 첫번째 매개변수 - context(state, getters, commit(mutations))에 다 들어있다 - 객체구조분해로 가져올땐 순서상관없이 이름만 맞춰주면 된다 -> 뽑아쓴다, 두번째 매개변수 - 다른곳에서 보내오는 데이터  
  // 다른곳에서 실행할때 - this.$store.dispatch('모듈명/함수명', 보낼데이터)
  // 같은 store모듈에서 ex) actions -> mutations를 실행할때 - context,commit('함수명', 보낼데이터)
  actions: {
    test(context, payload) {

    }
  },
}