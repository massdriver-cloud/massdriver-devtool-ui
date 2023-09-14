import createForm from '@massdriver/forms'
import { createServices } from './Form.helpers'
import { useAuth } from '../contexts/authContext'

const Form = props => {
  const { organizationId, serviceAccountId } = useAuth()

  const services = createServices({ organizationId, serviceAccountId })

  const GeneratedForm = createForm({ services })

  return (
    <GeneratedForm
      {...props}
    />
  )
}

export default Form
