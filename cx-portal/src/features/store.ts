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

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userSliceDep from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import twinsSlice from './digitalTwins/slice'
import connectorSlice from './connector/slice'
import notificationSliceDep from './notification/slice'
import ErrorSlice from './error/slice'
import { reducer as admin } from './admin/reducer'
import managementSlice from './appManagement/slice'
import serviceMarketplaceSlice from './serviceMarketplace/slice'
import userAddSlice from './admin/userApiSlice'
import userRoleSlice from './admin/appuserApiSlice'
import { reducer as apps } from './apps/reducer'
import { reducer as control } from './control/reducer'
import { reducer as info } from './info/reducer'
import modelsSlice from './semanticModels/slice'
import { apiSlice as idpSlice } from './admin/idpApiSlice'
import { apiSlice as userSlice } from './admin/userApiSlice'
import { apiSlice as serviceSlice } from './admin/serviceApiSlice'
import { apiSlice as notificationSlice } from './notification/apiSlice'
import { apiSlice as appRolesSlice } from './admin/appuserApiSlice'
import { apiSlice as appMarketplaceSlice } from './apps/apiSlice'
import { apiSlice as appMarketplaceSliceTest } from './apps/apiSliceTest'
import { apiSlice as appManagementSlice } from './appManagement/apiSlice'
import { apiSlice as serviceMarketplaceApiSlice } from './serviceMarketplace/serviceApiSlice'
import { apiSlice as inviteApiSlice } from './admin/inviteApiSlice'
import { apiSlice as applicationRequestApiSlice } from './admin/applicationRequestApiSlice'
import { apiSlice as partnerNetworkApiSlice } from './newPartnerNetwork/partnerNetworkApiSlice'
import { apiSlice as partnerNetworkPortalApiSlice } from './newPartnerNetwork/partnerNetworkPortalApiSlice'
import { apiSlice as connectorApiSlice } from './connector/connectorApiSlice'

export const reducers = {
  admin,
  apps,
  control,
  info,
  management: managementSlice.reducer,
  serviceMarketplace: serviceMarketplaceSlice.reducer,
  userAdd: userAddSlice.reducer,
  userRole: userRoleSlice.reducer,
  semanticModels: modelsSlice.reducer,
  user: userSliceDep,
  twins: twinsSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  connector: connectorSlice.reducer,
  notification: notificationSliceDep.reducer,
  error: ErrorSlice.reducer,
  [idpSlice.reducerPath]: idpSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [serviceSlice.reducerPath]: serviceSlice.reducer,
  [notificationSlice.reducerPath]: notificationSlice.reducer,
  [appRolesSlice.reducerPath]: appRolesSlice.reducer,
  [appMarketplaceSlice.reducerPath]: appMarketplaceSlice.reducer,
  [appMarketplaceSliceTest.reducerPath]: appMarketplaceSliceTest.reducer,
  [appManagementSlice.reducerPath]: appManagementSlice.reducer,
  [serviceMarketplaceApiSlice.reducerPath]: serviceMarketplaceApiSlice.reducer,
  [inviteApiSlice.reducerPath]: inviteApiSlice.reducer,
  [applicationRequestApiSlice.reducerPath]: applicationRequestApiSlice.reducer,
  [partnerNetworkApiSlice.reducerPath]: partnerNetworkApiSlice.reducer,
  [partnerNetworkPortalApiSlice.reducerPath]:
    partnerNetworkPortalApiSlice.reducer,
  [connectorApiSlice.reducerPath]: connectorApiSlice.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(idpSlice.middleware)
      .concat(userSlice.middleware)
      .concat(serviceSlice.middleware)
      .concat(notificationSlice.middleware)
      .concat(appRolesSlice.middleware)
      .concat(appMarketplaceSlice.middleware)
      .concat(appMarketplaceSliceTest.middleware)
      .concat(appManagementSlice.middleware)
      .concat(serviceMarketplaceApiSlice.middleware)
      .concat(inviteApiSlice.middleware)
      .concat(applicationRequestApiSlice.middleware)
      .concat(partnerNetworkApiSlice.middleware)
      .concat(partnerNetworkPortalApiSlice.middleware)
      .concat(connectorApiSlice.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
