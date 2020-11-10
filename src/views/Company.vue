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
                <div
                  class="procent"
                  :style="{ color: company.change < 0 ? '#EC0033' : 'green' }"
                >
                  <span class="down" v-if="company.change < 0">&#9660;</span>
                  <span class="up" v-else>&#9650;</span
                  >{{ Math.abs(company.change) }}%
                </div>
                <div class="valute">{{ company.valute.toUpperCase() }}</div>
              </div>
            </div>
          </div>
          <div class="second">
            <div class="open">
              <div>Открытие</div>
              <div>{{ company.open }} {{ sign }}</div>
            </div>
            <div class="close">
              <div>Закрытие</div>
              <div>{{ company.current }} {{ sign }}</div>
            </div>
            <div class="change">
              <div>Изменение</div>
              <div :style="{ color: company.change < 0 ? '#EC0033' : 'green' }">
                <span class="down" v-if="company.change < 0">&#9660;</span>
                <span class="up" v-else>&#9650;</span
                >{{ Math.abs(company.change) }}%
                <span
                  v-if="parseFloat(company.current) > parseFloat(company.open)"
                  >(+{{
                    (
                      parseFloat(company.current) - parseFloat(company.open)
                    ).toFixed(2)
                  }} {{ sign }})</span
                >
                <span v-else
                  >({{
                    (
                      parseFloat(company.current) - parseFloat(company.open)
                    ).toFixed(2)
                  }}{{ sign }})</span
                >
              </div>
            </div>
          </div>
          <div class="third">
            <div class="max">
              <div>Макс. цена</div>
              <div>{{ company.max }} {{ sign }}</div>
            </div>
            <div class="min">
              <div>Мин. цена</div>
              <div>{{ company.min }} {{ sign }}</div>
            </div>
            <div class="value">
              <div>Объем</div>
              <div>{{ company.val }} {{ sign }}</div>
            </div>
          </div>
          <div class="four">
            <div class="type">
              <div>Вид</div>
              <div>Акция</div>
            </div>
            <div class="market">
              <div>Рынок</div>
              <div>США</div>
            </div>
            <div class="capital">
              <div>Капитализация</div>
              <div>{{ company.capital.toString().slice(0, -9)}} млрд. {{ sign }}</div>
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
    sign() {
      return this.company.valute.trim() == "usd" ? "$" : "€";
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
          font-size: 32px;
          color: #1b2ecc;
        }
        .dateUpdate {
          font-size: 14px;
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
              font-size: 16px;
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
  .up {
    color: rgb(2, 255, 2);
  }
  .down {
    color: red;
  }
}
</style>