import { App } from 'antd'
import axiosBase, { AxiosError } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMensajeError(err: any) {
  const result: string | Blob = err.response?.data
    ? err.response.data?.message || err.response.data
    : err.message
  if (result instanceof Blob) {
    try {
      const error = JSON.parse(await result.text())
      return error.message
    } catch {
      return result.text()
    }
  }
  return result
}

export function useUtils() {
  const { modal } = App.useApp()

  const showError = async (
    err: unknown,
    { title = 'Proceso fallido' } = {}
  ) => {
    const content = await getMensajeError(err as AxiosError)
    console.error(err)
    modal.error({
      title,
      width: 450,
      content: content,
      okType: 'danger',
    })
  }

  return {
    showError,
  }
}

export const axios = axiosBase.create({ baseURL: 'http://127.0.0.1:3001/' })