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
import i18next from 'i18next'
import { apiBaseQuery } from 'utils/rtkUtil'
import { PAGE_SIZE } from 'types/Constants'

export type SubscriptionRequest = {
  offerId: string
  offerName: string
  status: string
}

export type SubscriptionData = {
  offerSubscriptionId: string
  offerSubscriptionStatus: string
}

export type ServiceRequest = {
  id: string
  title: string
  provider: string
  leadPictureUri: string
  contactEmail: string
  description: string
  price: string
  website: string
  phone: string
  offerSubscriptionDetailData: Array<SubscriptionData>
}

export type PaginationData = {
  contentSize: number
  page: number
  totalElements: number
  totalPages: number
}

export type ServiceRequestAPIResponse = {
  content: Array<ServiceRequest>
  meta: PaginationData
}

export type AgreementRequest = {
  agreementId: string
  name: string
}

export interface SubscriptionRequestBody {
  agreementId: string
  consentStatusId: string
}

export type SubscriptionServiceRequest = {
  serviceId: string
  body: SubscriptionRequestBody[]
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/service',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchServices: builder.query<ServiceRequestAPIResponse, number>({
      query: (page) => `/api/services/active?size=${PAGE_SIZE}&page=${page}`,
    }),
    fetchService: builder.query<ServiceRequest, string>({
      query: (serviceId) =>
        `/api/services/${serviceId}?lang=${i18next.language}`,
    }),
    addSubscribeService: builder.mutation<void, SubscriptionServiceRequest>({
      query: (data: SubscriptionServiceRequest) => ({
        url: `/api/services/${data.serviceId}/subscribe`,
        method: 'POST',
        body: data.body,
      }),
    }),
    fetchSubscription: builder.query<SubscriptionRequest, string>({
      query: (subscriptionId) => `/api/services/subscription/${subscriptionId}`,
    }),
    fetchAgreements: builder.query<AgreementRequest[], string>({
      query: (serviceId) => `/api/services/serviceAgreementData/${serviceId}`,
    }),
  }),
})

export const {
  useFetchServicesQuery,
  useFetchServiceQuery,
  useAddSubscribeServiceMutation,
  useFetchSubscriptionQuery,
  useFetchAgreementsQuery,
} = apiSlice
