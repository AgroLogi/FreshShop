import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import AllProductList from '@/app/_components/AllProductList';

export default async function ProductCategory({params}) {

    const productList = await GlobalApi.getProductsByCategory(params.categoryName)
    const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className='text-2xl text-white bg-primary text-center p-2'>{params.categoryName}</h2>
      <TopCategoryList categoryList={categoryList}
      selectedCategory={params.categoryName}></TopCategoryList>
      <div className='p-5'>
      <AllProductList productList={productList}></AllProductList>
      </div>
    </div>
  )
}
