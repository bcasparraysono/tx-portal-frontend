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

import { Checkbox, Alert } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import {
  AppRole,
  useFetchCoreoffersRolesQuery,
} from 'features/admin/appuserApiSlice'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { rolesToAddSelector } from 'features/admin/userDeprecated/slice'
import { setRolesToAdd } from 'features/admin/userDeprecated/actions'
import { useEffect, useState } from 'react'

export const UserRoles = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const roles = useSelector(rolesToAddSelector)
  const { data } = useFetchCoreoffersRolesQuery()

  const [allRoles, setAllRoles] = useState<any>([])

  useEffect(() => {
    const rolesArr: AppRole[] = []
    data && data.map((a) => rolesArr.push(...a.roles))
    setAllRoles(rolesArr)
  }, [data])

  const selectRole = (role: string, select: boolean) => {
    const isSelected = roles.includes(role)
    if (!isSelected && select) {
      dispatch(setRolesToAdd([...roles, role]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      dispatch(setRolesToAdd([...oldRoles]))
    }
  }

  return (
    <Box
      sx={{
        '.checkbox-section': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        label: {
          fontSize: '16px',
        },
      }}
    >
      <div className="add-user-title">
        <SubHeaderTitle
          title={t('content.addUser.chooseUserRole')}
          variant="body1"
        />
      </div>

      {allRoles.length > 0 ? (
        <div className="checkbox-section">
          {allRoles.map((role: AppRole) => (
            <Checkbox
              checked={Array.isArray(roles) && roles.includes(role.role)}
              label={role.role}
              key={role.roleId}
              onChange={(e) => selectRole(role.role, e.target.checked)}
            />
          ))}
        </div>
      ) : (
        <Alert severity="info">
          <span>{t('content.addUserRight.noRolesFound')}</span>
        </Alert>
      )}
    </Box>
  )
}
