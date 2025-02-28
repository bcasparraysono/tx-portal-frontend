/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { BusinessPartner } from 'features/newPartnerNetwork/types'
import { Box } from '@mui/material'
import smallLogo from '../../../../../assets/logo/cx-logo-short.svg'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay/actions'
import { useDispatch } from 'react-redux'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksBPNTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()
  const dispatch = useDispatch()

  return [
    {
      field: 'names',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) =>
        row.names ? row.names[0].value : null,
    },
    {
      field: 'bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) => row.bpn,
    },
    {
      field: 'cxmember', // Temporary field, doesnt exists yet
      headerName: t('content.partnernetwork.columns.cxparticipant'),
      flex: 1.5,
      sortable: false,
      renderCell: (params) =>
        params && params.row && params.row.member ? (
          <Box
            component="img"
            padding=".5rem"
            src={smallLogo}
            alt="membershipFlag"
            sx={{
              width: 40,
            }}
          />
        ) : (
          ''
        ),
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1.5,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) =>
        row ? row.legalAddress?.country?.name : '',
    },
    {
      field: 'detail',
      headerName: `Detail`,
      headerAlign: 'center',
      flex: 0.8,
      align: 'center',
      renderCell: (params) =>
        params && params.row && params.row.bpn ? (
          <IconButton
            color="secondary"
            size="small"
            style={{ alignSelf: 'center' }}
            onClick={() => dispatch(show(OVERLAYS.PARTNER, params.row.bpn))}
          >
            <ArrowForwardIcon />
          </IconButton>
        ) : (
          <></>
        ),
    },
  ]
}
