import axios from 'axios';

let domain = 'http://' + window.location.hostname;
let port = 8000;

export function getRequest(sub_url) {
  let url = domain + ':' + port + sub_url;
  return axios ({
    method: 'get',
    url: url
  })
}

export function postRequest(sub_url, data) {
  let url = domain + ':' + port + sub_url;
  return axios ({
    method: 'post',
    url: url,
    data: data,
  })
}

export function deleteRequest(sub_url, data) {
  let url = domain + ':' + port + sub_url;
  return axios ({
    method: 'delete',
    url: url,
    data: data,
  })
}
