import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { db } from "../main.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        companies: []
    },
    mutations: {
        set_companies(state, payload) {
            state.companies = payload;
        },
    },
    actions: {
        load_companies({ commit }) {
            let companies = []
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
                            open: null,
                            max: null,
                            min: null,
                            val: null,
                            capital: data.capitalization,
                            dateUpdate: null,
                        };
                        companies.push(company);
                    });
                })
                .then(() => {
                    companies.forEach((item, i) => {
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
                            item.open = Number.parseFloat(
                                response.data["Time Series (Daily)"][
                                    response.data["Meta Data"]["3. Last Refreshed"]
                                ]["1. open"]
                            ).toFixed(2);
                            item.max = Number.parseFloat(
                                response.data["Time Series (Daily)"][
                                    response.data["Meta Data"]["3. Last Refreshed"]
                                ]["2. high"]
                            ).toFixed(2);
                            item.min = Number.parseFloat(
                                response.data["Time Series (Daily)"][
                                    response.data["Meta Data"]["3. Last Refreshed"]
                                ]["3. low"]
                            ).toFixed(2);
                            item.val = Number.parseFloat(
                                response.data["Time Series (Daily)"][
                                    response.data["Meta Data"]["3. Last Refreshed"]
                                ]["5. volume"]
                            ).toFixed(2);
                            item.dateUpdate = response.data["Meta Data"]["3. Last Refreshed"]
                            commit('set_companies', companies)
                        });
                    });
                });
        }
    },
    getters: {
        getCompanies: (state) => state.companies,
        companyBySymbol: s => symbol => s.companies.find(c => c.symbol == symbol),
    }
})