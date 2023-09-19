export const formatErrors = (data, error) => data?.errors ? ({
  messages: data?.errors?.map(error => error.message)
})
  : error ? ({
    messages: [
      error.toString()
    ]
  }) : undefined 
