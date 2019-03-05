
/**
 * Courtesy:
 * https://github.com/mui-org/material-ui/tree/master/docs/src/pages/page-layout-examples/dashboard
 */

export default theme => ({
  appBar: {
    zIndex: 9999,
  },
  largeIcon: {
    height: 42,
    width: 42,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  listItemText: {
    paddingLeft: 0,
    noWrap: true,
  },
})
