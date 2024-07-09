<script>
import request from 'superagent';

export default {
  data() {
    return {
      ads: []
    };
  },
  async mounted() {
    await this.fetchUserAds();
  },
  methods: {
    async fetchUserAds() {
      const url = 'http://localhost:8081/api/listings/user';
      let response = {};

      const headers = {
        'userId': 1  // Using test userId
      };
      //TODO

      try {
        response = await request.get(url)
          .set(headers);

        this.ads = response.body;
      } catch (error) {
        console.error("Ошибка получыения данных:", error);
      }
    },
    async removeAd(adId) {
      const url = `http://localhost:8081/api/listings/${adId}`;
      
      try {
        await request.delete(url);
        this.ads = this.ads.filter(ad => ad.id !== adId);
      } catch (error) {
        console.error("Ошибка при удалении объявления:", error);
      }
    },
    getPhotoUrl(photoUrl) {
      return `../${photoUrl}`;
    }
  }
}
</script>


<template>
  <div class="content">
    <div id="txt-container-header">
      Мои объявления
    </div>
    <div class="container-ads" v-for="ad in ads" :key="ad.id">
      <div class="img-promocode">
        <img :src="getPhotoUrl(ad.photoUrl)" alt="фотографии нет">
      </div>
      <div class="container-and-button">
        <h2>{{ ad.name }}</h2>
        <h3>{{ ad.description }}</h3>
        <button class="buttons-remove-publication" @click="removeAd(ad.id)">
          Снять с публикации
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

.container-ads {
  width: 814px;
  height: auto;
  display: flex;
  flex-direction: row;
  border: 2px solid #0021CF;
  border-radius: 30px;
  padding-top: 23px;
  padding-left: 26px;
  margin-bottom: 36px;
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

.buttons-remove-publication {
  width: 262.71px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 20px;
  margin-top: 40px;
  color: #000;
  font-family: Manrope-Light;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

/* Zoom for all */
.buttons-remove-publication:hover,
.nav:hover {
  transform: scale(1.03);
}

.buttons-remove-publication:hover {
  background: rgba(255, 180, 239, 0.14);
}

@media (max-width: 600px) { 
  h3 {
    margin-right: 10px;
    width: 65vw;
    text-align: start;
  }

  .buttons-remove-publication {
    margin-right: 27vw;
  }

  .img-promocode img {
    width: 100px;
    max-width: 100px;
  }
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
    padding-left: 7vw;
    padding-right: 7vw;
  }

  .container-ads {
    width: 85vw;
    height: auto;
  }
}

@media (min-width: 880px) and (max-width: 1150px) {
  .content {
    padding-left: 4vw;
    padding-right: 4vw;
    width: 50vw;
  }

  .container-ads {
    width: 55vw;
    height: auto;
  }
}
</style>
