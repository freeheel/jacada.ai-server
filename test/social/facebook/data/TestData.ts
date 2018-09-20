export default class FacebookTestData {

  addProfileTestData: any;
  configTestData: any;

  constructor() {
    this.configTestData = {
      "object": "page",
      "entry": [{
        "id": "1138734942943439",
        "time": 1537420581779,
        "messaging": [{
          "sender": {"id": "2656645241027953"},
          "recipient": {"id": "1138734942943439"},
          "timestamp": 1537420580480,
          "message": {
            "mid": "u7F0TlMBLSQkb-Qd4XrMtelZ3EJuFZ2YiPSDWE4IOFRdAxI2U-Yh1hj08ayjIPTQinZPawY6DdfrpxLOPakodA",
            "seq": 15017,
            "text": "config"
          }
        }]
      }]
    };
    this.addProfileTestData = {
      "object": "page",
      "entry": [{
        "id": "1138734942943439",
        "time": 1537420644318,
        "messaging": [{
          "sender": {"id": "2656645241027953"},
          "recipient": {"id": "1138734942943439"},
          "timestamp": 1537420643015,
          "message": {
            "mid": "yTIuFQ8nRFKEaH1KpmPmbelZ3EJuFZ2YiPSDWE4IOFTsrVYl0T5tXnjatXk_bX5XOutue2a0UAa7bZSS7YerLw",
            "seq": 15021,
            "text": "config thomas"
          }
        }]
      }]
    };
  }


}
