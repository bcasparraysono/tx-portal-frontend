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
import { closeOverlay } from 'features/control/overlay/actions'
import {
  useEnableIDPMutation,
  useFetchIDPDetailQuery,
} from 'features/admin/idpApiSlice'
import { updateData, UPDATES } from 'features/control/updatesSlice'

export const DisableIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const [enableIDP] = useEnableIDPMutation()

  const doDisable = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      await enableIDP({ id: id, enabled: false })
      dispatch(updateData(UPDATES.IDP_LIST))
      dispatch(closeOverlay())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={true}>
      <DialogHeader
        title={t('content.idpmanagement.disableIdpHeadline', {
          idp: data?.displayName,
        })}
        intro={t('content.idpmanagement.disableIdpSubheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography>
            {t('When you disable your Identity Provider you and other people')}
          </Typography>
          <Typography>
            {t("of your company won't be able to login through this IDP.")}
          </Typography>
        </div>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography variant="h5">{data?.displayName}</Typography>
        </div>
        <div style={{ margin: '20px', width: '100%', textAlign: 'center' }}>
          <Typography>{t('Are you sure you want to proceed?')}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={doDisable}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
