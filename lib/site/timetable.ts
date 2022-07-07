import axios from "axios";
import basicAuth from "lib/auth/basicAuth";

const defaultHeaders = {
  Accept: 'text/html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-GB,en;q=0.9',
  Connection: 'keep-alive',
  DNT: '1',
  Host: 'apps.uclan.ac.uk',
  // Authorization: 'Basic Nope'
}

const defaultOptions = {
  method: 'GET',
  url: 'https://apps.uclan.ac.uk/TimeTables/SpanWeek/WkMatrix',
  //params: {entId: 'LMcgrady', startDate: '2021-10-11'},
};

const defaultParams = {
  //entID: Username
  entType: 'Student',
  //StartDate: Now
}

export default async function fetchTimetableSite(email: string, password: string) {
    
    const username = email.split('@')[0]

    let now = new Date(Date.now());

    const requestHeaders = {...defaultHeaders,
        Authorization: `Basic ${basicAuth(email, password)}`
      }

    const requestParams = {...defaultParams,
      entID: username,
      StartDate: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
    }

    await axios.request({...defaultOptions, headers: requestHeaders, params: requestParams})

}