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

import {
  IconButton,
  StatusTag,
  PageLoadingTable,
  PaginFetchArgs,
} from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { TenantUser } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import './style.scss'
import { useEffect, useState } from 'react'
import { setSearchInput } from 'features/appManagement/actions'
import { appManagementSelector } from 'features/appManagement/slice'

export const UserList = ({
  sectionTitle,
  addButtonLabel,
  addButtonClick,
  tableLabel,
  onDetailsClick,
  fetchHook,
  fetchHookArgs,
  onSearch,
  searchExpr,
}: {
  sectionTitle: string
  addButtonLabel: string
  addButtonClick: () => void
  tableLabel: string
  onDetailsClick: (row: TenantUser) => void
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  onSearch?: (search: string) => void
  searchExpr?: string
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(appManagementSelector)

  const validateSearchText = (expr: string) => {
    const validateExpr = /^[ A-Za-z0-9._!@-]*$/.test(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  useEffect(() => {
    setRefresh(Date.now())
  }, [fetchHookArgs.userRoleResponse, fetchHookArgs.addUserResponse])

  return (
    <section id="identity-management-id" className="user-management-section">
      <SubHeaderTitle title={t(sectionTitle)} variant="h3" />
      <PageLoadingTable<TenantUser>
        onButtonClick={addButtonClick}
        buttonLabel={t(addButtonLabel)}
        toolbarVariant="premium"
        searchPlaceholder={t('global.table.search')}
        columnHeadersBackgroundColor={'#FFFFFF'}
        searchInputData={searchInputData}
        searchExpr={searchExpr}
        onSearch={(expr: string) => {
          if (!onSearch || !validateSearchText(expr)) return
          setRefresh(Date.now())
          onSearch(expr)
        }}
        searchDebounce={1000}
        noRowsMsg={t('content.usermanagement.appUserDetails.table.noRowsMsg')}
        title={t(tableLabel)}
        loadLabel={t('global.actions.more')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.companyUserId}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.name'),
            flex: 3,
            valueGetter: ({ row }: { row: TenantUser }) =>
              `${row.firstName} ${row.lastName}`,
          },
          { field: 'email', headerName: t('global.field.email'), flex: 3 },
          {
            field: 'status',
            headerName: t('global.field.status'),
            flex: 3,
            renderCell: ({ value: status }) => {
              return (
                <StatusTag color="label" label={t(`global.field.${status}`)} />
              )
            },
          },
          {
            field: 'roles',
            headerName: t('global.field.role'),
            flex: 4,
            renderCell: ({ value: roles }) =>
              roles.length
                ? roles.map((role: string) => (
                    <StatusTag
                      key={role}
                      color="label"
                      label={role}
                      className="statusTag"
                    />
                  ))
                : '',
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 2,
            renderCell: ({ row }: { row: TenantUser }) => (
              <IconButton color="secondary" onClick={() => onDetailsClick(row)}>
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
        disableColumnMenu
      />
    </section>
  )
}
