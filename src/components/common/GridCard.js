
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
// import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { CardActionArea } from '@material-ui/core'

export default class GridCard extends Component {

  render () {

    const { classes } = this.props

    return (
      <Grid item key={this.props.key || null} sm={6} md={4} lg={3}>
          <CardActionArea component={this.props.link || null}>
        <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              {...this.props.media}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.heading}
              </Typography>
              <Typography>
                {this.props.description}
              </Typography>
            </CardContent>
            {/* <CardActions> // TODO: Delete or add props for these
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions> */}
            {
              this.props.cardActions || null
            }
        </Card>
          </CardActionArea>
      </Grid>
    )
  }
}

GridCard.propTypes = {
  classes: PropTypes.object,
  key: PropTypes.string,
  component: PropTypes.object,
  media: PropTypes.object,
  link: PropTypes.func,
  cardActions: PropTypes.object,
  heading: PropTypes.string,
  description: PropTypes.string,
}
