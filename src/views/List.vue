<template>
  <div class="container">
    <!-- <h1>List</h1>
    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Descr</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) of tasks" :key="task.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ task.title }}</td>
          <td class="desc__td">
            <div class="text">{{ task.description }}</div>
          </td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
            >
              Open
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no__task">No tasks</p> -->

    <div class="content">
      <div class="header_img">
        <img src="../assets/logo.png" />
      </div>

      <div class="bars">
        <div class="stocksHeader">
          <div class="title">
            <h2>КОТИРОВКИ</h2>
            <input v-model="search" placeholder="Компания" />
          </div>
          <div class="parameters">
            <div>НАИМЕНОВАНИЕ</div>
            <div>
              ЗНАЧЕНИЕ
              <input
                type="checkbox"
                @change="sortValue"
                v-model="sortValueFlag"
              />
            </div>
            <div>
              ИЗМЕНЕНИЕ
              <input
                type="checkbox"
                @change="sortChange"
                v-model="sortValueChange"
              />
            </div>
            <div>ВАЛЮТА</div>
            <div>ОТРАСЛЬ</div>
          </div>
          <div
            class="companies"
            v-for="(company, id) in filteredItems"
            :key="id"
          >
            <div>
              <router-link :to="'/company/' + company.symbol">
                {{ company.name }}
              </router-link>
            </div>
            <div>
              {{ company.current }}
            </div>
            <div
              class="change"
              :style="{ color: company.change < 0 ? '#EC0033' : 'green' }"
            >
              <span class="down" v-if="company.change < 0">&#9660;</span>
              <span class="up" v-else>&#9650;</span>
              {{ Math.abs(company.change) }} %
            </div>
            <div>{{ company.valute.toUpperCase() }}</div>
            <div class="industry">{{ company.industry }}</div>
          </div>
        </div>

        <div class="sidebar">
          <div class="filterBlock">
            <div class="blockHeader">
              <h3>ФИЛЬТРЫ</h3>
            </div>
            <div class="blockContent">
              Отрасль
              <select v-model="filterIndustry">
                <option
                  v-for="(company, id) in companies"
                  :key="id"
                  :value="company.industry"
                >
                  {{ company.industry }}
                </option>
                <option>Все</option>
              </select>
            </div>

            <div class="blockContent">
              Изменение
              <select v-model="filterChange">
                <option>Все</option>
                <option>Рост</option>
                <option>Падение</option>
              </select>
            </div>

            <div class="blockContent">
              Валюта
              <select v-model="filterValute">
                <option>USD</option>
                <option>EUR</option>
                <option>Все</option>
              </select>
            </div>
          </div>

          <div class="currencyBlock">
            <div class="blockHeader">
              <h3>КУРСЫ ВАЛЮТ ({{ dateValute }})</h3>
            </div>
            <div class="blockContent">
              <div>
                USD {{ USD.Value }}
                <span
                  class="down"
                  v-if="((USD.Value * 100) / USD.Previous - 100).toFixed(2) < 0"
                  >&#9660;</span
                >
                <span class="up" v-else>&#9650;</span>
                <span
                  :style="{
                    color:
                      ((USD.Value * 100) / USD.Previous - 100).toFixed(2) < 0
                        ? '#EC0033'
                        : 'rgb(2, 255, 2)',
                  }"
                >
                  {{
                    Math.abs(
                      ((USD.Value * 100) / USD.Previous - 100).toFixed(2)
                    )
                  }}
                  %
                </span>
              </div>

              <div>
                EUR {{ EUR.Value }}
                <span
                  class="down"
                  v-if="((EUR.Value * 100) / EUR.Previous - 100).toFixed(2) < 0"
                  >&#9660;</span
                >
                <span class="up" v-else>&#9650;</span>
                <span
                  :style="{
                    color:
                      ((EUR.Value * 100) / EUR.Previous - 100).toFixed(2) < 0
                        ? '#EC0033'
                        : 'rgb(2, 255, 2)',
                  }"
                >
                  {{
                    Math.abs(
                      ((EUR.Value * 100) / EUR.Previous - 100).toFixed(2)
                    )
                  }}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer"><p>Copyright ©2020. ООО «STONKS»</p></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "../main.js";
export default {
  data() {
    return {
      companies: [],
      USD: 0,
      EUR: 0,
      dateValute: new Date(),
      search: "",
      filterIndustry: "",
      filterChange: "",
      filterValute: "",
      sortValueFlag: false,
      sortValueChange: false,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },

    filteredItems: function () {
      return this.companies

        .filter((item) => {
          return (
            this.filterIndustry == "" ||
            this.filterIndustry == "Все" ||
            item.industry == this.filterIndustry
          );
        })

        .filter((item) => {
          return item.name.toLowerCase().indexOf(this.search) !== -1;
        })

        .filter((item) => {
          if (this.filterChange == "Рост") return item.change > 0;
          else if (this.filterChange == "Падение") return item.change < 0;
          else if (this.filterChange == "Все") return item.change;
          else return item.change;
        })

        .filter((item) => {
          return this.filterValute == "" || this.filterValute == "Все" || item.valute.toUpperCase().trim() == this.filterValute;
        });
    },
  },

  //Получаем валюту
  //Получаем данные с БД и записываем в массив объектов
  //Получаем акции компаний, которые есть в БД
  async mounted() {
    const res = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`);
    this.dateValute = res.data.Date.slice(0, -15);
    this.USD = res.data.Valute.USD;
    this.EUR = res.data.Valute.EUR;
    db.collection("Company")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((s, i) => {
          const data = s.data();
          let company = {
            foundation_date: data.foundation_date,
            industry: data.industry,
            valute: data.valute,
            info: data.info,
            name: data.name,
            office: data.office,
            owner: data.owner,
            symbol: data.symbol,
            current: axios.get(
              `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${data.symbol}&apikey=8BKT3392WBPTYAE5`
            ),
            change: null,
          };
          this.companies.push(company);
          console.log(this.companies);
        });
      })
      .then((response) => {
        this.companies.forEach((item, i) => {
          item.current.then((response) => {
            item.current = Number.parseFloat(
              response.data["Time Series (Daily)"][
                response.data["Meta Data"]["3. Last Refreshed"]
              ]["4. close"]
            ).toFixed(2);
            item.change = (
              (response.data["Time Series (Daily)"][
                response.data["Meta Data"]["3. Last Refreshed"]
              ]["4. close"] *
                100) /
                response.data["Time Series (Daily)"][
                  response.data["Meta Data"]["3. Last Refreshed"]
                ]["1. open"] -
              100
            ).toFixed(2);
          });
        });
      });
  },

  methods: {
    sortValue() {
      this.companies.sort((a, b) => {
        if (this.sortValueFlag) {
          return b.current - a.current;
        } else {
          return a.current - b.current;
        }
      });
    },
    sortChange() {
      this.companies.sort((a, b) => {
        if (this.sortValueChange) {
          return b.change - a.change;
        } else {
          return a.change - b.change;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  .content {
    background-color: #e6eae8;
    .header_img {
      display: flex;
      align-items: center;
      padding-left: 30px;
      background-color: white;
    }

    .bars {
      display: flex;
      padding: 10px;
      .stocksHeader {
        margin-right: 10px;
        .title {
          background-color: #1b2ecc;
          padding: 15px 30px;
          color: white;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .parameters {
          display: flex;
          background-color: black;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            padding: 15px 30px;
            width: 200px;
            input {
              width: 20px;
              color: gray;
            }
          }
        }
        .companies {
          display: flex;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px 30px;
            width: 200px;
          }
          .industry {
            text-align: center;
          }
          .change {
            .up {
              color: rgb(2, 255, 2);
              font-size: 18pt;
            }
            .down {
              color: red;
              font-size: 18pt;
            }
          }
        }
      }
      .sidebar {
        color: white;
        .blockHeader {
          margin-bottom: 15px;
          background-color: #1b2ecc;
          padding: 15px;
        }
        .filterBlock,
        .currencyBlock {
          width: 300px;
        }
        .blockContent {
          background-color: white;
          color: black;
          padding: 10px 20px;
          select {
            width: 100px;
          }
          div {
            font-size: 20px;
            margin: 5px 0;
            .up {
              margin-left: 10px;
              color: rgb(2, 255, 2);
            }
            .down {
              margin-left: 10px;
              color: red;
            }
          }
        }
        .filterBlock {
          margin-bottom: 15px;
        }
      }
    }

    .footer {
      padding: 30px 0 30px 30px;
      color: white;
      background-color: black;
    }
  }
}
</style>>
