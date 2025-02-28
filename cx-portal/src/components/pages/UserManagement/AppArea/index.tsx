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

import { Card, CardItems, Carousel } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import uniqueId from 'lodash/uniqueId'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import {
  useFetchActiveAppsQuery,
  useFetchSubscriptionStatusQuery,
} from 'features/apps/apiSlice'
import { filterSubscribed } from 'features/apps/mapper'

export const AppArea = () => {
  const navigate = useNavigate()
  const subscriptionStatus = useFetchSubscriptionStatusQuery().data
  const { data } = useFetchActiveAppsQuery()
  const cards = filterSubscribed(data!, subscriptionStatus!)

  return (
    <section id="access-management-id">
      <div className="app-user-details-header-title">
        <SubHeaderTitle
          title="content.usermanagement.apparea.headline"
          variant="h3"
        />
      </div>
      <Carousel gapToDots={5}>
        {cards?.map((item: CardItems) => {
          return (
            <Card
              {...item}
              key={uniqueId(item.title)}
              buttonText="Details"
              imageSize="small"
              imageShape="round"
              variant="minimal"
              expandOnHover={false}
              filledBackground={true}
              onClick={() => {
                navigate(`/appusermanagement/${item.id}`)
              }}
            />
          )
        })}
      </Carousel>
    </section>
  )
}
