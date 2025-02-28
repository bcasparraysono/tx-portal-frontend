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

import { useState } from 'react'
import { IdentityProviderUser } from 'features/admin/idpApiSlice'
import { ValidatingInput } from '../CXValidatingOverlay/ValidatingForm'
import { isCompanyName } from 'types/Patterns'
import { IHashMap } from 'types/MainTypes'

const EnableIDPForm = ({
  onChange,
}: {
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  return (
    <>
      <div style={{ margin: '20px 0' }}>
        <ValidatingInput
          name="userId"
          label="Your existing user ID on target IDP"
          validate={isCompanyName}
          onValid={onChange}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <ValidatingInput
          name="userName"
          label="Your existing user name on target IDP"
          validate={isCompanyName}
          onValid={onChange}
        />
      </div>
    </>
  )
}

export const EnableIDPContent = ({
  onValid,
}: {
  onValid: (form: IdentityProviderUser | undefined) => void
}) => {
  const [formData, setFormData] = useState<IHashMap<string>>({})

  const checkData = (key: string, value: string | undefined): boolean => {
    if (!value) {
      onValid(undefined)
      return false
    }
    const current: IHashMap<string> = { ...formData }
    current[key] = value
    setFormData(current)
    const formValid = !!current.userName && !!current.userId
    onValid(
      formValid
        ? {
            companyUserId: '',
            identityProviderId: '',
            userId: current.userId,
            userName: current.userName,
          }
        : undefined
    )
    return true
  }

  return (
    <>
      <EnableIDPForm onChange={checkData} />
    </>
  )
}
