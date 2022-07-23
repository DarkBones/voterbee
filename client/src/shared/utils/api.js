const baseOptions = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const get = (path) => fetch(path, {
  ...baseOptions,
  method: 'GET',
})
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }

    return res.json()
  })

export const post = (path, payload) => fetch(path, {
  ...baseOptions,
  method: 'POST',
  body: JSON.stringify(payload),
})
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }

    return res.json()
  })
