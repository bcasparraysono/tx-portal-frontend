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
  TransitionChip,
  CircleProgress,
} from 'cx-portal-shared-components'
import { GridColDef } from '@mui/x-data-grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import dayjs from 'dayjs'
import uniqueId from 'lodash/uniqueId'
import { useState } from 'react'
import { ApplicationRequest } from 'features/admin/applicationRequestApiSlice'
import EditIcon from '@mui/icons-material/Edit'
import './RegistrationRequests.scss'

// Columns definitions of Registration Request page Data Grid
export const RegistrationRequestsTableColumns = (
  translationHook: any,
  onApproveClick: (id: string) => void,
  onDeclineClick: (id: string) => void,
  isLoading: boolean,
  handleDownloadDocument: (documentId: string, documentType: string) => void,
  showConfirmOverlay?: (applicationId: string) => void
): Array<GridColDef> => {
  const { t } = translationHook()
  const [selectedRowId, setSelectedRowId] = useState<string>('')

  return [
    {
      field: 'dateCreated',
      headerName: t('content.admin.registration-requests.columns.date'),
      flex: 1.5,
      valueGetter: ({ row }: { row: ApplicationRequest }) =>
        dayjs(row.dateCreated).format('YYYY-MM-DD'),
    },

    {
      field: 'companyInfo',
      headerName: t('content.admin.registration-requests.columns.companyinfo'),
      flex: 2.5,
      sortable: false,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div>
          <p style={{ margin: '3px 0' }}>{row.companyName}</p>
          <p style={{ margin: '3px 0' }}>{row.email}</p>
          <div className="bpn-edit-flex">
            <span
              style={{
                marginRight: '30px',
              }}
            >
              {row.bpn}
            </span>
            {row.applicationStatus === 'SUBMITTED' && !row.bpn && (
              <span
                style={{
                  paddingTop: '2px',
                }}
                onClick={() =>
                  showConfirmOverlay && showConfirmOverlay(row.applicationId)
                }
              >
                <EditIcon sx={{ color: '#d1d1d1', cursor: 'pointer' }} />
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      field: 'documents',
      headerName: t('content.admin.registration-requests.columns.documents'),
      flex: 2,
      sortable: false,
      cellClassName: 'documents-column--cell',
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div className="document-cell-container">
          {row.documents.map((contract) => (
            <div
              className="document-cell-line"
              key={uniqueId(contract?.documentId)}
            >
              <ArticleOutlinedIcon />
              <button
                className="document-button-link"
                onClick={() =>
                  handleDownloadDocument(
                    contract.documentId,
                    contract.documentType
                  )
                }
              >
                {contract?.documentType}
              </button>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'detail',
      headerName: t('content.admin.registration-requests.columns.details'),
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: () => (
        <IconButton
          color="secondary"
          size="small"
          style={{ alignSelf: 'center' }}
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
    {
      field: 'status',
      headerName: t('content.admin.registration-requests.columns.state'),
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      sortable: false,
      renderCell: ({ row }: { row: ApplicationRequest }) => {
        if (row.applicationStatus === 'SUBMITTED')
          return (
            <div className="state-cell-container">
              {selectedRowId === row.applicationId && isLoading ? (
                <CircleProgress
                  size={40}
                  step={1}
                  interval={0.1}
                  colorVariant={'primary'}
                  variant={'indeterminate'}
                  thickness={8}
                />
              ) : (
                <>
                  <TransitionChip
                    {...{
                      color: 'secondary',
                      variant: 'filled',
                      label: t(
                        'content.admin.registration-requests.buttondecline'
                      ),
                      type: 'decline',
                      onClick: () => {
                        setSelectedRowId(row.applicationId)
                        onDeclineClick(row.applicationId)
                      },
                      withIcon: true,
                      disabled: row.bpn ? false : true,
                    }}
                  />

                  <TransitionChip
                    {...{
                      color: 'secondary',
                      variant: 'filled',
                      label: t(
                        'content.admin.registration-requests.buttonconfirm'
                      ),
                      type: 'confirm',
                      onClick: () => {
                        setSelectedRowId(row.applicationId)
                        onApproveClick(row.applicationId)
                      },
                      withIcon: true,
                      disabled: row.bpn ? false : true,
                    }}
                  />
                </>
              )}
            </div>
          )
        else
          return (
            <div className="state-cell-container">
              <StatusTag
                color={
                  row.applicationStatus === 'CONFIRMED'
                    ? 'confirmed'
                    : 'declined'
                }
                label={t(
                  `content.admin.registration-requests.cell${row.applicationStatus.toLowerCase()}`
                )}
              />
            </div>
          )
      },
    },
  ]
}
