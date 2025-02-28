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

import { useEffect } from 'react'
import { SubNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const StageSubNavigation = () => {
  const { t } = useTranslation()
  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    const top = element?.offsetTop
    window.scrollTo({
      top: top,
      behavior: 'smooth',
    })
  }
  const navigate = useNavigate()

  useEffect(() => {
    const windowUrl = window.location.href
    if (windowUrl.indexOf('#identity') > 1) {
      scrollToId('identity-management-id')
    }
  }, [])

  return (
    <SubNavigation
      buttonLabel={t('navigation.subNavigation.buttonLabel')}
      onButtonClick={() => navigate('/technicaluser')}
      link1Label={t('navigation.subNavigation.link1Label')}
      onLink1Click={() => scrollToId('access-management-id')}
      link2Label={t('navigation.subNavigation.link2Label')}
      onLink2Click={() => scrollToId('identity-management-id')}
    />
  )
}
