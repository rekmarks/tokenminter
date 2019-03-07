
/**
 * Courtesy:
 * https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/album
 */

import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { getPath } from '../utils'

import GridCard from './common/GridCard'

import styles from './style/Dashboard.style'

// TODO: get rid of this and other placeholder assets
// eslint-disable-next-line
const defaultImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'

const mintLink = props => <Link to={getPath('/actions/mint/')} {...props} />
const testLink = props => <Link to={getPath('/')} {...props} />

class Dashboard extends Component {

  render () {

    const { classes } = this.props

    return (
      <Fragment>
        <CssBaseline />
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Welcome to the Future of Fundraising
              </Typography>
              <Typography
                variant="h6" align="center" color="textSecondary" paragraph
                style={{marginBottom: 0}}
              >
                Select an action below.
              </Typography>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {/* TODO: make all GridCards of uniform size (defined by internal CardMedia component) */}
              <GridCard
                classes={classes}
                link={mintLink}
                heading="Mint"
                description="Create a fundraising token."
                media={{
                  component: 'img',
                  image: getPath('/static/ETHEREUM-ICON_Black_small.png'),
                  title: 'Mint',
                }}
              />
              <GridCard
                classes={classes}
                link={testLink}
                heading="Test"
                description="Lorem ipsum."
                media={{
                  component: 'img',
                  image: defaultImage,
                  title: 'Lorem Ipsum',
                  height: 245,
                }}
              />
              <GridCard
                classes={classes}
                link={testLink}
                heading="Test"
                description="Lorem ipsum."
                media={{
                  component: 'img',
                  image: defaultImage,
                  title: 'Lorem Ipsum',
                  height: 245,
                }}
              />
            </Grid>
          </div>
        </main>
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard)
