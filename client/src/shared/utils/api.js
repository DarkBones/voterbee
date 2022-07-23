const baseOptions = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
}

const baseUrl = `/api/v${process.env.REACT_APP_NODE_API_VERSION}`

export const get = (path) => fetch(`${baseUrl}/${path}`, {
  ...baseOptions,
  method: 'GET',
})
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }

    return res.json()
  })

export const post = (path, payload) => fetch(`${baseUrl}/${path}`, {
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
