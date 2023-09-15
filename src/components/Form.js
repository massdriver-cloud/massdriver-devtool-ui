import Form from '@massdriver/forms'
import { createServices } from './Form.helpers'
import { useAuth } from '../contexts/authContext'

const CustomForm = props => {
  const { organizationId, serviceAccountId } = useAuth()

  const services = createServices({ organizationId, serviceAccountId })

  return (
    <Form
      services={services}
      {...props}
    />
  )
}

export default CustomForm
