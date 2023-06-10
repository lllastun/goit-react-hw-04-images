import SearchBar from '../Searchbar/Searchbar';
import { toast } from 'react-toastify';
import { getImages } from 'services/pixabayAPI';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

export function ImageFinder() {
  const STATUS = {
    idle: 'loading',
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected',
  };
  //
  const [initialized, setInitialized] = useState(false);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [bigImage, setBigImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [totalImg, setTotalImg] = useState(0);

  useEffect(() => {
    if (initialized & (query !== '')) {
      const prevQuery = localStorage.getItem('prevQuery');
      const prevPage = localStorage.getItem('prevPage');
      if (prevQuery !== query || prevPage !== page) fetchData();
    } else {
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, initialized]);

  useEffect(() => {
    localStorage.setItem('prevImages', JSON.stringify(images));
  }, [images]);

  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const { pending, fulfilled, rejected } = STATUS;
  const fetchData = () => {
    setStatus(pending);

    getImages(query, page)
      .then(res => {
        setImages(() => [
          ...JSON.parse(localStorage.getItem('prevImages')),
          ...res.data.hits,
        ]);
        setTotalImg(res.data.total);
        setStatus(fulfilled);
        toast.success('Images is ready!');
      })
      .catch(e => {
        toast.error('Smth went wrong!');
        setStatus(rejected);
      });
  };

  const getCurrentImages = image => {
    setBigImage(image);
    toggleModal();
  };

  const handleChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    localStorage.setItem('prevPage', JSON.stringify(page));
  }, [page]);

  const handleClickMore = () => {
    setPage(() => +JSON.parse(localStorage.getItem('prevPage')) + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleChangeQuery} />
      <ImageGallery getCurrentImages={getCurrentImages} images={images} />
      {status === pending && <Loader />}
      {totalImg > page * 12 && (
        <Button handleClickMore={handleClickMore}> </Button>
      )}
      {isOpen && (
        <Modal onClose={toggleModal}>
          <img
            src={bigImage}
            alt=""
            style={{
              maxHeight: '80vh',
              maxWidth: '50vw',
              objectFit: 'cover',
            }}
          />
        </Modal>
      )}
    </div>
  );
}
