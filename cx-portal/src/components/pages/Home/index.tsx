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

import SearchSection from './components/SearchSection'
import SearchResultSection from './components/SearchResultSection'
import NewsSection from './components/NewsSection'
import BusinessApplicationsSection from './components/BusinessApplicationsSection'
import StageSection from './components/StageSection'
import AppStoreSection from './components/AppStoreSection'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Home.scss'

export default function Home() {
  return (
    <main className="home">
      <StageSection />
      <SearchSection />
      <SearchResultSection />
      <NewsSection />
      <BusinessApplicationsSection />
      <AppStoreSection />
    </main>
  )
}
