<script setup>
import request from 'superagent';

// export default { 
//   data() {
//     return {
//       ads: []
//     };
//   },
//   async mounted() {
//     await this.fetchUserAds();
//   },
//   methods: {
//     async fetchUserAds() {
//       const url = 'http://localhost:8081/api/listings/user';
//       let response = {};

//       const headers = {
//         'userId': 6  // Using test userId
//       };
//       //TODO

//       try {
//         response = await request.get(url)
//           .set(headers);

//         this.ads = response.body;
//       } catch (error) {
//         console.error("Ошибка получыения данных:", error);
//       }
//     }
//   }
// }
</script>

<template>
  <div class="content">
    <div id="txt-container-header" onclick="window.location.href='#'">
      Мои сделки
    </div>


    <div class="container-deals">
      <div class="up">
        <div class="img-promocode">
          <img src="../assets/images/empty-ava.svg" alt="Your deals"
               onclick="window.location.href = '#'">
        </div>

        <div class="container-and-button">
          <h2 onclick="window.location.href='#'">
            Коляска в хорошем состоянии
          </h2>
          <h3>
            Мария, Суворовский
          </h3>
        </div>
      </div>
      <div class="down">
        <button class="buttons-in-content">
          Получить контакты
        </button>
        <button class="buttons-in-content">
          Завершить сделку
        </button>
        <button class="buttons-in-content">
          Отменить сделку
        </button>
      </div>
    </div>

    <div class="container-deals">
      <div class="up">
        <div class="img-promocode">
          <img src="../assets/images/empty-ava.svg" alt="Your deals"
               onclick="window.location.href = '#'">
        </div>

        <div class="container-and-button">
          <h2 onclick="window.location.href='#'">
            Коляска в хорошем состоянии, но у неё просто ужасно длинное название, которое не
            вмещается в одну строчку
          </h2>
          <h3>
            Мария, Суворовский
          </h3>
        </div>
      </div>
      <div class="down">
        <button class="buttons-in-content">
          Получить контакты
        </button>
        <button class="buttons-in-content">
          Завершить сделку
        </button>
        <button class="buttons-in-content">
          Отменить сделку
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.content {
  flex: 869;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding-top: 38px;
  padding-left: 47px;
  padding-right: 190.27px;
}

#txt-container-header {
  height: fit-content;
  width: fit-content;
  color: #000;
  font-family: Comfortaa;
  font-size: 40px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  padding-bottom: 27px;
}

.container-deals {
  width: 814px;
  height: 300px;
  display: flex;
  flex-direction: column;
  /* flex-direction: row; */
  border: 2px solid #0021CF;
  border-radius: 30px;
  padding-top: 23px;
  padding-left: 26px;
  margin-bottom: 36px;
}

.up {
  display: flex;
  flex-direction: row;
}

.down {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  padding-bottom: 23px;
}

.img-promocode {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: baseline;
  width: 190px;
  height: 190px;
}

.container-and-button {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: end;
  width: 100%;
  height: 100%;
  padding-top: 2px;
  padding-left: 25px;
  padding-right: 17px;
  padding-bottom: 19px;
}

.img-promocode:hover,
.container-and-button h2:hover {
  cursor: pointer;
}



h2 {
  width: 100%;
  height: fit-content;
  color: #000;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  padding-right: 35px;
  margin-bottom: 10px;
}

h3 {
  width: 100%;
  height: 100%;
  color: #000;
  font-family: Manrope-Light;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  font-weight: Light;
  padding-right: 80px;
}

.buttons-in-content {
  width: 209px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 23px;
  color: #000;
  font-family: Manrope-Light;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

/* Zoom for all */
.buttons-in-content:hover,
.nav:hover {
  transform: scale(1.03);
}

.buttons-in-content:hover {
  background: rgba(255, 180, 239, 0.14);
}

@media (max-width: 880px) { 
  #txt-container-header {
    text-align: center;
    width: 100%;
  }

  .content {
    padding: 0;
    padding-top: 38px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-deals {
    width: 90vw;
    height: auto;
    padding-left: 0;
  }

  .down {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .buttons-in-content {
    margin: 0;
    margin-bottom: 10px;
    
  }

  .up {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-and-button {
    padding-top: 2px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 19px;
    text-align: center;
  }

  h2 {
    padding: 0;
  }

  h3 {
    padding: 0;
  }

  .img-promocode {
    width: 110px;
    height: 140px;
  }
}

@media (min-width: 880px) and (max-width: 1250px) {
  .content {
    padding-left: 4vw;
    padding-right: 4vw;
    width: 50vw;
  }

  .container-deals {
    width: 55vw;
    height: auto;
  }
}

@media (min-width: 880px) {
  .buttons-in-content {
    width: 10vw;
    height: auto;
    min-height: 60.8px;
  }
}
</style>
