import axios from 'axios'

const api = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerCustomer = async (customer) => {
  const response = await api.post('/customer/register', customer)
  return response.data
}

export const loginCustomer = async (credentials) => {
  const response = await api.post('/customer/login', credentials)
  return response.data
}

export const getMyProfile = async () => {
  const response = await api.get('/customer/my')
  return response.data
}

export const logoutCustomer = async () => {
  const response = await api.post('/customer/logout')
  return response.data
}

export const getProducts = async (search = '', category = '') => {
  const params = {}

  if (search.trim()) params.search = search.trim()
  if (category && category !== 'All Categories') params.category = category

  const response = await api.get('/products', { params })
  return response.data
}

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}
