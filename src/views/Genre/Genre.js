import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";

// Redux Helpers
import { connect } from "react-redux";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  IconButton,
  CircularProgress,
  // Grid,
  // GridList,
  Typography
} from "@material-ui/core";

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Shared services
// import { getProducts } from "../../data/Products";
import { getGenres } from "../../redux/actions/genreDbAction";

// Custom components
import {
  ArrowIconButton,
  // BookCardGrid,
  BookToolbar,
  GenreCardBar
} from "../../components";

// React Slick Dependancies
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Component styles
import styles from "./styles";

class Genre extends Component {
  signal = true;

  // state = {
  //   isLoading: false,
  //   limit: 6,
  //   products: [],
  //   productsTotal: 0,
  //   loading: false,
  //   genre: [],
  //   error: ""
  // };

  componentDidMount() {
    this.signal = true;
    // const { limit } = this.state;
    this.props.getGenres();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderGenres() {
    const { classes, genre, loading, error } = this.props;

    const sliderSettings = {
      infinite: true,
      speed: 300,
      slidesToShow: 9,
      slidesToScroll: 3,
      initialSlide: 0,
      nextArrow: <ArrowIconButton isPrev={false} />,
      prevArrow: <ArrowIconButton isPrev={true} />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 2,
            infinite: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <div className={classes.progressWrapper}>{error}</div>;
    }

    if (genre.length === 0) {
      return (
        <Typography className={classes.noResults} variant="h4">
          There are no genres available
        </Typography>
      );
    }

    return (
      <Slider {...sliderSettings}>
        {genre.map(item => (
          <Link key={item.id} className={classes.link} to="#">
            <GenreCardBar genre={item} />
          </Link>
        ))}
      </Slider>
    );
  }

  // renderProducts() {
  //   const { classes } = this.props;
  //   const { isLoading, products } = this.state;
  //
  //   if (isLoading) {
  //     return (
  //       <div className={classes.progressWrapper}>
  //         <CircularProgress />
  //       </div>
  //     );
  //   }
  //
  //   if (products.length === 0) {
  //     return (
  //       <Typography variant="h6">There are no products available</Typography>
  //     );
  //   }
  //
  //   return (
  //     <Grid container spacing={3}>
  //       {products.map(product => (
  //         <Grid item key={product.id} lg={4} md={6} xs={12}>
  //           <Link className={classes.link} to="#">
  //             <BookCardGrid product={product} />
  //           </Link>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   );
  // }

  render() {
    const { error, classes } = this.props;

    return (
      <CoreLayout title="Genre">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error.message || ""}</Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <BookToolbar />
            <div className={classes.content}>{this.renderGenres()}</div>
            <div className={classes.pagination}>
              <Typography variant="caption">1-6 of 20</Typography>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        )}
      </CoreLayout>
    );
  }
}

Genre.propTypes = {
  classes: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired,
  genre: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

const mapStateToProps = state => {
  return {
    genre: state.genre.data,
    loading: state.genre.dataLoading,
    error: state.genre.error
  };
};

const mapDispatchToProps = {
  getGenres
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Genre));
