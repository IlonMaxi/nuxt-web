<script>
import LoginForm from '../components/LoginForm.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import ConfirmationNumber from '../components/ConfirmationNumber.vue';
import SuccessfullyRegistrationеForm from "../components/successfullyRegistrationеForm.vue";

// noinspection ES6ShorthandObjectProperty
export default {
  components: {
    SuccessfullyRegistrationеForm,
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
      mobileMenuHeight: '200px'
    };
  },
  methods: {
    toggleLoginForm() {
      this.showOverlay = !this.showOverlay;
      this.showForm = !this.showForm;
    },
    toggleRegForm() {
      this.showOverlayReg = !this.showOverlayReg;
      this.showFormReg = !this.showFormReg;
    },
    toggleConfNumbForm() {
      this.showOverlayConfNumb = !this.showOverlayConfNumb;
      this.showFormConfNumb = !this.showFormConfNumb;
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
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('resize', this.updateScreenWidth);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('resize', this.updateScreenWidth);
  }
}
</script>

<template>
  <header class="scroll">
    <a @click="$router.push('/')" class="logo" :class="{ hidden: hideLogo }">Swipe Up</a>
    <form class="search">
      <input id="search_text" type="text" placeholder="Найти..." @focus="hideLogoOnFocus" @blur="showLogoOnBlur">
      <button id="search_button" type="submit"></button>
    </form>
    <div class="buttons">
      <button ref="mobileMenuButton" @click="toggleMobileMenu" class="mobile-menu-button"></button>
      
      <div :class="{'show-mobile-menu': showMobileMenu}" class="mobile-menu-panel"  :style="{ height: mobileMenuHeight }" ref="mobileMenu">
        <button class="login-mob" @click="toggleLoginForm">
          <img src="@/assets/images/icon-person.svg" alt="Login Icon" style="margin-right: 8px;" />
          Войти
        </button>
        <button class="registration-mob" @click="toggleRegForm">Регистрация</button>
        <button class="catalog-mob" @click="handleClick">
          Категории
          <img :class="{ rotated: showDropdown }" src="@/assets/images/arrow-icon.svg" alt="Arrow Icon" style="margin-left: 8px;" />
        </button>
        <transition name="fade">
          <div class="dropdown-mob" v-if="showDropdown">
          <div class="dropdown-content-mob" id="dropdown-content">
            <div class="dropdown-mini-mob" id="dropdown-mini-mob-4">
              <a href="#" id="chapter-4-mob">Для детей</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-mob-1">
              <a href="#" id="chapter-1-mob">Одежда, обувь, аксессуары</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-mob-2">
              <a href="#" id="chapter-2-mob">Хобби и отдых</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-mob-3">
              <a href="#" id="chapter-3-mob">Красота и здоровье</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-mob-5">
              <a href="#" id="chapter-5-mob">Для дома и дачи</a>
            </div>
            <div class="dropdown-mini-mob" id="dropdown-mini-mob-6">
              <a href="#" id="chapter-6-mob">Электроника</a>
            </div>
          </div>
          </div>
        </transition>
      </div>

      <div class="dropdown">
        <button class="button-catalog" id="main-category">
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
      <button class="button-login" @click="toggleLoginForm">
        Войти
      </button>

      <div class="overlay" v-if="showOverlay" @click="toggleLoginForm"></div>
      <LoginForm v-if="showForm" @closeForm="toggleLoginForm"
                 @openButtonReg="() => {toggleLoginForm(); toggleRegForm();}"></LoginForm>

      <button class="button-register" @click="toggleRegForm">
        Регистрация
      </button>

      <div class="overlay" v-if="showOverlayReg" @click="toggleRegForm"></div>

      <RegistrationForm v-if="showFormReg" @closeFormRegistration="toggleRegForm"
                        @openButtonLog="() => {toggleRegForm(); toggleLoginForm();}"
                        @openButtonConfNumb="() => {toggleRegForm(); toggleConfNumbForm();}"></RegistrationForm>

      <div class="overlay" v-if="showOverlayConfNumb" @click="toggleConfNumbForm"></div>
      <ConfirmationNumber v-if="showFormConfNumb" @closeFormConfNumb="toggleConfNumbForm"
                          @openButtonRegChangeData="() => {toggleConfNumbForm(); toggleRegForm();}"
                          @doneReg="toggleConfNumbForm"
                          @openSuccesReg="toggleSuccesRegForm"></ConfirmationNumber>


      <div class="overlay" v-if="showOverlaySuccesReg" @click="toggleSuccesRegForm"></div>
      <SuccessfullyRegistrationеForm v-if="showSuccesReg" @click="toggleSuccesRegForm" @closeFormSuccesReg="toggleSuccesRegForm"></SuccessfullyRegistrationеForm>
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
.button-login:hover,
.button-register:hover {
  flex-shrink: 0;
  border-radius: 25px;
  transform: scale(1.03);
  background: rgba(255, 180, 239, 0.14);
}

.button-catalog {
  width: 100px;
  height: 58px;
  margin-right: 20px;
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
  text-decoration: none;
  color: #000;
}

.dropdown-mini-mob a:hover {
  background-color: #f0f0f0;
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
  z-index: 1;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
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

.show-mobile-menu {
  margin-top: 70px;
  right: 0;
  height: 200px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
}

.search button {
  z-index: 1;
}

.logo.hidden {
  display: none;
}

.mobile-menu-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-mob,
.registration-mob {
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
}

.catalog-mob {
  margin-bottom: 10px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  margin-left: 95px;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

img {
  transition: transform 0.3s;
}

.rotated {
  transform: rotate(180deg);
}

@media only screen and (max-width: 768px) {
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
  .button-login,
  .button-register {
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

@media (min-width: 768px) {
  .show-mobile-menu {
      right: -250px;
      height: 500px;
      box-shadow: none;
  }

  .logo.hidden {
    display: inline;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .search input{
    width: 30vw;
  }

  .buttons button {
    font-size: 18px;
    padding: 8px;
    margin-right: 1vw;
    width: inherit;
  }

  .logo {
    font-size: 34px;
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
    width: 40vw;
  }

  .search{
    width: 30vw;
    margin-left: 10px;
    margin-right: 10px;
  }
  
  .buttons button {
    font-size: 18px;
    padding: 10px;
    margin-right: 1vw;
  }

  .logo {
    margin-left: 3vw;
  }
}
</style>
