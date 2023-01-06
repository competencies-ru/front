import React from 'react';

// import { Link } from 'react-router-dom';

import { Typography, TypographyType, Loader } from '@ui';

// import Edit from './assets/edit.svg';
// import Trash from './assets/trash.svg';

import styles from './Table.module.scss';

type TableData = {
  id: string;
  title: string;
  code?: string;
};

type Props = {
  items: TableData[];
  // type: string;
  loading: boolean;
  // onDelete: (a: string) => void;
  // IDs?: string[];
};

const Table: React.FC<Props> = ({ items, loading }) => {
  // const [removingItem, setRemovingItem] = React.useState<string>('');

  // const handleChangeTrashModal = React.useCallback(
  //   (id?: string) => () => {
  //     setTimeout(() => {
  //       setRemovingItem(id ?? '');
  //     }, 0);
  //   },
  //   [setRemovingItem]
  // );

  // const openedModal = !!removingItem;
  const hasItems = React.useMemo(() => items && !!items.length, [items]);
  // const title = React.useMemo(() => {
  // const currentItem = items.find((item) => item.id === removingItem);
  //
  // return currentItem?.title ?? '';
  // }, [removingItem, items]);

  // const handleDelete = React.useCallback(() => {
  //   onDelete(removingItem);
  //   setRemovingItem('');
  // }, [onDelete, removingItem]);

  // const editLinkStart = React.useMemo(
  //   () =>
  //     IDs.reduce(
  //       (id, currentValue) => `${id}/${currentValue}`,
  //       window.location.pathname === '/' ? '' : window.location.pathname
  //     ),
  //   [IDs]
  // );

  if (!loading && !hasItems) {
    return (
      <div className={styles.emptyWrapper}>
        <Typography type={TypographyType.H2}>Список пуст</Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* <Modal isOpen={openedModal} onClose={handleChangeTrashModal()}>
        <Typography type={TypographyType.H2}>
          {`Вы уверены, что хотите удалить ${type} `}
          <Typography type={TypographyType.Span} className={styles.modalItem}>
            {`"${title}"`}
          </Typography>
          ?
        </Typography>
        <div className={styles.modalBtnWrapper}>
          <Button onClick={handleDelete}>Да</Button>
          <Button onClick={handleChangeTrashModal()} className={styles.noBtn}>
            Нет
          </Button>
        </div>
      </Modal> */}
      {hasItems && (
        <div className={styles.table}>
          <div className={styles.row}>
            <Typography type={TypographyType.H3}>№</Typography>
            <Typography type={TypographyType.H3}>Название</Typography>
          </div>
          {items.map((item, index) => (
            <div className={styles.row} key={item.id}>
              <Typography type={TypographyType.H3}>{index + 1}</Typography>
              <Typography type={TypographyType.H3}>{`${item.code ? item.code + ' – ' : ''}${
                item.title
              }`}</Typography>
              {/* <Link to={`${editLinkStart}/${item.id}`}>
                <Edit />
              </Link> */}
              {/* <button type="button" onClick={handleChangeTrashModal(item.id)}>
                <Trash />
              </button> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default React.memo(Table);
