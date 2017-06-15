export const get = url =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'json';

    request.onload = () => {
      if (request.status === 200) {
        if (!request.response) {
          reject(new Error('Invalid Response'));
        }

        resolve(request.response);
      }

      reject(new Error(request.statusText));
    };

    request.onerror = () => {
      reject(new Error('Request Error'));
    };

    request.send();
  });

export const post = (url, data) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = 'json';

    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
      }

      reject(new Error(request.statusText));
    };

    request.onerror = () => {
      reject(new Error('Request Error'));
    };

    request.send(JSON.stringify(data));
  });
