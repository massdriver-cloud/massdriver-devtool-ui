export const generateHiddenUiSchemaFromPresetData = (presetData, schema) =>
  Boolean(presetData) && typeof presetData === 'object'
    ? Object.keys(presetData)?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: {
          ...(typeof presetData[cur] === 'object'
            ? generateHiddenUiSchemaFromPresetData(
              presetData[cur],
              schema?.properties?.[cur]?.type === 'object'
                ? schema?.properties?.[cur]
                : schema
            )
            : {
              'ui:widget': 'hidden'
            }),
          ...(typeof presetData[cur] === 'object' &&
          Object.keys(presetData[cur])?.length >=
            Object.keys(schema?.properties?.[cur]?.properties || [])?.length
            ? {
              'ui:widget': 'hidden'
            }
            : {})
        }
      }),
      {}
    )
    : {}
