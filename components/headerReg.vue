<script>
import LoginForm from '../components/LoginForm.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import ConfirmationNumber from '../components/ConfirmationNumber.vue';
import User from "../plugins/classes/User";
import request from 'superagent';
import Cookies from 'js-cookie';

export default {
  components: {
    LoginForm,
    RegistrationForm,
    ConfirmationNumber
  },
  data() {
    return {
      showOverlay: false,
      showForm: false,
      showOverlayReg: false,
      showFormReg: false,
      showOverlayConfNumb: false,
      showFormConfNumb: false,
      showOverlaySuccesReg: false,
      showSuccesReg: false,
      showMobileMenu: false,
      hideLogo: false,
      screenWidth: window.innerWidth,
      showDropdown: false,
      mobileMenuHeight: '200px',
      user: new User()
    };
  },
  async mounted() {
    await this.$runTokenVerification();
    if (await this.getData()) {
    }

    document.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('resize', this.updateScreenWidth);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('resize', this.updateScreenWidth);
  },
  methods: {
    toggleConfNumbForm() {
      this.showOverlayConfNumb = !this.showOverlayConfNumb;
      this.showFormConfNumb = !this.showFormConfNumb;
    },
    goToAddPlace() {
      this.$router.push('/addplace');
    },
    goToProfileSettings() {
      this.$router.push('/profile/settings');
    },
    toggleSuccesRegForm(){
      this.showOverlaySuccesReg = !this.showOverlaySuccesReg;
      this.showSuccesReg = !this.showSuccesReg;
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    toggleCategories() {
      console.log("Categories button clicked");
    },
    handleOutsideClick(event) {
      if (this.$refs.mobileMenu && !this.$refs.mobileMenu.contains(event.target) && !this.$refs.mobileMenuButton.contains(event.target)) {
        this.showMobileMenu = false;
      }
    },
    hideLogoOnFocus() {
      if (this.screenWidth < 768) {
        this.hideLogo = true;
      }
    },
    showLogoOnBlur() {
      this.hideLogo = false;
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    toggleCategories() {
      this.showDropdown = !this.showDropdown;
    },
    toggleMobileMenuHeight() {
      console.log('Toggling mobile menu height');
      this.mobileMenuHeight = this.mobileMenuHeight === '200px' ? '400px' : '200px';
      console.log('New mobileMenuHeight:', this.mobileMenuHeight);
    },
    handleClick() {
      this.toggleCategories();
      this.toggleMobileMenuHeight();
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

    console.log(this.users)
    return true;
  }
  }
}
</script>

<template>

  <header class="scroll">
    <a @click="$router.push('/auth')" class="logo" :class="{ hidden: hideLogo }">Swipe Up</a>
    <form class="search">
      <input id="search_text" type="text" placeholder="Найти..." @focus="hideLogoOnFocus" @blur="showLogoOnBlur">
      <button id="search_button" type="submit"></button>
    </form>
    <div class="buttons">

      <button ref="mobileMenuButton" @click="toggleMobileMenu" class="mobile-menu-button"></button>
      
      <div :class="{'show-mobile-menu': showMobileMenu}" class="mobile-menu-panel"  :style="{ height: mobileMenuHeight }" ref="mobileMenu">
        <button @click="goToProfileSettings" class="button-account-mob">
          <img :src="this.user.photoUrl !== null && this.user.photoUrl !== '' ? require(`../static/${this.user.photoUrl}`) : require('../assets/images/ava-settings.svg')"
           alt="Login Icon" style="margin-right: 8px;" />
          {{ this.user.name}}
        </button>
        <button @click="$router.push('/adplace')" class="button-place-mini-mob">
          Разместить объявление
        </button>
        <button class="catalog-mob" @click="handleClick">
          Категории
          <img :class="{ rotated: showDropdown }" src="@/assets/images/arrow-icon.svg" alt="Arrow Icon" style="margin-left: 8px;" />
        </button>
        <transition name="fade">
          <div class="dropdown-mob" v-if="showDropdown">
          <div class="dropdown-content-mob" id="dropdown-content">
            <div class="dropdown-mini-mob" id="dropdown-mini-4">
              <a href="#" id="chapter-4">Для детей</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-1">
              <a href="#" id="chapter-1">Одежда, обувь, аксессуары</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-2">
              <a href="#" id="chapter-2">Хобби и отдых</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-3">
              <a href="#" id="chapter-3">Красота и здоровье</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-5">
              <a href="#" id="chapter-5">Для дома и дачи</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-6">
              <a href="#" id="chapter-6">Электроника</a>
            </div>
          </div>
          </div>
        </transition>
      </div>

      <div class="dropdown">
        <button class="button-catalog" id="main-category" @click="toggleConfNumbForm">
          Категории
        </button>
        <div class="dropdown-content" id="dropdown-content">

          <div class="dropdown-mini" id="dropdown-mini-4">
            <a href="#" id="chapter-4">Для детей</a>
            <div class="dropdown-content-mini" id="dropdown-content-mini">
              <a href="#" id="chapter-min-1">Одежда</a>
              <a href="#" id="chapter-min-2">Обувь</a>
              <a href="#" id="chapter-min-3">Мебель</a>
              <a href="#" id="chapter-min-4">Игрушки</a>
              <a href="#" id="chapter-min-5">Коляски</a>
              <a href="#" id="chapter-min-6">Спорт</a>
              <a href="#" id="chapter-min-7">Электроника</a>
              <a href="#" id="chapter-min-8">Автокресла и стульчики</a>
              <a href="#" id="chapter-min-9">Косметика и гигиена</a>
            </div>
          </div>

          <div class="dropdown-mini" id="dropdown-mini-1">
            <a href="#" id="chapter-1">Одежда, обувь, аксессуары</a>
            <div class="dropdown-content-mini" id="dropdown-content-mini">
              <a href="#" id="chapter-min-1">Скоро</a>
            </div>
          </div>

          <div class="dropdown-mini" id="dropdown-mini-2">
            <a href="#" id="chapter-2">Хобби и отдых</a>
            <div class="dropdown-content-mini" id="dropdown-content-mini">
              <a href="#" id="chapter-min-1">Скоро</a>
            </div>
          </div>

          <div class="dropdown-mini" id="dropdown-mini-3">
            <a href="#" id="chapter-3">Красота и здоровье</a>
            <div class="dropdown-content-mini" id="dropdown-content-mini">
              <a href="#" id="chapter-min-1">Скоро</a>
            </div>
          </div>

          <div class="dropdown-mini" id="dropdown-mini-5">
            <a href="#" id="chapter-5">Для дома и дачи</a>
            <div class="dropdown-content-mini" id="dropdown-content-mini">
              <a href="#" id="chapter-min-1">Скоро</a>
            </div>
          </div>

          <div class="dropdown-mini" id="dropdown-mini-6">
            <a href="#" id="chapter-6">Электроника</a>
            <div class="dropdown-content-mini" id="dropdown-content-mini">
              <a href="#" id="chapter-min-1">Скоро</a>
            </div>
          </div>
        </div>
      </div>
      <button @click="$router.push('/adplace')" class="button-place-mini">
        Разместить объявление
      </button>
      <button @click="goToProfileSettings" class="button-account">
        <img :src="this.user.photoUrl !== null && this.user.photoUrl !== '' ? require(`../static/${this.user.photoUrl}`) : require('../assets/images/ava-settings.svg')"/>
      </button>

    </div>
  </header>
</template>

<style scoped>
header {
  height: 112px;
  width: 100%;
  border-bottom: 1px solid #c1c1c2;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: top 0.3s;
}


header.scrolled {
  top: -111.72px;
}

.logo {
  height: fit-content;
  width: fit-content;
  color: #000;
  font-family: Comfortaa, serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2px;
  margin-top: 20px;
  margin-left: 65px;
  margin: 0;
  flex-shrink: 0;
  cursor: pointer;
  align-self: center;
  margin-left: 5vw;
}

.logo:hover {
  transform: scale(1.01);
}

.search {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 27.375rem;
  height: 3.75rem;
  margin-top: 28px;
  margin-left: 5vw;
}


.search input {
  width: 27.375rem;
  height: 3.75rem;
  outline: none;
  border-radius: 1.5625rem;
  border: 3px solid #D9D9D9;
  background: #FFF;
  color: #000;
  font-family: Manrope, serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  padding-inline: 1.31rem;
}

.search button {
  width: 2.875rem;
  height: 2.875rem;
  flex-shrink: 0;
  background-image: url(../assets/images/search_logo.svg);
  background-size: 100% 100%;
  cursor: pointer;
  outline: none;
  fill: #0021CF;
  stroke-width: 3px;
  stroke: #0021CF;
  border-radius: 1rem;
  position: absolute;
  margin-right: 8px;
}

.search button:before {
  height: 26px;
  width: 26px;
  top: 8px;
  right: 8px;
  background: #F15B42;
  cursor: pointer
}

.search button {
  z-index: 1;
}

.buttons {
  height: fit-content;
  width: fit-content;
  color: #000;
  text-align: center;
  font-family: Geologica, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  display: flex;
  flex-direction: row;
  margin-top: 28px;
}

.button-catalog:hover,
.button-place-mini:hover {
  flex-shrink: 0;
  border-radius: 25px;
  transform: scale(1.03);
  background: rgba(255, 180, 239, 0.14);
}

.button-account:hover {
  flex-shrink: 0;
  border-radius: 25px;
  transform: scale(1.03);
}

.button-catalog {
  width: 100px;
  height: 58.087px;
  margin-right: 20px;
}

.button-place-mini {
  height: 3.75rem;
  width: 16.1875rem;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 20px;
}

.button-account {
  width: 3.75rem;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 3.125rem;
  border: 3px solid #0021CF;
  background: rgba(255, 180, 239, 0.50) url(assets/images/account_circle_logo.svg);
  background-size: 100% 100%;
  margin-right: 3.12rem;
}

.logo.hidden {
  display: none;
}

.dropdown {
  height: 58px;
  width: fit-content;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 1;
  margin-right: 10px;
}

.dropdown-content {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.dropdown-content-mini {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: -36px;
  margin-left: -298px;
}

.dropdown-mini:hover {
  background-color: #FFDAF7;
}

.button-login {
  width: 69px;
  margin-right: 45px;
}

.button-register {
  height: 58px;
  width: 193px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 74px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1; /* Make sure this is below your login form in z-index */
}

.mobile-menu-panel {
  position: fixed;
  top: 0;
  right: -280px;
  width: 280px;
  background-color: white;
  transition: right 0.3s ease;
  z-index: 1000;
  margin-top: 70px;
  height: 500px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}

.mobile-menu-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.show-mobile-menu {
  margin-top: 70px;
  right: 0;
  height: 200px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
}

.button-account-mob, 
.button-place-mini-mob {
  border: 1px solid black;
  margin-top: 15px;
  border-radius: 18px;
  height: 51px;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0021CF;
  font-family: 'Comfortaa';
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
}

.button-account-mob img{
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border: 2px solid #0021CF;
}

.button-account img{
  width: 100%;
  height: 100%;
  border-radius: 25px;
}

.catalog-mob {
  margin-bottom: 10px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  margin-left: 95px;
}

.dropdown-content-mob {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 15px;
}

.dropdown-mini-mob {
    width: 100%;
    text-align: right;
}

.dropdown-mini-mob a {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: #000;
}

img {
  transition: transform 0.3s;
}

.rotated {
  transform: rotate(180deg);
}

@media only screen and (max-width: 880px) {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 60px;
  }

  .search input:focus {
    width: 75vw;
    left: 0;
    z-index: 1;
    transition: width 0.3s ease-in-out;
  }

  .logo {
    font-size: 22.54px;
    text-align: center;
    margin: 0;
    margin-left: 3vw;
  }

  .search {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0px;
  }

  .search input {
    height: 80%;
    width: 150px;
    border-radius: 18px;
    margin: 0 10px;
  }

  .search button {
    border-radius: 13px;
    height: 35px;
    width: 35px;
    margin-right: 17px;
  }

  .button-catalog,
  .button-place-mini,
  .button-account {
    display: none;
  }

  .mobile-menu-button {
    display: inline-block;
    height: 35px;
    width: 35px;
    fill: #0021CF;
    background-image: url(../assets/images/burger-menu.svg);
    margin-top: 40%;
  }

  .buttons {
    margin: 0px;
    margin-right: 5px;
  }

  .dropdown-mob {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (min-width: 880px) {
  .show-mobile-menu {
      right: -250px;
      height: 500px;
      box-shadow: none;
  }

  .logo.hidden {
    display: inline;
  }
}

@media (min-width: 881px) and (max-width: 1024px) {
  .search input{
    width: 30vw;
  }

  .search {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 30vw;
    height: 3.75rem;
    margin-top: 28px;
    margin-left: 5vw;
  }

  .buttons button {
    font-size: 18px;
    margin-right: 1vw;
  }

  .button-account {
    width: 60px;
  }

  .logo {
    font-size: 25px;
    margin-left: 1vw;
  }

  .search {
    margin-left: 10px;
  }

  .mobile-menu-panel{
    display: none;
  }
}

@media (min-width: 1025px) {
  .search input{
    width: 25vw;
  }

  .mobile-menu-panel {
    display: none;
  }

  .search{
    width: 30vw;
    margin-left: 10px;
    margin-right: 10px;
  }
  
  .buttons button {
    font-size: 18px;
    margin-right: 1vw;
  }

  .logo {
    margin-left: 3vw;
  }
}
</style>
