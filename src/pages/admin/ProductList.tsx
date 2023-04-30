import React, { useEffect, useRef, useState } from 'react';
import {  Popconfirm } from 'antd';
import { Space, Table, Tag, Button,Input } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { IProduct } from '../../types/product';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { ICategory } from '../../types/category';


interface Props {
  products: IProduct[],
  onRemove: (id: string) => void,
  categories: ICategory[]
}

const ProductList: React.FC<Props> = ({products, onRemove, categories}) => {
const [project, setProduct] = useState<IProduct[]>([])
// const [loading, setLoading] = useState(true)

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  //end search

useEffect(() => {
  // console.log(products)
  
  setProduct(products)
},[products])

const onHandleRemove = (id: string) => {
  
  onRemove(id)
}



const columns: ColumnsType<IProduct> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    ...getColumnSearchProps('name'),
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (url: string) => <img src={url} alt="Product" style={{ maxWidth: 100 }} />,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'Category',
    key: 'categoryId',
    dataIndex: 'categoryId',
    render: (categoryId: any) =>
    categories.map((item) => (item._id == categoryId ? item.name : "")),
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size="middle">
        <Button type="primary" href={'/admin/edit/' + record._id}>UPDATE</Button>
        <Popconfirm
          placement="top"
          title= "Ban chac co muon xoa khong"
          description="Xoa di thi se mat do "
          onConfirm={() =>onHandleRemove(record._id )}
          okText="Yes"
          cancelText="No"
        >
        <Button type="primary" danger>DELETE</Button>
        </Popconfirm>
        
      </Space>
    ),
  },
];

  return (
          <Table columns={columns}  dataSource={project.map((product:any) => ( {...product, key: product._id} ) ) } />
  );
};

export default ProductList;