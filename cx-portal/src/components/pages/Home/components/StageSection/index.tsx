import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PageService from 'services/PageService'
import { label as BusinessApplictions } from '../BusinessApplicationsSection'

export default function SearchSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const appendParams = () => {
    navigate({
      search: '?sort=date&order=newest',
    })
  }

  return (
    <div className="stage-home stage-section">
      <div className="stage-content">
        <Typography variant="h2">{t('content.home.stage.title')}</Typography>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h2">
          <Trans i18nKey="content.home.stage.subtitle">
            The gateway to <br /> a Digital Economy
          </Trans>
        </Typography>
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => PageService.scrollTo(BusinessApplictions)}
        >
          {t('content.home.stage.appButton')}
        </Button>
        <Button sx={{ margin: '40px 10px 0 0' }} onClick={appendParams}>
          {'test'}
        </Button>
      </div>
      <div className="stage-background">
        <div className="image-wrapper image-ratio-parent">
          <img
            src="./home-stage-desktop.png"
            alt="home stage"
            className="object-fit x-left-40"
          />
        </div>
      </div>
    </div>
  )
}
