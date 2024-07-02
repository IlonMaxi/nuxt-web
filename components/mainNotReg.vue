<template>
  <!doctype html>
  <html lang="ru">

  <head>
    <meta charset='utf-8' />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swipe Up – веб-платформа для обмена и продажи вещей</title>
  </head>

  <body>
  <main>
    <div class="ads">
      <div class="firstRow">
        <div class="container" id="container1" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Кировский
          </p>
          <p class="txtTitle">
            Коляска 3 в 1
          </p>
        </div>
        <div class="container" id="container2" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Ворошиловский
          </p>
          <p class="txtTitle">
            Ноутбук
          </p>
        </div>
        <div class="container" id="container3" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Советский
          </p>
          <p class="txtTitle">
            Коляска 3 в 1
          </p>
        </div>
        <div class="container" id="container4" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Кировский
          </p>
          <p class="txtTitle">
            Зимний комбинезон
          </p>
        </div>
      </div>
      <div class="secondRow">
        <div class="container" id="container1" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Кировский
          </p>
          <p class="txtTitle">
            Коляска 3 в 1
          </p>
        </div>
        <div class="container" id="container2" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Ворошиловский
          </p>
          <p class="txtTitle">
            Ноутбук
          </p>
        </div>
        <div class="container" id="container3" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Советский
          </p>
          <p class="txtTitle">
            Коляска 3 в 1
          </p>
        </div>
        <div class="container" id="container4" style="cursor: pointer;" onclick="window.location.href='#'">
          <div class="img_">

          </div>
          <p class="txtLocation">
            р-н Кировский
          </p>
          <p class="txtTitle">
            Зимний комбинезон
          </p>
        </div>
      </div>
    </div>
    <hr class="hr-line">

  </main>

  </body>

  </html>

</template>

<style>
/* body */

body {
  display: flex;
  flex-direction: column;
  width: 100%;
}


.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  width: 298px;
  height: 35px;

  color: black;
  padding-left: 10px;
  text-decoration: none;
  display: block;
  text-align: start;
  justify-content: center;
  font-family: Manrope, serif;
  font-size: 18px;

  border: 1px solid #c1c1c2;
}

.dropdown-content a:hover {
  background-color: #FFDAF7;
}


.dropdown-mini:hover .dropdown-content-mini {
  display: block;
}

.dropdown-content-mini b {
  width: 298px;
  height: 35px;

  color: black;
  padding-left: 10px;
  text-decoration: none;
  display: block;
  text-align: start;
  justify-content: center;

  border: 1px solid #c1c1c2;
}



main {
  height: fit-content;
  width: 100%;
}


.ads {
  height: 64rem;
  width: 100%;
}

.ads .firstRow,
.ads .secondRow {
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;

  padding-top: 5%;
  padding-left: 4%;
  padding-right: 3.9%;

}

.ads .container {
  width: 19.5rem;
  height: 24.75rem;
  flex-shrink: 0;
  border-radius: 1.5625rem;
  border: 1px solid #0021CF;
  background: #FFF;
  box-shadow: 6px 9px 16px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  margin-inline: auto;

}

.ads .container:hover {
  transform: scale(1.02);
}

.ads .img_ {
  width: 19.5rem;
  height: 16.5892rem;
  /* border-radius: 1.5625rem; */
  background: rgba(217, 217, 217, 1);

  display: flex;
  flex-direction: row;
}

.ads .txtLocation {
  margin-top: 0.91rem;
  margin-right: 0.94rem;
  margin-left: auto;

  width: fit-content;
  height: 1.5rem;
  color: #000;
  text-align: right;
  font-family: Geologica, serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

.ads .txtTitle {
  margin: 0.94rem auto auto 0.69rem;
  width: 9.3125rem;
  height: 2.25rem;
  color: #000;
  /* font-family: Geologica; */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}


/* Adaptation for mobile devices */

@media (max-width: 769px) {}
.hr-line {
  width: 100%;
  /* blue line */
  margin: 0 0;
  padding: 0;
  height: 0;
  border: none;
  border-top: 1px solid #c1c1c2;
}
</style>

<script>
export default {
  name: 'IndexPage'
}
</script>

