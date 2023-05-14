// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userServiceApi = createApi({
  reducerPath: 'userServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/user/' }),
  endpoints: (builder) => ({
  postUserService: builder.mutation({
        query: (data) => {
         
            return {
                url: '/register',
                method: 'POST',
                body: data
            }
        }
    }),
    loginUserService: builder.mutation({
        query: (data) => {
            return {
                url: '/login',
                method: 'POST',
                body: data
            }
        }
    }),
    getUsers: builder.query({
        query: (token) => {
          
          return {
            url: `getuser`,
            method: 'GET',
            headers: {
              'authorization' : `Bearer ${token}`
            }
          }
        }
      }),
    changeUserPasswordService: builder.mutation({
        query: ({token,...data}) => {
            return {
                url: 'changePassword',
                method: 'POST',
                body: data,
                headers: {
                  'authorization' : `Bearer ${token}`
                }
            }
        }
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {usePostUserServiceMutation, useLoginUserServiceMutation, useGetUsersQuery, useChangeUserPasswordServiceMutation } = userServiceApi

export default userServiceApi