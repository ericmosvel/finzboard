import axios from 'axios'

// const tokenCode = 'pk_ca1c578ddd514837a784132d1e408809' // production
// const tokenCode = 'Tpk_2065b975541444d089e1160434a08f9b' // test

// api request with axios
let getCompanyInfo = () => {
  return axios.get(`https://api.iextrading.com/1.0/ref-data/symbols?filter=name,symbol,type`)
}

export {
  getCompanyInfo
}

// sandbox = https://sandbox.iexapis.com/beta/ref-data/symbols?filter=symbol,name,type&token=${tokenCode}
// production = https://cloud.iexapis.com/beta/ref-data/symbols?filter=symbol,name,type&token=${tokenCode}
// old = https://api.iextrading.com/1.0/ref-data/symbols?filter=name,symbol,type
