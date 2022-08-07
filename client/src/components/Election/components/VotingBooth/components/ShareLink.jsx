import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdContentCopy } from 'react-icons/md'
import { Button, Snackbar } from 'shared/components'
import { TextField } from 'shared/components/forms'

function ShareLink() {
  const { t } = useTranslation()
  const [copyMessageOpen, setCopyMessageOpen] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setCopyMessageOpen(true))
  }
  const copyButton = (
    <Button
      variant="icon-text"
      onClick={handleCopy}
    >
      <MdContentCopy />
    </Button>
  )
  return (
    <>
      <Snackbar
        isOpen={copyMessageOpen}
        onClose={() => setCopyMessageOpen(false)}
        severity="success"
      >
        {t('elections.session.share.copy_message')}
      </Snackbar>
      <h3>
        {t('elections.session.share.title')}
      </h3>
      <TextField
        variant="filled"
        size="small"
        fullWidth={false}
        value={window.location.href}
        endAdornment={copyButton}
        onClick={handleCopy}
        isDisabled
        className="small-height"
      />
    </>
  )
}

export default ShareLink
