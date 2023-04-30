import React, { useEffect, useState } from 'react';
import {  Popconfirm } from 'antd';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../types/product';
import { ICategory } from '../../types/category';


interface Props {
    categories: ICategory[],
    onRemove: (id: string) => void
}


const CategoryList: React.FC<Props> = ({categories, onRemove}) => {
  
const [project, setProduct] = useState<ICategory[]>([])

useEffect(() => {
  // console.log(products)
  setProduct(categories)
},[categories])

const onHandleRemove = (id: string) => {
  onRemove(id)
  // console.log(id)
  
}

const columns: ColumnsType<ICategory> = [
  {
    title: 'STT',
    dataIndex: '_id',
    key: '_id',
    render: (text, record, index) =>index + 1 ,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size="middle">
        <Button type="primary" href={'/admin/cateEdit/' + record._id}>UPDATE</Button>
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
          <Table columns={columns}  dataSource={project.map((categori:any) => ( {...categori, key: categori._id} ) ) } />
  );
};

export default CategoryList;