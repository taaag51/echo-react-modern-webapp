import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useStore } from '../store'
import { Credential } from '../types'
import { userError } from '../hooks/useError'

export const useMutateAuth = () => {
  const navigate = useNavigate()
  const resetEditedTask = useStore((state) => state.resetEditedTask])
  const { switchErrorHandling } = userError()
  const loginMutation = useMutation(
    async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`,user),
    {
      onSuccess: () => {
        navigate('/todo')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const registerMutation = useMutation(
    async (user: Credential) => axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
    {
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const logoutMutation = useMutation(
    async () => axios.post(`${process.env.REACT_APP_API_URL}/logout`),
    {
      onSuccess: () => {
        resetEditedTask()
        navigate('/')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  return { loginMutation, registerMutation, logoutMutation}
}