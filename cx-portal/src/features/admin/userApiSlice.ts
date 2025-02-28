/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { PaginResult, PaginFetchArgs } from 'cx-portal-shared-components'
import { PAGE_SIZE } from 'types/Constants'

export interface UserAppRoles {
  appId: string
  roles: string[]
}

export type AddUser = {
  userName: string
  email: string
  firstName: string
  lastName: string
  roles?: string[]
  message: string
}

export interface UserBase {
  companyUserId: string
  status: string
  firstName: string
  lastName: string
  email: string
}

export interface TenantUser extends UserBase {
  userEntityId: string
  roles: string[]
}

export interface TenantUserDetails extends TenantUser {
  created: string
  bpn: string[]
  company: string
  assignedRoles: UserAppRoles[]
}

export interface CompanyDetails {
  bpn: string
  city: string
  companyId: string
  countryAlpha2Code: string
  countryDe: string
  name: string
  region: string
  shortName: string
  streetAdditional: string
  streetName: string
  streetNumber: string
  taxId: string
  zipCode: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/users',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBase(),
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${UserService.getToken()}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    addTenantUsers: builder.mutation<void, AddUser[]>({
      query: (body) => ({
        url: `/api/administration/user/owncompany/users`,
        method: 'POST',
        body,
      }),
    }),
    removeTenantUser: builder.mutation<void, string[]>({
      query: (body) => ({
        url: `/api/administration/user/owncompany/users`,
        method: 'DELETE',
        body,
      }),
    }),
    fetchUserRoles: builder.query<string[], void>({
      query: () => `/api/registration/rolesComposite`,
    }),
    fetchUsers: builder.query<PaginResult<TenantUser>, PaginFetchArgs>({
      query: (fetchArgs) =>
        `/api/administration/user/owncompany/users?status=ACTIVE&size=${PAGE_SIZE}&page=${fetchArgs.page}`,
    }),
    fetchUsersSearch: builder.query<PaginResult<TenantUser>, PaginFetchArgs>({
      query: (fetchArgs) =>
        `/api/administration/user/owncompany/users?status=ACTIVE&size=${PAGE_SIZE}&page=${
          fetchArgs.page
        }&email=${fetchArgs.args!.expr}`,
    }),
    fetchUserDetails: builder.query<TenantUserDetails, string>({
      query: (id) => `/api/administration/user/owncompany/users/${id}`,
    }),
    fetchOwnUserDetails: builder.query<TenantUserDetails, void>({
      query: () => `/api/administration/user/ownUser`,
    }),
    fetchOwnCompanyDetails: builder.query<CompanyDetails, void>({
      query: () => `/api/administration/companydata/ownCompanyDetails`,
    }),
    deleteMyUser: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/api/administration/user/ownUser/${id}`,
        method: 'DELETE',
      }),
    }),
    resetPassword: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/api/administration/user/ownCompany/users/${id}/resetPassword`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useFetchUserRolesQuery,
  useFetchUsersQuery,
  useFetchUsersSearchQuery,
  useFetchUserDetailsQuery,
  useFetchOwnUserDetailsQuery,
  useAddTenantUsersMutation,
  useRemoveTenantUserMutation,
  useFetchOwnCompanyDetailsQuery,
  useDeleteMyUserMutation,
  useResetPasswordMutation,
} = apiSlice

const name = 'admin/user/add'

export interface AddUserState {
  isSuccess: boolean
  isError: boolean
}

export const initialState: AddUserState = {
  isSuccess: false,
  isError: false,
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setAddUserSuccess: (state, action) => {
      state.isSuccess = action.payload
    },
    setAddUserError: (state, action) => {
      state.isError = action.payload
    },
  },
})

export const currentAddUserSuccess = (state: RootState): boolean => {
  return state.userAdd.isSuccess
}

export const currentAddUserError = (state: RootState): boolean =>
  state.userAdd.isError

export const { setAddUserSuccess, setAddUserError } = slice.actions
export default slice
