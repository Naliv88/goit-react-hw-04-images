import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import getData from './Loader/loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import style from './App.module.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(() => 1);
  const [hits, setHits] = useState([]);
  const [modalImage, setModalImage] = useState('');

  const getImageList = async () => {
    try {
      setIsLoading(true);
      const images = await getData(searchInput, page);
      setHits(images.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = data => {
    if (data === searchInput) {
      return;
    }
    setPage(1);
    setHits([]);

    getImageList();
    setSearchInput(data);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setModalImage(null);
  };

  const openModal = imageUrl => {
    setIsCreateModalOpen(true);
    setModalImage(imageUrl);
  };

  useEffect(() => {
    const loadMore = async () => {
      setIsLoading(true);
      try {
        await getData(searchInput, page).then(data => {
          setHits([...hits, ...data.hits]);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMore();
  }, [page, searchInput]); //eslint-disable-line react-hooks/exhaustive-deps

  const onLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={onSubmit} />
      {hits && <ImageGallery images={hits} onClick={openModal} />}
      {hits !== null && !isLoading && searchInput !== '' && (
        <Button onClick={onLoadMoreClick} />
      )}
      {isLoading && (
        <ThreeDots
          color="#3f51b5"
          wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      )}
      {isCreateModalOpen && (
        <Modal largeImage={modalImage} onClose={closeModal} />
      )}
    </div>
  );
};

// export class App extends React.Component {
//   state = {
//     isLoading: false,
//     isCreateModalOpen: false,
//     searchInput: '',
//     page: 1,
//     hits: null,
//     modalImage: null,
//   };

//   componentDidMount() {
//     this.getImageList();

//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchInput !== this.state.searchInput) {
//       this.getImageList();
//       this.setState({ page: 1 });
//     }
//   }

//   getImageList = async () => {
//     const searchInput = this.state.searchInput;
//     const page = this.state.page;
//     try {
//       this.setState({ isLoading: true });
//       const images = await getData(searchInput, page);
//       this.setState({ hits: images.hits });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   onSubmit = data => {
//     if (data === this.state.searchInput) {
//       return;
//     }
//     this.setState({ page: 1 });
//     this.setState({ searchInput: data });
//   };

//   closeModal = () => {
//     this.setState({ isCreateModalOpen: false });
//     this.setState({ modalImage: null });
//   };

//   openModal = imageUrl => {
//     this.setState({ modalImage: imageUrl });
//     this.setState({ isCreateModalOpen: true });
//   };

//   loadMore = async () => {
//     this.setState({ isLoading: true });
//     await this.setState(prevState => ({ page: prevState.page + 1 }));
//     try {
//       await getData(this.state.searchInput, this.state.page).then(data => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...data.hits],
//           page: prevState.page + 1,
//         }));
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   render() {
//     const { hits, isLoading } = this.state;
//     return (
//       <div className={style.App}>
//         <Searchbar onSubmit={this.onSubmit} />
//         {this.state.hits && (
//           <ImageGallery images={this.state.hits} onClick={this.openModal} />
//         )}
//         {hits !== null && !isLoading && <Button onClick={this.loadMore} />}
//         {this.state.isLoading && <ThreeDots color="#3f51b5" wrapperStyle={{ marginLeft: "auto", marginRight: "auto"}} />}
//         {this.state.isCreateModalOpen && (
//           <Modal largeImage={this.state.modalImage} onClose={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }
