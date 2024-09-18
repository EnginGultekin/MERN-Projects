import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { deleteProduct, fetchProductList } from '../../../globals/Network';
import { Button, message, Pagination, Popconfirm, Space, Table } from 'antd';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Products() {
  const [current, setCurrent] = useState(1); // Sayfa numarasını 1'den başlatalım

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: (deletedProductId) => {
      // Silinen ürünün bulunduğu sayfanın verilerini yeniden yükle
      queryClient.refetchQueries(['admin-products']);
      message.success('Ürün listeden silindi');
    },
    onError: () => {
      message.error('Ürün silinirken bir hata oluştu!');
    },
    // onSuccess: () => queryClient.invalidateQueries("admin-products")
  });

  const {
    fetchNextPage,
    fetchPreviousPage,
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    hasPreviousPage
  } = useInfiniteQuery({
    queryKey: ['admin-products'],
    queryFn: ({ pageParam = (current - 1) }) => fetchProductList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // API'den gelen verinin son sayfasında `hasNext` bilgisiyle yeni sayfa numarasını belirleyelim
      return lastPage.length === 6 ? allPages.length + 1 : undefined; // Sonraki sayfa varsa numarayı döndür
    },
    getPreviousPageParam: (firstPage, allPages) => {
      // Önceki sayfa varsa, sayfa numarasını geri döndür
      return allPages.length > 1 ? allPages.length - 2 : undefined;
    },
  });

  // Sayfa değiştirme işlemi
  const onChange = (page) => {
    if (page > current && hasNextPage) {
      fetchNextPage();
    } else if (page < current && hasPreviousPage) {
      console.log("Page", page)
      fetchPreviousPage();
    }
    setCurrent(page);
  };

  const confirm = (product_id) => {
    deleteMutation.mutate(product_id);
  };

  const cancel = () => {
    message.error('Silme işlemi iptal edildi');
  };

  // Tablo kolonları
  const columns = [
    {
      title: 'Başlık',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Aksiyon',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/products/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Ürünü sil"
            description="Bu ürünü silmek istediğinize emin misiniz?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Yüklenme durumu
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hata durumu
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Gelen veriyi düzleştirme ve sadece geçerli sayfadaki verileri gösterme
  const currentProducts = data?.pages.flat().slice((current - 1) * 6, current * 6) || [];

  // Toplam ürün sayısını belirleme (örneğin, API'den alacağınız bir toplam sayıyı burada kullanmalısınız)
  // Burada bir örnek olarak, varsayılan 100 kullanılabilir.
  const total = 50; // API'den dönen toplam ürün sayısını buraya eklemelisiniz

  return (
    <div>
      <Text fontSize='2xl' p='5'>Ürünler</Text>

      <Table
        dataSource={currentProducts}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <Pagination
        style={{ marginTop: '15px' }}
        pageSize={6}
        showSizeChanger={false}
        current={current}
        total={total}
        onChange={onChange}
      />
    </div>
  );
}

export default Products;
