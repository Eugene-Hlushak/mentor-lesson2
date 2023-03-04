import { Component } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    search: '',
    page: 1,
    photos: [],
    error: null,
    isVisible: false,
    isLoad: false,
    empty: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.getPhotos(this.state.search, this.state.page);
    }
  }

  getPhotos = async (search, page) => {
    if (!search) return;
    this.setState({ isLoad: true });
    try {
      const {
        photos,
        total_results,
        page: currentPage,
        per_page,
      } = await ImageService.getImages(search, page);
      if (photos.length === 0) {
        this.setState({ empty: true });
      }
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
        isVisible: currentPage < Math.ceil(total_results / per_page),
      }));
      console.log(currentPage < Math.ceil(total_results / per_page));
    } catch (error) {
      this.setState({ error: error });
    } finally {
      this.setState({ isLoad: false });
    }
  };

  showMorePhotos = () => this.setState(prev => ({ page: prev.page + 1 }));

  handleSubmit = value =>
    this.setState({
      search: value,
      page: 1,
      photos: [],
      error: null,
      isVisible: false,
      empty: false,
    });

  render() {
    const { error, photos, isVisible, isLoad, empty } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {isVisible && (
          <Button onClick={this.showMorePhotos}>
            {isLoad ? 'Loading...' : 'Load more'}
          </Button>
        )}
        {error && (
          <Text textAlign="center">Sorry. Something goes wrong 😭</Text>
        )}
        {empty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
