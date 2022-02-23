import axios from "axios"

export const CallWithOutAuth = async (method, apiUrl, body) => {
  let url = process.env.NEXT_LOCAL_BASE_URL + apiUrl
  if (method === "POST") {
    try {
      const response = await axios.post(url, body)
      console.log(response)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "PUT") {
    try {
      const response = await axios.put(url, body)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "PATCH") {
    try {
      const response = await axios.patch(url, body)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "GET") {
    try {
      const response = await axios.get(url)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "DELETE") {
    try {
      const response = await axios.delete(url)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
}

export const CallWithAuth = async (method, apiUrl, body) => {
  const header = {
    // headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }

  let url = process.env.NEXT_LOCAL_BASE_URL + apiUrl // no base_url required because using custom server nextjs we are using same origin

  if (method === "POST") {
    try {
      const response = await axios.post(url, body, header)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "PUT") {
    try {
      const response = await axios.put(url, body, header)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "PATCH") {
    try {
      const response = await axios.patch(url, body, header)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "DELETE") {
    try {
      const response = await axios.delete(url, header)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
  if (method === "GET") {
    try {
      const response = await axios.get(url, header)
      return Promise.resolve({ status: true, data: response.data })
    } catch (error) {
      return Promise.resolve({
        status: false,
        data: error.response.data.message,
      })
    }
  }
}
