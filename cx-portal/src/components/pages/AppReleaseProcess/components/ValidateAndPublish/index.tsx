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
  Button,
  Card,
  Checkbox,
  IconButton,
  LanguageSwitch,
  LogoGrayData,
  PageNotifications,
  StaticTable,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Grid, Divider, Box, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  appStatusDataSelector,
  decrement,
  increment,
} from 'features/appManagement/slice'
import { useSubmitappMutation } from 'features/appManagement/apiSlice'
import i18next, { changeLanguage } from 'i18next'
import I18nService from 'services/I18nService'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function ValidateAndPublish({
  showSubmitPage,
}: {
  showSubmitPage: any
}) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [validatePublishNotification, setValidatePublishNotification] =
    useState(false)
  const [submitapp] = useSubmitappMutation()
  const appId = useSelector(appIdSelector)
  const appStatusData: any = useSelector(appStatusDataSelector)

  const defaultValues = {
    images: [LogoGrayData, LogoGrayData, LogoGrayData],
    connectedTableData: {
      head: ['Linked to your identity', 'Linked NOT to your identity'],
      body: [
        ['personal Information', 'Loreum personal Information'],
        ['Used Content', 'Loreum Used Content'],
        ['Catena-X Account Data', 'Loreum Catena-X Account Data'],
      ],
    },
    dataSecurityInformation:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    documentsDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    providerTableData: {
      head: ['App Provider', 'Homepage', 'E-Mail', 'Phone'],
      body: [
        [appStatusData.providerName],
        [appStatusData.providerUri],
        [appStatusData.contactEmail],
        [appStatusData.contactNumber],
      ],
    },
    cxTestRuns: [
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Test run A - done',
      },
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Test run B - done',
      },
    ],
  }

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onValidatePublishSubmit = async (data: any) => {
    try {
      await submitapp(appId).unwrap()
      dispatch(increment())
      showSubmitPage(true)
    } catch (error: any) {
      setValidatePublishNotification(true)
    }
  }

  const getAppData = (item: string) => {
    if (item === 'language')
      return appStatusData.supportedLanguageCodes.join(', ')
    else if (item === 'useCase') return appStatusData.useCase.join(', ')
    else if (item === 'price') return appStatusData.price
  }

  return (
    <div className="validate-and-publish">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.validateAndPublish.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 11 }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.validateAndPublish.headerDescription')}
          </Typography>
        </Grid>
      </Grid>

      <div className="header-description">
        <Grid container sx={{ mt: 0 }}>
          <Grid
            item
            className={'verify-app-release-card'}
            sx={{ ml: 0, mr: 0 }}
            md={4}
          >
            <Card
              image={{
                src: LogoGrayData,
              }}
              title={appStatusData.title}
              subtitle={appStatusData.provider}
              description={
                i18next.language === 'en'
                  ? appStatusData?.descriptions?.filter(
                      (lang: { languageCode: string }) =>
                        lang.languageCode === 'en'
                    )[0].shortDescription
                  : appStatusData?.descriptions?.filter(
                      (lang: { languageCode: string }) =>
                        lang.languageCode === 'de'
                    )[0].shortDescription
              }
              imageSize="normal"
              imageShape="square"
              variant="text-details"
              expandOnHover={false}
              filledBackground={true}
              buttonText={''}
            />
            <div style={{ margin: '35px auto -16px 65px' }}>
              <LanguageSwitch
                current={i18next.language}
                languages={I18nService.supportedLanguages.map((key) => ({
                  key,
                }))}
                onChange={changeLanguage}
              />
            </div>
          </Grid>

          <Grid item sx={{ paddingLeft: '71px', marginTop: '22%' }} md={8}>
            {['language', 'useCase', 'price'].map((item, i) => (
              <div style={{ display: 'flex', marginBottom: '5px' }} key={i}>
                <Typography variant="body2">
                  <b>{t(`content.apprelease.validateAndPublish.${item}`)}</b>
                  {getAppData(item)}
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.appDetails')}
        </Typography>
        {['longDescriptionEN', 'longDescriptionDE'].map((item, i) => (
          <div key={i}>
            {item === 'longDescriptionEN' ? (
              <Typography variant="body2" className="form-field">
                <span style={{ fontWeight: 'bold' }}>
                  [Long Description - EN]{' '}
                </span>
                {
                  appStatusData?.descriptions?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode === 'en'
                  )[0].longDescription
                }
              </Typography>
            ) : (
              <Typography variant="body2" className="form-field">
                <span style={{ fontWeight: 'bold' }}>
                  [Long Description - DE]{' '}
                </span>
                {
                  appStatusData?.descriptions?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode === 'de'
                  )[0].longDescription
                }
              </Typography>
            )}
          </div>
        ))}
        <div style={{ display: 'flex' }}>
          {defaultValues.images?.map((img, i) => (
            <Box sx={{ margin: '37px auto 0 auto' }} key={i}>
              <img
                src={img}
                alt={'images'}
                className="verify-validate-images"
              />
            </Box>
          ))}
        </div>

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.connectedData')}
        </Typography>
        <StaticTable
          data={defaultValues.connectedTableData}
          horizontal={false}
        />

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.dataSecurityInformation')}
        </Typography>
        <Typography variant="body2" className="form-field">
          {defaultValues.dataSecurityInformation}
        </Typography>

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.documents')}
        </Typography>
        <Typography variant="body2" className="form-field">
          {defaultValues.documentsDescription}
        </Typography>
        {appStatusData?.documents &&
          Object.keys(appStatusData.documents).map((item, i) => (
            <InputLabel sx={{ mb: 0, mt: 3 }} key={i}>
              <a href="/" style={{ display: 'flex' }}>
                <ArrowForwardIcon fontSize="small" />
                {appStatusData.documents[item][0].documentName}
              </a>
            </InputLabel>
          ))}

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.providerInformation')}
        </Typography>
        <StaticTable data={defaultValues.providerTableData} horizontal={true} />

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.consent')}
        </Typography>
        <div className="form-field">
          {appStatusData?.agreements?.map(
            (item: { name: string; consentStatus: string }, index: number) => (
              <div key={index}>
                <Checkbox
                  key={index}
                  label={item.name}
                  checked={item.consentStatus === 'ACTIVE'}
                  disabled
                />
              </div>
            )
          )}
        </div>

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('content.apprelease.validateAndPublish.cxTestRuns')}
        </Typography>
        <div className="form-field">
          {defaultValues.cxTestRuns?.map((item: any, index: number) => (
            <div key={index}>
              <Checkbox
                key={index}
                label={item.name}
                checked={item.consentStatus === 'ACTIVE'}
                disabled
              />
            </div>
          ))}
        </div>
      </div>

      <Box mb={2}>
        {validatePublishNotification && (
          <Grid container xs={12} sx={{ mb: 2 }}>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <PageNotifications
                title={t('content.apprelease.appReleaseForm.error.title')}
                description={t(
                  'content.apprelease.appReleaseForm.error.message'
                )}
                open
                severity="error"
                onCloseNotification={() =>
                  setValidatePublishNotification(false)
                }
              />
            </Grid>
          </Grid>
        )}

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          startIcon={<HelpOutlineIcon />}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton color="secondary" onClick={() => dispatch(decrement())}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          onClick={handleSubmit(onValidatePublishSubmit)}
          variant="contained"
          disabled={!isValid}
          sx={{ float: 'right' }}
        >
          {t('content.apprelease.footerButtons.submit')}
        </Button>
      </Box>
    </div>
  )
}
