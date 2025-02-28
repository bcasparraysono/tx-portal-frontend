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

import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay, exec } from 'features/control/overlay/actions'
import { ACTIONS } from 'types/Constants'
import { useFetchIDPDetailQuery } from 'features/admin/idpApiSlice'

export const EnableIDPSuccess = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)

  return (
    <Dialog open={true}>
      <DialogHeader
        title={t('content.idpmanagement.enableIdpSuccessHeadline')}
        intro={t('content.idpmanagement.enableIdpSuccessSubheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div>
          <Typography>
            {t(
              'Your new Identity Provider has been enabled and your user has been linked to it.'
            )}
          </Typography>
          <Typography>
            {t('Choose "Sign Out" and then log in again with the IDP named:')}
          </Typography>
        </div>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography variant="h5">{data?.displayName}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(exec(ACTIONS.SIGNOUT))}
        >
          {t('Sign Out')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
