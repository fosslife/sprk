'use strict';

const URLButton = document.getElementById('urlButton');
const fileButton = document.getElementById('fileButton');
const urlInput = document.getElementById('url');
const fileInput = document.getElementById('file');
const resultDiv = document.getElementById('result');
const fileResultDiv = document.getElementById('fileresult');
const loader = document.getElementById('loader');
const customurl = document.getElementById('customurl');
const password = document.getElementById('password');

URLButton.addEventListener('click', async () => {
    const url = urlInput.value;
    if (!url) {
        alert('No URL specified');
        return;
    }
    if (resultDiv.innerHTML) {
        resultDiv.innerHTML = '';
    }
    const urlstring = `url=${url}${
        customurl.value ? '&custom=' + customurl.value : ''
    }${password.value ? '&pass=' + password.value : ''}`;
    loader.classList.remove('invisible');
    const headers = new Headers({
        'api-key': 'spark1234',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
    });
    const res = await fetch('/', {
        method: 'POST',
        headers: headers,
        body: urlstring
    })
        .then(d => d.json())
        .catch(e => {
            console.error('Error occurred', e);
            loader.classList.add('invisible');
        });
    // const sleep = () => new Promise(resolve => setTimeout(resolve, 2000));
    // await sleep();
    console.log(res);
    loader.classList.add('invisible');
    // const result = document.createElement('div');
    if (res.status === 200) {
        await navigator.clipboard.writeText(res.message);
        resultDiv.innerHTML = `<a href="${res.message}" class="border-b border-teal-500 border-dashed">${res.message}</a><br/><span class="text-gray-800">URL Copied to clipboard</span>`;
    } else {
        resultDiv.innerHTML = `<span>${res.message}</span>`;
    }
    console.log('RES', res);
});

fileButton.addEventListener('click', async () => {
    const data = new FormData();
    data.append('file', fileInput.files[0]);
    const res = await fetch('/', {
        method: 'POST',
        headers: new Headers({
            'api-key': 'spark1234',
            Accept: 'application/json'
        }),
        body: data
    })
        .then(d => d.json())
        .catch(e => {
            console.error('Error occurred', e);
            loader.classList.add('invisible');
        });
    // const result = document.createElement('div');
    if (res.status === 200) {
        await navigator.clipboard.writeText(res.message);
        fileResultDiv.innerHTML = `<a href="${res.message}" class="border-b border-teal-500 border-dashed">${res.message}</a><br/><span class="text-gray-800">URL Copied to clipboard</span>`;
    } else {
        fileResultDiv.innerHTML = `<span>${res.message}</span>`;
    }
    console.log(res);
});

function enableFields() {
    const customurlcheckbox = document.getElementById('customurlcheckbox');
    const passworddom = document.getElementById('passwordcheckbox');
    const customurlbox = document.getElementById('customurlbox');
    const passwordbox = document.getElementById('passwordbox');

    if (customurlcheckbox.checked) {
        customurlbox.classList.remove('hidden');
    } else {
        customurl.innerHTML = '';
        customurlbox.classList.add('hidden');
    }

    if (passworddom.checked) {
        passwordbox.classList.remove('hidden');
    } else {
        password.innerHTML = '';
        passwordbox.classList.add('hidden');
    }
}
