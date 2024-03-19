const FALLBACK_DATA = [
  {
    name: 'GP_Standard_D2ds_v4',
    size: 'D2ds',
    iops: '3200',
    vCpus: '2',
    memoryGB: '8'
  },
  {
    name: 'GP_Standard_D4ds_v4',
    size: 'D4ds',
    iops: '6400',
    vCpus: '4',
    memoryGB: '16'
  },
  {
    name: 'GP_Standard_D8ds_v4',
    size: 'D8ds',
    iops: '12800',
    vCpus: '8',
    memoryGB: '32'
  },
  {
    name: 'GP_Standard_D16ds_v4',
    size: 'D16ds',
    iops: '18000',
    vCpus: '16',
    memoryGB: '64'
  },
  {
    name: 'GP_Standard_D32ds_v4',
    size: 'D32ds',
    iops: '18000',
    vCpus: '32',
    memoryGB: '128'
  },
  {
    name: 'GP_Standard_D48ds_v4',
    size: 'D48ds',
    iops: '18000',
    vCpus: '48',
    memoryGB: '192'
  },
  {
    name: 'GP_Standard_D64ds_v4',
    size: 'D64ds',
    iops: '18000',
    vCpus: '64',
    memoryGB: '256'
  },
  {
    name: 'MO_Standard_E2ds_v4',
    size: 'E2ds',
    iops: '3200',
    vCpus: '2',
    memoryGB: '16'
  },
  {
    name: 'MO_Standard_E4ds_v4',
    size: 'E4ds',
    iops: '6400',
    vCpus: '4',
    memoryGB: '32'
  },
  {
    name: 'MO_Standard_E8ds_v4',
    size: 'E8ds',
    iops: '12800',
    vCpus: '8',
    memoryGB: '64'
  },
  {
    name: 'MO_Standard_E16ds_v4',
    size: 'E16ds',
    iops: '18000',
    vCpus: '16',
    memoryGB: '128'
  },
  {
    name: 'MO_Standard_E32ds_v4',
    size: 'E32ds',
    iops: '18000',
    vCpus: '32',
    memoryGB: '256'
  },
  {
    name: 'MO_Standard_E48ds_v4',
    size: 'E48ds',
    iops: '18000',
    vCpus: '48',
    memoryGB: '384'
  },
  {
    name: 'MO_Standard_E64ds_v4',
    size: 'E64ds',
    iops: '18000',
    vCpus: '64',
    memoryGB: '432'
  }
]

const useGetInstanceTypes = () => {

  return {
    data: FALLBACK_DATA,
    loading: false,
    error: false
  }
}

export default useGetInstanceTypes
