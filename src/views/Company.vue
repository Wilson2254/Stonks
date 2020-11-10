<template>
  <div class="container">
    <div>
      <div class="content">
        <div class="header_img">
          <img src="../assets/logo.png" />
        </div>
        <div class="stock">
          <div class="first">
            <div class="name">
              {{ company.name }}
            </div>

            <div class="dateUpdate">{{ company.dateUpdate }}</div>

            <div class="cur_stock">
              {{ company.current }}
              <div class="procent_valute">
                <div class="procent">{{ company.change }}%</div>
                <div class="valute">{{ company.valute.toUpperCase() }}</div>
              </div>
            </div>
          </div>
          <div class="second">
            <div class="open">
              <div>Открытие</div>
              <div>{{ company.open }}</div>
            </div>
            <div class="close">
              <div>Закрытие</div>
              <div>{{ company.current }}</div>
            </div>
            <div class="change">
              <div>Изменение</div>
              <div>{{ company.change }}</div>
            </div>
          </div>
          <div class="third">
            <div class="max">
              <div>Макс. цена</div>
              <div>{{ company.max }}</div>
            </div>
            <div class="min">
              <div>Мин. цена</div>
              <div>{{ company.min }}</div>
            </div>
            <div class="value">
              <div>Объем</div>
              <div>{{ company.val }}</div>
            </div>
          </div>
          <div class="four">
            <div class="type">
              <div>Вид</div>
              <div>Акция</div>
            </div>
            <div class="market">
              <div>Рынок</div>
              <div>Россия</div>
            </div>
            <div class="capital">
              <div>Капитализация</div>
              <div>{{ company.capital }}</div>
            </div>
          </div>
        </div>

        <div class="description">
          <div class="info">Описание</div>
          <div class="text">{{ company.info }}</div>
          <div class="text">Владелец {{ company.owner }}</div>
          <div class="text">Основание {{ company.foundation_date }}</div>
          <div class="text">Штаб квартира {{ company.office }}</div>
        </div>
        <div class="graphics"></div>
        <div class="footer"><p>Copyright ©2020. ООО «STONKS»</p></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    company() {
      return this.$store.getters.companyBySymbol(this.$route.params.symbol);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  .content {
    margin: 0 5%;
    background-color: #e6eae8;
    .header_img {
      display: flex;
      align-items: center;
      padding-left: 30px;
      background-color: white;
    }
    .stock {
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 38px;
      padding: 34px 38px;
      .first {
        .name {
          font-size: 24px;
          color: #1b2ecc;
        }
        .dateUpdate {
          font-size: 12px;
          color: #b3b3b3;
        }
        .cur_stock {
          display: flex;
          align-items: center;
          font-size: 48px;
          color: black;
          .procent_valute {
            margin-left: 5px;
            .procent {
              font-size: 24px;
              margin-bottom: 30px;
            }
            .valute {
              color: #7c7c7c;
              font-size: 14px;
            }
          }
        }
      }
      .second {
        .open,
        .close,
        .change {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #7c7c7c;
          div:nth-child(1) {
            padding: 20px 0;
            margin-right: 150px;
          }
          div:nth-child(2) {
            padding: 20px 0;
            color: black;
          }
        }
        .open,
        .close {
          border-bottom: 1px solid #8c8383;
        }
      }
      .third {
        .max,
        .min,
        .value {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #7c7c7c;
          div:nth-child(1) {
            padding: 20px 0;
            margin-right: 150px;
          }
          div:nth-child(2) {
            padding: 20px 0;
            color: black;
          }
        }
        .max,
        .min {
          border-bottom: 1px solid #8c8383;
        }
      }
      .four {
        .capital,
        .type,
        .market {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #7c7c7c;
          div:nth-child(1) {
            padding: 20px 0;
            margin-right: 50px;
          }
          div:nth-child(2) {
            padding: 20px 0;
            color: black;
          }
        }
        .type,
        .market {
          border-bottom: 1px solid #8c8383;
        }
      }
    }
    .description {
      background-color: #ffffff;
      margin: 15px 38px;
      padding: 34px 38px;
    }
  }
  .footer {
    padding: 34px 38px;
    color: white;
    background-color: black;
  }
}
</style>