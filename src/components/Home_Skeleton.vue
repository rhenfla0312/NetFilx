<script>
export default {

}
</script>


<template>
  <div class="mv__skeleton__info">
  <div class="detail__info">
    <!-- pc -->
    <!-- <div class="detail__box">
      <div class="detail__poster"></div>
    </div> -->
    <div class="detail__text">
      <div class="__header"></div>
      <!-- mobile -->
      <!-- 아직 구분데이터를 못정해서 일단 모바일로만 잘나오게 설정한다 -->
      <div class="detail__box">
        <div class="detail__poster"></div>
      </div>
      <div class="__des"></div>
      <div class="detail__video"></div>
    </div>
  </div>
</div>  
</template>


<style lang="scss" scoped>

.mv__skeleton__info {
  animation: fadeOut 1s;
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 100%);
    }
  }
  display: none;
}
.mv__skeleton__info.movie_info_new,
.mv__skeleton__info.movie_info_popular,
.mv__skeleton__info.movie_info_trand {
  display: block;
  width: 80vw;
  // height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 2rem;
  animation: fadeInUp 1s;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      // translate(x, y)
      transform: translate(-50%, 100%);

    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  background-color: rgba(165, 165, 165, 0.5);
  animation: pulse-bg 1s infinite;
  @keyframes pulse-bg {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.5);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  .detail__info {
    display: block;
    .detail__box {
      position: relative;
      .detail__poster {
        width: 25vw;
        height: 100%;
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
    .detail__text {
      padding-left: 20px;
      .__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 6%;
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
      .detail__box {
        position: relative;
        transition: .2s;
        .detail__poster {
          width: 25vw;
          height: 100%;
          border-radius: 10px;
        }
      }
      .__des {
        width: 100%;
        min-height: 17vh;
        margin-top: 20px;
        margin-bottom: 20px;
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
      .detail__video {
        height: 70%;
        width: 100%;
        padding-top: 56.25%;
        position: relative;
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
}



@media screen and (max-width: 1024px) {
  .mv__detail__info {
    animation: fadeOut 1s;
    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, 100%);
      }
    }
    display: none;

  }
  .mv__skeleton__info.movie_info_new,
  .mv__skeleton__info.movie_info_popular,
  .mv__skeleton__info.movie_info_trand {
    display: block;
    width: 80vw;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 2rem;
    animation: fadeInUp 1s;
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        // translate(x, y)
        transform: translate(-50%, 100%);

      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
    .detail__info {
      display: flex;
      .detail__text {
        width: 100%;
        padding-left: 0 !important;
        .detail__poster {
          margin-top: 10px;
          width: 100% !important;
          border-radius: 10px;
        }
        .__header {
          height: 20% !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .__title {
            font-size: 30px;
            font-weight: 600;  
            color: #000;
          }
          .__close {
            
            span {
              font-size: 40px;
              cursor: pointer;
              transition: .3s;
              transform: rotate(0);
              &:hover {
                transition: .3s;
                transform : rotate(180deg);
              }
            }
          }
        }
        .__des {
          width: 100%;
          min-height: 17vh;
          padding-top: 20px;
          padding-bottom: 20px;
          font-size: 19px;
          font-weight: 600;
          color: #000;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 5; // 원하는 라인수
          -webkit-box-orient: vertical;
        }
        .detail__video {
          display: none !important;
          padding-top: 56.25%;
          position: relative;
          iframe {
            border-radius: 10px;
            background: black;
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .mv__detail__info {
    animation: fadeOut 1s;
    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, 100%);
      }
    }
    display: none;

  }
  .mv__skeleton__info.movie_info_new,
  .mv__skeleton__info.movie_info_popular,
  .mv__skeleton__info.movie_info_trand {
    display: block;
    width: 80vw;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 2rem;
    animation: fadeInUp 1s;
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        // translate(x, y)
        transform: translate(-50%, 100%);

      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
    .detail__info {
      display: flex !important;
      .detail__text {
        width: 100%;
        padding-left: 0 !important;
        .detail__poster {
          margin-top: 10px;
          // width: 100% !important;
          height: 20vh !important;
          border-radius: 10px;
        }
        .__header {
          height: 10% !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .__title {
            font-size: 30px;
            font-weight: 600;  
            color: #000;
          }
          .__close {
            span {
              font-size: 40px;
              cursor: pointer;
              transition: .3s;
              transform: rotate(0);
              &:hover {
                transition: .3s;
                transform : rotate(180deg);
              }
            }
          }
        }
        .__des {
          width: 100%;
          height: 20vh !important;
          padding-top: 20px;
          padding-bottom: 20px;
          font-size: 19px;
          font-weight: 600;
          color: #000;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 5; // 원하는 라인수
          -webkit-box-orient: vertical;
        }
        .detail__video {
          display: none !important;
          padding-top: 56.25%;
          position: relative;
          iframe {
            border-radius: 10px;
            background: black;
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}


</style>