import { alpha, lighten, darken } from '@mui/material/styles'
import { themeColors, colors } from './theme-colors'

const components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#111633'
      }
    }
  },

  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(darken(themeColors.primaryAlt, 0.4), 0.2),

        '&.MuiBackdrop-invisible': {
          backgroundColor: 'transparent'
        }
      }
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        marginLeft: 8,
        marginRight: 8,
        fontWeight: 'bold'
      }
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      'html, body, #root': {
        width: '100%',
        height: '100%'
      },
      '#nprogress .bar': {
        background: colors.primary.main
      },
      '#nprogress .spinner-icon': {
        borderTopColor: colors.primary.main,
        borderLeftColor: colors.primary.main
      },
      '#nprogress .peg': {
        boxShadow:
          '0 0 10px ' + colors.primary.main + ', 0 0 5px' + colors.primary.main
      },
      ':root': {
        '--swiper-theme-color': colors.primary.main
      },
      code: {
        background: colors.info.lighter,
        color: colors.info.dark,
        borderRadius: 4,
        padding: 4
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1
        },
        '100%': {
          transform: 'scale(2.8)',
          opacity: 0
        }
      },
      '@keyframes float': {
        '0%': {
          transform: 'translate(0%, 0%)'
        },
        '100%': {
          transform: 'translate(3%, 3%)'
        }
      }
    }
  },
  MuiSelect: {
    styleOverrides: {
      iconOutlined: {
        color: colors.alpha.black[50]
      },
      icon: {
        top: 'calc(50% - 14px)'
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined': {
          paddingRight: 6
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.alpha.black[50]
        },
        '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.primary.main
        }
      }
    }
  },
  MuiListSubheader: {
    styleOverrides: {
      colorPrimary: {
        fontWeight: 'bold',
        lineHeight: '40px',
        fontSize: 13,
        background: colors.alpha.black[5],
        color: colors.alpha.black[70]
      }
    }
  },
  MuiCardHeader: {
    styleOverrides: {
      action: {
        marginTop: -5,
        marginBottom: -5
      },
      title: {
        fontSize: 15
      }
    }
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        borderRadius: '50px'
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      subtle: {
        border: 'solid 2px #dadada',
        background: 'transparent',
        fontFamily: 'Montserrat',
        fontSize: '14px',
        color: '#8b8b8b'
      },
      colorSecondary: {
        background: colors.alpha.black[5],
        color: colors.alpha.black[100],

        '&:hover': {
          background: colors.alpha.black[10]
        }
      },
      deleteIcon: {
        color: colors.error.light,

        '&:hover': {
          color: colors.error.main
        }
      }
    }
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: 'none',

        '&.Mui-expanded': {
          margin: 0
        },
        '&::before': {
          display: 'none'
        }
      }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontSize: 14,
        fontWeight: 'bold'
      },
      colorDefault: {
        background: colors.alpha.black[30],
        color: colors.alpha.white[100]
      }
    }
  },
  MuiAvatarGroup: {
    styleOverrides: {
      root: {
        alignItems: 'center'
      },
      avatar: {
        background: colors.alpha.black[10],
        fontSize: 13,
        color: colors.alpha.black[70],
        fontWeight: 'bold',

        '&:first-of-type': {
          border: 0,
          background: 'transparent'
        }
      }
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      alignItemsFlexStart: {
        marginTop: 0
      }
    }
  },
  MuiPaginationItem: {
    styleOverrides: {
      page: {
        fontSize: 13,
        fontWeight: 'bold',
        transition: 'all .2s'
      },
      textPrimary: {
        '&.Mui-selected': {
          boxShadow: colors.shadows.primary
        },
        '&.MuiButtonBase-root:hover': {
          background: colors.alpha.black[5]
        },
        '&.Mui-selected.MuiButtonBase-root:hover': {
          background: colors.primary.main
        }
      }
    }
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true
    },
    styleOverrides: {
      root: {
        fontWeight: 'bold',
        textTransform: 'none',
        paddingLeft: 16,
        paddingRight: 16,

        '.MuiSvgIcon-root': {
          transition: 'all .2s'
        }
      },
      endIcon: {
        marginRight: -8
      },
      containedSecondary: {
        backgroundColor: colors.secondary.main,
        color: colors.alpha.white[100],
        border: '1px solid ' + colors.alpha.black[30]
      },
      outlined: {
        '&.Mui-disabled': {
          border: `1px solid ${colors.alpha.black[50]}`
        }
      },
      outlinedLight: {
        background: colors.alpha.white[0],
        color: colors.alpha.white[80],
        border: `2px solid ${colors.alpha.white[80]}`,
        '&:hover, &.MuiSelected': {
          background: colors.alpha.white[10],
          color: colors.alpha.white[100],
          border: `2px solid ${colors.alpha.white[100]}`
        }
      },
      link: {
        background: 'transparent',
        border: 'none',
        padding: '5px',
        fontWeight: '500',
        '&:hover': {
          textDecoration: 'underline',
          color: 'inherit',
          background: 'transparent',
          border: 'none'
        }
      }
    }
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: false
    },
    styleOverrides: {
      root: {
        borderRadius: 6
      }
    }
  },
  MuiToggleButton: {
    defaultProps: {
      disableRipple: true
    },
    styleOverrides: {
      root: {
        color: colors.primary.main,
        background: colors.alpha.white[100],
        transition: 'all .2s',

        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
          color: colors.alpha.white[100],
          background: colors.primary.main
        }
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,

        '& .MuiTouchRipple-root': {
          borderRadius: 6
        }
      },
      sizeSmall: {
        padding: 4
      }
    }
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        margin: 0
      }
    }
  },

  MuiDialog: {
    styleOverrides: {
      container: {
        alignItems: 'flex-start'
      },
      root: {
        top: '5%'
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '1rem'
      }
    }
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        background: colors.alpha.black[10],
        border: 0,
        height: 1
      },
      vertical: {
        height: 'auto',
        width: 1,

        '&.MuiDivider-flexItem.MuiDivider-fullWidth': {
          height: 'auto'
        },
        '&.MuiDivider-absolute.MuiDivider-fullWidth': {
          height: '100%'
        }
      },
      withChildren: {
        '&:before, &:after': {
          border: 0
        }
      },
      wrapper: {
        background: colors.alpha.white[100],
        fontWeight: 'bold',
        height: 24,
        lineHeight: '24px',
        marginTop: -12,
        color: 'inherit',
        textTransform: 'uppercase'
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: 0
      },
      elevation0: {
        boxShadow: 'none'
      },
      elevation: {
        boxShadow: colors.shadows.card
      },
      elevation2: {
        boxShadow: colors.shadows.cardSm
      },
      elevation24: {
        boxShadow: colors.shadows.cardLg
      }
    }
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        height: 6
      }
    }
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        '& .MuiSlider-valueLabelCircle, .MuiSlider-valueLabelLabel': {
          transform: 'none'
        },
        '& .MuiSlider-valueLabel': {
          borderRadius: 6,
          background: colors.alpha.black[100],
          color: colors.alpha.white[100]
        }
      }
    }
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,

        '& .MuiListItem-button': {
          transition: 'all .2s',

          '& > .MuiSvgIcon-root': {
            minWidth: 34
          },

          '& .MuiTouchRipple-root': {
            opacity: 0.2
          }
        },
        '& .MuiListItem-root.MuiButtonBase-root.Mui-selected': {
          backgroundColor: colors.alpha.black[10]
        }
      },
      padding: {
        padding: '12px',

        '& .MuiListItem-button': {
          borderRadius: 6,
          margin: '1px 0'
        }
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        height: 38,
        minHeight: 38,
        overflow: 'visible'
      },
      indicator: {
        height: 38,
        minHeight: 38,
        borderRadius: 6,
        border: '1px solid ' + colors.primary.dark
      },
      scrollableX: {
        overflow: 'visible !important'
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        padding: 0,
        height: 38,
        minHeight: 38,
        borderRadius: 6,
        transition: 'color .2s',
        textTransform: 'capitalize',

        '&.MuiButtonBase-root': {
          minWidth: 'auto',
          paddingLeft: 20,
          paddingRight: 20,
          marginRight: 4
        },
        '&.Mui-selected, &.Mui-selected:hover': {
          color: colors.alpha.white[100],
          zIndex: 5
        },
        '&:hover': {
          color: colors.alpha.black[100]
        }
      }
    }
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        padding: 12
      },
      list: {
        padding: 12,

        '& .MuiMenuItem-root.MuiButtonBase-root': {
          fontSize: 14,
          marginTop: 1,
          marginBottom: 1,
          transition: 'all .2s',
          color: colors.alpha.black[70],
          display: 'flex',
          textAlign: 'left',

          '& .MuiTouchRipple-root': {
            opacity: 0.2
          },

          '&:hover, &:active, &.active, &.Mui-selected': {
            color: colors.alpha.black[100],
            background: lighten(colors.primary.lighter, 0.5)
          }
        }
      }
    }
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          color: colors.secondary.main,

          '&:hover, &:active, &.active, &.Mui-selected': {
            color: colors.alpha.black[100],
            background: lighten(colors.primary.lighter, 0.5)
          }
        }
      }
    }
  },
  MuiAutocomplete: {
    styleOverrides: {
      tag: {
        margin: 1
      },
      clearIndicator: {
        marginRight: '2px',
        '& svg': {
          height: '18px',
          width: '18px'
        }
      }
    }
  },
  MuiTablePagination: {
    styleOverrides: {
      toolbar: {
        '& .MuiIconButton-root': {
          padding: 8
        }
      },
      select: {
        '&:focus': {
          backgroundColor: 'transparent'
        }
      }
    }
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: '0 !important',
        padding: '0 !important'
      }
    }
  },
  MuiTableRow: {
    styleOverrides: {
      head: {
        background: colors.alpha.black[5]
      },
      root: {
        transition: 'background-color .2s',

        '&.MuiTableRow-hover:hover': {
          backgroundColor: lighten(colors.alpha.black[5], 0.5)
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottomColor: colors.alpha.black[10],
        fontSize: 14
      },
      head: {
        textTransform: 'uppercase',
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.alpha.black[70]
      }
    }
  },
  MuiAlert: {
    styleOverrides: {
      message: {
        lineHeight: 1.5,
        fontSize: 14
      },
      standardInfo: {
        color: colors.info.main
      },
      action: {
        color: colors.alpha.black[70]
      }
    }
  },
  MuiTimelineDot: {
    styleOverrides: {
      root: {
        margin: 0,
        zIndex: 5,
        position: 'absolute',
        top: '50%',
        marginTop: -6,
        left: -6
      },
      outlined: {
        backgroundColor: colors.alpha.white[100],
        boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
      },
      outlinedPrimary: {
        backgroundColor: colors.alpha.white[100],
        boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
      }
    }
  },
  MuiTimelineConnector: {
    styleOverrides: {
      root: {
        position: 'absolute',
        height: '100%',
        top: 0,
        borderRadius: 50,
        backgroundColor: colors.alpha.black[10]
      }
    }
  },
  MuiTimelineItem: {
    styleOverrides: {
      root: {
        minHeight: 0,
        padding: '8px 0',

        '&:before': {
          display: 'none'
        }
      },
      missingOppositeContent: {
        '&:before': {
          display: 'none'
        }
      }
    }
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: alpha(colors.alpha.black['100'], 0.95),
        padding: '8px 16px',
        fontSize: 13
      },
      arrow: {
        color: alpha(colors.alpha.black['100'], 0.95)
      }
    }
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        height: 33,
        overflow: 'visible',

        '& .MuiButtonBase-root': {
          position: 'absolute',
          padding: 6,
          transition:
            'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
        '& .MuiIconButton-root': {
          borderRadius: 100
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          opacity: 0.3
        }
      },
      thumb: {
        backgroundColor: colors.alpha.white[100],
        border: '1px solid ' + colors.alpha.black[30],
        boxShadow:
          '0px 9px 14px ' +
          colors.alpha.black[10] +
          ', 0px 2px 2px ' +
          colors.alpha.black[10]
      },
      track: {
        backgroundColor: colors.alpha.black[5],
        border: '1px solid ' + colors.alpha.black[10],
        boxShadow: 'inset 0px 1px 1px ' + colors.alpha.black[10],
        opacity: 1
      },
      colorPrimary: {
        '& .MuiSwitch-thumb': {
          backgroundColor: colors.alpha.white[100]
        },

        '&.Mui-checked .MuiSwitch-thumb': {
          backgroundColor: colors.primary.main
        }
      }
    }
  },
  MuiStepper: {
    styleOverrides: {
      root: {
        paddingTop: 20,
        paddingBottom: 20,
        background: colors.alpha.black[5]
      }
    }
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        '&.MuiStepIcon-completed': {
          color: colors.success.main
        }
      }
    }
  },
  MuiLink: {
    defaultProps: {
      color: 'inherit'
    }
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'div',
        h4: 'div',
        h5: 'div',
        h6: 'div',
        subtitle1: 'div',
        subtitle2: 'div',
        body1: 'div',
        body2: 'div'
      }
    },
    styleOverrides: {
      gutterBottom: {
        marginBottom: 4
      },
      paragraph: {
        fontSize: 17,
        lineHeight: 1.7
      }
    }
  }
}

export default components
