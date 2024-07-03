<script>
import User from "../plugins/classes/User";
import request from 'superagent';
import Cookies from 'js-cookie';


export default {
  data() {
    return {
      changes: 0,
      user: new User(),
      avaBlob: new Blob(),
    };
  },
  watch: {
    changes(newValue) {
      if (newValue !== 0) {
        const saveChangesButton = document.getElementById('save-changes');
        saveChangesButton.style.cursor = 'pointer';
        saveChangesButton.classList.add('zoom-effect');
        saveChangesButton.disabled = false;
      } else if (newValue === 0) {
        const saveChangesButton = document.getElementById('save-changes');
        saveChangesButton.style.cursor = 'default';
        saveChangesButton.classList.remove('zoom-effect');
        saveChangesButton.disabled = true;
      }
    }
  },
  methods: {
    logout() {
      const allCookies = Cookies.get();
      for (let cookie in allCookies) {
        Cookies.remove(cookie);
      }

      this.$router.push('/');
    },
    async itemsChange(id) {
      const input = document.querySelector(`#${id} input`);
      const h3 = document.querySelector(`#${id} h3`);
      const button = document.querySelector(`#${id} button`);

      if (input.style.display === "none" || input.style.display === "") {
        input.style.display = "block";
        h3.style.display = "none";
        input.focus();
        button.style.color = "gray";
        button.textContent = "Отменить";
        this.changes++;
      } else {
        input.style.display = "none";
        h3.style.display = "block";
        button.style.color = "#0021CF";
        button.textContent = "Изменить";
        if(id === 'name'){
          input.value = this.user.name;
        } else if(id === 'number'){
          input.value = this.user.number;
        }else if(id === 'region'){
          input.value = this.user.region;
        } else if(id === 'email'){
          input.value = this.user.email;
        }
        this.changes--;
      }
    },
    async itemsChangeSelect(id) {
      const select = document.querySelector(`#${id} select`);
      const h3 = document.querySelector(`#${id} h3`);
      const button = document.querySelector(`#${id} button`);

      if (select.style.display === "none" || select.style.display === "") {
        select.style.display = "block";
        h3.style.display = "none";
        select.focus();
        button.style.color = "gray";
        button.textContent = "Отменить";
        this.changes++;
      } else {
        select.style.display = "none";
        h3.style.display = "block";
        button.style.color = "#0021CF";
        button.textContent = "Изменить";
        select.value = this.user.region;
        this.changes--;
      }
    },
    async getData() {
      const url = 'http://localhost:8080/authentication/authorization';
      const token = Cookies.get('tokenJwt');
      let response = {};

      const headers = {
        'requestRoute': 'users',
        'requestMethod': 'GET'
      };

      const queryParams = {
        token: token
      };

      const body = {}
      try {
        response = await request.post(url)
          .set(headers)
          .query(queryParams)
          .send(body);

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        await alert('К сожалению, произошла ошибка при загрузке данных. Пожалуйста, попробуйте ещё раз чуть позже. Если проблема сохранится, обратитесь в нашу службу технической поддержки. Мы всегда готовы помочь!');
        await this.$router.push('/auth');
        return false;
      }

      let jsonObject = JSON.parse(response.text);
      await Object.assign(this.user, jsonObject);

      const avaInput = document.querySelector("#ava input");
      avaInput.textContent = this.user.photoUrl;

      return true;
    },
    async saveChanges() {
      if (await this.checkChanges()) {
        if (await this.setData()){
          window.location.reload()
        }
      }
    },
    async checkChanges() {
      const nameInput = document.querySelector("#name input");
      const numberInput = document.querySelector("#number input");
      const regionSelect = document.querySelector("#region select");
      const emailInput = document.querySelector("#email input");
      const avaInput = document.querySelector("#ava input");

      return (nameInput.value !== '' && nameInput.value !== this.user.name) ||
        (numberInput.value !== '' && numberInput.value !== this.user.number) ||
        (regionSelect.value !== '' && regionSelect.value !== this.user.region) ||
        (avaInput.textContent !== '' && avaInput.textContent !== this.user.photoUrl) ||
        (emailInput.value !== '' && emailInput.value !== this.user.email);
    },
    async setData(){
      try {
        const button = document.querySelector(`#ava button`);
        const computedStyles = window.getComputedStyle(button);
        const color = computedStyles.color;

        if (color !== "rgb(0, 33, 207)") {
          if( await this.sendPhoto(this.avaBlob, document.querySelector("#ava input").textContent) === false){
            return false;
          }
        }

        const url = 'http://localhost:8080/authentication/authorization';
        const token = Cookies.get('tokenJwt');

        let response = {};

        const headers = {
          'requestRoute': 'users',
          'requestMethod': 'PUT'
        };

        const queryParams = {
          token: token
        };

        const nameInput = document.querySelector("#name input").value;
        const numberInput = document.querySelector("#number input").value;
        const regionSelect = document.querySelector("#region select").value;
        const emailInput = document.querySelector("#email input").value;
        const avaInput = document.querySelector("#ava input").textContent;

        const body = {
          name: nameInput,
          number: numberInput,
          email: emailInput,
          password: this.user.password,
          photoUrl: avaInput,
          region: regionSelect,
          vkUrl: null,
          tgUrl: null,
          subscriptionsStatus: 0,
          subscriptionEndDate: '',
          subscriptionAutoRenewal: 0,
          swipeBalance: 0
        };
        console.log(body)

        response = await request.post(url)
          .query(queryParams)
          .set(headers)
          .send(body);
        return true;
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return false;
      }
    },
    async openFileInput() {
      const selectPhoto = document.querySelector("#select-photo-input");
      selectPhoto.click();
      selectPhoto.addEventListener('change', this.handleFileChange);
    },
    async handleFileChange(event) {
      const files = event.target.files;
      const file = files[0];
      const reader = new FileReader();
      const avaInput = document.querySelector("#ava input");

      reader.onload = function(event) {
        const blob = new Blob([event.target.result], { type: file.type });
        avaInput.textContent = 'uploads/img/avatars/ava_' + this.user.name + "_" + Math.floor(10000 + Math.random() * 90000) + file.name;
        const ava = document.querySelector('#ava img');
        ava.src = URL.createObjectURL(blob);
        this.avaBlob = blob;
      }.bind(this);

      reader.readAsArrayBuffer(file);
    },
    async changeItemAva() {
      const button = document.querySelector(`#ava button`);
      const computedStyles = window.getComputedStyle(button);
      const avaInput = document.querySelector("#ava input");


      const color = computedStyles.color;

      if (color === "rgb(0, 33, 207)") {
        await this.openFileInput();

        button.style.color = "gray";
        button.textContent = "Отменить";
        this.changes++;
      } else if (color === "rgb(128, 128, 128)") {
        button.style.color = "#0021CF";
        button.textContent = "Изменить";
        avaInput.textContent = this.user.photoUrl;

        const ava = document.querySelector('#ava img');

        ava.src = this.user.photoUrl !== null && this.user.photoUrl !== '' ? require(`../static/${this.user.photoUrl}`) : require('../assets/images/ava-settings.svg');

        this.changes--;
      }
    },
    async sendPhoto(blob, fileName) {
      console.log('start')
      try {
        const formData = new FormData();
        formData.append('file', blob, fileName);
        formData.append('fullPath', fileName);

        console.log(`file: ${blob}`);
        console.log(`fullPath: ${fileName}`);

        const url = 'http://localhost:8080/authentication/authorization/update/file';
        const token = Cookies.get('tokenJwt');

        console.log(`URL: ${url}`);
        console.log(`Token: ${token}`);

        const queryParams = {
          token: token
        };

        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await request
          .post(url)
          .query(queryParams)
          .send(formData)
          .set('Accept', 'application/json');

        if (response.ok) {
          console.log('Файл успешно отправлен');
          return true;
        } else {
          await alert('1К сожалению, произошла ошибка при загрузке фото. Пожалуйста, попробуйте ещё раз чуть позже. Если проблема сохранится, обратитесь в нашу службу технической поддержки. Мы всегда готовы помочь!')
          await this.$router.push('/auth');
          return false;
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        await alert('2К сожалению, произошла ошибка при загрузке фото. Пожалуйста, попробуйте ещё раз чуть позже. Если проблема сохранится, обратитесь в нашу службу технической поддержки. Мы всегда готовы помочь!')
        await this.$router.push('/auth');
        return false;
      }
    }
  },
  async mounted() {
    if (await this.getData()) {
    }
  }
}
</script>

<template>

  <div class="content">
    <div id="txt-container-header" onclick="window.location.href='#'">
      Настройки
    </div>
    <div class="settings-items" id="name">
      <h2>Имя</h2>
      <input :value="this.user.name" class="inputs" id="first_name" name="first_name" type="text" placeholder="Введите ваше имя*" v-cyrillic-mask
             pattern="[а-яА-ЯёЁ]{2,}" title="Используйте только кириллицу" required>
      <h3>{{ this.user.name }}</h3>
      <button @click="itemsChange('name')" class="change" id="change-userName">
        Изменить
      </button>
    </div>
    <div class="settings-items" id="ava">
      <h2>Фото</h2>
      <input id="select-photo-input" class="inputs" type="file" ref="fileInput"  style="display: none;" multiple accept="image/*">
      <h3><img :src="this.user.photoUrl !== null && this.user.photoUrl !== '' ? require(`../static/${this.user.photoUrl}`) : require('../assets/images/ava-settings.svg')"
               alt="Ваше фото профиля"></h3>
      <button @click="changeItemAva" class="change" id="change-userPhoto">
        Изменить
      </button>
    </div>
    <div class="settings-items" id="number">
      <h2>Телефон</h2>
      <input :value="this.user.number" class="inputs" id="number" name="number" type="text" placeholder="Введите ваш номер телефона*" v-mask="'+7##########'"
             title="Введите ваш номер телефона" required>
      <h3>{{ this.user.number }}</h3>
      <button @click="itemsChange('number')" class="change" id="change-userPhone">
        Изменить
      </button>
    </div>
    <div class="settings-items" id="region">
      <h2>Город</h2>
      <select name="region" id="region-select">
        <option value="Ростов-на-Дону">Ростов-на-Дону</option>
      </select>
      <h3>{{ this.user.region }}</h3>
      <button @click="itemsChangeSelect('region')" class="change" id="change-userCity">
        Изменить
      </button>
    </div>
    <div class="settings-items" id="email">
      <h2>Email</h2>
      <input :value="this.user.email" class="inputs" id="email" name="email" type="email" placeholder="Почта" pattern=".*[^@]+@[^@]+.*"
             title="Введите существующий ваш адрес электронной почты"
             oninvalid="this.setCustomValidity('Введите существующий адрес электронной почты')"
             oninput="this.setCustomValidity('')"  >
      <h3>{{ this.user.email }}</h3>
      <button @click="itemsChange('email')" class="change" id="change-userEmail">
        Изменить
      </button>
    </div>
    <div class="settings-items">
      <h2>Whatsapp</h2>
      <h3><a :href="'https://wa.me/' + this.user.number.replace('+', '')" title="Ссылка на WhatsApp сгенерирована автоматически по номеру телефона. Если вы хотите использовать другой WhatsApp, укажите номер телефона, привязанный к нему.">Открыть</a></h3>
      <button class="change"
              id="change-userSocialNetwork"
              title="Ссылка на WhatsApp сгенерирована автоматически по номеру телефона. Если вы хотите использовать другой WhatsApp, укажите номер телефона, привязанный к нему."
              onclick="alert(this.getAttribute('title'))">
        Изменить
      </button>

    </div>
    <div class="settings-items">
      <h2>Telegram</h2>
      <h3><a :href="'https://t.me/+' + this.user.number.replace('+', '')" title="Ссылка на Telegram сгенерирована автоматически по номеру телефона. Если вы хотите использовать другой Telegram, укажите номер телефона,  привязанный к нему.">Открыть</a></h3>
      <button class="change"
              id="change-userSocialNetwork"
              title="Ссылка на Telegram сгенерирована автоматически по номеру телефона. Если вы хотите использовать другой Telegram, укажите номер телефона,  привязанный к нему."
              onclick="alert(this.getAttribute('title'))">
        Изменить
      </button>

    </div>
    <div class="buttons-save-delete">
      <button id="log-out" @click="logout">
        Выйти
      </button>
      <button id="delete-an-account">
        Удалить аккаунт
      </button>
      <button @click="saveChanges" id="save-changes" disabled>
        Сохранить изменения
      </button>
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
  padding-left: 4vw;
  padding-right: 4vw;
}

#txt-container-header {
  height: fit-content;
  width: fit-content;
  color: #000;
  font-family: Comfortaa, serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  padding-bottom: 27px;
}

.settings-items {
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 31px;
  margin-right: 57px;
}

.settings-items img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: px solid #0021CF;
  overflow: hidden;
}

h2 {
  width: 150px;
  color: #000;
  font-family: Manrope, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
}

h3 {
  width: 100%;
  color: #000;
  font-family: Manrope-Light, serif;
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  font-weight: Light;
  margin-left: 4vw;
}

.settings-items input{
  width: 100%;
  color: #000;
  font-family: Manrope-Light, serif;
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  font-weight: Light;
  display: none;
}

#region-select{
  display: none;
  width: 100%;
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
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  color: rgba(0, 0, 0, 0.50);
  font-family: Manrope, serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-right: 20px;
}

.change {
  width: fit-content;
  color: #0021CF;
  font-family: Manrope, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

.buttons-save-delete {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 40px;
  color: #000;
  font-family: Manrope, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

#log-out {
  width: 114px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 20px;
}

#delete-an-account {
  width: 218px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 20px;
}

#save-changes {
  width: 254px;
  height: 40px;
  color: #FFF;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px;
  background-color: #0021CF;
  cursor: default;
}

#delete-an-account:hover,
#log-out:hover {
  transform: scale(1.03);
}

#delete-an-account:hover,
#log-out:hover {
  background: rgba(255, 180, 239, 0.14);
}

.zoom-effect:hover {
  transform: scale(1.03);
}

@media (max-width: 880px) {
  .change, h3, h2 {
    font-size: 16px;
  }

  h3 {
    white-space: normal;
    word-wrap: break-word;
    min-width: 100px;
  }

  .settings-items[data-v-0836e982] {
    width: 90vw;
    margin-right: 0px;
    
  }

  .content{
    padding: 0;
    padding-top: 38px;
    width: 90vw;
    padding-left: 3vw;
  }

  #txt-container-header {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .settings-items input {
    font-size: 15px;
  }

  .buttons-save-delete {
    display: block;
    margin-top: 0;
  }

  #save-changes,
  #delete-an-account {
    margin-top: 15px;
  }
}

@media (min-width: 880px) and (max-width: 1250px) {
  .content{
    padding-left: 4vw;
    padding-right: 4vw;
    width: 50vw;
  }
}

@media (min-width: 880px) and (max-width: 1060px) {
  .buttons-save-delete {
    display: block;
    margin-top: 0;
  }

  #save-changes {
    margin-top: 15px;
  }
}
</style>
