import { useState } from 'react'

import FormSection from 'components/FormSection/FormSection'

const EnhancedFormSection = () => {
  const [formData, setFormData] = useState({})

  const updateFormData = formData => setFormData(formData)
  return (
    <FormSection
      formData={formData}
      updateFormData={updateFormData}
    />
  )
}

export default EnhancedFormSection
