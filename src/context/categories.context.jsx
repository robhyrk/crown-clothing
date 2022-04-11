import {createContext, useState, useEffect} from 'react'
import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocuments  } from '../utils/firebase/firebase.utils.jsx'

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    
    useEffect(()=>{
        const getCategoriesMap = async () => {
            const getCategoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(getCategoryMap)
        }
        getCategoriesMap()
        // addCollectionAndDocuments('categories', SHOP_DATA)
    },[])
    const value = {categoriesMap}
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}