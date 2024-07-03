<script>
import User from "../plugins/classes/User";
import request from 'superagent';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      user: new User()
    };
  },
  async mounted() {
    this.updateActiveButton();
    // Вызов функции при изменении размера окна с использованием привязки к this
    window.addEventListener('resize', this.applyActiveElementStyles);
    if (await this.getData()) {
    }
  },
  beforeDestroy() {
    // Удаление обработчика события при размонтировании компонента
    window.removeEventListener('resize', this.applyActiveElementStyles);
  },
  watch: {
    // Просматриваем изменения пути для обновления стиля кнопки
    '$route.path': function(newVal, oldVal) {
      this.updateActiveButton();
    }
  },
  methods: {
    updateActiveButton() {
      // Определите ID элементов, соответствующих путям
      const routes = {
        '/profile/subscription': 'subscription',
        '/profile/my-ads': 'my-ads',
        '/profile/my-deals': 'my-deals',
        '/profile/my-promocodes': 'promocodes',
        '/profile/settings': 'settings',
        '/profile/support': 'support',
        '/profile/exchange-promocode': 'button-place-mini'
      };

      // Сброс цвета текста и фона для всех элементов
      Object.values(routes).forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.style.color = '#000';
          elem.style.backgroundColor = ''; // Сброс цвета фона
        }
      });

      this.applyActiveElementStyles(); // Вызов функции для установки стилей активного элемента
    },
    applyActiveElementStyles() {
      const routes = {
        '/profile/subscription': 'subscription',
        '/profile/my-ads': 'my-ads',
        '/profile/my-deals': 'my-deals',
        '/profile/my-promocodes': 'promocodes',
        '/profile/settings': 'settings',
        '/profile/support': 'support',
        '/profile/exchange-promocode': 'button-place-mini'
      };

      const activeId = routes[this.$route.path];
      if (activeId) {
        const activeElement = document.getElementById(activeId);
        if (activeElement) {
          if (window.matchMedia('(max-width: 880px)').matches) {
            activeElement.style.backgroundColor = 'rgb(0, 33, 207)'; // Цвет фона для активной кнопки на мобильных устройствах
            activeElement.style.color = '#ffffff'; // Цвет текста для активной кнопки на мобильных устройствах
          } else {
            activeElement.style.backgroundColor = ''; // Сброс цвета фона для больших экранов
            activeElement.style.color = '#0021CF'; // Цвет текста для активной кнопки на устройствах с экраном шире 600px
          }
        }
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

      console.log(this.users)
      return true;
    }
  }
}
</script>

<template>
  <nav>
    <div class="main-nav-container">
      <div class="image-container">
        <img :src="this.user.photoUrl !== null && this.user.photoUrl !== '' ? require(`../static/${this.user.photoUrl}`) : require('../assets/images/ava-settings.svg')" alt="Ваша аватарка" class="zoomable-image">
      </div>
        <div class="info-container">
        <button id="userName" onclick="window.location.href='#'">{{ this.user.name}}</button>
        <button id="status-subscripe" onclick="window.location.href='#'">Статус подписки: подключена</button>
        <button id="balance" onclick="window.location.href='#'">Баланс свопов: 5</button>
      </div>
    </div>
    <button class="button-place-mini" id="button-place-mini" @click="$router.push('/profile/exchange-promocode')">
      Обменять на скидку
    </button>
    <div class="buttons-nav">
      <button class="nav" id="subscription" @click="$router.push('/profile/subscription')">
        Подписка
      </button>
      <button class="nav" id="my-ads"  @click="$router.push('/profile/my-ads')">
        Мои объявления
      </button>
      <button class="nav" id="my-deals" @click="$router.push('/profile/my-deals')">
        Мои сделки
      </button>
      <button class="nav" id="promocodes" @click="$router.push('/profile/my-promocodes')">
        Мои промокоды
      </button>
      <button class="nav" id="settings" @click="$router.push('/profile/settings')">
        Настройки
      </button>
      <button class="nav" id="support" @click="$router.push('/profile/support')">
        Поддержка
      </button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  border-right: 2px solid #D9D9D9;
  padding-left: 44px;
  padding-top: 38px;
  height: auto;
  width: 326px;
}

#userName {
  width: 272px;
  text-align: left;
  color: #000;
  font-family: Comfortaa;
  font-size: 36px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  padding-top: 13.9px;
  padding-bottom: 14px;
}

.nav {
  color: #000;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  padding-bottom: 30px;
}

#status-subscripe,
#balance,
#button-place-mini {
  color: #000;
  font-family: Manrope-Light;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

#status-subscripe {
  text-align: start;
  padding-right: 9px;
  margin-bottom: 9px;
}

#button-place-mini {
  width: 213px;
  margin-top: 8px;
  margin-bottom: 29px;
}

#button-place-mini {
  color: #000;
  font-family: Manrope-Light;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

#button-place-mini {
  width: 213px;
  margin-top: 8px;
  margin-bottom: 29px;
}

.button-place-mini:hover {
  flex-shrink: 0;
  border-radius: 25px;
  transform: scale(1.03);
  background: rgba(255, 180, 239, 0.14);
  color: #000;
  text-align: center;
  font-family: Manrope;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}

.button-place-mini {
  height: 3.75rem;
  width: 16.1875rem;
  flex-shrink: 0;
  border-radius: 25px;
  border: 3px solid #0021CF;
  margin-right: 20px;
}

#delete-an-account:hover,
#log-out:hover,
#save-changes:hover,
.nav:hover {
  transform: scale(1.03);
}

.main-nav-container {
  flex-direction: column;
  align-items: center;
}

.main-nav-container img {
  border-radius: 25px;
  border: 3px solid #0021CF;
  width: 80%;
}

.buttons-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 880px) {
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: none;
    padding: 0;
    height: auto;
    width: 100%;
  }

  .container {
    border: none;
  }

  .image-container img {
    width: 150px;
    height: 150px;
  }

  .main-nav-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 20px;
    width: 90vw;
  }

  #userName {
    width: auto;
    text-align: center;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .image-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .info-container {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .zoomable-image {
    width: 107px;
    height: 107px;
  }

  #status-subscripe,
  #balance {
    margin-bottom: 10px;
    text-align: start;
  }

  #button-place-mini {
    margin-bottom: 10px;
  }

  #button-place-mini {
    width: 90vw;
    margin-top: 10px;
    margin-bottom: 25px;
    margin-right: 0;
    font-family: Comfortaa, serif;
  }

  .nav {
    font-size: 16px;
    margin: 5px;
    border: 1px solid #0021CF;
    border-radius: 15px;
    width: 45%;
    text-align: center;
    padding: 0;
    height: 30px;
    font-family: Comfortaa, serif;
  }

  .nav:hover {
    transform: none;
  }

  .button-place-mini:hover {
    transform: none;
    background: rgba(255, 180, 239, 0.14);
  }

  .nav-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .buttons-nav {
    width: 90vw;
  }

  .buttons-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
  }

  .buttons-nav .nav {
    flex: 1 1 calc(50% - 10px);
    text-align: center;
    border: 1px solid #0021CF;
    border-radius: 25px;
    color: #000;
    font-size: 16px;
    font-weight: 100;
    line-height: normal;
    background: transparent;
    cursor: pointer;
    transition: transform 0.3s;
  }
}

</style>
