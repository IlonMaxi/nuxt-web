<script>
import ad from '../plugins/classes/Ad.js';
import request from 'superagent';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      ad: new ad(),
      counter: 0,
    };
  },
  methods: {
    async submitAd() {
      if (this.ad.img.img1 !== null){
        if( await this.sendPhoto(this.ad.img.img1, this.ad.img_url.url1) === false){
          return false;
        }
      }
      if (this.ad.img.img2 !== null){
        if( await this.sendPhoto(this.ad.img.img2, this.ad.img_url.url2) === false){
          return false;
        }
      }
      if (this.ad.img.img3 !== null){
        if( await this.sendPhoto(this.ad.img.img3, this.ad.img_url.url3) === false){
          return false;
        }
      }

      this.ad.name = document.getElementById('name_text').value;
      this.ad.description = document.getElementById('description_text').value;
      this.ad.address = document.getElementById('address_text').value;
      this.ad.category = document.getElementById('category-select').value;
      this.ad.subcategory = document.getElementById('subcategory-select').value;
      this.ad.delivery.selfPickup = document.getElementById('dt1').checked;
      this.ad.delivery.shipping = document.getElementById('dt2').checked;
      this.ad.price = document.getElementById('ad_price').value;

      // Сбор данных о способах связи
      this.ad.communication.phone = document.getElementById('comPhone').checked;
      this.ad.communication.email = document.getElementById('comEmail').checked;
      this.ad.communication.tg = document.getElementById('comTg').checked;
      this.ad.communication.whatsapp = document.getElementById('comWhatsApp').checked;

      return await this.sendAdData() !== null;
    },
    async sendAdData(){
      try {
        const url = 'http://localhost:8080/authentication/authorization';
        let token = Cookies.get('tokenJwt')

        const body = {
          name: this.ad.name,
          description: this.ad.description,
          category: this.ad.category,
          subcategory: this.ad.subcategory,
          placementFormat: this.ad.format,
          price: this.ad.price,
          address: this.ad.address,
          deliverySelf: this.ad.delivery.pickup ? 1 : 0,
          delivery: this.ad.delivery.shipping ? 1 : 0,
          communicationPhone: this.ad.communication.phone ? 1 : 0,
          communicationEmail: this.ad.communication.email ? 1 : 0,
          communicationTg: this.ad.communication.tg ? 1 : 0,
          communicationWhatsapp: this.ad.communication.whatsapp ? 1 : 0,
          addDate: new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"})).toISOString().split('T')[0],
          status: 'active',
          photoUrl: this.ad.img_url.url1,
          photoUrl1: this.ad.img_url.url2,
          photoUrl2:this.ad.img_url.url3
        };

        const headers = {
          'requestRoute': 'listings',
          'requestMethod': 'POST'
        };

        const queryParams = {
          token: token
        };

        const response = await request.post(url)
          .set(headers)
          .query(queryParams)
          .send(body);
        await alert('Объявление успешно выложено!')
        await this.$router.push('/auth');
        return true;
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        await alert('К сожалению, произошла ошибка при отправке данных. Пожалуйста, попробуйте ещё раз чуть позже. Если проблема сохранится, обратитесь в нашу службу технической поддержки. Мы всегда готовы помочь!');
        await this.$router.push('/auth');
        return false;
      }
    },
    async sendPhoto(blob, fileName) {
      try {
        const formData = new FormData();
        formData.append('file', blob, fileName);
        formData.append('fullPath', fileName);

        const url = 'http://localhost:8080/authentication/authorization/update/file';
        const token = Cookies.get('tokenJwt');

        const queryParams = {
          token: token
        };
        const response = await request.post(url)
          .query(queryParams)
          .send(formData);

        if (response.ok) {
          console.log('Файл успешно отправлен');
          return true;
        } else {
          await alert('К сожалению, произошла ошибка при загрузке фото. Пожалуйста, попробуйте ещё раз чуть позже. Если проблема сохранится, обратитесь в нашу службу технической поддержки. Мы всегда готовы помочь!')
          await this.$router.push('/auth');
          return false;
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        await alert('К сожалению, произошла ошибка при загрузке фото. Пожалуйста, попробуйте ещё раз чуть позже. Если проблема сохранится, обратитесь в нашу службу технической поддержки. Мы всегда готовы помочь!')
        await this.$router.push('/auth');
        return false;
      }
    },
    toggleBlocks() {
      const premiumRadio = document.getElementById('st2');
      const priceBlock = document.getElementById('price_block');
      const commissionBlock = document.getElementById('commission_block');
      const placeAdCss = document.querySelector('.place_ad');
      const mainDiv = document.querySelector('main');
      if (premiumRadio.checked) {
        mainDiv.style.height = '2382px';
        priceBlock.style.display = 'flex'; // Показываем блок с ценой
        commissionBlock.style.display = 'flex'; // Показываем блок с информацией о комиссии
        placeAdCss.style.height = '142.4rem';
        this.ad.format = 'premium';
      } else {
        mainDiv.style.height = '2148px';
        priceBlock.style.display = 'none'; // Скрываем блок с ценой
        commissionBlock.style.display = 'none'; // Скрываем блок с информацией о комиссии
        placeAdCss.style.height = '128.8rem';
        this.ad.format = 'standard';
      }
    },
    async handleFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const blob = new Blob([event.target.result], { type: file.type });
          if (this.counter === 0) {
            this.counter++;
            this.ad.img.img1 = blob;
            this.ad.img_url.url1 = '/uploads/img/listings/ad_1_' + Math.floor(10000 + Math.random() * 90000) + file.name;
            const adImg1 = document.getElementById('ad_img_1');
            adImg1.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Photo 1">`;
            adImg1.style.backgroundColor = 'transparent';
          } else if (this.counter === 1) {
            this.counter++;
            this.ad.img.img2 = blob;
            this.ad.img_url.url2 = '/uploads/img/listings/ad_2_' + Math.floor(10000 + Math.random() * 90000) + file.name;
            const adImg2 = document.getElementById('ad_img_2');
            adImg2.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Photo 2">`;
            adImg2.style.backgroundColor = 'transparent';
          } else if (this.counter === 2) {
            this.counter = 0;
            this.ad.img.img3 = blob;
            this.ad.img_url.url3 = '/uploads/img/listings/ad_3_' + Math.floor(10000 + Math.random() * 90000) + file.name;
            const adImg3 = document.getElementById('ad_img_3');
            adImg3.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Photo 3">`;
            adImg3.style.backgroundColor = 'transparent';
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  },
  mounted() {
    const standardRadio = document.getElementById('st1');
    const premiumRadio = document.getElementById('st2');

    const button = document.getElementById('select-photo-button');
    const fileInput = document.getElementById('select-photo-input');

    button.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', this.handleFileChange);

    standardRadio.addEventListener('change', this.toggleBlocks);
    premiumRadio.addEventListener('change', this.toggleBlocks);

    // Инициализация состояния блоков при загрузке страницы
    this.toggleBlocks();
  }
};
</script>

<template>
  <main>
    <div class="place_ad">


      <div class="place_ad-txt">Разместить объявление</div>

      <div class="ad-photo-tx">Добавить фото</div>

      <div class="ad-photo">
        <div class="ad_img" id="ad_img_1">
        </div>

        <div class="ad_img" id="ad_img_2">
        </div>

        <div class="ad_img" id="ad_img_3">
        </div>
      </div>
      <button id="select-photo-button" class="select-photo-txt">Выбрать фото</button>
      <input id="select-photo-input" type="file" ref="fileInput"  style="display: none;" multiple accept="image/*">

      <label class="select-category-txt" for="select-category-txt">Категория</label>

      <select name="pets" id="category-select">
        <option value="">Выберите подходящую категорию</option>
        <option value="сhildren">Для детей</option>
      </select>

      <select name="pets" id="subcategory-select">
        <option value="">Выберите подходящую подкатегорию</option>
        <option value="Одежда">Одежда</option>
        <option value="Обувь">Обувь</option>
        <option value="Мебель">Мебель</option>
        <option value="Игрушки">Игрушки</option>
        <option value="Коляски">Коляски</option>
        <option value="Спорт">Спорт</option>
        <option value="Электроника">Электроника</option>
        <option value="Автокресла и стульчики">Автокресла и стульчики</option>
        <option value="Косметика и гигиена">Косметика и гигиена</option>
      </select>

      <div class="name_text-tx">Название</div>

      <input id="name_text" name="name_text" rows="5" cols="33">


      <div class="ad-description-tx">Описание</div>
      <textarea id="description_text" type="text"></textarea>


      <div class="status_text-tx">Формат размещения</div>
      <div class="status">
        <div>
          <input type="radio" name="status_text" id="st1" checked> <label for="st1">Стандарт</label>
        </div>

        <div>
          <input type="radio" name="status_text" id="st2"> <label for="st2">Премиум</label>
        </div>

      </div>




      <div class="price" id="price_block" style="display: none;">
        <input id="ad_price" type="text" placeholder="Введите цену">
        <div class="ad_price-txt">руб.</div>
      </div>


      <div class="info-commission-txt" id="commission_block" style="display: none;">Вещь в идеальном состоянии,
        оценочная стоимость от 10 000 рублей;<br> Все
        объявления проходят дополнительную модерацию;<br> Сервис берет комиссию х%.</div>


      <div class="address_text-tx">Адрес</div>
      <input id="address_text" type="text" placeholder="Ростов-на-Дону, площадь Гагарина, 1">


      <div class="delivery_text-tx">Доставка</div>

      <div class="delivery">
        <div>
          <input type="checkbox" name="delivery_text" id="dt1" checked> <label for="dt1">Самовывоз</label>
        </div>
        <div>
          <input type="checkbox" name="delivery_text" id="dt2"> <label for="dt2">Отправка за счет
          покупателя</label>
        </div>
      </div>

      <div class="communication_text-tx">Удобный способ связи</div>
      <div class="communication_text">
        <fieldset>
          <div>
            <input type="checkbox" name="communication_text" id="comPhone"> <label
            for="comPhone">Телефон</label>
          </div>
          <div>
            <input type="checkbox" name="communication_text" id="comEmail"> <label
            for="comEmail">Почта</label>
          </div>
          <div>
            <input type="checkbox" name="communication_text" id="comTg"> <label for="comTg">Телеграм</label>
          </div>
          <div>
            <input type="checkbox" name="communication_text" id="comWhatsApp"> <label
            for="comWhatsApp">WhatsApp</label>
          </div>
        </fieldset>
      </div>

      <button class="button-place" @click="submitAd">
        Разместить объявление
      </button>


    </div>
  </main>
</template>

<style scoped>

main {
  height: 2148px;
  width: 100%;
}

.advertisement {
  height: 100vh;
  height: 100dvh;
  height: 55.77rem;
  width: 100%;
}

#before_ {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 0.75rem;
  margin-left: 6rem;
}

.place_ad {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  height: 139.14rem;
  height: 128rem;
  padding-top: 9.25rem;
  padding-left: 4.06rem;
}

.place_ad-txt {
  color: #000;
  font-feature-settings: 'liga' off;
  font-family: Comfortaa;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.ad-photo-tx {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 2rem;
}

.ad-photo {
  display: flex;
  flex-direction: row;
  margin-top: 1.37rem;
}

.ad_img {
  width: 16.25rem;
  height: 16.25rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  background: #D9D9D9;
  margin-inline: 0.62rem;
}

.select-photo-txt {
  width: 12.8475rem;
  height: 2.44356rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #0021CF;
  background: #0021CF;
  color: #FFF;
  text-align: center;
  font-family: Comfortaa;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 2.08rem;
}

.select-photo-txt:hover {
  transform: scale(1.02);
}

.select-category-txt {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 2.86rem;
}

#category-select,
#subcategory-select {
  appearance: none;
  -webkit-appearance: none;
  /* Safari и Chrome */
  -moz-appearance: none;
  /* Mozilla */
  -ms-appearance: none;
  /* IE */
  background-image: url(../assets/images/expand_more_.svg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: calc(100% - 15px) center;
  padding: 8px 32px 8px 16px;
  outline: none;
  cursor: pointer;
  width: 27.375rem;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  color: rgba(0, 0, 0, 0.50);
  font-family: Manrope,serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 1.19rem;
}

#subcategory-select {
  margin-top: 1.56rem;
}

.name_text-tx {
  color: #000;
  font-family: Manrope,serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 2.51rem;
}

#name_text {
  width: 27.375rem;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  background: #FFF;
  margin-top: 1.19rem;
  padding-block: 8px;
  padding-inline: 8px;
  overflow: auto;
}

.ad-description-tx {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 2.31rem;
}

#description_text {
  width: 50.1875rem;
  height: 13rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  background: #FFF;
  padding-block: 8px;
  padding-inline: 8px;
  margin-top: 0.81rem;
  resize: none;
  overflow: auto;
}

.status_text-tx {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 2.31rem;
}

.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.81rem;
}

.status div {
  display: flex;
  align-items: center;
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}

.status label {
  margin-left: 0.75rem;
}

#st1,
#st2 {
  width: 1.8125rem;
  height: 1.8125rem;
  flex-shrink: 0;
}

#st2 {
  margin-left: 2rem;
}

.price {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1.94rem;
}

#ad_price {
  width: 18.1875rem;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  background: #FFF;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  padding: 8px;
  margin-right: 0.88rem;
}

.ad_price-txt {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;

}

.info-commission-txt {
  width: 50rem;
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}

.address_text-tx {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-top: 2.31rem;
  margin-bottom: 0.81rem;
}

#address_text {
  width: 50.1875rem;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  background: #FFF;
  padding-left: 15px;
  margin-bottom: 2.31rem;
}

.delivery_text-tx {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-bottom: 0.88rem;
}

.delivery {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.delivery div {
  display: flex;
  align-items: center;
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-bottom: 1rem;
}

.delivery label {
  margin-left: 0.75rem;
}

#dt1,
#dt2 {
  width: 1.8125rem;
  height: 1.8125rem;
  flex-shrink: 0;
}

.communication_text-tx {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-bottom: 0.94rem;
}

.communication_text {
  height: fit-content;
  width: fit-content;
}

.communication_text div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  height: fit-content;
  width: fit-content;
  margin-block: 1rem;
}

.communication_text input {
  width: 1.8125rem;
  height: 1.8125rem;
  flex-shrink: 0;
}

.communication_text label {
  color: #000;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-left: 0.75rem;
}

.button-place:hover {
  flex-shrink: 0;
  border-radius: 25px;
  transform: scale(1.03);
  background: rgba(255, 180, 239, 0.14);
}

.button-place {
  width: 19.8125rem;
  height: 4.0625rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 3px solid #0021CF;
  color: #000;
  text-align: center;
  font-family: Geologica;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  margin-top: 2rem;
}

@media (max-width: 880px) {
  .place_ad {
    padding-top: 5.25rem;
    padding-left: 3vw;
    display: flex;
    align-items: start;
  }

  #description_text {
    width: 92vw;
  }

  #address_text {
    width: 92vw;
  }

  .ad-photo {
    width: 92vw;
    flex-wrap: wrap;
  }

  .ad_img{
    width: 12.25rem;
    height: 12.25rem;
    flex-shrink: 0;
    border-radius: 1.5625rem;
    background: #D9D9D9;
    margin-left: 0.62rem;
    margin-right: 0.62rem;
    margin-top: 0.62rem;
  }
}

@media (max-width: 470px) {
  .ad-photo {
    width: 92vw;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }

  .ad_img{
    width: 16.25rem;
    height: 16.25rem;
    flex-shrink: 0;
    border-radius: 1.5625rem;
    background: #D9D9D9;
    margin-left: 0.62rem;
    margin-right: 0.62rem;
    margin-top: 0.62rem;
  }
}

@media (max-width: 980px) {
  .place_ad {
    padding-left: 3vw;
  }
}

@media (max-width: 470px) { 
  main {
    height: 2600px !important;
  }
}

@media (min-width: 470px) and (max-width: 580px)  { 
  main {
    height: 2200px !important;
  }
}

@media (min-width: 705px)  { 
  main {
    height: 2100px !important;
  }
}

@media (max-width: 480px) { 
  #category-select {
    width: 92vw;
  }

  #subcategory-select {
    width: 92vw;
  }

  #name_text {
    width: 92vw;
  }

  #category-select[data-v-f99d20c6], #subcategory-select[data-v-f99d20c6] {
    padding: 8px 47px 8px 16px;
  }
}
</style>
